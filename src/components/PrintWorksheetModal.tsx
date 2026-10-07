import React, { useRef } from 'react';
import { CharItem, DocumentSettings } from '../types';
import { BopomofoChar } from './BopomofoChar';
import { Printer, X, Download, FileText, CheckCircle2 } from 'lucide-react';

interface PrintWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CharItem[];
  settings: DocumentSettings;
}

export const PrintWorksheetModal: React.FC<PrintWorksheetModalProps> = ({
  isOpen,
  onClose,
  items,
  settings
}) => {
  const printContentRef = useRef<HTMLDivElement>(null);
  const [worksheetTitle, setWorksheetTitle] = React.useState('國語生字注音練習單');
  const [studentName, setStudentName] = React.useState('');
  const [repeatCount, setRepeatCount] = React.useState<number>(4); // repeat each char for handwriting practice
  const [worksheetMode, setWorksheetMode] = React.useState<'article' | 'grid-practice'>('article');

  if (!isOpen) return null;

  const chineseChars = items.filter((it) => it.isChinese);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Printer size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">列印與生字練習本設定</h3>
              <p className="text-xs text-slate-500">支援 A4 格式排版、田字格描紅練習與標準注音輸出</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="px-6 py-3 bg-amber-50/50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <label className="font-semibold text-slate-700">練習單模式：</label>
            <div className="inline-flex bg-white p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setWorksheetMode('article')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  worksheetMode === 'article'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                全文閱讀排版
              </button>
              <button
                type="button"
                onClick={() => setWorksheetMode('grid-practice')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  worksheetMode === 'grid-practice'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                生字描紅習字格 (每字重複)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={worksheetTitle}
              onChange={(e) => setWorksheetTitle(e.target.value)}
              placeholder="練習單標題"
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs w-44"
            />
            {worksheetMode === 'grid-practice' && (
              <select
                value={repeatCount}
                onChange={(e) => setRepeatCount(Number(e.target.value))}
                className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs"
              >
                <option value={3}>每字 3 格練習</option>
                <option value={4}>每字 4 格練習</option>
                <option value={6}>每字 6 格練習</option>
                <option value={8}>每字 8 格練習</option>
              </select>
            )}
          </div>
        </div>

        {/* Printable Area Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex justify-center">
          <div
            ref={printContentRef}
            id="printable-worksheet"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-lg p-10 flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-6"
            style={{
              fontFamily: '"DFKai-SB", "BiauKai", "TW-Kai", "Noto Serif TC", serif'
            }}
          >
            {/* Title Header */}
            <div>
              <div className="text-center pb-4 border-b-2 border-slate-800 mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-wider mb-2">
                  {worksheetTitle}
                </h1>
                <div className="flex justify-between items-center text-xs text-slate-600 px-2 font-sans">
                  <span>班級：＿＿＿＿＿＿</span>
                  <span>座號：＿＿＿＿</span>
                  <span>姓名：＿＿＿＿＿＿</span>
                  <span>日期：＿＿年＿＿月＿＿日</span>
                </div>
              </div>

              {/* Worksheet Content */}
              {worksheetMode === 'article' ? (
                /* Article mode: shows current direction layout */
                <div className="py-4 flex justify-center">
                  <div
                    className={`flex ${
                      settings.direction === 'vertical-rl'
                        ? 'flex-row-reverse justify-end gap-x-8 gap-y-2'
                        : 'flex-wrap gap-y-6 gap-x-2'
                    }`}
                  >
                    {items.map((item) => (
                      <BopomofoChar
                        key={item.id}
                        item={item}
                        settings={{
                          ...settings,
                          fontSize: Math.min(settings.fontSize, 40),
                          gridStyle: settings.gridStyle === 'none' ? 'tian' : settings.gridStyle
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* Grid Practice mode: each character repeated N times with traceable practice */
                <div className="space-y-4 py-2">
                  {chineseChars.map((charItem, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center space-x-3 p-2 border border-slate-200 rounded-xl bg-slate-50/50"
                    >
                      {/* Master Character (Dark) */}
                      <div className="border-r-2 border-slate-300 pr-3">
                        <BopomofoChar
                          item={charItem}
                          settings={{
                            ...settings,
                            fontSize: 36,
                            gridStyle: 'tian',
                            traceableMode: false
                          }}
                        />
                      </div>

                      {/* Practice Cells (Traceable light grey + empty boxes) */}
                      <div className="flex items-center space-x-2 flex-wrap">
                        {Array.from({ length: repeatCount }).map((_, rIdx) => {
                          const isTrace = rIdx < 2; // First 2 are light trace, remaining are empty
                          return (
                            <div key={rIdx} className="relative">
                              <BopomofoChar
                                item={charItem}
                                settings={{
                                  ...settings,
                                  fontSize: 36,
                                  gridStyle: 'tian',
                                  showZhuyin: true,
                                  traceableMode: isTrace
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3 mt-8 font-sans flex justify-between">
              <span>國字注音垂直排版產生器 • 標準教育部字音規範</span>
              <span>得分：＿＿＿＿</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500">
            提示：可使用瀏覽器列印對話框儲存為 PDF 或直接列印
          </span>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              關閉
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center space-x-1.5"
            >
              <Printer size={16} />
              <span>列印 / 儲存 PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
