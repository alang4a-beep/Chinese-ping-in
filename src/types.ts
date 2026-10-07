export type DirectionMode = 'vertical-rl' | 'horizontal-tb';

export type GridStyle = 'none' | 'tian' | 'mi' | 'box' | 'line';

export type FontStyle = 'kaiti' | 'serif' | 'sans' | 'rounded';

export type ThemeStyle = 'mint' | 'paper' | 'white' | 'slate' | 'chalkboard';

export interface ZhuyinParts {
  raw: string;           // e.g. "ㄆㄠˇ" or "ㄓㄜ˙"
  initial?: string;      // 聲母: ㄅ ㄆ ㄇ ...
  medial?: string;       // 介母: ㄧ ㄨ ㄩ
  final?: string;        // 韻母: ㄚ ㄛ ㄜ ...
  tone: string;          // 聲調: '' (1st), 'ˊ' (2nd), 'ˇ' (3rd), 'ˋ' (4th), '˙' (neutral)
  toneNumber: 1 | 2 | 3 | 4 | 5;
}

export interface CharItem {
  id: string;
  char: string;
  isChinese: boolean;
  isPunctuation: boolean;
  isNewline: boolean;
  zhuyin: ZhuyinParts | null;
  alternatives: string[]; // Polyphone candidates e.g. ["ㄆㄠˇ", "ㄆㄠˊ"]
  customZhuyin?: string;
  notes?: string;
}

export interface DocumentSettings {
  direction: DirectionMode;
  fontSize: number;          // Hanzi font size in px
  zhuyinRatio: number;        // ratio of zhuyin size relative to hanzi (default ~0.4)
  charSpacing: number;       // space between characters
  lineSpacing: number;       // space between lines
  fontStyle: FontStyle;
  gridStyle: GridStyle;
  gridColor: string;
  theme: ThemeStyle;
  showTone: boolean;
  showZhuyin: boolean;
  traceableMode: boolean;    // for handwriting practice (grey text)
  showStrokeOrderBox?: boolean;
}
