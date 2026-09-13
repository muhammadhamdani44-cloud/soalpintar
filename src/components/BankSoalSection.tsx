import React from 'react';
import { BookMarked, Trash2, FolderOpen, Calendar, HelpCircle } from 'lucide-react';
import { BankSoalItem } from '../types';

interface BankSoalSectionProps {
  bankSoal: BankSoalItem[];
  onOpenBankItem: (item: BankSoalItem) => void;
  onDeleteBankItem: (id: string) => void;
  onGoToGenerator: () => void;
}

export const BankSoalSection: React.FC<BankSoalSectionProps> = ({
  bankSoal,
  onOpenBankItem,
  onDeleteBankItem,
  onGoToGenerator,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-blue-600" />
              BANK SOAL TERSIMPAN
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Koleksi paket asesmen terverifikasi dan siap pakai
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
            {bankSoal.length} Paket
          </span>
        </div>

        {bankSoal.length === 0 ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Bank Soal Masih Kosong</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Setelah menghasilkan paket soal di tab Preview, klik "Simpan ke Bank Soal" untuk menyimpan naskah secara lokal.
            </p>
            <button
              onClick={onGoToGenerator}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Buat Paket Soal Baru
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankSoal.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-white transition-all space-y-3 shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                    {item.phase} • {item.class}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] text-slate-600 mt-0.5">{item.subject}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{item.total} Butir Soal Lengkap</p>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onOpenBankItem(item)}
                    className="flex-1 bg-blue-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Buka Paket</span>
                  </button>
                  <button
                    onClick={() => onDeleteBankItem(item.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs transition-colors"
                    title="Hapus dari Bank Soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
