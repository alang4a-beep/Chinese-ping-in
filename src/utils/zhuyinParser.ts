import { ZhuyinParts } from '../types';

export const INITIALS = ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄊ', 'ㄋ', 'ㄌ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄐ', 'ㄑ', 'ㄒ', 'ㄓ', 'ㄔ', 'ㄕ', 'ㄖ', 'ㄗ', 'ㄘ', 'ㄙ'];
export const MEDIALS = ['ㄧ', 'ㄨ', 'ㄩ'];
export const FINALS = ['ㄚ', 'ㄛ', 'ㄜ', 'ㄝ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ', 'ㄦ'];
export const TONES = ['', 'ˊ', 'ˇ', 'ˋ', '˙'];

export const TONE_MAP: Record<string, { tone: string; toneNumber: 1 | 2 | 3 | 4 | 5 }> = {
  '': { tone: '', toneNumber: 1 },
  '1': { tone: '', toneNumber: 1 },
  'ˊ': { tone: 'ˊ', toneNumber: 2 },
  '2': { tone: 'ˊ', toneNumber: 2 },
  'ˇ': { tone: 'ˇ', toneNumber: 3 },
  '3': { tone: 'ˇ', toneNumber: 3 },
  'ˋ': { tone: 'ˋ', toneNumber: 4 },
  '4': { tone: 'ˋ', toneNumber: 4 },
  '˙': { tone: '˙', toneNumber: 5 },
  '5': { tone: '˙', toneNumber: 5 },
  '0': { tone: '˙', toneNumber: 5 },
  '·': { tone: '˙', toneNumber: 5 },
  '•': { tone: '˙', toneNumber: 5 },
};

/**
 * Parses a raw Zhuyin string (e.g. "ㄆㄠˇ", "˙ㄉㄜ", "ㄓㄜ˙", "ㄅㄨˋ", "ㄒㄧㄤˊ")
 * into structural components: initial, medial, final, tone.
 */
export function parseZhuyin(input: string): ZhuyinParts {
  if (!input) {
    return { raw: '', tone: '', toneNumber: 1 };
  }

  let cleaned = input.trim();
  let tone = '';
  let toneNumber: 1 | 2 | 3 | 4 | 5 = 1;

  // Check for neutral tone dot at start or end
  if (cleaned.startsWith('˙') || cleaned.startsWith('·') || cleaned.startsWith('•')) {
    tone = '˙';
    toneNumber = 5;
    cleaned = cleaned.substring(1);
  } else if (cleaned.endsWith('˙') || cleaned.endsWith('·') || cleaned.endsWith('•') || cleaned.endsWith('5') || cleaned.endsWith('0')) {
    tone = '˙';
    toneNumber = 5;
    cleaned = cleaned.replace(/[˙·•50]$/, '');
  } else {
    // Check for tone marks (ˊ, ˇ, ˋ or numbers 2, 3, 4, 1)
    const lastChar = cleaned.slice(-1);
    if (lastChar in TONE_MAP && lastChar !== '') {
      const match = TONE_MAP[lastChar];
      tone = match.tone;
      toneNumber = match.toneNumber;
      cleaned = cleaned.slice(0, -1);
    }
  }

  let initial: string | undefined = undefined;
  let medial: string | undefined = undefined;
  let final: string | undefined = undefined;

  const chars = Array.from(cleaned);
  let index = 0;

  if (index < chars.length && INITIALS.includes(chars[index])) {
    initial = chars[index];
    index++;
  }

  if (index < chars.length && MEDIALS.includes(chars[index])) {
    // Note: if ㄧ is followed by nothing, or followed by final
    medial = chars[index];
    index++;
  }

  if (index < chars.length && FINALS.includes(chars[index])) {
    final = chars[index];
    index++;
  } else if (index < chars.length && !medial && MEDIALS.includes(chars[index])) {
    // If no initial, e.g. ㄧ, ㄨ, ㄩ standing alone
    medial = chars[index];
    index++;
  }

  // Fallback for any unmatched symbols
  const remaining = chars.slice(index).join('');
  if (remaining) {
    if (!final) final = remaining;
    else if (!initial) initial = remaining;
  }

  return {
    raw: input,
    initial,
    medial,
    final,
    tone,
    toneNumber
  };
}

/**
 * Reconstructs a Zhuyin string from components
 */
export function formatZhuyin(parts: { initial?: string; medial?: string; final?: string; tone?: string }): string {
  const base = `${parts.initial || ''}${parts.medial || ''}${parts.final || ''}`;
  if (!base) return '';
  const tone = parts.tone || '';
  if (tone === '˙') {
    return `˙${base}`;
  }
  return `${base}${tone}`;
}

/**
 * Check if a character is Chinese (CJK Unified Ideographs, Extensions, Compatibility)
 */
export function isChineseChar(ch: string): boolean {
  return /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/.test(ch);
}

/**
 * Check if a character is Chinese punctuation
 */
export function isPunctuationChar(ch: string): boolean {
  return /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F.,!?;:"'()\[\]{}《》「」『』【】、。，！？；：]/.test(ch);
}
