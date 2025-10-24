export type EvaluationCriterion = {
  label: string;
  description: string;
  minimumScore: number;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  scriptSteps: string[];
  guidedPractice: {
    scenario: string;
    promptTemplate: string;
    reminders: string[];
  };
  reflection: string[];
  evaluation: {
    passingScore: number;
    criteria: EvaluationCriterion[];
  };
  recommendedIterations: number;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  releaseStatus: 'available' | 'coming-soon';
  lessons: Lesson[];
};

const module1Lessons: Lesson[] = [
  {
    id: 'm1-l1',
    title: 'Đặt câu hỏi Prompt cơ bản',
    summary:
      'Làm quen với cấu trúc 3W1H và các thành phần tạo nên một câu hỏi rõ ràng cho AI.',
    scriptSteps: [
      'Xác định mục tiêu chính của tác vụ bạn muốn AI hỗ trợ.',
      'Viết ra đối tượng sử dụng kết quả (audience) và giọng điệu mong muốn.',
      'Bổ sung ngữ cảnh hoặc dữ liệu nền tảng giúp AI hiểu đúng bối cảnh.',
      'Đặt ra định dạng đầu ra cụ thể (danh sách, bảng, đoạn văn, ...).',
    ],
    guidedPractice: {
      scenario:
        'Chọn một tác vụ đời sống đơn giản (vd: "lên danh sách bữa sáng"), sau đó áp dụng template 3W1H để viết prompt.',
      promptTemplate:
        'Bạn là [vai trò]. Hãy hỗ trợ tôi hoàn thành [mục tiêu] cho [đối tượng]. Ngữ cảnh: [bối cảnh]. Vui lòng trả lời theo định dạng [định dạng mong muốn].',
      reminders: [
        'Đảm bảo câu mở đầu mô tả rõ nhiệm vụ.',
        'Nêu rõ người nhận kết quả là ai.',
        'Thêm ít nhất một yêu cầu định dạng.',
      ],
    },
    reflection: [
      'Prompt đã mô tả rõ bạn cần AI làm gì chưa?',
      'Ngữ cảnh nào còn thiếu khiến AI hiểu sai nhiệm vụ?',
      'Có thể bổ sung ví dụ mẫu để tăng độ rõ ràng không?',
    ],
    evaluation: {
      passingScore: 80,
      criteria: [
        {
          label: 'Clarity',
          description: 'Mệnh đề nhiệm vụ và yêu cầu chính dễ hiểu, không mơ hồ.',
          minimumScore: 70,
        },
        {
          label: 'Specificity',
          description: 'Đề cập đối tượng, phạm vi, ràng buộc cụ thể.',
          minimumScore: 60,
        },
        {
          label: 'Context',
          description: 'Cung cấp dữ liệu nền, ví dụ hoặc tình huống cụ thể.',
          minimumScore: 50,
        },
        {
          label: 'Effectiveness',
          description: 'Đặt kỳ vọng rõ về định dạng và đầu ra mong muốn.',
          minimumScore: 60,
        },
      ],
    },
    recommendedIterations: 2,
  },
  {
    id: 'm1-l2',
    title: 'Hiểu mục tiêu và đầu ra mong muốn',
    summary:
      'Làm rõ mục tiêu đầu ra, khán giả mục tiêu, và các yêu cầu định dạng để AI trả lời chính xác.',
    scriptSteps: [
      'Viết ra mục tiêu cụ thể của đầu ra (vd: tạo checklist, viết email...).',
      'Xác định người sẽ sử dụng kết quả để điều chỉnh ngôn ngữ.',
      'Đặt giới hạn thời gian, độ dài hoặc tone of voice phù hợp.',
      'Thêm ví dụ mẫu hoặc cấu trúc bạn mong muốn AI làm theo.',
      'Nhắc AI xác nhận lại trước khi tạo đầu ra.',
    ],
    guidedPractice: {
      scenario:
        'Viết prompt yêu cầu AI tạo checklist buổi họp cho đội marketing trong 30 phút với giọng thân thiện.',
      promptTemplate:
        'Bạn là [vai trò]. Tôi cần bạn tạo [đầu ra] cho [đối tượng] với giọng điệu [tone]. Xin hãy giới hạn trong [độ dài/thời gian] và trình bày theo định dạng [format].',
      reminders: [
        'Nhắc tới mục tiêu cuối cùng của checklist.',
        'Gợi ý cấu trúc từng mục rõ ràng.',
        'Yêu cầu AI xác nhận đã hiểu trước khi tạo checklist.',
      ],
    },
    reflection: [
      'Checklist đã thể hiện đúng các mục cần thiết chưa?',
      'Có tiêu chí nào để AI tự đánh giá trước khi trả lời?',
      'Bạn có thể yêu cầu ví dụ minh họa không?',
    ],
    evaluation: {
      passingScore: 82,
      criteria: [
        {
          label: 'Clarity',
          description: 'Nhiệm vụ chính được mô tả rõ ràng.',
          minimumScore: 70,
        },
        {
          label: 'Specificity',
          description: 'Nêu rõ mục tiêu, audience và tone.',
          minimumScore: 70,
        },
        {
          label: 'Context',
          description: 'Đưa ra thông tin nền hoặc tình huống.',
          minimumScore: 55,
        },
        {
          label: 'Effectiveness',
          description: 'Bao gồm định dạng và yêu cầu xác nhận.',
          minimumScore: 65,
        },
      ],
    },
    recommendedIterations: 2,
  },
  {
    id: 'm1-l3',
    title: 'Bối cảnh và nguồn dữ liệu',
    summary:
      'Học cách đính kèm dữ liệu nền và yêu cầu AI xác nhận đã hiểu trước khi trả lời.',
    scriptSteps: [
      'Liệt kê các thông tin/dữ liệu bạn đã có sẵn.',
      'Chỉ định rõ cách AI nên sử dụng dữ liệu đó.',
      'Hướng dẫn AI đặt câu hỏi làm rõ trước khi bắt đầu.',
      'Thiết lập tiêu chí đánh giá kết quả.',
    ],
    guidedPractice: {
      scenario:
        'Sử dụng một đoạn bài viết mẫu và yêu cầu AI tóm tắt theo cấu trúc bullet gồm insight chính và hành động đề xuất.',
      promptTemplate:
        'Tôi cung cấp cho bạn văn bản sau:\n[đoạn văn bản]\nHãy tóm tắt thành [định dạng] với các ý chính [yêu cầu cụ thể]. Trước khi trả lời, hãy xác nhận đã hiểu dữ liệu.',
      reminders: [
        'Chỉ rõ đoạn văn bản được đặt ở đâu.',
        'Yêu cầu AI kiểm tra lại tiêu chí tóm tắt.',
        'Đưa ra độ dài mong muốn cho từng mục.',
      ],
    },
    reflection: [
      'AI có xác nhận đã hiểu dữ liệu chưa?',
      'Tóm tắt đã bám sát tiêu chí bạn đặt ra?',
      'Có cần yêu cầu AI gợi ý hành động tiếp theo không?',
    ],
    evaluation: {
      passingScore: 83,
      criteria: [
        {
          label: 'Clarity',
          description: 'Hướng dẫn tóm tắt rõ ràng và tuần tự.',
          minimumScore: 72,
        },
        {
          label: 'Specificity',
          description: 'Đưa ra yêu cầu về độ dài và cấu trúc.',
          minimumScore: 68,
        },
        {
          label: 'Context',
          description: 'Tích hợp dữ liệu nguồn đầy đủ.',
          minimumScore: 70,
        },
        {
          label: 'Effectiveness',
          description: 'Nhấn mạnh xác nhận hiểu và tiêu chí đánh giá.',
          minimumScore: 65,
        },
      ],
    },
    recommendedIterations: 2,
  },
  {
    id: 'm1-l4',
    title: 'Điều chỉnh và lặp lại prompt',
    summary:
      'Phát triển vòng lặp cải thiện prompt dựa trên feedback và đo mức tăng điểm.',
    scriptSteps: [
      'Đánh dấu các tiêu chí chưa đạt từ lần đánh giá trước.',
      'Chọn một tiêu chí để tối ưu trước và viết lại câu tương ứng.',
      'So sánh điểm trước-sau và ghi nhận thay đổi.',
      'Lặp lại cho đến khi điểm tăng tối thiểu 10 điểm.',
    ],
    guidedPractice: {
      scenario:
        'Tối ưu lại prompt từ Lesson 2 dựa trên phản hồi bạn đã nhận được ở lần đánh giá trước.',
      promptTemplate:
        'Đây là phiên bản prompt mới dựa trên phản hồi trước đó:\n[phiên bản cập nhật]\nHãy đánh giá lại và gợi ý một cải tiến tiếp theo.',
      reminders: [
        'Lưu lại điểm số từng vòng để so sánh.',
        'Ghi chú thay đổi cụ thể bạn đã thực hiện.',
        'Nhấn mạnh mong muốn tăng tối thiểu 10 điểm.',
      ],
    },
    reflection: [
      'Tiêu chí nào cải thiện nhiều nhất sau mỗi vòng?',
      'Bạn học được mô hình điều chỉnh nào hữu ích?',
      'Prompt đã sẵn sàng áp dụng cho tình huống thực tế chưa?',
    ],
    evaluation: {
      passingScore: 85,
      criteria: [
        {
          label: 'Clarity',
          description: 'Phiên bản mới loại bỏ mơ hồ và nêu rõ yêu cầu.',
          minimumScore: 74,
        },
        {
          label: 'Specificity',
          description: 'Tập trung vào thay đổi cụ thể từ feedback.',
          minimumScore: 72,
        },
        {
          label: 'Context',
          description: 'Phản ánh dữ liệu hoặc feedback đã nhận.',
          minimumScore: 68,
        },
        {
          label: 'Effectiveness',
          description: 'Chỉ rõ mục tiêu tăng điểm và tiêu chí thành công.',
          minimumScore: 70,
        },
      ],
    },
    recommendedIterations: 3,
  },
  {
    id: 'm1-l5',
    title: 'Quiz & Mini project',
    summary:
      'Tổng hợp kiến thức Module 1 và xây dựng prompt hoàn chỉnh cho bài toán cá nhân.',
    scriptSteps: [
      'Ôn lại các checklist của 4 lessons trước.',
      'Thiết kế prompt cá nhân với bối cảnh thật bạn đang gặp.',
      'Viết mục tiêu đầu ra, audience, tone và định dạng rõ ràng.',
      'Chuẩn bị câu hỏi tự kiểm tra sau khi AI trả lời.',
    ],
    guidedPractice: {
      scenario:
        'Chọn một dự án cá nhân (vd: lên kế hoạch workshop, viết email chiến dịch) và viết prompt hoàn chỉnh kèm tiêu chí đánh giá.',
      promptTemplate:
        'Tôi đang làm việc trên [bối cảnh cá nhân]. Hãy đóng vai [vai trò] và tạo [đầu ra] đáp ứng các tiêu chí: [tiêu chí]. Đảm bảo kết quả có định dạng [format]. Trước khi hoàn thành, hãy xác nhận lại checklist.',
      reminders: [
        'Đính kèm checklist tiêu chí đánh giá.',
        'Yêu cầu AI phản hồi nếu thiếu thông tin.',
        'Đặt điều kiện tổng điểm tối thiểu để pass.',
      ],
    },
    reflection: [
      'Prompt đã bao phủ hết tiêu chí thành công chưa?',
      'AI có hiểu rõ vai trò và kỳ vọng đầu ra không?',
      'Bạn sẽ bảo trì prompt này trong thư viện cá nhân như thế nào?',
    ],
    evaluation: {
      passingScore: 87,
      criteria: [
        {
          label: 'Clarity',
          description: 'Thông điệp liền mạch, dễ hiểu với vai trò AI.',
          minimumScore: 78,
        },
        {
          label: 'Specificity',
          description: 'Các tiêu chí thành công rõ ràng và đo lường được.',
          minimumScore: 76,
        },
        {
          label: 'Context',
          description: 'Chia sẻ đủ thông tin nền để AI đưa ra giải pháp sát thực.',
          minimumScore: 74,
        },
        {
          label: 'Effectiveness',
          description: 'Nhấn mạnh checklist đánh giá và định dạng đầu ra.',
          minimumScore: 75,
        },
      ],
    },
    recommendedIterations: 3,
  },
];

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Foundations of Prompting',
    description:
      'Làm chủ những nguyên tắc nền tảng để viết prompt rõ ràng, có ngữ cảnh và đo lường được.',
    releaseStatus: 'available',
    lessons: module1Lessons,
  },
  {
    id: 'module-2',
    title: 'Prompt Mindset & Frameworks',
    description:
      'Khám phá các framework tư duy (CLEAR, ABCD, 5W1H) để kiến trúc prompt nhanh và chuẩn.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-3',
    title: 'Writing Clarity & Context',
    description:
      'Tăng cường độ rõ ràng và tính đầy đủ của prompt trong môi trường doanh nghiệp.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-4',
    title: 'Role & Persona Prompting',
    description:
      'Khai thác vai trò và persona để tạo trải nghiệm tương tác chân thực với AI.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-5',
    title: 'Constraint & Format Engineering',
    description:
      'Thiết lập ràng buộc và cấu trúc đầu ra chi tiết để giảm sai lệch.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-6',
    title: 'Multi-step Reasoning Prompts',
    description:
      'Dẫn dắt AI suy luận nhiều bước với checklist hướng dẫn cụ thể.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-7',
    title: 'Creative Content Generation',
    description:
      'Ứng dụng prompt để phát triển ý tưởng sáng tạo, storytelling và concept marketing.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-8',
    title: 'Analytical & Data-focused Prompts',
    description:
      'Sử dụng AI để phân tích dữ liệu, tạo insight và báo cáo trực quan.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-9',
    title: 'Prompting for Coding & Debugging',
    description:
      'Xây dựng prompt hỗ trợ viết code, review và sửa lỗi hiệu quả.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-10',
    title: 'Prompting for Automation & Workflows',
    description:
      'Chuẩn hóa tác vụ lặp lại bằng prompt đa bước và checklist tự động.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-11',
    title: 'Evaluation & Critique Prompts',
    description:
      'Viết prompt để AI chấm điểm, phản biện và đưa ra khuyến nghị cải thiện.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-12',
    title: 'Prompt Optimization Loop',
    description:
      'Thiết kế quy trình tối ưu prompt liên tục với A/B testing và thư viện version.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-13',
    title: 'Domain-specific Prompting',
    description:
      'Áp dụng prompt chuyên sâu cho marketing, sales, HR và dịch vụ khách hàng.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-14',
    title: 'Prompting with External Tools & APIs',
    description:
      'Kết hợp plugin, API và dữ liệu ngoài để mở rộng khả năng AI.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
  {
    id: 'module-15',
    title: 'Capstone – Prompt Strategy & Portfolio',
    description:
      'Xây dựng portfolio prompt cá nhân với case study thực tế.',
    releaseStatus: 'coming-soon',
    lessons: [],
  },
];
