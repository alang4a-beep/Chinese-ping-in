import React, { useState, useMemo, useEffect } from 'react';
import { DirectionMode, DocumentSettings, CharItem } from './types';
import { tokenizeText } from './data/charDatabase';
import { BopomofoViewer } from './components/BopomofoViewer';
import { ControlToolbar } from './components/ControlToolbar';
import { ZhuyinEditorModal } from './components/ZhuyinEditorModal';
import { PrintWorksheetModal } from './components/PrintWorksheetModal';
import {
  Sparkles,
  Edit,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Share2,
  Check,
  AlignVerticalJustifyStart,
  AlignHorizontalJustifyStart,
  FileText,
  Volume2
} from 'lucide-react';

const DEFAULT_TEXT = '';

export default function App() {
  const [inputText, setInputText] = useState<string>(DEFAULT_TEXT);
  const [customOverrides, setCustomOverrides] = useState<Record<string, string>>({});
  const [editingItem, setEditingItem] = useState<CharItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Layout & Styling Settings
  const [settings, setSettings] = useState<DocumentSettings>({
    direction: 'vertical-rl', // Standard classical / image layout requested
    fontSize: 56,             // Optimal readable size matching user image
    zhuyinRatio: 0.38,
    charSpacing: 6,
    lineSpacing: 18,
    fontStyle: 'kaiti',       // Education Ministry Kaiti font style
    gridStyle: 'none',
    gridColor: '#fca5a5',
    theme: 'mint',            // Matches the mint green in user image IMG_1337.jpeg
    showTone: true,
    showZhuyin: true,
    traceableMode: false
  });

  // Tokenize text whenever input or overrides change
  const charItems = useMemo(() => {
    return tokenizeText(inputText, customOverrides);
  }, [inputText, customOverrides]);

  const updateSettings = (newSettings: Partial<DocumentSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Open editor on character click
  const handleCharClick = (item: CharItem) => {
    if (!item.isChinese) return;
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  // Save modified Zhuyin
  const handleSaveZhuyin = (
    charId: string,
    char: string,
    newZhuyin: string,
    applyToAll: boolean
  ) => {
    setCustomOverrides((prev) => {
      const next = { ...prev };
      if (applyToAll) {
        // Apply this pronunciation to all identical characters
        charItems.forEach((it) => {
          if (it.char === char) {
            next[it.id] = newZhuyin;
          }
        });
      } else {
        // Apply strictly to this individual character occurrence
        next[charId] = newZhuyin;
      }
      return next;
    });
  };

  // Reset all custom overrides
  const handleResetOverrides = () => {
    setCustomOverrides({});
  };

  // Text to speech
  const handleSpeakAll = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的瀏覽器不支援語音朗讀功能');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = charItems.map((i) => i.char).join('');
    if (!cleanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.88;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Copy plain text with Zhuyin representation
  const handleCopyFormattedText = () => {
    const formatted = charItems
      .map((it) => {
        if (it.isNewline) return '\n';
        if (it.zhuyin) return `${it.char}(${it.zhuyin.raw})`;
        return it.char;
      })
      .join('');

    navigator.clipboard.writeText(formatted);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-amber-200">
      {/* Top Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-amber-500/20">
              注
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-slate-900 text-lg leading-tight">
                  國字注音垂直排版產生器
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded-full">
                  破音字自訂
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                精準垂直旁注排版 • 直排/橫排自由切換 • 多音字獨立標音
              </p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopyFormattedText}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="複製包含注音的標注文本"
            >
              {copiedNotification ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-700">已複製！</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>複製注音文字</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsWorksheetOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm shadow-amber-600/20 transition-all"
            >
              <FileText size={14} />
              <span>習字帖 / 列印</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Section: Text Input & Fast Stats */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Edit size={16} className="text-amber-600" />
              <span>輸入欲排版的國字或文章：</span>
            </label>
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span>總字數：<strong className="text-slate-900 font-mono">{charItems.length}</strong></span>
              <span>國字：<strong className="text-amber-700 font-mono">{charItems.filter(i => i.isChinese).length}</strong></span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Check size={12} className="text-emerald-600" />
                <span>全字詞庫自動標音 (100%)</span>
              </span>
              {Object.keys(customOverrides).length > 0 && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-200 font-medium">
                  已自訂 {Object.keys(customOverrides).length} 處讀音
                </span>
              )}
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="請在此輸入任何中文國字（支援段落換行、多音字、標點符號）..."
            rows={3}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-sans leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <p className="flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" />
              <span>提示：在下方預覽區直接<strong>點擊任何國字</strong>，即可快速切換破音字或自訂任意注音讀音。</span>
            </p>
            {inputText && (
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setCustomOverrides({});
                }}
                className="text-slate-400 hover:text-rose-600 transition-colors"
              >
                清空文字
              </button>
            )}
          </div>
        </div>

        {/* Visual Document Viewer Area (排版成果展示) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">排版成果展示</span>
              <span className="text-xs text-slate-500">
                ({settings.direction === 'vertical-rl' ? '由上到下，由右至左換行' : '由左至右，向下換行'})
              </span>
            </div>
            <span className="text-xs text-slate-400">
              注音與聲調均排列在國字旁邊
            </span>
          </div>

          <BopomofoViewer
            items={charItems}
            settings={settings}
            selectedCharId={editingItem?.id || null}
            onCharClick={handleCharClick}
            onCharContextMenu={(_e, item) => handleCharClick(item)}
          />
        </div>

        {/* Toolbar Controls (排版方向等設定 - 位於成果展示下方) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              排版設定與字體工具
            </span>
            <span className="text-xs text-slate-400">
              即時調整方向、字體、格線與紙張
            </span>
          </div>
          <ControlToolbar
            settings={settings}
            onUpdateSettings={updateSettings}
            onSpeakAll={handleSpeakAll}
            isSpeaking={isSpeaking}
            onOpenWorksheetModal={() => setIsWorksheetOpen(true)}
            onResetOverrides={handleResetOverrides}
            hasCustomOverrides={Object.keys(customOverrides).length > 0}
            onSelectSample={(text) => {
              setInputText(text);
              setCustomOverrides({});
            }}
          />
        </div>

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>直排與橫排雙模式</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              直排模式遵循傳統由右至左換行、由上至下閱讀；橫排模式則為現代由左至右換行。兩者均將注音垂直標注於國字右側。
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>獨立讀音與破音字</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              文章中出現相同的字（如「看著」與「著名」的「著」）可個別獨立指定讀音，互不干擾，精準配合語境。
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>教育部標準標音規範</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              二聲(ˊ)、三聲(ˇ)、四聲(ˋ)排於注音右側；輕聲(˙)排於注音上方；一聲不標調號，完全符合國小國語教學規範。
            </p>
          </div>
        </div>
      </main>

      {/* Zhuyin Editor Popover/Modal */}
      <ZhuyinEditorModal
        item={editingItem}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveZhuyin}
      />

      {/* Printable Worksheet / PDF Modal */}
      <PrintWorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        items={charItems}
        settings={settings}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-12 text-center text-xs text-slate-500">
        國字注音垂直排版系統 • 支援直排與橫排教育部注音規範
      </footer>
    </div>
  );
}
