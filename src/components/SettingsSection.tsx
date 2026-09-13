import React from 'react';
import { Settings, Save, Check } from 'lucide-react';

interface SettingsSectionProps {
  schoolName: string;
  setSchoolName: (val: string) => void;
  teacherName: string;
  setTeacherName: (val: string) => void;
  academicYear: string;
  setAcademicYear: (val: string) => void;
  onSaveToast: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  schoolName,
  setSchoolName,
  teacherName,
  setTeacherName,
  academicYear,
  setAcademicYear,
  onSaveToast,
}) => {
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    localStorage.setItem('gsp_school_name', schoolName);
    localStorage.setItem('gsp_teacher_name', teacherName);
    localStorage.setItem('gsp_academic_year', academicYear);
    setSaved(true);
    onSaveToast();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              PENGATURAN KOP DAN IDENTITAS ASESMEN
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identitas default yang akan selalu tercetak pada KOP naskah asesmen dan dokumen ekspor
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama Sekolah / Madrasah / Instansi Default
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Contoh: SMP NEGERI 1 PINTAR"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Guru / Penyusun Soal
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Contoh: Muhammad Amril Khamdani, S.Pd."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tahun Pelajaran
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Contoh: 2026/2027"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-2">
          <span>Generator Soal Pintar • Edisi Kurikulum Merdeka</span>
          <span>
            Created by <strong className="text-slate-700">Muhammad Amril Khamdani</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
