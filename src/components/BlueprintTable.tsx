import React from 'react';
import { TableProperties, Printer, ArrowRight } from 'lucide-react';
import { BlueprintItem } from '../types';

interface BlueprintTableProps {
  blueprint: BlueprintItem[];
  subject: string;
  selectedClass: string;
  phase: string;
  onGoToGenerator: () => void;
  onGoToPreview: () => void;
}

export const BlueprintTable: React.FC<BlueprintTableProps> = ({
  blueprint,
  subject,
  selectedClass,
  phase,
  onGoToGenerator,
  onGoToPreview,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TableProperties className="w-5 h-5 text-blue-600" />
              BLUEPRINT & KISI-KISI ASESMEN KURIKULUM MERDEKA
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mata Pelajaran: <span className="font-semibold text-slate-700">{subject}</span> • Kelas/Fase: {selectedClass} ({phase})
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              id="btn-print-blueprint"
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Blueprint</span>
            </button>
            {blueprint.length > 0 && (
              <button
                id="btn-jump-to-preview"
                onClick={onGoToPreview}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <span>Lihat Soal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {blueprint.length === 0 ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <TableProperties className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-medium text-slate-600">
              Belum ada kisi-kisi yang dibuat.
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Silakan atur parameter dan klik tombol "Generate Kisi-Kisi Saja" atau "Generate Soal Lengkap" di tab Konfigurasi.
            </p>
            <button
              onClick={onGoToGenerator}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Buka Konfigurasi
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Materi Pokok / Konten</th>
                  <th className="p-3">Tujuan Pembelajaran (TP)</th>
                  <th className="p-3">Indikator Soal</th>
                  <th className="p-3 text-center">Level Bloom</th>
                  <th className="p-3 text-center">SOLO</th>
                  <th className="p-3 text-center">Barrett</th>
                  <th className="p-3 text-center">Bentuk Soal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {blueprint.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-center font-bold text-slate-600">{row.no}</td>
                    <td className="p-3 font-medium text-slate-800 max-w-xs">{row.materi}</td>
                    <td className="p-3 text-slate-600 max-w-sm">{row.tp}</td>
                    <td className="p-3 text-slate-700 max-w-sm">{row.indicator}</td>
                    <td className="p-3 text-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                        {row.bloom}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                        {row.solo}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                        {row.barrett}
                      </span>
                    </td>
                    <td className="p-3 text-center font-medium whitespace-nowrap">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
