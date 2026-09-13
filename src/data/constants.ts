import { QuestionCounts, QuestionItem } from '../types';

export const PHASE_CLASS_MAP: Record<string, string[]> = {
  'Fase A': ['Kelas 1', 'Kelas 2'],
  'Fase B': ['Kelas 3', 'Kelas 4'],
  'Fase C': ['Kelas 5', 'Kelas 6'],
  'Fase D': ['Kelas 7', 'Kelas 8', 'Kelas 9'],
  'Fase E': ['Kelas 10'],
  'Fase F': ['Kelas 11', 'Kelas 12']
};

export const INITIAL_SUBJECTS = [
  "Pendidikan Agama Islam dan Budi Pekerti",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Bahasa Jawa",
  "Matematika",
  "Ilmu Pengetahuan Alam (IPA)",
  "Ilmu Pengetahuan Sosial (IPS)",
  "Informatika",
  "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
  "Seni dan Prakarya / Seni Budaya",
  "Aswaja / Ke-NU-an",
  "Bahasa Arab",
  "Fikih",
  "Al-Qur'an Hadis",
  "Akidah Akhlak",
  "Sejarah Kebudayaan Islam (SKI)",
  "Koding & Kecerdasan Artifisial (AI)"
];

export const ASSESSMENT_TYPES = [
  "Ulangan Harian",
  "Asesmen Formatif",
  "Asesmen Sumatif Lingkup Materi",
  "Asesmen Sumatif Tengah Semester (ASTS)",
  "Asesmen Sumatif Akhir Semester (ASAS)",
  "Ujian Sekolah (US)",
  "Try Out Asesmen Standar",
  "Tes Kemampuan Akademik (TKA)",
  "Asesmen Awal / Diagnostik Kognitif",
  "Asesmen Literasi Membaca",
  "Asesmen Numerasi Kontekstual"
];

export const STIMULUS_OPTIONS = [
  "Otomatis oleh AI (Pilihan Terbaik)",
  "Teks naratif kontekstual",
  "Artikel / Berita ilmiah populer",
  "Dialog / Percakapan studi kasus",
  "Tabel & Data kuantitatif",
  "Grafik / Diagram alur",
  "Infografis / Visual data",
  "Ayat Suci Al-Qur'an (Arab + Terjemah)",
  "Hadis Nabawi dengan Sanad/Rawi",
  "Studi kasus dilema etika & sosial",
  "Tanpa stimulus (Langsung pertanyaan)"
];

export function getAutoBloomDistribution(phase: string) {
  if (phase === 'Fase A' || phase === 'Fase B') {
    return { C1: 30, C2: 40, C3: 20, C4: 10, C5: 0, C6: 0 };
  } else if (phase === 'Fase C') {
    return { C1: 20, C2: 30, C3: 30, C4: 15, C5: 5, C6: 0 };
  } else if (phase === 'Fase D') {
    return { C1: 10, C2: 20, C3: 30, C4: 25, C5: 10, C6: 5 };
  } else {
    // Fase E & F
    return { C1: 5, C2: 15, C3: 25, C4: 30, C5: 15, C6: 10 };
  }
}

interface GenerateFallbackParams {
  subject: string;
  phase: string;
  selectedClass: string;
  learningMaterial: string;
  questionCounts: QuestionCounts;
  isTkaMode: boolean;
  difficulty: string;
}

