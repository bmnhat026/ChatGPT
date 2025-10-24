import type { EvaluationCriterion } from '../data/course';

export type EvaluationBreakdown = {
  label: string;
  score: number;
  description: string;
  met: boolean;
  suggestions: string[];
};

export type EvaluationResult = {
  totalScore: number;
  breakdown: EvaluationBreakdown[];
  notes: string[];
};

const tokenize = (prompt: string): string[] =>
  prompt
    .toLowerCase()
    .replace(/[\n\r]+/g, ' ')
    .replace(/[^a-zà-ỹ0-9\s]/giu, '')
    .split(/\s+/)
    .filter(Boolean);

const hasChecklistLanguage = (prompt: string) =>
  /(bullet|danh\s*sách|list|checklist|bảng|table)/i.test(prompt);

const countContextMarkers = (tokens: string[]): number =>
  tokens.filter((token) =>
    [
      'because',
      'vì',
      'context',
      'ngữ',
      'data',
      'dữ',
      'background',
      'scenario',
      'bối',
      'given',
      'input',
      'resource',
      'tài',
      'audience',
      'khán',
      'persona',
    ].some((marker) => token.startsWith(marker)),
  ).length;

const hasRoleStatement = (prompt: string) => /(pretend|đóng\s*vai|bạn\s*là)/i.test(prompt);

const countFormattingMarkers = (prompt: string) =>
  (prompt.match(/\b(step|bullet|format|định\s*dạng|table|json|markdown)/gi) ?? []).length;

const richnessScore = (prompt: string) => {
  const sentences = prompt.split(/[.!?\n]+/).filter((s) => s.trim().length > 0);
  const avgLength = sentences.length
    ? sentences.reduce((total, sentence) => total + sentence.trim().split(/\s+/).length, 0) /
      sentences.length
    : 0;
  return Math.min(100, Math.round(avgLength * 5));
};

const suggestionsByCriterion: Record<string, string[]> = {
  Clarity: [
    'Chia nhiệm vụ thành từng câu rõ ràng thay vì gộp nhiều yêu cầu.',
    'Viết động từ hành động đầu câu như "Hãy", "Giúp tôi", "Tạo".',
    'Giải thích lý do hoặc mục đích của yêu cầu ngay từ đầu.',
  ],
  Specificity: [
    'Đặt giới hạn về độ dài, số lượng hoặc thời gian hoàn thành.',
    'Mô tả rõ ai sẽ sử dụng kết quả và nhu cầu của họ.',
    'Bổ sung ví dụ minh họa hoặc cấu trúc mẫu mong muốn.',
  ],
  Context: [
    'Chèn dữ liệu nền hoặc tình huống cụ thể giúp AI hiểu môi trường làm việc.',
    'Nêu nguồn dữ liệu và cách AI nên sử dụng chúng.',
    'Yêu cầu AI xác nhận đã hiểu ngữ cảnh trước khi trả lời.',
  ],
  Effectiveness: [
    'Đưa ra định dạng đầu ra mong muốn (bullet, bảng, JSON, ...).',
    'Thiết lập tiêu chí đánh giá để AI tự kiểm tra trước khi gửi kết quả.',
    'Thêm nhắc nhở để AI phản hồi nếu thiếu thông tin quan trọng.',
  ],
};

export const evaluatePrompt = (
  prompt: string,
  criteria: EvaluationCriterion[],
): EvaluationResult => {
  const tokens = tokenize(prompt);
  const wordCount = tokens.length;
  const contextMarkers = countContextMarkers(tokens);
  const formatMarkers = countFormattingMarkers(prompt);
  const roleStatement = hasRoleStatement(prompt);
  const checklistLanguage = hasChecklistLanguage(prompt);
  const richness = richnessScore(prompt);

  const clarity = Math.min(100, Math.round((wordCount > 30 ? 70 : 55) + richness * 0.2));
  const specificity = Math.min(
    100,
    Math.round(
      (formatMarkers > 0 ? 25 : 10) +
        (checklistLanguage ? 20 : 10) +
        (roleStatement ? 15 : 5) +
        Math.min(wordCount, 80) * 0.3,
    ),
  );
  const contextScore = Math.min(100, Math.round((contextMarkers * 12 + (wordCount > 40 ? 20 : 5))));
  const effectiveness = Math.min(
    100,
    Math.round(
      (formatMarkers > 1 ? 30 : formatMarkers > 0 ? 20 : 10) +
        (checklistLanguage ? 15 : 5) +
        (roleStatement ? 10 : 5) +
        richness * 0.3,
    ),
  );

  const computed: Record<string, number> = {
    Clarity: clarity,
    Specificity: specificity,
    Context: contextScore,
    Effectiveness: effectiveness,
  };

  const breakdown: EvaluationBreakdown[] = criteria.map((criterion) => {
    const score = computed[criterion.label] ?? 50;
    const met = score >= criterion.minimumScore;
    const suggestions = met
      ? ['Tiếp tục duy trì cấu trúc rõ ràng và kiểm tra lại checklist trước khi gửi.']
      : suggestionsByCriterion[criterion.label]?.slice(0, 2) ?? ['Bổ sung chi tiết cho tiêu chí này.'];

    return {
      label: criterion.label,
      score,
      description: criterion.description,
      met,
      suggestions,
    };
  });

  const totalScore = Math.round(
    breakdown.reduce((sum, item) => sum + item.score, 0) / Math.max(breakdown.length, 1),
  );

  const lowest = breakdown.reduce((current, item) => (item.score < current.score ? item : current));

  const notes: string[] = [];
  if (!lowest.met) {
    notes.push(`Tập trung cải thiện tiêu chí "${lowest.label}" trước tiên.`);
  }
  if (roleStatement === false) {
    notes.push('Thử yêu cầu AI "đóng vai" hoặc chỉ rõ vai trò để tăng độ nhập vai.');
  }
  if (formatMarkers === 0) {
    notes.push('Nhắc AI về định dạng mong muốn (ví dụ: bullet, bảng, JSON) để giảm sai lệch.');
  }
  if (contextMarkers < 2) {
    notes.push('Bổ sung thêm 1-2 chi tiết ngữ cảnh giúp AI hiểu tình huống cụ thể hơn.');
  }

  return {
    totalScore,
    breakdown,
    notes,
  };
};
