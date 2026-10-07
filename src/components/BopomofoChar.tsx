import React from 'react';
import { CharItem, DocumentSettings } from '../types';

interface BopomofoCharProps {
  item: CharItem;
  settings: DocumentSettings;
  isSelected?: boolean;
  onClick?: (item: CharItem) => void;
  onContextMenu?: (e: React.MouseEvent, item: CharItem) => void;
}

export const BopomofoChar: React.FC<BopomofoCharProps> = ({
  item,
  settings,
  isSelected,
  onClick,
  onContextMenu
}) => {
  const {
    fontSize,
    zhuyinRatio,
    fontStyle,
    gridStyle,
    gridColor,
    showTone,
    showZhuyin,
    traceableMode
  } = settings;

  // Handle newlines
  if (item.isNewline) {
    return <div className="w-full h-0 basis-full" style={{ breakAfter: 'always' }} />;
  }

  // Handle punctuation or non-Chinese characters
  if (!item.isChinese) {
    return (
      <div
        className={`inline-flex items-center justify-center select-none ${
          item.isPunctuation ? 'font-serif' : 'font-sans'
        }`}
        style={{
          fontSize: `${fontSize}px`,
          minWidth: `${fontSize * 0.6}px`,
          height: `${fontSize * 1.15}px`,
          color: 'var(--text-primary)'
        }}
      >
        <span className="leading-none">{item.char}</span>
      </div>
    );
  }

  const zhuyin = item.zhuyin;
  const hasPolyphone = item.alternatives && item.alternatives.length > 1;
  const isCustomized = !!item.customZhuyin;

  // Font family resolution
  const getFontFamily = () => {
    switch (fontStyle) {
      case 'kaiti':
        return '"DFKai-SB", "BiauKai", "TW-Kai", "Noto Serif TC", "KaiTi", "楷體", serif';
      case 'serif':
        return '"Noto Serif TC", "Songti TC", "MingLiU", "新細明體", serif';
      case 'rounded':
        return '"Zen Maru Gothic", "Yuanti TC", "微軟正黑體", sans-serif';
      case 'sans':
      default:
        return '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "微軟正黑體", sans-serif';
    }
  };

  const rubyFontSize = Math.max(10, Math.round(fontSize * zhuyinRatio));
  const toneFontSize = Math.max(9, Math.round(rubyFontSize * 0.95));

  // Extract zhuyin components
  const initial = zhuyin?.initial;
  const medial = zhuyin?.medial;
  const final = zhuyin?.final;
  const tone = zhuyin?.tone || '';
  const isNeutralTone = tone === '˙';

  // Count symbols in the vertical stack
  const symbols = [initial, medial, final].filter(Boolean) as string[];

  // Render Tianzige / Mizige SVG background
  const renderGrid = () => {
    if (gridStyle === 'none') return null;

    const size = fontSize * 1.15;
    const strokeColor = gridColor || '#fca5a5';

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Outer border */}
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          className="opacity-75"
        />

        {/* Tianzige crosshair */}
        {(gridStyle === 'tian' || gridStyle === 'mi') && (
          <>
            <line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="3 3"
              className="opacity-60"
            />
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="3 3"
              className="opacity-60"
            />
          </>
        )}

        {/* Mizige diagonal lines */}
        {gridStyle === 'mi' && (
          <>
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              stroke={strokeColor}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              className="opacity-40"
            />
            <line
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              stroke={strokeColor}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              className="opacity-40"
            />
          </>
        )}

        {/* Bottom Line only */}
        {gridStyle === 'line' && (
          <line
            x1="0"
            y1="98"
            x2="100"
            y2="98"
            stroke={strokeColor}
            strokeWidth="1.5"
            className="opacity-80"
          />
        )}
      </svg>
    );
  };

  return (
    <div
      onClick={() => onClick?.(item)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e, item);
      }}
      className={`group relative inline-flex items-center justify-center cursor-pointer transition-all duration-150 rounded-lg p-1 select-none ${
        isSelected
          ? 'ring-2 ring-amber-500 bg-amber-50 shadow-sm'
          : 'hover:bg-amber-50/70'
      }`}
      style={{
        fontFamily: getFontFamily(),
        margin: `${settings.charSpacing}px`
      }}
      title={`字：${item.char}\n注音：${zhuyin?.raw || '無'}${
        hasPolyphone ? ' (含破音字，點擊切換)' : ' (點擊自訂讀音)'
      }`}
    >
      {/* Container holding Hanzi and vertical Zhuyin column */}
      <div className="relative flex items-center">
        {/* Hanzi Box */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${fontSize * 1.08}px`,
            height: `${fontSize * 1.08}px`
          }}
        >
          {renderGrid()}

          <span
            className={`relative z-10 leading-none transition-colors ${
              traceableMode
                ? 'text-slate-300 font-normal hover:text-slate-500'
                : 'text-slate-900 font-medium'
            }`}
            style={{
              fontSize: `${fontSize}px`,
              color: traceableMode ? undefined : 'var(--hanzi-color, #1e293b)'
            }}
          >
            {item.char}
          </span>
        </div>

        {/* Vertical Bopomofo Column (on the right of the Hanzi) */}
        {showZhuyin && zhuyin && zhuyin.raw && (
          <div
            className="relative flex flex-col items-center justify-center ml-1 text-slate-800"
            style={{
              height: `${fontSize * 1.08}px`,
              minWidth: `${rubyFontSize * 1.45}px`,
              fontSize: `${rubyFontSize}px`,
              lineHeight: 1
            }}
          >
            {/* Neutral tone dot at the top if present (˙) */}
            {showTone && isNeutralTone && (
              <div
                className="font-bold -mb-0.5 leading-none"
                style={{
                  fontSize: `${toneFontSize * 1.3}px`,
                  color: 'var(--tone-color, #b45309)'
                }}
              >
                ˙
              </div>
            )}

            {/* Zhuyin symbols stack + Side tone marks */}
            <div className="relative flex items-center justify-center">
              {/* Stack of Phonetic Symbols (Initials, Medials, Finals) */}
              <div className="flex flex-col items-center justify-center tracking-normal">
                {symbols.map((sym, idx) => (
                  <span
                    key={idx}
                    className="leading-none text-center block font-medium"
                    style={{
                      fontFamily: '"DFKai-SB", "BiauKai", "TW-Kai", "Noto Sans TC", sans-serif',
                      fontSize: `${rubyFontSize}px`,
                      margin: symbols.length > 2 ? '-1px 0' : '0'
                    }}
                  >
                    {sym}
                  </span>
                ))}
              </div>

              {/* Side tone mark (ˊ, ˇ, ˋ) placed to the right of the symbols */}
              {showTone && !isNeutralTone && tone && (
                <div
                  className="absolute left-full -ml-0.5 flex flex-col justify-end"
                  style={{
                    bottom: symbols.length > 1 ? '15%' : '20%',
                    fontSize: `${toneFontSize}px`,
                    color: 'var(--tone-color, #b45309)',
                    lineHeight: 1
                  }}
                >
                  <span
                    className="font-bold select-none leading-none inline-block transform"
                    style={{
                      transform: tone === 'ˇ' ? 'scale(1.1) translateY(-1px)' : 'none'
                    }}
                  >
                    {tone}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Polyphone & customization indicator dots */}
      {(hasPolyphone || isCustomized) && (
        <span
          className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${
            isCustomized ? 'bg-amber-600 ring-1 ring-white' : 'bg-emerald-500 opacity-60 group-hover:opacity-100'
          }`}
          title={isCustomized ? '已自訂讀音' : '包含多種讀音（破音字）'}
        />
      )}
    </div>
  );
};
