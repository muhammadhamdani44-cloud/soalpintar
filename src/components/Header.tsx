import React from 'react';
import { 
  Sparkles, 
  PlusCircle, 
  History, 
  Settings, 
  Sliders, 
  TableProperties, 
  FileText, 
  BookMarked 
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  apiStatus: string;
  blueprintCount: number;
  questionCount: number;
  bankCount: number;
  onNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  apiStatus,
  blueprintCount,
  questionCount,
  bankCount,
  onNewProject,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-xl shadow-md border border-blue-400/30 text-white">
            SP
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Generator Soal Pintar
              </h1>
              <span className="bg-blue-900/90 text-blue-300 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border border-blue-700/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                v3.5 AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
              Platform Asesmen Pembelajaran Berbasis AI • Kurikulum Merdeka
            </p>
          </div>
        </div>

        {/* Status & Author info */}
        <div className="hidden lg:flex items-center space-x-5">
          <div className="flex items-center space-x-2 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wider">
              {apiStatus}
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Penyusun: <span className="text-blue-400 font-medium">Muhammad Amril Khamdani</span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            id="btn-new-project"
            onClick={onNewProject}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
            title="Mulai Proyek Baru"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Proyek Baru</span>
          </button>
          <button
            id="btn-nav-history"
            onClick={() => setActiveTab('history')}
            className={`text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 border ${
              activeTab === 'history'
                ? 'bg-slate-800 text-white border-slate-600'
                : 'text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Riwayat Asesmen"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Riwayat</span>
          </button>
          <button
            id="btn-nav-settings"
            onClick={() => setActiveTab('settings')}
            className={`text-xs font-medium p-2 rounded-lg transition-all border ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-white border-slate-600'
                : 'text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Pengaturan Aplikasi"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex space-x-1 overflow-x-auto custom-scrollbar text-xs font-medium">
          <button
            id="tab-generator"
            onClick={() => setActiveTab('generator')}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'generator'
                ? 'border-blue-500 text-blue-400 font-semibold bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>1. Konfigurasi & Input</span>
          </button>

          <button
            id="tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'blueprint'
                ? 'border-blue-500 text-blue-400 font-semibold bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>2. Kisi-Kisi / Blueprint ({blueprintCount})</span>
          </button>

          <button
            id="tab-preview"
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'preview'
                ? 'border-blue-500 text-blue-400 font-semibold bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Preview Soal & Output ({questionCount})</span>
          </button>

          <button
            id="tab-bank"
            onClick={() => setActiveTab('bank')}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'bank'
                ? 'border-blue-500 text-blue-400 font-semibold bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>4. Bank Soal ({bankCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
