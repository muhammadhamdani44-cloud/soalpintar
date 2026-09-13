import React from 'react';
import {
  School,
  Shapes,
  BookOpen,
  Brain,
  Upload,
  FileCheck,
  Zap,
  Sparkles,
  Loader2,
  Plus
} from 'lucide-react';
import {
  PHASE_CLASS_MAP,
  ASSESSMENT_TYPES,
  STIMULUS_OPTIONS
} from '../data/constants';
import {
  QuestionCounts,
  BloomPercentages,
  SoloLevels,
  BarrettLevels,
  LiteracyOptions
} from '../types';

interface ConfigFormProps {
  schoolName: string;
  setSchoolName: (val: string) => void;
  schoolLevel: string;
  setSchoolLevel: (val: string) => void;
  assessmentType: string;
  setAssessmentType: (val: string) => void;
  phase: string;
  setPhase: (val: string) => void;
  selectedClass: string;
  setSelectedClass: (val: string) => void;
  semester: string;
  setSemester: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  subjectsList: string[];
  setIsCustomSubjectModal: (val: boolean) => void;
  difficulty: string;
  setDifficulty: (val: string) => void;
  isTkaMode: boolean;
  setIsTkaMode: (val: boolean) => void;
  questionCounts: QuestionCounts;
  setQuestionCounts: React.Dispatch<React.SetStateAction<QuestionCounts>>;
  totalQuestions: number;
  learningMaterial: string;
  setLearningMaterial: (val: string) => void;
  uploadedFiles: Array<{ name: string; size: string }>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refPriorities: { prioritizeDoc: boolean; strictScope: boolean };
  setRefPriorities: React.Dispatch<React.SetStateAction<{ prioritizeDoc: boolean; strictScope: boolean }>>;
  stimulusType: string;
  setStimulusType: (val: string) => void;
  literacyOptions: LiteracyOptions;
  setLiteracyOptions: React.Dispatch<React.SetStateAction<LiteracyOptions>>;
  autoBloomDist: boolean;
  setAutoBloomDist: (val: boolean) => void;
  bloomPercentages: BloomPercentages;
  setBloomPercentages: React.Dispatch<React.SetStateAction<BloomPercentages>>;
  soloLevels: SoloLevels;
  setSoloLevels: React.Dispatch<React.SetStateAction<SoloLevels>>;
  barrettLevels: BarrettLevels;
  setBarrettLevels: React.Dispatch<React.SetStateAction<BarrettLevels>>;
  isGenerating: boolean;
  loadingMessage: string;
  onGenerate: (type: 'FULL' | 'BLUEPRINT') => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  schoolName,
  setSchoolName,
  schoolLevel,
  setSchoolLevel,
  assessmentType,
  setAssessmentType,
  phase,
  setPhase,
  selectedClass,
  setSelectedClass,
  semester,
  setSemester,
  subject,
  setSubject,
  subjectsList,
  setIsCustomSubjectModal,
  difficulty,
  setDifficulty,
  isTkaMode,
  setIsTkaMode,
  questionCounts,
  setQuestionCounts,
  totalQuestions,
  learningMaterial,
  setLearningMaterial,
  uploadedFiles,
  handleFileUpload,
  refPriorities,
  setRefPriorities,
  stimulusType,
  setStimulusType,
  literacyOptions,
  setLiteracyOptions,
  autoBloomDist,
  setAutoBloomDist,
  bloomPercentages,
  soloLevels,
  setSoloLevels,
  barrettLevels,
  setBarrettLevels,
  isGenerating,
  loadingMessage,
  onGenerate,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* COLUMN 1: CONFIGURATION & QUESTION COUNTS (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Exam Setup Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-2">
              <School className="w-4 h-4 text-blue-600" />
              <span>1. JENIS & JENJANG ASESMEN</span>
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
              Wajib
            </span>
          </div>

          {/* School Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Sekolah / Instansi
            </label>
            <input
              id="input-school-name"
              type="text"
              value={schoolName}
              onChange={(e) => {
                setSchoolName(e.target.value);
                localStorage.setItem('gsp_school_name', e.target.value);
              }}
              placeholder="Contoh: SMP NEGERI 1 PINTAR"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* School Level & Assessment Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenjang Sekolah
              </label>
              <select
                id="select-school-level"
                value={schoolLevel}
                onChange={(e) => {
                  const lvl = e.target.value;
                  setSchoolLevel(lvl);
                  if (lvl.includes('SD')) setPhase('Fase A');
                  else if (lvl.includes('SMP')) setPhase('Fase D');
                  else setPhase('Fase E');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="SD / MI">SD / MI</option>
                <option value="SMP / MTs">SMP / MTs</option>
                <option value="SMA / MA">SMA / MA</option>
                <option value="SMK / MAK">SMK / MAK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenis Asesmen
              </label>
              <select
                id="select-assessment-type"
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {ASSESSMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phase & Class */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fase Kurikulum
              </label>
              <select
                id="select-phase"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Object.keys(PHASE_CLASS_MAP).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kelas
              </label>
              <select
                id="select-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {(PHASE_CLASS_MAP[phase] || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Semester Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Semester
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                type="button"
                id="btn-semester-ganjil"
                onClick={() => setSemester('GANJIL')}
                className={`py-1.5 rounded-md transition-all ${
                  semester === 'GANJIL'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                GANJIL
              </button>
              <button
                type="button"
                id="btn-semester-genap"
                onClick={() => setSemester('GENAP')}
                className={`py-1.5 rounded-md transition-all ${
                  semester === 'GENAP'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                GENAP
              </button>
            </div>
          </div>

          {/* Subject with Custom Subject Option */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Mata Pelajaran
              </label>
              <button
                type="button"
                id="btn-open-custom-subject"
                onClick={() => setIsCustomSubjectModal(true)}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Tambah Mapel
              </button>
            </div>
            <select
              id="select-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Mode TKA Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <label htmlFor="checkbox-tka-mode" className="text-xs font-bold text-slate-800 cursor-pointer">
                MODE TKA (Tes Kemampuan Akademik)
              </label>
              <p className="text-[10px] text-slate-500">
                Soal berbasis penalaran tinggi, stimulus kompleks, non-hafalan.
              </p>
            </div>
            <input
              id="checkbox-tka-mode"
              type="checkbox"
              checked={isTkaMode}
              onChange={(e) => setIsTkaMode(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tingkat Kesulitan Umum
            </label>
            <select
              id="select-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Mudah (LOTS)">Mudah (LOTS)</option>
              <option value="Sedang (MOTS)">Sedang (MOTS)</option>
              <option value="Sulit (HOTS)">Sulit (HOTS)</option>
              <option value="Sangat Sulit (Tinggi)">Sangat Sulit (Tinggi)</option>
              <option value="Adaptif AI">Adaptif AI (Ditentukan otomatis)</option>
            </select>
          </div>
        </div>

        {/* Question Type Counts Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-2">
              <Shapes className="w-4 h-4 text-blue-600" />
              <span>2. BENTUK & JUMLAH SOAL</span>
            </h2>
            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              TOTAL: {totalQuestions} SOAL
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { id: 'multipleChoice', label: '1. Pilihan Ganda (PG Standard)' },
              { id: 'complexMC', label: '2. Pilihan Ganda Kompleks' },
              { id: 'complexTF', label: '3. Benar/Salah Kompleks' },
              { id: 'matching', label: '4. Menjodohkan' },
              { id: 'shortAnswer', label: '5. Isian Singkat' },
              { id: 'essay', label: '6. Uraian / Essay' },
              { id: 'longEssay', label: '7. Uraian Panjang (Studi Kasus)' },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50"
              >
                <span className="font-medium text-slate-700">{item.label}</span>
                <input
                  id={`count-${item.id}`}
                  type="number"
                  min="0"
                  max="50"
                  value={questionCounts[item.id as keyof QuestionCounts]}
                  onChange={(e) =>
                    setQuestionCounts({
                      ...questionCounts,
                      [item.id]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-16 text-center bg-slate-100 border border-slate-300 rounded-md py-1 font-bold text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLUMN 2: PEDAGOGICAL CONTENT & TAXONOMY (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>3. KONTEN & TUJUAN PEMBELAJARAN</span>
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Materi / Tujuan Pembelajaran (TP) / Indikator
            </label>
            <textarea
              id="textarea-learning-material"
              rows={4}
              value={learningMaterial}
              onChange={(e) => setLearningMaterial(e.target.value)}
              placeholder="Masukkan poin-poin materi pembelajaran, tujuan pembelajaran (TP), kompetensi dasar, atau capaian pembelajaran (CP)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium leading-relaxed focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none custom-scrollbar"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              AI mengekstrak Kata Kerja Operasional (KKO), materi esensial, dan merancang stimulus kontekstual.
            </p>
          </div>

          {/* Reference Document Upload */}
          <div className="border-t border-slate-100 pt-3">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Dokumen Referensi / Silabus (PDF / DOCX / TXT)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center bg-slate-50 hover:bg-blue-50/40 transition-all cursor-pointer relative">
              <input
                id="file-upload-ref"
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-700">
                Tarik file ke sini atau Klik untuk Unggah Rujukan
              </p>
              <p className="text-[10px] text-slate-400">PDF, DOCX, TXT hingga 10MB</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {uploadedFiles.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-blue-50/80 px-2.5 py-1.5 rounded-lg text-xs border border-blue-200"
                  >
                    <span className="truncate font-medium text-blue-900 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                      {f.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{f.size}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 space-y-1.5 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  id="chk-prioritize-doc"
                  type="checkbox"
                  checked={refPriorities.prioritizeDoc}
                  onChange={(e) =>
                    setRefPriorities({
                      ...refPriorities,
                      prioritizeDoc: e.target.checked,
                    })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700">Prioritaskan isi dokumen referensi</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  id="chk-strict-scope"
                  type="checkbox"
                  checked={refPriorities.strictScope}
                  onChange={(e) =>
                    setRefPriorities({
                      ...refPriorities,
                      strictScope: e.target.checked,
                    })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700">Hindari materi di luar lingkup TP/Dokumen</span>
              </label>
            </div>
          </div>

          {/* Stimulus & Literacy Integrations */}
          <div className="border-t border-slate-100 pt-3 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilihan Stimulus Soal
              </label>
              <select
                id="select-stimulus-type"
                value={stimulusType}
                onChange={(e) => setStimulusType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {STIMULUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Integrasi Kompetensi & Literasi
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'literacy', label: 'Soal Literasi Membaca' },
                  { id: 'numeracy', label: 'Soal Numerasi Konteks' },
                  { id: 'digitalLiteracy', label: 'Literasi Digital' },
                  { id: 'criticalThinking', label: 'Nalar Kritis' },
                  { id: 'problemSolving', label: 'Pemecahan Masalah' },
                  { id: 'contextual', label: 'Kontekstual Nyata' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all"
                  >
                    <input
                      id={`chk-${item.id}`}
                      type="checkbox"
                      checked={
                        literacyOptions[item.id as keyof LiteracyOptions]
                      }
                      onChange={(e) =>
                        setLiteracyOptions({
                          ...literacyOptions,
                          [item.id]: e.target.checked,
                        })
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 font-medium">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 3: TAXONOMIES & GENERATE ACTIONS (3 Cols) */}
      <div className="lg:col-span-3 space-y-6">
        {/* Bloom Taxonomy Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>TAKSONOMI KOGNITIF BLOOM</span>
            </h2>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Distribusi Otomatis (Fase)</span>
            <input
              id="chk-auto-bloom"
              type="checkbox"
              checked={autoBloomDist}
              onChange={(e) => setAutoBloomDist(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* Bar Chart Visualizer */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {[
              { level: 'C1', label: 'C1 Mengingat', val: bloomPercentages.C1, color: 'bg-blue-400' },
              { level: 'C2', label: 'C2 Memahami', val: bloomPercentages.C2, color: 'bg-cyan-500' },
              { level: 'C3', label: 'C3 Menerapkan', val: bloomPercentages.C3, color: 'bg-emerald-500' },
              { level: 'C4', label: 'C4 Menganalisis', val: bloomPercentages.C4, color: 'bg-amber-500' },
              { level: 'C5', label: 'C5 Mengevaluasi', val: bloomPercentages.C5, color: 'bg-orange-500' },
              { level: 'C6', label: 'C6 Mencipta', val: bloomPercentages.C6, color: 'bg-rose-500' },
            ].map((b) => (
              <div key={b.level} className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span>{b.label}</span>
                  <span>{b.val}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${b.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${b.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* SOLO Taxonomy Accordion */}
          <div className="border-t border-slate-100 pt-3">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Taksonomi SOLO
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'unistructural', label: 'Unistructural (Satu Aspek)' },
                { id: 'multistructural', label: 'Multistructural (Banyak Aspek)' },
                { id: 'relational', label: 'Relational (Keterkaitan Konsep)' },
                { id: 'extendedAbstract', label: 'Extended Abstract (Generalisasi)' },
              ].map((s) => (
                <label key={s.id} className="flex items-center space-x-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={soloLevels[s.id as keyof SoloLevels]}
                    onChange={(e) =>
                      setSoloLevels({
                        ...soloLevels,
                        [s.id]: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Barrett Taxonomy for Literacy */}
          <div className="border-t border-slate-100 pt-3">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Taksonomi Barrett (Literasi Membaca)
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'literal', label: 'Level 1 – Literal Comprehension' },
                { id: 'reorganization', label: 'Level 2 – Reorganization' },
                { id: 'inferential', label: 'Level 3 – Inferential Comprehension' },
                { id: 'evaluation', label: 'Level 4 – Evaluation' },
              ].map((b) => (
                <label key={b.id} className="flex items-center space-x-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={barrettLevels[b.id as keyof BarrettLevels]}
                    onChange={(e) =>
                      setBarrettLevels({
                        ...barrettLevels,
                        [b.id]: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{b.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Summary & Generator Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-xl space-y-4 border border-slate-700">
          <div className="border-b border-slate-700 pb-2">
            <h3 className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">
              RINGKASAN ASESMEN
            </h3>
            <p className="text-sm font-extrabold text-white truncate">{subject}</p>
            <p className="text-xs text-slate-300">
              {phase} • {selectedClass} • {assessmentType}
            </p>
          </div>

          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Total Soal:</span>{' '}
              <span className="font-bold text-white">{totalQuestions} Butir</span>
            </div>
            <div className="flex justify-between">
              <span>Tingkat Kesulitan:</span>{' '}
              <span className="font-bold text-emerald-400">{difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span>Dokumen Referensi:</span>{' '}
              <span className="font-bold text-white">{uploadedFiles.length} File</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              id="btn-generate-blueprint"
              onClick={() => onGenerate('BLUEPRINT')}
              disabled={isGenerating}
              className="w-full bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>GENERATE KISI-KISI SAJA</span>
            </button>

            <button
              type="button"
              id="btn-generate-full"
              onClick={() => onGenerate('FULL')}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs tracking-wide transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>GENERATE SOAL LENGKAP</span>
            </button>
          </div>

          {isGenerating && (
            <div className="bg-slate-800/95 p-3 rounded-xl border border-blue-500/30 text-center space-y-2 animate-pulse">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin mx-auto" />
              <p className="text-xs font-medium text-blue-200">{loadingMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
