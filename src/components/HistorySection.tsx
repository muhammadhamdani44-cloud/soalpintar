import React from 'react';
import { History, RotateCcw, Clock } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  onRestoreHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onGoToGenerator: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onRestoreHistory,
  onClearHistory,
  onGoToGenerator,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              RIWAYAT GENERASI ASESMEN
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar sesi pembuatan soal yang telah dilakukan pada peramban ini
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              Bersihkan Riwayat
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <Clock className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Belum Ada Riwayat Pembuatan Soal</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Setiap kali Anda men-generate soal asesmen baru, rekaman sesi akan dicatat otomatis di sini.
            </p>
            <button
              onClick={onGoToGenerator}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Mulai Sesi Pertama
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/80 transition-colors gap-3"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{h.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {h.date} • Total {h.total} Soal • Kesulitan: {h.difficulty}
                  </p>
                </div>
                <button
                  onClick={() => onRestoreHistory(h)}
                  className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-1.5 self-end sm:self-auto shadow-xs active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Muat Kembali</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
