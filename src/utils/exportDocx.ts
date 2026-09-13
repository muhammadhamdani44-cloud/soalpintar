import { QuestionItem } from '../types';

interface ExportDocxOptions {
  schoolName: string;
  assessmentType: string;
  academicYear: string;
  subject: string;
  selectedClass: string;
  phase: string;
  semester: string;
  teacherName: string;
  questions: QuestionItem[];
}

export function exportQuestionsToWord(options: ExportDocxOptions) {
  const {
    schoolName,
    assessmentType,
    academicYear,
    subject,
    selectedClass,
    phase,
    semester,
    teacherName,
    questions,
  } = options;

  let docContent = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>Naskah Asesmen - ${subject}</title>
    <style>
      body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #000; }
      .header { text-align: center; font-weight: bold; text-transform: uppercase; margin-bottom: 12px; border-bottom: 2px solid #000; padding-bottom: 8px; }
      .header h2 { margin: 0; font-size: 14pt; }
      .header h3 { margin: 4px 0 0 0; font-size: 12pt; }
      .info-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      .info-table td { padding: 3px 0; font-size: 10.5pt; }
      .instructions { background: #f2f2f2; border: 1px solid #ccc; padding: 8px; margin-bottom: 16px; font-size: 10pt; }
      .question-box { margin-bottom: 14px; page-break-inside: avoid; }
      .stimulus-box { background: #f9f9f9; border-left: 3px solid #2b6cb0; padding: 8px; margin: 6px 0; font-style: italic; font-size: 10pt; }
      .options-list { margin-left: 20px; }
      .options-list p { margin: 2px 0; }
      .section-divider { border-top: 1px dashed #999; margin: 20px 0; }
      .key-box { background: #eef8f2; border: 1px solid #b7e4c7; padding: 6px 10px; margin-top: 6px; font-size: 9.5pt; }
      .arabic { font-family: 'Amiri', 'Traditional Arabic', serif; font-size: 14pt; direction: rtl; text-align: right; line-height: 2; }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>${schoolName ? schoolName.toUpperCase() : 'SMP NEGERI 1 PINTAR'}</h2>
      <h3>NASKAH ${assessmentType.toUpperCase()} TAHUN PELAJARAN ${academicYear}</h3>
    </div>

    <table class="info-table">
      <tr>
        <td style="width: 50%;"><b>Mata Pelajaran:</b> ${subject}</td>
        <td style="width: 50%;"><b>Kelas / Fase:</b> ${selectedClass} / ${phase}</td>
      </tr>
      <tr>
        <td><b>Semester:</b> ${semester}</td>
        <td><b>Penyusun:</b> ${teacherName}</td>
      </tr>
    </table>

    <div class="instructions">
      <b>PETUNJUK UMUM:</b>
      <ol style="margin: 4px 0 0 18px; padding: 0;">
        <li>Bacalah basmalah dan periksa kembali identitas lembar jawaban Anda.</li>
        <li>Jawablah setiap pertanyaan dengan teliti, objektif, dan jujur.</li>
        <li>Untuk soal uraian, berikan penjelasan analitis dan sistematis.</li>
      </ol>
    </div>

    <h4 style="border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 10px;">I. BUTIR SOAL ASESMEN</h4>
  `;

  questions.forEach((q) => {
    const isArabic = q.stimulus && q.stimulus.includes('يٰٓاَيُّ');
    docContent += `
      <div class="question-box">
        <p><b>${q.number}. [${q.type}]</b> (Bloom: ${q.bloom} | SOLO: ${q.solo})</p>
        ${
          q.stimulus
            ? `<div class="stimulus-box ${isArabic ? 'arabic' : ''}">${q.stimulus.replace(/\n/g, '<br/>')}</div>`
            : ''
        }
        <p>${q.question}</p>
        ${
          q.options && q.options.length > 0
            ? `<div class="options-list">${q.options
                .map((opt) => `<p>${opt}</p>`)
                .join('')}</div>`
            : ''
        }
      </div>
    `;
  });

  docContent += `
    <div style="page-break-before: always;"></div>
    <div class="header">
      <h3>KUNCI JAWABAN & PEMBAHASAN ASESMEN</h3>
      <p style="font-size: 10pt; font-weight: normal; margin: 2px 0;">Mata Pelajaran: ${subject} (${selectedClass})</p>
    </div>
  `;

  questions.forEach((q) => {
    docContent += `
      <div class="key-box">
        <p style="margin: 0 0 4px 0;"><b>Nomor ${q.number}. (${q.type})</b></p>
        <p style="margin: 0 0 4px 0; color: #155724;"><b>Kunci Jawaban:</b> ${q.key}</p>
        <p style="margin: 0; color: #495057;"><b>Pembahasan:</b> ${q.explanation}</p>
      </div><br/>
    `;
  });

  docContent += `</body></html>`;

  const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const cleanSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `Naskah_Soal_${cleanSubject}_${selectedClass.replace(/\s+/g, '')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
