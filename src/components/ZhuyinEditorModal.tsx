import React, { useState } from 'react';
import { CharItem } from '../types';
import { INITIALS, MEDIALS, FINALS, TONES, parseZhuyin, formatZhuyin } from '../utils/zhuyinParser';
import { POLYPHONE_DICT } from '../data/zhuyinDict';
import { Volume2, Check, RefreshCw, X, Sparkles, Layers } from 'lucide-react';

interface ZhuyinEditorModalProps {
  item: CharItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (charId: string, char: string, newZhuyin: string, applyToAll: boolean) => void;
}

export const ZhuyinEditorModal: React.FC<ZhuyinEditorModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !item) return null;

  const polyData = POLYPHONE_DICT[item.char];
  const currentZhuyinStr = item.customZhuyin || item.zhuyin?.raw || '';
  
  const [inputVal, setInputVal] = useState<string>(currentZhuyinStr);
  const [selectedInitial, setSelectedInitial] = useState<string>(item.zhuyin?.initial || '');
  const [selectedMedial, setSelectedMedial] = useState<string>(item.zhuyin?.medial || '');
  const [selectedFinal, setSelectedFinal] = useState<string>(item.zhuyin?.final || '');
  const [selectedTone, setSelectedTone] = useState<string>(item.zhuyin?.tone || '');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'builder' | 'text'>('quick');

  // Update components when text changes
  const handleTextChange = (text: string) => {
    setInputVal(text);
    const parsed = parseZhuyin(text);
    setSelectedInitial(parsed.initial || '');
    setSelectedMedial(parsed.medial || '');
    setSelectedFinal(parsed.final || '');
    setSelectedTone(parsed.tone || '');
  };

  // Update components from keypad
  const handleKeypadUpdate = (
    nextInit = selectedInitial,
    nextMed = selectedMedial,
    nextFin = selectedFinal,
    nextTone = selectedTone
  ) => {
    setSelectedInitial(nextInit);
    setSelectedMedial(nextMed);
    setSelectedFinal(nextFin);
    setSelectedTone(nextTone);

    const reconstructed = formatZhuyin({
      initial: nextInit,
      medial: nextMed,
      final: nextFin,
      tone: nextTone
    });
    setInputVal(reconstructed);
  };

  const handleApplyQuick = (zhuyin: string) => {
    setInputVal(zhuyin);
    const parsed = parseZhuyin(zhuyin);
    setSelectedInitial(parsed.initial || '');
    setSelectedMedial(parsed.medial || '');
    setSelectedFinal(parsed.final || '');
    setSelectedTone(parsed.tone || '');
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.char);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleConfirm = () => {
    onSave(item.id, item.char, inputVal.trim(), applyToAll);
    onClose();
  };

  const parsedPreview = parseZhuyin(inputVal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-3xl font-bold shadow-md shadow-amber-500/20">
              {item.char}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800 text-lg">編輯注音與讀音</h3>
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1 text-amber-700 hover:text-amber-800 hover:bg-amber-100/60 rounded-full transition-colors"
                  title="朗讀發音"
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500">
                可單獨調整此字讀音（解決破音字或方言需求）
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">即時排版預覽</span>
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200 shadow-inner">
              <span className="text-2xl font-bold text-slate-900 mr-2 font-serif">{item.char}</span>
              <div className="flex flex-col items-center leading-none text-emerald-900 font-bold text-sm">
                {parsedPreview.tone === '˙' && <span className="text-xs -mb-0.5 text-amber-600">˙</span>}
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    {parsedPreview.initial && <span>{parsedPreview.initial}</span>}
                    {parsedPreview.medial && <span>{parsedPreview.medial}</span>}
                    {parsedPreview.final && <span>{parsedPreview.final}</span>}
                  </div>
                  {parsedPreview.tone && parsedPreview.tone !== '˙' && (
                    <span className="text-xs text-amber-600 ml-0.5 font-bold">{parsedPreview.tone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">目前拼音</span>
            <div className="font-mono text-base font-bold text-amber-600">{inputVal || '無注音'}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 pt-2 bg-white">
          <button
            onClick={() => setActiveTab('quick')}
            className={`pb-2.5 px-3 text-sm font-medium border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'quick'
                ? 'border-amber-600 text-amber-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={16} />
            <span>字典讀音 (破音字)</span>
            {polyData?.readings && polyData.readings.length > 1 && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                {polyData.readings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-2.5 px-3 text-sm font-medium border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'builder'
                ? 'border-amber-600 text-amber-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers size={16} />
            <span>注音鍵盤拼音</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Tab 1: Quick Polyphone Picker */}
          {activeTab === 'quick' && (
            <div className="space-y-3">
              {polyData && polyData.readings && polyData.readings.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {polyData.readings.map((reading, idx) => {
                    const isSelected = inputVal === reading.zhuyin;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyQuick(reading.zhuyin)}
                        className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/80 shadow-sm ring-1 ring-amber-400'
                            : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-slate-900 font-mono tracking-wider">
                              {reading.zhuyin}
                            </span>
                            {reading.zhuyin === polyData.default && (
                              <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                                常用預設
                              </span>
                            )}
                          </div>
                          {reading.meaning && (
                            <p className="text-xs text-slate-600 font-medium">
                              釋義：{reading.meaning}
                            </p>
                          )}
                          {reading.examples && reading.examples.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {reading.examples.map((ex, exIdx) => (
                                <span
                                  key={exIdx}
                                  className="text-[11px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                                >
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-1">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-600">
                    此字字典中暫無多音字詞條，您可以使用下方鍵盤或手動輸入任何注音。
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Visual Zhuyin Keypad Builder */}
          {activeTab === 'builder' && (
            <div className="space-y-4">
              {/* Initials (聲母) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">1. 聲母 (Initials)</span>
                  {selectedInitial && (
                    <button
                      type="button"
                      onClick={() => handleKeypadUpdate('', selectedMedial, selectedFinal, selectedTone)}
                      className="text-[11px] text-amber-600 hover:underline"
                    >
                      清除聲母
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {INITIALS.map((init) => (
                    <button
                      key={init}
                      type="button"
                      onClick={() => handleKeypadUpdate(init === selectedInitial ? '' : init, selectedMedial, selectedFinal, selectedTone)}
                      className={`h-9 rounded-lg font-bold text-sm transition-all ${
                        selectedInitial === init
                          ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-100 text-slate-800 hover:bg-amber-100 hover:text-amber-900'
                      }`}
                    >
                      {init}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medials (介母) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">2. 介母 (Medials)</span>
                  {selectedMedial && (
                    <button
                      type="button"
                      onClick={() => handleKeypadUpdate(selectedInitial, '', selectedFinal, selectedTone)}
                      className="text-[11px] text-amber-600 hover:underline"
                    >
                      清除介母
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MEDIALS.map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => handleKeypadUpdate(selectedInitial, med === selectedMedial ? '' : med, selectedFinal, selectedTone)}
                      className={`h-9 rounded-lg font-bold text-sm transition-all ${
                        selectedMedial === med
                          ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-100 text-slate-800 hover:bg-amber-100 hover:text-amber-900'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finals (韻母) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">3. 韻母 (Finals)</span>
                  {selectedFinal && (
                    <button
                      type="button"
                      onClick={() => handleKeypadUpdate(selectedInitial, selectedMedial, '', selectedTone)}
                      className="text-[11px] text-amber-600 hover:underline"
                    >
                      清除韻母
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {FINALS.map((fin) => (
                    <button
                      key={fin}
                      type="button"
                      onClick={() => handleKeypadUpdate(selectedInitial, selectedMedial, fin === selectedFinal ? '' : fin, selectedTone)}
                      className={`h-9 rounded-lg font-bold text-sm transition-all ${
                        selectedFinal === fin
                          ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-100 text-slate-800 hover:bg-amber-100 hover:text-amber-900'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tones (聲調) */}
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">4. 聲調 (Tones)</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {TONES.map((t, i) => {
                    const label = i === 0 ? '一聲 (無)' : i === 1 ? '二聲 (ˊ)' : i === 2 ? '三聲 (ˇ)' : i === 3 ? '四聲 (ˋ)' : '輕聲 (˙)';
                    const isSelected = selectedTone === t;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleKeypadUpdate(selectedInitial, selectedMedial, selectedFinal, t)}
                        className={`h-10 rounded-lg font-bold text-xs transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                            : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-200/60'
                        }`}
                      >
                        <span className="text-sm leading-tight">{t || '—'}</span>
                        <span className="text-[10px] opacity-80">{label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Direct Input Field */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              直接輸入或修改注音字串：
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="例如：ㄆㄠˇ 或 ㄅㄨˋ"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => {
                  const def = item.zhuyin?.raw || '';
                  handleTextChange(def);
                }}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center space-x-1"
                title="還原預設"
              >
                <RefreshCw size={14} />
                <span>還原</span>
              </button>
            </div>
          </div>

          {/* Scope option: This char vs all chars */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={applyToAll}
                onChange={(e) => setApplyToAll(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-slate-300"
              />
              <span>同時將此讀音套用到全文所有「<strong className="text-amber-700">{item.char}</strong>」字</span>
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center space-x-1.5"
          >
            <Check size={16} />
            <span>套用讀音</span>
          </button>
        </div>
      </div>
    </div>
  );
};
