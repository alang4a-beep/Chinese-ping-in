import React from 'react';
import { DirectionMode, DocumentSettings, FontStyle, GridStyle, ThemeStyle } from '../types';
import {
  AlignVerticalJustifyStart,
  AlignHorizontalJustifyStart,
  Type,
  Grid,
  Palette,
  Sliders,
  Volume2,
  Printer,
  Edit3,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ControlToolbarProps {
  settings: DocumentSettings;
  onUpdateSettings: (newSettings: Partial<DocumentSettings>) => void;
  onSpeakAll: () => void;
  isSpeaking: boolean;
  onOpenWorksheetModal: () => void;
  onResetOverrides: () => void;
  hasCustomOverrides: boolean;
  onSelectSample: (text: string) => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  settings,
  onUpdateSettings,
  onSpeakAll,
  isSpeaking,
  onOpenWorksheetModal,
  onResetOverrides,
  hasCustomOverrides,
  onSelectSample
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
      {/* Top Primary Controls: Direction & Main Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        {/* Direction Switcher (Main Requirement) */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            排版方向：
          </span>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onUpdateSettings({ direction: 'vertical-rl' })}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                settings.direction === 'vertical-rl'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="由上到下，由右至左換行（傳統中文標準直排）"
            >
              <AlignVerticalJustifyStart size={15} />
              <span>由上到下 (直排)</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateSettings({ direction: 'horizontal-tb' })}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                settings.direction === 'horizontal-tb'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="由左至右，向下換行（橫向排列）"
            >
              <AlignHorizontalJustifyStart size={15} />
              <span>由左至右 (橫排)</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Speak, Worksheet, Reset */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Read Aloud */}
          <button
            type="button"
            onClick={onSpeakAll}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Volume2 size={15} />
            <span>{isSpeaking ? '停止朗讀' : '全文朗讀'}</span>
          </button>

          {/* Worksheet / Print Mode */}
          <button
            type="button"
            onClick={onOpenWorksheetModal}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Printer size={15} />
            <span>生字本列印</span>
          </button>

          {/* Reset Overrides */}
          {hasCustomOverrides && (
            <button
              type="button"
              onClick={onResetOverrides}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-amber-700 hover:bg-amber-50 border border-amber-200 transition-colors"
              title="清除所有自訂讀音，還原為字典預設"
            >
              <RotateCcw size={13} />
              <span>還原讀音</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls: Font, Grid, Theme, Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* 1. Font Style */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 flex items-center space-x-1">
            <Type size={14} className="text-amber-600" />
            <span>字體風格</span>
          </label>
          <select
            value={settings.fontStyle}
            onChange={(e) => onUpdateSettings({ fontStyle: e.target.value as FontStyle })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="kaiti">教育部標準楷書 (標楷體)</option>
            <option value="serif">經典宋體 / 明體 (Serif)</option>
            <option value="sans">現代黑體 (Sans-Serif)</option>
            <option value="rounded">圓體 (可愛圓潤)</option>
          </select>
        </div>

        {/* 2. Grid Style */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 flex items-center space-x-1">
            <Grid size={14} className="text-amber-600" />
            <span>練字格線</span>
          </label>
          <select
            value={settings.gridStyle}
            onChange={(e) => onUpdateSettings({ gridStyle: e.target.value as GridStyle })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="none">無格線 (純閱讀)</option>
            <option value="tian">田字格 (十字虛線)</option>
            <option value="mi">米字格 (八方虛線)</option>
            <option value="box">方格 (口字框)</option>
            <option value="line">底線</option>
          </select>
        </div>

        {/* 3. Theme Color */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 flex items-center space-x-1">
            <Palette size={14} className="text-amber-600" />
            <span>畫布紙張主題</span>
          </label>
          <select
            value={settings.theme}
            onChange={(e) => onUpdateSettings({ theme: e.target.value as ThemeStyle })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="mint">🌿 經典粉青 (原圖配色)</option>
            <option value="paper">📜 古風宣紙米黃</option>
            <option value="white">⚪ 簡約白紙</option>
            <option value="chalkboard">🏫 黑板教學綠</option>
            <option value="slate">🌌 深邃夜空</option>
          </select>
        </div>

        {/* 4. Font Size Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-700 flex items-center space-x-1">
              <Sliders size={14} className="text-amber-600" />
              <span>文字大小</span>
            </label>
            <span className="text-[11px] font-mono font-bold text-amber-700">{settings.fontSize}px</span>
          </div>
          <input
            type="range"
            min="24"
            max="96"
            step="4"
            value={settings.fontSize}
            onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Advanced Toggles & Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        {/* Fast Checkboxes */}
        <div className="flex items-center flex-wrap gap-4 text-xs">
          <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={settings.showZhuyin}
              onChange={(e) => onUpdateSettings({ showZhuyin: e.target.checked })}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 border-slate-300"
            />
            <span>顯示注音</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={settings.showTone}
              onChange={(e) => onUpdateSettings({ showTone: e.target.checked })}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 border-slate-300"
            />
            <span>顯示聲調</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={settings.traceableMode}
              onChange={(e) => onUpdateSettings({ traceableMode: e.target.checked })}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 border-slate-300"
            />
            <span>描紅臨摹 (字跡淡化)</span>
          </label>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <BookOpen size={13} />
            範例文字：
          </span>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => onSelectSample('跑步\n健康')}
              className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded text-[11px] font-medium transition-colors"
            >
              🏃 跑步
            </button>
            <button
              type="button"
              onClick={() => onSelectSample('床前明月光，\n疑是地上霜。\n舉頭望明月，\n低頭思故鄉。')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
            >
              🌙 靜夜思
            </button>
            <button
              type="button"
              onClick={() => onSelectSample('白日依山盡，\n黃河入海流。\n欲窮千里目，\n更上一層樓。')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
            >
              🦅 登鸛雀樓
            </button>
            <button
              type="button"
              onClick={() => onSelectSample('小明高興地到銀行開會，\n聽著快樂的音樂，\n跑得快又走得穩。')}
              className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[11px] font-medium transition-colors"
            >
              ✨ 破音字篇
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
