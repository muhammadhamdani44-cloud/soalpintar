import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateSmartPedagogicalQuestions } from "./src/data/constants.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Initialize Gemini client lazily if key exists
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Full generation API route
app.post("/api/generate", async (req, res) => {
  try {
    const {
      subject,
      phase,
      selectedClass,
      semester,
      assessmentType,
      difficulty,
      isTkaMode,
      learningMaterial,
      referenceDocText,
      refPriorities,
      stimulusType,
      literacyOptions,
      questionCounts,
      bloomPercentages,
    } = req.body;

    const totalQuestions =
      (Number(questionCounts?.multipleChoice) || 0) +
      (Number(questionCounts?.complexMC) || 0) +
      (Number(questionCounts?.complexTF) || 0) +
      (Number(questionCounts?.matching) || 0) +
      (Number(questionCounts?.shortAnswer) || 0) +
      (Number(questionCounts?.essay) || 0) +
      (Number(questionCounts?.longEssay) || 0);

    const ai = getGeminiClient();

    if (ai && totalQuestions > 0) {
      try {
        const isPai =
          typeof subject === "string" &&
          (subject.toLowerCase().includes("agama") ||
            subject.toLowerCase().includes("qur'an") ||
            subject.toLowerCase().includes("fikih") ||
            subject.toLowerCase().includes("akidah") ||
            subject.toLowerCase().includes("hadis") ||
            subject.toLowerCase().includes("aswaja") ||
            subject.toLowerCase().includes("arab"));

        const systemInstruction = `Anda adalah Pakar Asesmen Pendidikan Senior dan Penulis Butir Soal Standar Nasional Kurikulum Merdeka (Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI).

Tugas utama Anda:
1. Menyusun naskah butir soal asesmen berkualitas tinggi dan kisi-kisi (blueprint) yang objektif, mendalam, dan berbasis penalaran logis.
2. Mematuhi kaidah Taksonomi Bloom (C1-C6), Taksonomi SOLO, dan Taksonomi Barrett.
3. Menghadirkan stimulus kontekstual yang kaya dan autentik sesuai karakteristik mata pelajaran dan jenjang peserta didik.

ATURAN KHUSUS MATA PELAJARAN AGAMA ISLAM / PAI:
- Apabila menyajikan ayat Al-Qur'an, WAJIB menuliskan teks Arab asli yang lengkap dengan syakal/harakat, terjemahan resmi Standar Kemenag RI, serta nama surah dan nomor ayat yang akurat.
- Apabila menyajikan hadis, WAJIB menyebutkan teks hadis, terjemah, dan perawi hadis shahih (sanad/rawi).
- Jangan pernah mengarang ayat suci atau hadis.

ATURAN SOAL PILIHAN GANDA & HOTS:
- Opsi pengecoh (distraktor) harus logis, homogen panjangnya, dan tidak memberikan petunjuk jawaban secara eksplisit.
- Berikan kunci jawaban yang pasti dan pembahasan analitis yang mendidik.`;

        const prompt = `Susunlah naskah soal asesmen dengan parameter:
- Jenjang & Kelas: ${phase} - ${selectedClass}, Semester ${semester}
- Mata Pelajaran: ${subject}
- Bentuk Asesmen: ${assessmentType} ${isTkaMode ? "(MODE TKA - TES KEMAMPUAN AKADEMIK PENALARAN TINGGI)" : ""}
- Tingkat Kesulitan Umum: ${difficulty}
- Stimulus Pilihan: ${stimulusType}
- Target Distribusi Bloom: C1(${bloomPercentages?.C1 || 10}%), C2(${bloomPercentages?.C2 || 20}%), C3(${bloomPercentages?.C3 || 30}%), C4(${bloomPercentages?.C4 || 25}%), C5(${bloomPercentages?.C5 || 10}%), C6(${bloomPercentages?.C6 || 5}%)
- Integrasi: ${JSON.stringify(literacyOptions || {})}

Materi / Tujuan Pembelajaran (TP):
"${learningMaterial}"

${referenceDocText ? `DOKUMEN RUJUKAN KHUSUS (Prioritas: ${refPriorities?.prioritizeDoc ? "TINGGI" : "SEDANG"}):\n${referenceDocText}\n` : ""}

JUMLAH BUTIR SOAL YANG WAJIB DIBUAT (Total ${totalQuestions}):
- Pilihan Ganda: ${questionCounts?.multipleChoice || 0}
- Pilihan Ganda Kompleks: ${questionCounts?.complexMC || 0}
- Benar/Salah Kompleks: ${questionCounts?.complexTF || 0}
- Menjodohkan: ${questionCounts?.matching || 0}
- Isian Singkat: ${questionCounts?.shortAnswer || 0}
- Uraian / Studi Kasus: ${(questionCounts?.essay || 0) + (questionCounts?.longEssay || 0)}

Balas HANYA dalam format JSON Array murni tanpa markdown wrapper berlebih, dengan format per objek:
[
  {
    "number": 1,
    "type": "Pilihan Ganda",
    "material": "...",
    "tp": "...",
    "indicator": "...",
    "bloom": "C4 - Menganalisis",
    "solo": "Relational",
    "barrett": "Inferential",
    "difficulty": "HOTS",
    "stimulus": "Teks stimulus lengkap...",
    "question": "Kalimat pertanyaan...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "key": "A",
    "explanation": "Pembahasan..."
  }
]`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return res.json({
              success: true,
              source: "gemini",
              questions: parsed,
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed or timed out, gracefully fallback to pedagogical engine:", geminiError);
      }
    }

    // Fallback: Smart pedagogical engine
    const fallbackQuestions = generateSmartPedagogicalQuestions({
      subject: subject || "Pendidikan Agama Islam dan Budi Pekerti",
      phase: phase || "Fase D",
      selectedClass: selectedClass || "Kelas 7",
      learningMaterial: learningMaterial || "Materi Kurikulum Merdeka",
      questionCounts: questionCounts || {
        multipleChoice: 5,
        complexMC: 1,
        complexTF: 1,
        matching: 1,
        shortAnswer: 2,
        essay: 1,
        longEssay: 0,
      },
      isTkaMode: Boolean(isTkaMode),
      difficulty: difficulty || "Sedang (MOTS)",
    });

    return res.json({
      success: true,
      source: "pedagogical_engine",
      questions: fallbackQuestions,
    });
  } catch (err: any) {
    console.error("Error in /api/generate:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to generate questions",
    });
  }
});

// Single Question Regenerate API Route
app.post("/api/regenerate-item", async (req, res) => {
  try {
    const { originalQuestion, instruction, subject, selectedClass } = req.body;
    const ai = getGeminiClient();

    if (ai && originalQuestion) {
      try {
        const prompt = `Anda adalah penulis butir soal profesional Kurikulum Merdeka.
Perbarui atau susun ulang satu butir soal berikut berdasarkan arahan khusus:
ARAHAN PERUBAHAN: "${instruction}"
MATA PELAJARAN: ${subject} (${selectedClass})

SOAL ASLI:
${JSON.stringify(originalQuestion, null, 2)}

Balas HANYA dengan satu objek JSON yang sudah disempurnakan dengan format yang sama:
{
  "number": ${originalQuestion.number},
  "type": "${originalQuestion.type}",
  "material": "...",
  "tp": "...",
  "indicator": "...",
  "bloom": "...",
  "solo": "...",
  "barrett": "...",
  "difficulty": "...",
  "stimulus": "...",
  "question": "...",
  "options": [...],
  "key": "...",
  "explanation": "..."
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.8,
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          return res.json({ success: true, question: parsed });
        }
      } catch (err) {
        console.warn("Regenerate item fallback:", err);
      }
    }

    // Fallback item adjustment
    const updated = { ...originalQuestion };
    updated.question = `[REGENERASI: ${instruction}] ` + originalQuestion.question;
    updated.explanation = `Soal disesuaikan dengan instruksi: ${instruction}. ` + originalQuestion.explanation;
    if (instruction.includes("HOTS") || instruction.includes("Sulit")) {
      updated.bloom = "C5 - Mengevaluasi";
      updated.difficulty = "HOTS (Tinggi)";
    } else if (instruction.includes("Mudah")) {
      updated.bloom = "C2 - Memahami";
      updated.difficulty = "Mudah (LOTS)";
    }
    return res.json({ success: true, question: updated });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Generator Soal Pintar server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
