import React, { useState } from 'react';
import { X, Sparkles, Wand2, CheckCircle2, AlertCircle } from 'lucide-react';
import { QualityAnalysis, QuestionItem } from '../types';

interface QualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualityAnalysis: QualityAnalysis | null;
}

export const QualityModal: React.FC<QualityModalProps> = ({
  isOpen,
  onClose,
  qualityAnalysis,
}) => {
  if (!isOpen || !qualityAnalysis) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            AUDIT KUALITAS SOAL (AI PEDAGOGICAL VALIDATOR)
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
          <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
            SKOR KELAYAKAN PEDAGOGIS NASIONAL
          </span>
          <div className="text-4xl font-black text-emerald-600 my-1">
            {qualityAnalysis.score} / 100
          </div>
          <p className="text-xs text-emerald-900 font-medium">
            Paket asesmen terverifikasi memenuhi standar Taksonomi Bloom & Kurikulum Merdeka.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          {qualityAnalysis.criteria.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <span className="font-medium text-slate-700">{c.name}</span>
              <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                {c.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
        >
          Tutup Analisis
        </button>
      </div>
    </div>
  );
};

interface RegenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionIndex: number | null;
  onRegenerate: (instruction: string) => void;
}

export const RegenerateModal: React.FC<RegenerateModalProps> = ({
  isOpen,
  onClose,
  questionIndex,
  onRegenerate,
}) => {
  if (!isOpen || questionIndex === null) return null;

  const options = [
    { label: 'Tingkatkan Level Penalaran (Lebih HOTS & Analitis)', desc: 'Menjadikan soal lebih menuntut evaluasi dan sintesis kritis' },
    { label: 'Sederhanakan Bahasa & Konsep (Lebih LOTS/MOTS)', desc: 'Menyesuaikan tingkat pemahaman dasar konsep inti' },
    { label: 'Buat Lebih Kontekstual & Nyata', desc: 'Menambahkan latar masalah kehidupan sehari-hari peserta didik' },
    { label: 'Ganti Stimulus Utama dengan Konteks Baru', desc: 'Memperbarui teks narasi, studi kasus, atau teks rujukan' },
    { label: 'Perbarui Opsi Pengecoh (Distraktor Lebih Homogen)', desc: 'Memperbaiki homogenitas pilihan jawaban agar tidak bias' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-blue-600" />
            REGENERASI SOAL NOMOR {questionIndex + 1}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Pilih arah penyesuaian khusus untuk disusun ulang secara cerdas oleh AI:
        </p>

        <div className="space-y-2">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onRegenerate(opt.label)}
              className="w-full text-left p-3 bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-400 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 group-hover:text-blue-700">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>{opt.label}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 pl-5">{opt.desc}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuestionItem | null;
  onSave: (updatedQuestion: QuestionItem) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  onSave,
}) => {
  if (!isOpen || !question) return null;

  const [form, setForm] = useState<QuestionItem>({ ...question });

  const handleOptionChange = (idx: number, val: string) => {
    const updatedOptions = [...(form.options || [])];
    updatedOptions[idx] = val;
    setForm({ ...form, options: updatedOptions });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            EDIT BUTIR SOAL NO. {form.number} ({form.type})
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Stimulus / Teks Bacaan (Opsional)
            </label>
            <textarea
              rows={3}
              value={form.stimulus || ''}
              onChange={(e) => setForm({ ...form, stimulus: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Pertanyaan / Pokok Soal (Stem)
            </label>
            <textarea
              rows={3}
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {form.options && form.options.length > 0 && (
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">
                Pilihan Jawaban (Opsi A - D / Pilihan Kompleks)
              </label>
              {form.options.map((opt, oIdx) => (
                <input
                  key={oIdx}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-2 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Level Bloom
              </label>
              <input
                type="text"
                value={form.bloom}
                onChange={(e) => setForm({ ...form, bloom: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 p-2 rounded-lg text-xs font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Taksonomi SOLO
              </label>
              <input
                type="text"
                value={form.solo}
                onChange={(e) => setForm({ ...form, solo: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 p-2 rounded-lg text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Kunci Jawaban
            </label>
            <input
              type="text"
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2 rounded-lg text-xs font-bold text-emerald-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Pembahasan & Rubrik Penilaian
            </label>
            <textarea
              rows={3}
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex space-x-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => onSave(form)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Simpan Perubahan
          </button>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

interface CustomSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubject: (newSubject: string) => void;
}

export const CustomSubjectModal: React.FC<CustomSubjectModalProps> = ({
  isOpen,
  onClose,
  onAddSubject,
}) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddSubject(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
        <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
          TAMBAH MATA PELAJARAN BARU
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Mata Pelajaran
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Koding & Robotika..."
              autoFocus
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg text-xs transition-colors"
            >
              Tambahkan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
