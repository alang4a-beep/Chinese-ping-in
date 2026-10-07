import React from 'react';
import { CharItem, DocumentSettings } from '../types';
import { BopomofoChar } from './BopomofoChar';

interface BopomofoViewerProps {
  items: CharItem[];
  settings: DocumentSettings;
  selectedCharId: string | null;
  onCharClick: (item: CharItem) => void;
  onCharContextMenu: (e: React.MouseEvent, item: CharItem) => void;
}

export const BopomofoViewer: React.FC<BopomofoViewerProps> = ({
  items,
  settings,
  selectedCharId,
  onCharClick,
  onCharContextMenu
}) => {
  const { direction, theme, lineSpacing } = settings;

  // Theme styling configurations
  const getThemeStyles = () => {
    switch (theme) {
      case 'mint':
        // Exactly matches the soothing green background in user's image IMG_1337.jpeg
        return {
          containerBg: 'bg-[#a3d8c1] shadow-xl border-[#86c4a9]',
          cardBg: 'bg-[#a3d8c1]',
          textColor: '#0f291e',
          toneColor: '#8a2b0e',
          gridDefaultColor: '#4f856f'
        };
      case 'paper':
        return {
          containerBg: 'bg-[#fbf7ee] shadow-xl border-[#e8ddc7]',
          cardBg: 'bg-[#fbf7ee]',
          textColor: '#292524',
          toneColor: '#b45309',
          gridDefaultColor: '#e2cca6'
        };
      case 'chalkboard':
        return {
          containerBg: 'bg-[#1e3a2f] shadow-xl border-[#162e25]',
          cardBg: 'bg-[#1e3a2f]',
          textColor: '#f1f5f9',
          toneColor: '#fbbf24',
          gridDefaultColor: '#2d5a49'
        };
      case 'slate':
        return {
          containerBg: 'bg-slate-900 shadow-xl border-slate-800 text-white',
          cardBg: 'bg-slate-900',
          textColor: '#f8fafc',
          toneColor: '#38bdf8',
          gridDefaultColor: '#334155'
        };
      case 'white':
      default:
        return {
          containerBg: 'bg-white shadow-xl border-slate-200',
          cardBg: 'bg-white',
          textColor: '#0f172a',
          toneColor: '#b45309',
          gridDefaultColor: '#fca5a5'
        };
    }
  };

  const themeConfig = getThemeStyles();

  // Split tokens by paragraphs / newlines
  const paragraphs: CharItem[][] = [];
  let currentParagraph: CharItem[] = [];

  items.forEach((item) => {
    if (item.isNewline) {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph);
        currentParagraph = [];
      } else {
        // empty line
        paragraphs.push([]);
      }
    } else {
      currentParagraph.push(item);
    }
  });

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph);
  }

  if (paragraphs.length === 0) {
    paragraphs.push([]);
  }

  const isVertical = direction === 'vertical-rl';

  return (
    <div
      id="bopomofo-print-container"
      className={`relative w-full rounded-2xl border transition-colors duration-200 overflow-x-auto p-6 md:p-10 min-h-[500px] flex flex-col justify-start items-center ${themeConfig.containerBg}`}
      style={
        {
          '--hanzi-color': themeConfig.textColor,
          '--tone-color': themeConfig.toneColor,
          '--grid-color': settings.gridColor || themeConfig.gridDefaultColor
        } as React.CSSProperties
      }
    >
      {/* Document Content Canvas or Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-auto py-16 text-center select-none">
          <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-2xl font-bold mb-3 shadow-inner opacity-75">
            注
          </div>
          <p className="text-base font-bold opacity-85">請在上方輸入欲排版的國字或文章</p>
          <p className="text-xs mt-1.5 opacity-65 max-w-md leading-relaxed">
            輸入完成後，系統將自動於國字旁標注注音與聲調。可於下方工具列切換「由上到下直排」或「由左至右橫排」。
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          {isVertical ? (
            /* ================================================================
               VERTICAL MODE: 由上到下（由右至左換行）
               Lines are laid out horizontally in reverse (from right to left).
               Each line stacks its characters from top to bottom.
               ================================================================ */
            <div className="flex flex-row-reverse items-start justify-end gap-x-6 gap-y-0 w-full overflow-x-auto py-4 min-h-[400px]">
              {paragraphs.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="flex flex-col items-center justify-start shrink-0"
                  style={{
                    marginRight: `${lineSpacing * 0.5}px`,
                    marginLeft: `${lineSpacing * 0.5}px`
                  }}
                >
                  {paragraph.length === 0 ? (
                    // Blank line spacer in vertical mode
                    <div
                      style={{
                        width: `${settings.fontSize * 1.5}px`,
                        height: `${settings.fontSize * 1.5}px`
                      }}
                    />
                  ) : (
                    paragraph.map((item) => (
                      <BopomofoChar
                        key={item.id}
                        item={item}
                        settings={settings}
                        isSelected={selectedCharId === item.id}
                        onClick={onCharClick}
                        onContextMenu={onCharContextMenu}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* ================================================================
               HORIZONTAL MODE: 由左至右（向下換行）
               Text flows from left to right, wrapping downwards.
               Zhuyin is vertically positioned on the right of each character.
               ================================================================ */
            <div className="flex flex-col items-start w-full space-y-4 py-4">
              {paragraphs.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="flex flex-wrap items-center w-full"
                  style={{
                    rowGap: `${lineSpacing}px`
                  }}
                >
                  {paragraph.length === 0 ? (
                    // Blank line spacer in horizontal mode
                    <div className="w-full" style={{ height: `${settings.fontSize * 0.8}px` }} />
                  ) : (
                    paragraph.map((item) => (
                      <BopomofoChar
                        key={item.id}
                        item={item}
                        settings={settings}
                        isSelected={selectedCharId === item.id}
                        onClick={onCharClick}
                        onContextMenu={onCharContextMenu}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
