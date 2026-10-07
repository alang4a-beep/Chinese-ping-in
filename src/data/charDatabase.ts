import { POLYPHONE_DICT } from './zhuyinDict';
import { parseZhuyin, isChineseChar, isPunctuationChar } from '../utils/zhuyinParser';
import { pinyinToZhuyin } from '../utils/pinyinToZhuyin';
import { CharItem } from '../types';
import { pinyin } from 'pinyin-pro';
import { sify } from 'chinese-conv';

/**
 * Taiwan MOE specific default overrides for characters whose standard pronunciation in Taiwan
 * differs from Mainland Pinyin dictionary defaults.
 */
export const TAIWAN_MOE_OVERRIDES: Record<string, string> = {
  '跑': 'ㄆㄠˇ',
  '步': 'ㄅㄨˋ',
  '著': 'ㄓㄜ˙',
  '和': 'ㄏㄢˋ',
  '骰': 'ㄊㄡˊ',
  '企': 'ㄑㄧˋ',
  '攜': 'ㄒㄧ',
  '液': 'ㄧˋ',
  '崖': 'ㄧㄞˊ',
  '穴': 'ㄒㄩㄝˋ',
  '俄': 'ㄜˊ',
  '法': 'ㄈㄚˇ',
  '髮': 'ㄈㄚˇ',
  '微': 'ㄨㄟˊ',
  '質': 'ㄓˊ',
  '期': 'ㄑㄧˊ',
  '究': 'ㄐㄧㄡˋ',
  '括': 'ㄍㄨㄚ',
  '垃圾': 'ㄌㄜˋ ㄙㄜˋ',
};

/**
 * Get Zhuyin for a single Chinese character, along with all polyphone alternatives.
 * Uses Taiwan MOE dictionary first, then pinyin-pro across 20,000+ characters.
 */
export function getZhuyinForChar(char: string): { defaultZhuyin: string; alternatives: string[] } {
  if (!char || !isChineseChar(char)) {
    return { defaultZhuyin: '', alternatives: [] };
  }

  // Check Taiwan MOE polyphone dictionary first
  const polyEntry = POLYPHONE_DICT[char];
  let defaultZhuyin = '';
  const alternativesSet = new Set<string>();

  if (polyEntry) {
    defaultZhuyin = polyEntry.default;
    polyEntry.readings.forEach((r) => alternativesSet.add(r.zhuyin));
  } else if (TAIWAN_MOE_OVERRIDES[char]) {
    defaultZhuyin = TAIWAN_MOE_OVERRIDES[char];
    alternativesSet.add(defaultZhuyin);
  }

  // Look up character in pinyin-pro using simplified equivalent for dictionary match
  const simpChar = sify(char);
  const pinyinList = pinyin(simpChar, { multiple: true, toneType: 'num', type: 'array' });

  if (pinyinList && pinyinList.length > 0) {
    // If we haven't found a default Zhuyin yet, convert the first pinyin
    if (!defaultZhuyin) {
      defaultZhuyin = pinyinToZhuyin(pinyinList[0]);
    }

    // Add all alternative readings
    pinyinList.forEach((py) => {
      const zy = pinyinToZhuyin(py);
      if (zy) {
        alternativesSet.add(zy);
      }
    });
  }

  // Ensure defaultZhuyin is also in alternativesSet
  if (defaultZhuyin) {
    alternativesSet.add(defaultZhuyin);
  }

  return {
    defaultZhuyin: defaultZhuyin || '',
    alternatives: Array.from(alternativesSet)
  };
}

/**
 * Tokenize input raw text into structured CharItems with automatic Zhuyin information.
 * Uses context-aware sentence segmentation via pinyin-pro so phrases like
 * 「銀行」vs「行走」、「音樂」vs「快樂」automatically receive correct contextual pronunciations!
 */
export function tokenizeText(text: string, customOverrides: Record<string, string> = {}): CharItem[] {
  const items: CharItem[] = [];
  if (!text) return items;

  // We convert the full text into simplified for phrase-level segmentation
  const simplifiedText = sify(text);

  // Use pinyin-pro type: 'all' to get context-aware pinyin for every character in order
  let pinyinResults: Array<{
    origin: string;
    pinyin: string;
    num: number;
    isZh: boolean;
  }> = [];

  try {
    pinyinResults = pinyin(simplifiedText, { toneType: 'num', type: 'all' }) as any;
  } catch (err) {
    pinyinResults = [];
  }

  // Map each character in the original text
  let pyIndex = 0;
  let index = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const id = `c_${index++}_${ch}_${i}`;

    // Handle newline
    if (ch === '\n') {
      items.push({
        id,
        char: '\n',
        isChinese: false,
        isPunctuation: false,
        isNewline: true,
        zhuyin: null,
        alternatives: []
      });
      // Advance pyIndex if newline is present in results
      if (pyIndex < pinyinResults.length && pinyinResults[pyIndex].origin === '\n') {
        pyIndex++;
      }
      continue;
    }

    const isChinese = isChineseChar(ch);
    const isPunctuation = isPunctuationChar(ch);

    if (isChinese) {
      // Find contextual pinyin from pinyinResults
      let contextualZhuyin = '';
      if (pyIndex < pinyinResults.length) {
        const pyItem = pinyinResults[pyIndex];
        if (pyItem.pinyin) {
          contextualZhuyin = pinyinToZhuyin(pyItem.pinyin);
        }
        pyIndex++;
      }

      // Check Taiwan specific character rules or polyphone dictionary
      const { defaultZhuyin, alternatives } = getZhuyinForChar(ch);

      // Final automated reading:
      // If user has polyphone dictionary with contextual match or Taiwan override:
      let autoZhuyin = contextualZhuyin || defaultZhuyin;

      // Special Taiwan MOE single-character overrides when contextual matches standard Mainland reading
      if (TAIWAN_MOE_OVERRIDES[ch] && (!contextualZhuyin || ch === '跑' || ch === '步')) {
        autoZhuyin = TAIWAN_MOE_OVERRIDES[ch];
      }

      // If user has customized this specific character occurrence
      const finalZhuyinStr = customOverrides[id] !== undefined ? customOverrides[id] : autoZhuyin;
      const zhuyinParts = finalZhuyinStr ? parseZhuyin(finalZhuyinStr) : null;

      // Ensure contextualZhuyin is also in alternatives if valid
      const mergedAlternatives = new Set(alternatives);
      if (autoZhuyin) mergedAlternatives.add(autoZhuyin);
      if (contextualZhuyin) mergedAlternatives.add(contextualZhuyin);

      items.push({
        id,
        char: ch,
        isChinese: true,
        isPunctuation: false,
        isNewline: false,
        zhuyin: zhuyinParts,
        alternatives: Array.from(mergedAlternatives),
        customZhuyin: customOverrides[id]
      });
    } else {
      // Non-Chinese character or punctuation
      if (pyIndex < pinyinResults.length && !pinyinResults[pyIndex].isZh) {
        pyIndex++;
      }

      items.push({
        id,
        char: ch,
        isChinese: false,
        isPunctuation,
        isNewline: false,
        zhuyin: null,
        alternatives: []
      });
    }
  }

  return items;
}
