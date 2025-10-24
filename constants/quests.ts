import type { Subject, ChatMessage } from '../types';

export const WELCOME_MESSAGE: ChatMessage = {
    sender: 'ai',
    text: `Xin chào Chiến Binh Tri Thức! 👋 Tôi là Game Master AI, người đồng hành cùng bạn trên con đường chinh phục kiến thức. 
    
    👈 Hãy chọn một môn học bên trái để bắt đầu cuộc phiêu lưu, hoặc bạn có thể "ra lệnh" trực tiếp cho tôi ở dưới đây!
    
    Ví dụ, bạn có thể thử: **"Tạo 5 câu hỏi trắc nghiệm về Lịch sử Việt Nam thời Nguyễn."**
    
    Sẵn sàng chưa nào? Let's gooo! 🚀`
};

export const SUBJECTS: Record<string, Subject> = {
  toan: {
    name: 'Toán',
    icon: 'fa-calculator',
    quests: [
      {
        name: 'Đại Chiến Phương Trình',
        description: 'Giải nhanh các phương trình bậc nhất để mở khóa kho báu toán học! Nhanh tay lên bạn ơi!',
        learningObjective: 'Nắm vững cách giải và kiểm tra nghiệm của phương trình bậc nhất một ẩn.',
        rewards: '+100 XP, huy hiệu "Nhà Vua Phương Trình" 👑, 20 xu 🪙',
        miniQuiz: [
          {
            question: 'Nghiệm của phương trình 3x - 9 = 0 là gì?',
            options: ['A. x = 3', 'B. x = -3', 'C. x = 9'],
            correctAnswer: 'A. x = 3'
          },
          {
            question: 'Phương trình nào sau đây vô nghiệm?',
            options: ['A. 0x = 5', 'B. 2x = 4', 'C. 5x = 0'],
            correctAnswer: 'A. 0x = 5'
          },
          {
            question: 'Cho phương trình 2x + 5 = x - 1. Nghiệm của phương trình là:',
            options: ['A. x = -6', 'B. x = 6', 'C. x = 4'],
            correctAnswer: 'A. x = -6'
          }
        ],
        aiPromptSuggestion: 'Hey AI, tạo cho tớ 5 bài tập điền vào chỗ trống về giải phương trình bậc nhất một ẩn!',
      },
      {
        name: 'Bí Mật Hằng Đẳng Thức',
        description: 'Khám phá 7 hằng đẳng thức đáng nhớ và sử dụng chúng như một siêu năng lực giải toán!',
        learningObjective: 'Thuộc và vận dụng thành thạo 7 hằng đẳng thức đáng nhớ.',
        rewards: '+120 XP, huy hiệu "Bậc Thầy Biến Đổi" ✨, 25 xu 🪙',
        miniQuiz: [
          {
            question: 'Khai triển (x + 2)² ta được?',
            options: ['A. x² + 4x + 4', 'B. x² + 2x + 4', 'C. x² + 4'],
            correctAnswer: 'A. x² + 4x + 4'
          },
          {
            question: 'Biểu thức x² - 9 bằng biểu thức nào sau đây?',
            options: ['A. (x - 3)²', 'B. (x + 3)(x - 3)', 'C. (x + 3)²'],
            correctAnswer: 'B. (x + 3)(x - 3)'
          },
          {
            question: 'Hằng đẳng thức (A - B)³ là gì?',
            options: ['A. A³ - 3A²B + 3AB² - B³', 'B. A³ - B³', 'C. A³ + 3A²B + 3AB² + B³'],
            correctAnswer: 'A. A³ - 3A²B + 3AB² - B³'
          }
        ],
        aiPromptSuggestion: 'AI ơi, tạo 3 bài toán rút gọn biểu thức sử dụng hằng đẳng thức đi!',
        miniGame: {
          type: 'sequence',
          title: 'Khai Triển Thần Tốc',
          instructions: 'Sắp xếp các bước để khai triển hằng đẳng thức (a + b)². (Sử dụng các nút mũi tên để di chuyển)',
          items: [
            'Bình phương số thứ nhất: a²',
            'Cộng với 2 lần tích số thứ nhất và số thứ hai: + 2ab',
            'Cộng với bình phương số thứ hai: + b²',
            'Kết quả là: a² + 2ab + b²'
          ]
        }
      },
      {
        name: 'Cuộc Đua Tam Giác Vuông',
        description: 'Vận dụng định lý Pythagoras để đoạt lấy vương miện nhanh nhất trong cuộc đua hình học!',
        learningObjective: 'Hiểu và áp dụng định lý Pythagoras và định lý đảo trong tam giác vuông.',
        rewards: '+150 XP, huy hiệu "Thần Tốc Pythagoras" ⚡, 30 xu 🪙',
        miniQuiz: [
          {
            question: 'Tam giác ABC vuông tại A, có AB = 3, AC = 4. Cạnh huyền BC bằng bao nhiêu?',
            options: ['A. 5', 'B. 6', 'C. 7'],
            correctAnswer: 'A. 5'
          },
          {
            question: 'Bộ ba nào sau đây là độ dài ba cạnh của một tam giác vuông?',
            options: ['A. (2, 3, 4)', 'B. (5, 12, 13)', 'C. (6, 7, 8)'],
            correctAnswer: 'B. (5, 12, 13)'
          },
          {
            question: 'Định lý Pythagoras phát biểu rằng trong tam giác vuông, bình phương cạnh huyền bằng...?',
            options: ['A. tổng bình phương hai cạnh góc vuông', 'B. hiệu bình phương hai cạnh góc vuông', 'C. tích hai cạnh góc vuông'],
            correctAnswer: 'A. tổng bình phương hai cạnh góc vuông'
          }
        ],
        aiPromptSuggestion: 'Tạo cho mình 3 bài toán thực tế ứng dụng định lý Pythagoras nha AI!',
      }
    ]
  },
  van: {
    name: 'Ngữ văn',
    icon: 'fa-book-open',
    quests: [
      {
        name: 'Giải Mã "Lão Hạc"',
        description: 'Thâm nhập vào thế giới nội tâm của Lão Hạc, khám phá những bí ẩn đằng sau câu chuyện cảm động.',
        learningObjective: 'Hiểu được giá trị nhân đạo và giá trị hiện thực của tác phẩm "Lão Hạc".',
        rewards: '+100 XP, huy hiệu "Nhà Phân Tích Tí Hon" 🕵️, 20 xu 🪙',
        miniQuiz: [
          {
            question: 'Lão Hạc bán con vật nào?',
            options: ['A. Con mèo Vàng', 'B. Con chó Vàng', 'C. Con gà Vàng'],
            correctAnswer: 'B. Con chó Vàng'
          },
          {
            question: 'Lão Hạc đã chọn cái chết như thế nào?',
            options: ['A. Nhảy sông tự tử', 'B. Uống bả chó', 'C. Thắt cổ'],
            correctAnswer: 'B. Uống bả chó'
          },
          {
            question: 'Tác giả của truyện ngắn "Lão Hạc" là ai?',
            options: ['A. Nam Cao', 'B. Ngô Tất Tố', 'C. Vũ Trọng Phụng'],
            correctAnswer: 'A. Nam Cao'
          }
        ],
        aiPromptSuggestion: 'AI ơi, tóm tắt truyện "Lão Hạc" trong 5 câu được không?',
      },
      {
        name: 'Truy Tìm Biện Pháp Tu Từ',
        description: 'Trở thành thám tử ngôn ngữ, truy tìm và gọi tên các biện pháp tu từ ẩn giấu trong thơ ca.',
        learningObjective: 'Nhận biết và phân tích tác dụng của các biện pháp tu từ: so sánh, nhân hóa, ẩn dụ, hoán dụ.',
        rewards: '+120 XP, huy hiệu "Thám Tử Ngôn Ngữ" 🔍, 25 xu 🪙',
        miniQuiz: [
          {
            question: 'Câu "Mặt trời xuống biển như hòn lửa" sử dụng biện pháp tu từ gì?',
            options: ['A. Nhân hóa', 'B. Ẩn dụ', 'C. So sánh'],
            correctAnswer: 'C. So sánh'
          },
          {
            question: 'Biện pháp tu từ nào gọi tên sự vật, hiện tượng này bằng tên sự vật, hiện tượng khác có nét tương đồng?',
            options: ['A. Ẩn dụ', 'B. Hoán dụ', 'C. Nhân hóa'],
            correctAnswer: 'A. Ẩn dụ'
          },
          {
            question: '"Áo chàm đưa buổi phân ly" là biện pháp tu từ gì?',
            options: ['A. So sánh', 'B. Hoán dụ', 'C. Nhân hóa'],
            correctAnswer: 'B. Hoán dụ'
          }
        ],
        aiPromptSuggestion: 'Tạo 5 câu thơ có sử dụng biện pháp nhân hóa giúp mình với, AI!',
        miniGame: {
            type: 'matching',
            title: 'Ghép Nối Tu Từ',
            instructions: 'Nối các biện pháp tu từ với định nghĩa đúng của chúng. Hãy chọn một mục ở cột trái, sau đó chọn mục tương ứng ở cột phải.',
            prompts: ['So sánh', 'Nhân hóa', 'Ẩn dụ', 'Hoán dụ'],
            answers: [
                'Đối chiếu sự vật này với sự vật khác có nét tương đồng.',
                'Gán cho sự vật những đặc điểm của con người.',
                'Gọi tên sự vật này bằng tên sự vật khác có nét tương đồng.',
                'Gọi tên sự vật này bằng tên sự vật khác có quan hệ gần gũi.'
            ]
        }
      }
    ]
  },
  anh: {
    name: 'Tiếng Anh',
    icon: 'fa-language',
    quests: [
      {
        name: 'Du Hành Quá Khứ Đơn',
        description: 'Lên cỗ máy thời gian và chinh phục thì Quá Khứ Đơn (Past Simple) để kể lại những câu chuyện đã qua!',
        learningObjective: 'Sử dụng thành thạo thì Quá Khứ Đơn với động từ có quy tắc và bất quy tắc.',
        rewards: '+100 XP, huy hiệu "Time Traveler" ⏳, 20 xu 🪙',
        miniQuiz: [
          {
            question: 'Yesterday, I ___ to school.',
            options: ['A. go', 'B. went', 'C. goed'],
            correctAnswer: 'B. went'
          },
          {
            question: 'She ___ a new book last week.',
            options: ['A. buy', 'B. buys', 'C. bought'],
            correctAnswer: 'C. bought'
          },
          {
            question: '___ you finish your homework?',
            options: ['A. Did', 'B. Do', 'C. Does'],
            correctAnswer: 'A. Did'
          }
        ],
        aiPromptSuggestion: 'Hey AI, create 5 fill-in-the-blank exercises about Past Simple tense!',
      },
      {
        name: 'Vương Quốc Giới Từ',
        description: 'Khám phá vương quốc của IN, ON, AT và đặt chúng vào đúng vị trí để hoàn thành bản đồ kho báu.',
        learningObjective: 'Phân biệt và sử dụng đúng các giới từ chỉ thời gian và nơi chốn phổ biến.',
        rewards: '+110 XP, huy hiệu "Master of Prepositions" 🗺️, 22 xu 🪙',
        miniQuiz: [
          {
            question: 'My birthday is ___ June.',
            options: ['A. on', 'B. at', 'C. in'],
            correctAnswer: 'C. in'
          },
          {
            question: 'The meeting is ___ 10 AM.',
            options: ['A. on', 'B. at', 'C. in'],
            correctAnswer: 'B. at'
          },
          {
            question: 'The picture is ___ the wall.',
            options: ['A. on', 'B. at', 'C. in'],
            correctAnswer: 'A. on'
          }
        ],
        aiPromptSuggestion: 'AI, give me 5 True/False questions about prepositions of place!',
        miniGame: {
            type: 'true_false',
            title: 'Giới Từ Đúng Sai',
            instructions: 'Xác định xem các câu sau sử dụng giới từ đúng hay sai.',
            statements: [
                { text: 'I live AT Vietnam.', isTrue: false },
                { text: 'The concert is ON Friday.', isTrue: true },
                { text: 'He was born IN 1999.', isTrue: true },
                { text: 'Let\'s meet IN the bus stop.', isTrue: false }
            ]
        }
      }
    ]
  },
  nguphap: {
    name: 'Ngữ pháp',
    icon: 'fa-spell-check',
    quests: [
      {
        name: 'Chinh Phục Thì Tương Lai',
        description: 'Du hành đến tương lai và nắm vững cách sử dụng thì Tương Lai Đơn để nói về những dự định sắp tới!',
        learningObjective: 'Hiểu và sử dụng thì Tương Lai Đơn (will/be going to) một cách chính xác.',
        rewards: '+110 XP, huy hiệu "Nhà Tiên Tri Ngôn Ngữ" 🔮, 22 xu 🪙',
        miniQuiz: [
          {
            question: 'I think it ___ rain tomorrow.',
            options: ['A. will', 'B. is going to', 'C. rains'],
            correctAnswer: 'A. will'
          },
          {
            question: 'Look at those dark clouds! It ___ rain.',
            options: ['A. will', 'B. is going to', 'C. is raining'],
            correctAnswer: 'B. is going to'
          },
          {
            question: 'A: "The phone is ringing." B: "OK, I ___ get it."',
            options: ['A. am going to', 'B. will', 'C. am'],
            correctAnswer: 'B. will'
          }
        ],
        aiPromptSuggestion: 'Tạo 5 bài tập về sự khác nhau giữa "will" và "be going to" đi AI.',
      },
      {
        name: 'Bí Ẩn Mạo Từ',
        description: 'Giải mã bí ẩn của "a", "an", "the" và trở thành bậc thầy sử dụng mạo từ.',
        learningObjective: 'Phân biệt và sử dụng đúng các mạo từ a/an/the trong các trường hợp cơ bản.',
        rewards: '+120 XP, huy hiệu "Thám Tử Mạo Từ" 🕵️‍♀️, 25 xu 🪙',
        miniQuiz: [
          {
            question: 'She wants to be ___ astronaut.',
            options: ['A. a', 'B. an', 'C. the'],
            correctAnswer: 'B. an'
          },
          {
            question: 'Can you pass me ___ salt, please?',
            options: ['A. a', 'B. an', 'C. the'],
            correctAnswer: 'C. the'
          },
          {
            question: 'My brother is studying at ___ university in Hanoi.',
            options: ['A. a', 'B. an', 'C. the'],
            correctAnswer: 'A. a'
          }
        ],
        aiPromptSuggestion: 'Viết một đoạn văn ngắn và để trống các mạo từ a/an/the để tớ điền vào, AI nhé!',
      }
    ]
  },
  ly: {
    name: 'Vật lý',
    icon: 'fa-atom',
    quests: [
      {
        name: 'Chinh Phục Áp Suất',
        description: 'Hiểu rõ sức mạnh vô hình của áp suất và trở thành người làm chủ các lực tác động!',
        learningObjective: 'Hiểu khái niệm áp suất, công thức tính và các ứng dụng trong thực tế.',
        rewards: '+130 XP, huy hiệu "Bậc Thầy Áp Suất" 💨, 28 xu 🪙',
        miniQuiz: [
          {
            question: 'Đơn vị của áp suất là gì?',
            options: ['A. Newton (N)', 'B. Pascal (Pa)', 'C. Joule (J)'],
            correctAnswer: 'B. Pascal (Pa)'
          },
          {
            question: 'Để tăng áp suất, ta cần làm gì?',
            options: ['A. Giảm áp lực, tăng diện tích bị ép', 'B. Tăng áp lực, giảm diện tích bị ép', 'C. Tăng áp lực, tăng diện tích bị ép'],
            correctAnswer: 'B. Tăng áp lực, giảm diện tích bị ép'
          },
          {
            question: 'Tại sao mũi đinh lại nhọn?',
            options: ['A. Để giảm diện tích bị ép, tăng áp suất', 'B. Để đẹp hơn', 'C. Để tăng diện tích bị ép, giảm áp suất'],
            correctAnswer: 'A. Để giảm diện tích bị ép, tăng áp suất'
          }
        ],
        aiPromptSuggestion: 'AI ơi, tạo 2 bài toán tình huống về tính áp suất chất rắn!',
      }
    ]
  },
  hoa: {
    name: 'Hóa học',
    icon: 'fa-flask-vial',
    quests: [
      {
        name: 'Đấu Trường Phản Ứng',
        description: 'Cân bằng các phương trình hóa học và tạo ra những "vụ nổ" kiến thức ngoạn mục!',
        learningObjective: 'Biết cách cân bằng phương trình hóa học đơn giản.',
        rewards: '+140 XP, huy hiệu "Nhà Giả Kim" 🧪, 30 xu 🪙',
        miniQuiz: [
          {
            question: 'Hệ số cân bằng của phương trình: H₂ + O₂ → H₂O là?',
            options: ['A. 2, 1, 2', 'B. 1, 1, 2', 'C. 2, 2, 1'],
            correctAnswer: 'A. 2, 1, 2'
          },
          {
            question: 'Phản ứng hóa học là quá trình biến đổi...',
            options: ['A. chất này thành chất khác', 'B. trạng thái của chất', 'C. màu sắc của chất'],
            correctAnswer: 'A. chất này thành chất khác'
          },
          {
            question: 'Trong phương trình Fe + 2HCl → FeCl₂ + H₂, sản phẩm là gì?',
            options: ['A. Fe và HCl', 'B. FeCl₂ và H₂', 'C. Chỉ có FeCl₂'],
            correctAnswer: 'B. FeCl₂ và H₂'
          }
        ],
        aiPromptSuggestion: 'Hey AI, tạo 5 bài tập điền vào chỗ trống để cân bằng phương trình hóa học!',
        miniGame: {
            type: 'quick_quiz',
            title: 'Quiz Hóa Học Siêu Tốc',
            instructions: 'Chọn đáp án đúng nhất cho các câu hỏi sau.',
            questions: [
                 {
                    question: 'Chất nào làm quỳ tím hóa đỏ?',
                    options: ['A. Axit', 'B. Bazo', 'C. Muối'],
                    correctAnswer: 'A. Axit'
                 },
                 {
                    question: 'Dấu hiệu nào cho thấy có phản ứng hóa học xảy ra?',
                    options: ['A. Có chất mới tạo thành (kết tủa, bay hơi, đổi màu)', 'B. Chất chuyển từ rắn sang lỏng', 'C. Hòa tan đường vào nước'],
                    correctAnswer: 'A. Có chất mới tạo thành (kết tủa, bay hơi, đổi màu)'
                 }
            ]
        }
      }
    ]
  },
  sinh: {
    name: 'Sinh học',
    icon: 'fa-dna',
    quests: [
       {
        name: 'Thám Hiểm Tế Bào',
        description: 'Lặn sâu vào thế giới vi mô, khám phá cấu trúc và chức năng kỳ diệu của tế bào!',
        learningObjective: 'Nêu được cấu tạo và chức năng các thành phần chính của tế bào.',
        rewards: '+120 XP, huy hiệu "Nhà Tế Bào Học" 🔬, 25 xu 🪙',
        miniQuiz: [
          {
            question: 'Bộ phận nào được ví như "nhà máy năng lượng" của tế bào?',
            options: ['A. Nhân tế bào', 'B. Lưới nội chất', 'C. Ti thể'],
            correctAnswer: 'C. Ti thể'
          },
          {
            question: 'Thành phần nào chứa vật chất di truyền (ADN)?',
            options: ['A. Màng sinh chất', 'B. Nhân tế bào', 'C. Tế bào chất'],
            correctAnswer: 'B. Nhân tế bào'
          },
          {
            question: 'Tế bào thực vật có thành phần nào mà tế bào động vật không có?',
            options: ['A. Thành xenlulozo', 'B. Ribosome', 'C. Không bào'],
            correctAnswer: 'A. Thành xenlulozo'
          }
        ],
        aiPromptSuggestion: 'Tạo 3 câu hỏi Đúng/Sai về sự khác nhau giữa tế bào động vật và thực vật!',
      }
    ]
  },
  su: {
    name: 'Lịch sử',
    icon: 'fa-landmark-dome',
    quests: [
       {
        name: 'Dấu Chân Lịch Sử',
        description: 'Theo dòng thời gian, tìm hiểu về các triều đại phong kiến Việt Nam và những chiến công lừng lẫy.',
        learningObjective: 'Nắm được các mốc thời gian quan trọng của các triều đại Lý, Trần, Lê.',
        rewards: '+100 XP, huy hiệu "Sử Gia Tập Sự" 📜, 20 xu 🪙',
        miniQuiz: [
          {
            question: 'Nhà Lý dời đô về Thăng Long (Hà Nội ngày nay) vào năm nào?',
            options: ['A. 1010', 'B. 1225', 'C. 938'],
            correctAnswer: 'A. 1010'
          },
          {
            question: 'Vị vua nào đã lãnh đạo cuộc kháng chiến chống quân Mông-Nguyên lần thứ hai và thứ ba?',
            options: ['A. Lý Thái Tổ', 'B. Trần Hưng Đạo', 'C. Lê Lợi'],
            correctAnswer: 'B. Trần Hưng Đạo'
          },
          {
            question: 'Triều đại nào có bộ luật Hồng Đức nổi tiếng?',
            options: ['A. Nhà Trần', 'B. Nhà Nguyễn', 'C. Nhà Lê sơ'],
            correctAnswer: 'C. Nhà Lê sơ'
          }
        ],
        aiPromptSuggestion: 'AI, tạo bài tập sắp xếp thứ tự các sự kiện trong cuộc kháng chiến chống Mông-Nguyên!',
        miniGame: {
            type: 'sequence',
            title: 'Dòng Chảy Thời Gian',
            instructions: 'Sắp xếp các triều đại sau theo đúng thứ tự lịch sử. (Sử dụng các nút mũi tên để di chuyển)',
            items: [
                'Nhà Lý',
                'Nhà Trần',
                'Nhà Hồ',
                'Nhà Lê sơ',
                'Nhà Nguyễn'
            ]
        }
      }
    ]
  },
  dia: {
    name: 'Địa lý',
    icon: 'fa-earth-americas',
    quests: [
      {
        name: 'Bản Đồ Kho Báu Việt Nam',
        description: 'Giải mã bản đồ địa lý Việt Nam, khám phá các vùng kinh tế và tài nguyên thiên nhiên quý giá.',
        learningObjective: 'Xác định được vị trí và đặc điểm chính của 7 vùng kinh tế ở Việt Nam.',
        rewards: '+110 XP, huy hiệu "Nhà Thám Hiểm" 🧭, 22 xu 🪙',
        miniQuiz: [
          {
            question: 'Vùng nào nổi tiếng với Đồng bằng sông Cửu Long, vựa lúa lớn nhất cả nước?',
            options: ['A. Đông Nam Bộ', 'B. Đồng bằng sông Hồng', 'C. Đồng bằng sông Cửu Long'],
            correctAnswer: 'C. Đồng bằng sông Cửu Long'
          },
          {
            question: 'Tây Nguyên là vùng chuyên canh cây công nghiệp nào?',
            options: ['A. Lúa', 'B. Cà phê, cao su, hồ tiêu', 'C. Chè'],
            correctAnswer: 'B. Cà phê, cao su, hồ tiêu'
          },
          {
            question: 'Vịnh Hạ Long, một di sản thiên nhiên thế giới, thuộc vùng nào?',
            options: ['A. Duyên hải Nam Trung Bộ', 'B. Trung du và miền núi Bắc Bộ', 'C. Đồng bằng sông Hồng'],
            correctAnswer: 'B. Trung du và miền núi Bắc Bộ'
          }
        ],
        aiPromptSuggestion: 'Tạo bài tập nối cột giữa các vùng kinh tế và các sản phẩm đặc trưng của vùng đó!',
      }
    ]
  },
  tin: {
    name: 'Tin học',
    icon: 'fa-laptop-code',
    quests: [
      {
        name: 'Mê Cung Thuật Toán',
        description: 'Học cách tư duy như một lập trình viên, thiết kế những thuật toán thông minh để giải quyết vấn đề.',
        learningObjective: 'Hiểu khái niệm thuật toán và biểu diễn được thuật toán bằng sơ đồ khối hoặc liệt kê các bước.',
        rewards: '+130 XP, huy hiệu "Kiến Trúc Sư Logic" 🧠, 28 xu 🪙',
        miniQuiz: [
          {
            question: 'Hình thoi trong sơ đồ khối thường dùng để biểu diễn thao tác gì?',
            options: ['A. Nhập/Xuất dữ liệu', 'B. So sánh, kiểm tra điều kiện', 'C. Tính toán'],
            correctAnswer: 'B. So sánh, kiểm tra điều kiện'
          },
          {
            question: 'Tính tuần tự trong thuật toán có nghĩa là gì?',
            options: ['A. Các bước được thực hiện lặp đi lặp lại', 'B. Các bước được thực hiện theo một trình tự nhất định', 'C. Thuật toán sẽ kết thúc sau một số hữu hạn bước'],
            correctAnswer: 'B. Các bước được thực hiện theo một trình tự nhất định'
          },
          {
            question: 'Để giải phương trình bậc nhất ax + b = 0, bước đầu tiên của thuật toán là gì?',
            options: ['A. Tính nghiệm x = -b/a', 'B. Nhập các hệ số a, b', 'C. In ra kết quả'],
            correctAnswer: 'B. Nhập các hệ số a, b'
          }
        ],
        aiPromptSuggestion: 'AI, hãy viết các bước bằng lời để mô tả thuật toán tìm số lớn nhất trong 3 số a, b, c!',
        miniGame: {
            type: 'sequence',
            title: 'Lối Mòn Thuật Toán',
            instructions: 'Sắp xếp các bước của thuật toán giải phương trình bậc nhất ax + b = 0 (với a ≠ 0). (Sử dụng các nút mũi tên để di chuyển)',
            items: [
                'Bắt đầu',
                'Nhập hai số a và b',
                'Tính nghiệm x = -b / a',
                'In ra màn hình giá trị của x',
                'Kết thúc'
            ]
        }
      }
    ]
  },
  gdcd: {
    name: 'GDCD',
    icon: 'fa-scale-balanced',
    quests: [
      {
        name: 'Hiệp Sĩ Công Lý',
        description: 'Rèn luyện đức tính tôn trọng lẽ phải, trở thành một hiệp sĩ dũng cảm bảo vệ sự thật và công bằng.',
        learningObjective: 'Hiểu được thế nào là tôn trọng lẽ phải và ý nghĩa của nó.',
        rewards: '+100 XP, huy hiệu "Hiệp Sĩ Công Lý" 🛡️, 20 xu 🪙',
        miniQuiz: [
          {
            question: 'Tôn trọng lẽ phải là...',
            options: ['A. Luôn làm theo ý kiến của số đông', 'B. Công nhận, ủng hộ, tuân theo và bảo vệ những điều đúng đắn', 'C. Chỉ nghe theo lời người lớn tuổi'],
            correctAnswer: 'B. Công nhận, ủng hộ, tuân theo và bảo vệ những điều đúng đắn'
          },
          {
            question: 'Hành vi nào sau đây thể hiện sự tôn trọng lẽ phải?',
            options: ['A. Thấy bạn chép bài trong giờ kiểm tra liền làm theo', 'B. Gió chiều nào che chiều ấy', 'C. Dũng cảm phê bình hành vi sai trái của bạn'],
            correctAnswer: 'C. Dũng cảm phê bình hành vi sai trái của bạn'
          },
          {
            question: 'Tôn trọng lẽ phải giúp con người...',
            options: ['A. Có một cuộc sống thanh thản', 'B. Trở nên xa cách với mọi người', 'C. Luôn gặp rắc rối'],
            correctAnswer: 'A. Có một cuộc sống thanh thản'
          }
        ],
        aiPromptSuggestion: 'AI ơi, tạo một tình huống ngắn về việc lựa chọn giữa nói thật và bao che cho bạn bè!',
      }
    ]
  }
};