export function generateSmartPedagogicalQuestions(params: GenerateFallbackParams): QuestionItem[] {
  const { subject, selectedClass, learningMaterial, questionCounts, isTkaMode, difficulty } = params;
  const isPai = subject.toLowerCase().includes('agama') || 
                subject.toLowerCase().includes('qur\'an') || 
                subject.toLowerCase().includes('fikih') || 
                subject.toLowerCase().includes('akidah') ||
                subject.toLowerCase().includes('aswaja') ||
                subject.toLowerCase().includes('arab');

  const qList: QuestionItem[] = [];
  let currentNo = 1;

  const addTypes = (count: number, typeName: string) => {
    for (let i = 0; i < count; i++) {
      const isEven = currentNo % 2 === 0;
      const bloomLevel = isEven ? "C4 - Menganalisis" : "C3 - Menerapkan";

      const qObj: QuestionItem = {
        number: currentNo,
        type: typeName,
        material: learningMaterial.length > 75 ? learningMaterial.substring(0, 75) + "..." : learningMaterial,
        tp: "Peserta didik dapat memahami konsep mendalam dan menganalisis implikasi penerapannya dalam kehidupan nyata.",
        indicator: `Disajikan konteks faktual ${subject}, peserta didik mampu menelaah dan memecahkan permasalahan dengan nalar kritis.`,
        bloom: bloomLevel,
        solo: isEven ? "Relational (Keterkaitan)" : "Multistructural (Multi-komponen)",
        barrett: isEven ? "Inferential (Inferensi)" : "Reorganization (Pengorganisasian)",
        difficulty: isTkaMode ? "HOTS (Penalaran Tinggi)" : difficulty,
        question: "",
        key: "",
        explanation: "",
      };

      if (isPai) {
        qObj.stimulus = `Perhatikan firman Allah Swt. dalam Q.S. Al-Mujadilah [58] ayat 11 berikut ini:\n\nيٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْٓا اِذَا قِيْلَ لَكُمْ تَفَسَّحُوْا فِى الْمَجٰلِسِ فَافْسَحُوْا يَفْسَحِ اللّٰهُ لَكُمْۚ وَاِذَا قِيْلَ انْشُزُوْا فَانْشُزُوْا يَرْفَعِ اللّٰهُ الَّذِيْنَ اٰمَنُوْا مِنْكُمْۙ وَالَّذِيْنَ اُوْتُوا الْعِلْمَ دَرَجٰتٍۗ وَاللّٰهُ بِمَا تَعْمَلُوْنَ خَبِيْرٌ\n\n"Wahai orang-orang yang beriman! Apabila dikatakan kepadamu, 'Berilah kelapangan di dalam majelis-majelis,' maka lapangkanlah, niscaya Allah akan memberi kelapangan untukmu. Dan apabila dikatakan, 'Berdirilah kamu,' maka berdirilah, niscaya Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat. Dan Allah Mahateliti apa yang kamu kerjakan." (Kemenag RI)`;
      } else {
        qObj.stimulus = `Dalam konteks penerapan materi ${subject} di ${selectedClass}, sebuah survei di lingkungan sekolah mengidentifikasi pentingnya literasi kritis dan analisis data autentik. Keterampilan membedakan antara fakta objektif dengan asumsi tak terverifikasi menjadi penentu efektivitas penyelesaian masalah di era digital saat ini.`;
      }

      if (typeName === 'Pilihan Ganda') {
        qObj.question = isPai
          ? "Berdasarkan pemahaman mendalam terhadap Q.S. Al-Mujadilah ayat 11 di atas, perilaku peserta didik yang paling tepat dalam mencerminkan korelasi antara keimanan dan keilmuan di lingkungan sekolah adalah..."
          : isTkaMode
          ? `Berdasarkan analisis situasi dan data pada stimulus ${subject} di atas, simpulan kausalitas yang paling valid dan logis adalah...`
          : `Berdasarkan uraian stimulus pembelajaran di atas, langkah strategis yang paling tepat untuk memecahkan persoalan tersebut adalah...`;
        
        qObj.options = isPai ? [
          "A. Menghormati sesama pencari ilmu, senantiasa membuka ruang diskusi yang sehat, dan berakhlak mulia",
          "B. Mengutamakan perolehan nilai akademis tinggi meskipun mengabaikan etika dan kejujuran",
          "C. Membatasi pergaulan hanya dengan teman yang memiliki pemahaman dan status keilmuan yang sama",
          "D. Mengkritik pendapat orang lain di majelis tanpa memeriksa validitas dalil dan argumentasi"
        ] : [
          "A. Melakukan verifikasi data secara komprehensif sebelum mengambil keputusan dan bertindak rasional",
          "B. Mengabaikan data pembanding dan langsung menerapkan solusi berdasarkan kebiasaan lama",
          "C. Menyerahkan keputusan sepenuhnya kepada pihak lain tanpa mengkaji dampaknya bagi komunitas",
          "D. Menyebarkan informasi secara langsung untuk melihat reaksi publik tanpa validasi"
        ];
        qObj.key = "A";
        qObj.explanation = "Opsi A tepat karena mencerminkan penalaran kognitif tingkat tinggi (analisis & sintesis), di mana prinsip keilmuan diintegrasikan secara harmonis dengan etika serta indikator capaian pembelajaran.";
      } 
      else if (typeName === 'Pilihan Ganda Kompleks') {
        qObj.question = "Tentukan pernyataan-pernyataan berikut yang bernilai BENAR (Pilihan dapat lebih dari satu)!";
        qObj.options = isPai ? [
          "1. Derajat kemuliaan manusia berbanding lurus dengan perpaduan antara iman dan ilmu pengetahuan [BENAR]",
          "2. Memberi kelapangan majelis hanya terbatas pada tempat duduk fisik saat beribadah ritual semata [SALAH]",
          "3. Menuntut ilmu merupakan ikhtiar berkelanjutan yang wajib diwujudkan dalam kemaslahatan sosial [BENAR]",
          "4. Keilmuan tanpa pondasi iman tetap menjamin keselamatan spiritual di akhirat kelak [SALAH]"
        ] : [
          "1. Keputusan berbasis bukti empiris menghasilkan efektivitas pemecahan masalah yang berkelanjutan [BENAR]",
          "2. Asumsi subjektif lebih dapat diandalkan daripada data terverifikasi dalam skala kelompok [SALAH]",
          "3. Keterampilan bernalar kritis meminimalkan bias konfirmasi dalam penarikan kesimpulan [BENAR]",
          "4. Efisiensi proses selalu lebih penting daripada akurasi hasil analisis data [SALAH]"
        ];
        qObj.key = "Pernyataan 1 dan 3";
        qObj.explanation = "Pernyataan 1 dan 3 benar karena didukung secara metodologis dan konseptual oleh indikator materi yang tertera pada Capaian Pembelajaran.";
      }
      else if (typeName === 'Benar/Salah Kompleks') {
        qObj.question = "Bacalah pernyataan di bawah ini, lalu tentukan status kebenarannya (BENAR atau SALAH) berdasarkan stimulus yang disajikan!";
        qObj.options = isPai ? [
          "Pernyataan I: Peninggian derajat manusia dalam pandangan Allah Swt. diperoleh melalui sinergi antara iman dan ilmu. [BENAR]",
          "Pernyataan II: Kelapangan hati dalam majelis ilmu tidak berkaitan dengan kesuksesan belajar bersama. [SALAH]"
        ] : [
          "Pernyataan I: Keterampilan literasi tingkat lanjut mencakup kemampuan mengevaluasi kredibilitas sumber informasi. [BENAR]",
          "Pernyataan II: Banyaknya data otomatis menjamin validitas keputusan tanpa memerlukan proses verifikasi. [SALAH]"
        ];
        qObj.key = "Pernyataan I: BENAR | Pernyataan II: SALAH";
        qObj.explanation = "Pernyataan I sesuai dengan rujukan dasar keilmuan, sementara Pernyataan II menyajikan kekeliruan logika yang harus diidentifikasi peserta didik.";
      }
      else if (typeName === 'Menjodohkan') {
        qObj.question = "Jodohkanlah premis konsep pada Kolom Kiri dengan pasangan definisi/dampak yang tepat pada Kolom Kanan!";
        qObj.options = isPai ? [
          "Kolom A (1): Perintah berlapang-lapang dalam majelis  <--->  Kolom B (X): Menciptakan ruang belajar inklusif dan penuh empati",
          "Kolom A (2): Pengangkatan derajat oleh Allah Swt.    <--->  Kolom B (Y): Buah dari perpaduan takwa, ilmu, dan amal kebajikan"
        ] : [
          "Kolom A (1): Berpikir Komputasional / Analitis        <--->  Kolom B (X): Dekomposisi masalah menjadi bagian-bagian terkelola",
          "Kolom A (2): Validasi Kontekstual                    <--->  Kolom B (Y): Penyesuaian solusi dengan kondisi empiris lingkungan"
        ];
        qObj.key = "1 berpasangan dengan X; 2 berpasangan dengan Y";
        qObj.explanation = "Hubungan antarkonsep dirumuskan untuk menguji kemampuan asosiasi dan korelasi logis peserta didik.";
      }
      else if (typeName === 'Isian Singkat') {
        qObj.question = isPai
          ? "Sebutkan dua pilar utama yang menjadi syarat seseorang diangkat derajatnya menurut kandungan Q.S. Al-Mujadilah ayat 11!"
          : `Sebutkan istilah untuk proses pengujian kembali kebenaran suatu data atau fakta sebelum ditarik simpulan dalam pembelajaran ${subject}!`;
        qObj.options = [];
        qObj.key = isPai ? "Iman dan Ilmu pengetahuan (atau orang yang beriman dan orang yang berilmu)" : "Verifikasi / Validasi data";
        qObj.explanation = "Jawaban ini merupakan kata kunci inti (core keyword) yang menjadi fondasi kompetensi pembelajaran.";
      }
      else {
        // Uraian / Studi Kasus
        qObj.question = isPai
          ? "Jelaskan secara analitis bagaimana peserta didik zaman sekarang dapat mempraktikkan etika bermajelis dan mencari ilmu di era digital (misalnya dalam forum daring atau grup kelas), serta kemukakan 2 contoh nyata hambatannya beserta solusinya!"
          : `Analisislah sebuah skenario permasalahan nyata terkait materi ${subject} di lingkungan sekolah Anda! Rumuskan 3 (tiga) tahapan sistematis pemecahan masalah disertai argumen logis mengapa tahapan tersebut efektif!`;
        qObj.options = [];
        qObj.key = "Rubrik Penilaian Uraian Holistik (Skor Maksimal: 100):\n- Skor 85-100 (Sangat Mahir): Analisis sangat mendalam, mengaitkan konsep teoritis dengan realitas kontekstual, solusi inovatif dan aplikatif.\n- Skor 70-84 (Cakap): Analisis tepat, contoh relevan, argumen logis terstruktur.\n- Skor 50-69 (Dasar): Menyebutkan konsep namun belum disertai uraian hubungan kausalitas yang kuat.\n- Skor <50 (Perlu Bimbingan): Uraian belum menjawab esensi instruksi soal.";
        qObj.explanation = "Soal uraian ini mengukur keterampilan berpikir tingkat tinggi (Higher Order Thinking Skills - HOTS) pada level Bloom C4-C6 dan taksonomi SOLO Extended Abstract.";
      }

      qList.push(qObj);
      currentNo++;
    }
  };

  addTypes(questionCounts.multipleChoice, 'Pilihan Ganda');
  addTypes(questionCounts.complexMC, 'Pilihan Ganda Kompleks');
  addTypes(questionCounts.complexTF, 'Benar/Salah Kompleks');
  addTypes(questionCounts.matching, 'Menjodohkan');
  addTypes(questionCounts.shortAnswer, 'Isian Singkat');
  addTypes(questionCounts.essay + questionCounts.longEssay, 'Uraian');

  return qList;
}
