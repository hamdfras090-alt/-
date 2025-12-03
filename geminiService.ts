import { GoogleGenAI } from "@google/genai";
import { Review } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProfessorSummary = async (professorName: string, reviews: Review[]): Promise<string> => {
  if (reviews.length === 0) {
    return "لا توجد مراجعات كافية لتحليل أداء هذا الدكتور حتى الآن.";
  }

  const reviewsText = reviews.map(r => `- تقييم: ${r.rating}/5. تعليق: "${r.text}". الحضور: ${r.attendance}/5. الدرجات: ${r.grading}/5`).join("\n");

  const prompt = `
    أنت مساعد ذكي لطلاب الجامعات. قم بتحليل التقييمات التالية للدكتور "${professorName}".
    
    البيانات:
    ${reviewsText}

    المطلوب:
    اكتب ملخصاً موجزاً ومفيداً باللغة العربية (حوالي 3-4 جمل) يوضح نقاط القوة والضعف لدى الدكتور، أسلوبه في الحضور والغياب، وعدالة توزيع الدرجات. كن محايداً وموضوعياً.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "لم نتمكن من توليد ملخص في الوقت الحالي.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
  }
};