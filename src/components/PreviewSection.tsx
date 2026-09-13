import React from 'react';
import {
  FileText,
  BookmarkCheck,
  FileDown,
  Printer,
  RotateCw,
  Edit3,
  Trash2,
  KeyRound,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { QuestionItem } from '../types';

interface PreviewSectionProps {
  questions: QuestionItem[];
  schoolName: string;
  assessmentType: string;
  academicYear: string;
  subject: string;
  selectedClass: string;
  phase: string;
  semester: string;
  teacherName: string;
  onOpenQualityModal: () => void;
  onSaveToBank: () => void;
  onExportDocx: () => void;
  onOpenRegenModal: (index: number) => void;
  onOpenEditModal: (index: number) => void;
  onDeleteQuestion: (index: number) => void;
  onGoToGenerator: () => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  questions,
  schoolName,
  assessmentType,
  academicYear,
  subject,
  selectedClass,
  phase,
  semester,
  teacherName,
  onOpenQualityModal,
  onSaveToBank,
  onExportDocx,
  onOpenRegenModal,
  onOpenEditModal,
  onDeleteQuestion,
  onGoToGenerator,
}) => {
  const isPaiSubject =
    subject.toLowerCase().includes('agama') ||
    subject.toLowerCase().includes("qur'an") ||
    subject.toLowerCase().includes('hadis') ||
    subject.toLowerCase().includes('fikih') ||
    subject.toLowerCase().includes('akidah') ||
    subject.toLowerCase().includes('arab');

  return (
    <div className="space-y-6">
      {/* Top Action Control Strip */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            PREVIEW NASKAH ASESMEN & PEMBAHASAN
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {questions.length} Butir Soal Tergenerasi Siap Digunakan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-open-quality-audit"
            onClick={onOpenQualityModal}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 active:scale-95"
            title="Lihat Audit Kualitas & Validasi Soal"
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>ANALISIS KUALITAS SOAL</span>
          </button>

          <button
            id="btn-save-to-bank"
            onClick={onSaveToBank}
            className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 active:scale-95"
            title="Simpan Paket Soal ke Bank Soal"
          >
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
            <span>SIMPAN KE BANK SOAL</span>
          </button>

          <button
            id="btn-export-docx"
            onClick={onExportDocx}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5 active:scale-95"
            title="Unduh format Microsoft Word (DOCX)"
          >
            <FileDown className="w-4 h-4" />
            <span>UNDUH DOCX (WORD)</span>
          </button>

          <button
            id="btn-print-exam"
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5 active:scale-95"
            title="Cetak Naskah Soal atau Simpan PDF"
          >
            <Printer className="w-4 h-4" />
            <span>CETAK NASKAH</span>
          </button>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="bg-white p-16 rounded-2xl border border-slate-200 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <p className="text-base font-bold text-slate-700">Belum Ada Soal Tergenerasi</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Konfigurasikan capaian pembelajaran dan klik tombol Generate untuk membuat naskah asesmen otomatis.
            </p>
          </div>
          <button
            id="btn-go-to-config-empty"
            onClick={onGoToGenerator}
            className="bg-blue-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold shadow hover:bg-blue-700 transition-all"
          >
            Buka Formulir Konfigurasi
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Formal School Kop / Exam Paper Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">
                {schoolName || 'SMP NEGERI 1 PINTAR'}
              </h2>
              <h3 className="text-sm font-extrabold uppercase text-slate-800 mt-1 tracking-wide">
                NASKAH {assessmentType.toUpperCase()} TAHUN PELAJARAN {academicYear}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <div className="flex">
                <span className="w-32 text-slate-500">Mata Pelajaran:</span>
                <span className="text-slate-900 font-bold">{subject}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Kelas / Fase:</span>
                <span className="text-slate-900 font-bold">
                  {selectedClass} ({phase})
                </span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Semester:</span>
                <span className="text-slate-900 font-bold">{semester}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Penyusun:</span>
                <span className="text-slate-900 font-bold">{teacherName}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">PETUNJUK UMUM PENGERJAAN:</p>
              <p className="text-[11px] leading-relaxed text-slate-600">
                1. Periksa dan bacalah setiap stimulus dan butir soal dengan teliti sebelum menjawab.<br />
                2. Untuk pilihan ganda, pilihlah satu jawaban yang paling tepat pada lembar jawaban.<br />
                3. Untuk soal uraian, jawablah secara analitis, sistematis, dan jelas.
              </p>
            </div>
          </div>

          {/* Render Questions List */}
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 relative group hover:border-slate-300 transition-all"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2 no-print">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 bg-slate-900 text-white font-black rounded-lg flex items-center justify-center text-xs shadow-sm">
                      {q.number}
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
                      {q.type}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-semibold">
                      Bloom: {q.bloom}
                    </span>
                    <span className="bg-amber-50 text-amber-800 text-[11px] px-2 py-0.5 rounded font-medium border border-amber-200/60">
                      SOLO: {q.solo}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 text-[11px] px-2 py-0.5 rounded font-medium">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Actions: Regen, Edit, Delete */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onOpenRegenModal(idx)}
                      title="Regenerate Soal dengan AI"
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-xs transition-all flex items-center gap-1 font-medium"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Regenerasi</span>
                    </button>
                    <button
                      onClick={() => onOpenEditModal(idx)}
                      title="Edit Soal Manual"
                      className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg text-xs transition-all flex items-center gap-1 font-medium"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteQuestion(idx)}
                      title="Hapus Soal"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs transition-all flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Hapus</span>
                    </button>
                  </div>
                </div>

                {/* Stimulus Box if present */}
                {q.stimulus && (
                  <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600 text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                    <span className="font-bold text-blue-700 block mb-1 text-[11px] tracking-wide uppercase">
                      STIMULUS SOAL:
                    </span>
                    <div
                      className={
                        isPaiSubject && q.stimulus.includes('يٰٓاَيُّ')
                          ? 'font-arabic text-base sm:text-lg leading-loose text-slate-900'
                          : 'text-slate-800'
                      }
                    >
                      {q.stimulus}
                    </div>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  <span className="no-print font-bold mr-1">{q.number}.</span>
                  {q.question}
                </div>

                {/* Multiple Choice Options */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium hover:border-slate-300 transition-colors"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer Key & Explanation Box */}
                <div className="mt-4 p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-950 font-bold">
                    <KeyRound className="w-4 h-4 text-emerald-600" />
                    <span>KUNCI JAWABAN: {q.key}</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    <strong className="text-slate-900">Pembahasan & Rasionalisasi:</strong>{' '}
                    {q.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
