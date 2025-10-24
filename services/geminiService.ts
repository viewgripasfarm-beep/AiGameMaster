
import { GoogleGenAI, Type } from "@google/genai";
import type { Quest } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for development. 
  // In a real deployed environment, the API_KEY would be set.
  console.warn("API_KEY is not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Bạn là một 'Game Master AI' vui tính và đáng yêu. Sứ mệnh của bạn là biến việc học thành một cuộc phiêu lưu cho các bạn học sinh lớp 8. 
Hãy luôn dùng ngôn ngữ teen, thân thiện, nhiều emoji và lời khen ngợi. 
Khi tạo bài tập, hãy thêm vào lời dẫn truyện game hóa, ví dụ như 'Thử thách mới đã xuất hiện!' và hứa hẹn phần thưởng XP. 
Câu trả lời phải ngắn gọn, đi thẳng vào vấn đề và định dạng bằng markdown.
Ví dụ:
"Tất nhiên rồi! Giỏi lắm khi bạn muốn luyện tập thêm. Hãy hoàn thành 5 thử thách dưới đây để nhận thêm 30 XP nhé! 🚀
1.  **Bài tập 1:** 2x + 5 = 11 => x = ___
2.  **Bài tập 2:** x - 7 = -3 => x = ___
3.  **Bài tập 3:** 3x = 18 => x = ___
4.  **Bài tập 4:** 5x - 10 = 0 => x = ___
5.  **Bài tập 5:** ___ + 4 = 12 (nghiệm là x = 8)"
`;

export const generateExercises = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return new Promise(resolve => setTimeout(() => {
        resolve(`Tất nhiên rồi! Giỏi lắm khi bạn muốn luyện tập thêm. Hãy hoàn thành 5 thử thách dưới đây để nhận thêm 30 XP nhé! 🚀

1.  **Bài tập 1:** 2x + 5 = 11 => x = ___
2.  **Bài tập 2:** x - 7 = -3 => x = ___
3.  **Bài tập 3:** 3x = 18 => x = ___
4.  **Bài tập 4:** 5x - 10 = 0 => x = ___
5.  **Bài tập 5:** ___ + 4 = 12 (nghiệm là x = 8)
        
(Đây là câu trả lời mẫu do API key chưa được thiết lập.)`);
    }, 1500));
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};


const quizSchema = {
    type: Type.OBJECT,
    properties: {
        name: {
            type: Type.STRING,
            description: 'Một tên nhiệm vụ ngắn gọn, vui nhộn và hấp dẫn cho bài quiz. Ví dụ: "Thử Thách Tia Chớp Vật Lý".'
        },
        description: {
            type: Type.STRING,
            description: 'Một mô tả ngắn (1-2 câu) về bài quiz, mang tính khích lệ. Ví dụ: "Kiểm tra kiến thức Vật lý của bạn nhanh như chớp!"'
        },
        miniQuiz: {
            type: Type.ARRAY,
            description: 'Một mảng chứa đúng 3 câu hỏi trắc nghiệm.',
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: 'Nội dung câu hỏi.' },
                    options: {
                        type: Type.ARRAY,
                        description: 'Một mảng chứa 3 lựa chọn trả lời dạng chuỗi (string). Mỗi lựa chọn bắt đầu bằng "A. ", "B. ", "C. ".',
                        items: { type: Type.STRING }
                    },
                    correctAnswer: {
                        type: Type.STRING,
                        description: 'Đáp án đúng, phải khớp chính xác với một trong các lựa chọn trong mảng `options`.'
                    }
                },
                required: ['question', 'options', 'correctAnswer']
            }
        }
    },
    required: ['name', 'description', 'miniQuiz']
};


export const generateQuiz = async (subjectName: string): Promise<Quest> => {
    if (!API_KEY) {
        return new Promise(resolve => setTimeout(() => {
            resolve({
                name: `AI Thử Thách ${subjectName}`,
                description: 'Một bài quiz được tạo bởi AI để thử thách kiến thức của bạn!',
                learningObjective: 'Kiểm tra và củng cố kiến thức một cách ngẫu nhiên và thú vị.',
                rewards: '+50 XP, huy hiệu "Nhà Thám Hiểm AI" 🤖, 10 xu 🪙',
                miniQuiz: [
                    { question: `Câu hỏi mẫu 1 về ${subjectName}?`, options: ['A. Đáp án A', 'B. Đáp án B', 'C. Đáp án C'], correctAnswer: 'A. Đáp án A' },
                    { question: `Câu hỏi mẫu 2 về ${subjectName}?`, options: ['A. Đáp án A', 'B. Đáp án B', 'C. Đáp án C'], correctAnswer: 'B. Đáp án B' },
                    { question: `Câu hỏi mẫu 3 về ${subjectName}?`, options: ['A. Đáp án A', 'B. Đáp án B', 'C. Đáp án C'], correctAnswer: 'C. Đáp án C' }
                ],
                aiPromptSuggestion: `Tạo thêm 5 câu hỏi về ${subjectName} đi AI!`
            });
        }, 1500));
    }

  try {
    const prompt = `Tạo một bài quiz nhanh gồm 3 câu hỏi trắc nghiệm về môn '${subjectName}' cho học sinh lớp 8 tại Việt Nam. Các câu hỏi cần phù hợp với chương trình học, có độ khó vừa phải. Các lựa chọn trả lời phải rõ ràng.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: quizSchema,
            temperature: 0.9,
        }
    });

    const quizData = JSON.parse(response.text);

    if (!quizData.name || !quizData.miniQuiz || quizData.miniQuiz.length === 0) {
        throw new Error("Invalid quiz data structure from API.");
    }

    return {
        ...quizData,
        learningObjective: 'Kiểm tra và củng cố kiến thức một cách ngẫu nhiên và thú vị.',
        rewards: '+50 XP, huy hiệu "Nhà Thám Hiểm AI" 🤖, 10 xu 🪙',
        aiPromptSuggestion: `Tạo thêm 5 câu hỏi về ${subjectName} đi AI!`
    };

  } catch (error) {
    console.error("Gemini API error while generating quiz:", error);
    throw new Error("Failed to generate quiz from Gemini API.");
  }
};
