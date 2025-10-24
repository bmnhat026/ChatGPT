# Nền tảng Học Prompt AI

## Chạy demo giao diện học tập

Giao diện web prototype được xây dựng bằng React + Vite để mô phỏng flow học của Module 1.

1. Cài đặt dependencies: `npm install`
2. Khởi chạy môi trường phát triển: `npm run dev`
3. Mở trình duyệt tại địa chỉ được in ra (mặc định: http://localhost:5173)

### Các tính năng đã có trong prototype

- Danh sách 15 module với trạng thái mở khóa/sắp ra mắt.
- Module 1 gồm 5 bài học với kịch bản từng bước, checklist luyện tập và tiêu chí chấm điểm.
- Bộ chấm điểm giả lập dựa trên tiêu chí Clarity, Specificity, Context, Effectiveness.
- Lưu lịch sử các lần đánh giá, hiển thị điểm tốt nhất và yêu cầu tối thiểu để mở bài kế tiếp.
- Logic khóa/mở bài học: phải đạt điểm chuẩn và số lần luyện tập tối thiểu mới đánh dấu hoàn thành.

---

## 1. Tầm nhìn & Giá trị cốt lõi
- **Sứ mệnh:** Giúp người học tại Việt Nam làm chủ kỹ năng viết prompt thông qua lộ trình học tập có hướng dẫn, phản hồi AI theo từng bước và hệ thống gamification thúc đẩy việc học đều đặn.
- **Mô hình sản phẩm:** Mobile-first (iOS/Android) kết hợp Web App, cung cấp 1 khóa học duy nhất với 15 modules (75 lessons), vận hành theo subscription.
- **Khác biệt:** Kịch bản thực hành rõ ràng, AI đánh giá tức thì ≥80% mới mở khóa bài kế tiếp, trải nghiệm học giống Elsa Speak + freeCodeCamp.

## 2. Chân dung người dùng & vai trò
| Vai trò | Quyền truy cập | Mục tiêu chính |
| --- | --- | --- |
| **Học viên Trial** | 7 ngày, mở Module 1 (5 lessons) | Trải nghiệm lộ trình, chứng minh giá trị trước khi auto-charge |
| **Học viên Trả phí** | Toàn bộ 15 modules, nhận certificate | Thành thạo viết prompt, tích lũy huy hiệu, thăng hạng leaderboard |
| **Admin** | Quản lý users, nội dung, thanh toán, analytics, affiliate | Duy trì chất lượng nội dung, theo dõi hiệu quả kinh doanh |

## 3. Lộ trình học viết Prompt từ cơ bản đến nâng cao
### 3.1 Nguyên tắc xây dựng
1. **Tiến trình tuyến tính:** Hoàn thành lesson trước (≥80%) mới mở lesson sau.
2. **Phản hồi AI đa tiêu chí:** Clarity – Specificity – Context – Effectiveness.
3. **Kết hợp đa phương tiện:** Video, bài viết, bài tập tương tác, AI playground, quiz.
4. **Gamification:** Điểm, streak, badge, leaderboard tăng động lực.

### 3.2 Cấu trúc khóa học
- **Module 1: Foundations of Prompting** (Free Trial)
- **Module 2: Prompt Mindset & Frameworks**
- **Module 3: Writing Clarity & Context**
- **Module 4: Role & Persona Prompting**
- **Module 5: Constraint & Format Engineering**
- **Module 6: Multi-step Reasoning Prompts**
- **Module 7: Creative Content Generation**
- **Module 8: Analytical & Data-focused Prompts**
- **Module 9: Prompting for Coding & Debugging**
- **Module 10: Prompting for Automation & Workflows**
- **Module 11: Evaluation & Critique Prompts**
- **Module 12: Prompt Optimization Loop**
- **Module 13: Domain-specific Prompting (Marketing, Sales, HR)**
- **Module 14: Prompting with External Tools & APIs**
- **Module 15: Capstone – Prompt Strategy & Portfolio**

### 3.3 Chi tiết 5 lessons mỗi module
Mỗi module tuân thủ cấu trúc lesson thống nhất:
1. **Lesson 1 – Khởi động khái niệm**
2. **Lesson 2 – Video hướng dẫn + Script demo**
3. **Lesson 3 – Thực hành có hướng dẫn**
4. **Lesson 4 – Bài tập ứng dụng nâng cao**
5. **Lesson 5 – Quiz + Dự án mini + Đánh giá AI**

### 3.4 Module 1 chi tiết (Free Trial)
| Lesson | Tiêu đề | Kịch bản hướng dẫn từng bước | Bài tập với AI | Tiêu chí đánh giá |
| --- | --- | --- | --- | --- |
| **L1. Đặt câu hỏi Prompt cơ bản** | Người học làm quen với khái niệm prompt, ví dụ phân tích prompt tốt/xấu. | 1. Xem video intro (3’). 2. Đọc bài viết về cấu trúc câu hỏi (ai, mục tiêu, ngữ cảnh). 3. Theo script: chọn một tác vụ đơn giản (ví dụ “lên danh sách ý tưởng bữa sáng”), điền template 3W1H. | Học viên nhập prompt đầu tiên vào AI Playground. Hệ thống phản hồi điểm + gợi ý cải thiện; yêu cầu chỉnh sửa ≥2 lần. | Clarity ≥70, Specificity ≥60, Context ≥50, Effectiveness ≥60. Tổng ≥80 để pass. |
| **L2. Hiểu mục tiêu và đầu ra mong muốn** | Làm rõ goal-setting khi viết prompt. | Script 5 bước: (1) xác định đầu ra, (2) mô tả audience, (3) giới hạn thời gian/tone, (4) đưa ví dụ, (5) yêu cầu format. | Bài tập: Viết prompt yêu cầu AI tạo checklist buổi họp. AI chấm và gợi ý thiếu format. | Thang điểm tương tự, nhấn mạnh Specificity ≥70. |
| **L3. Bối cảnh và nguồn dữ liệu** | Lồng ghép ngữ cảnh, dữ liệu vào prompt. | Script: (1) liệt kê thông tin đã có, (2) cung cấp tài nguyên, (3) yêu cầu AI xác nhận hiểu. | Bài tập: Prompt tóm tắt bài viết (đính kèm văn bản). AI feedback nếu thiếu hướng dẫn tóm tắt. | Context ≥70, tổng ≥80. |
| **L4. Điều chỉnh và lặp lại prompt** | Học cách debug prompt qua vòng lặp. | Script: (1) đọc feedback AI, (2) xác định yếu tố thiếu, (3) chỉnh sửa từng phần, (4) kiểm tra lại. | Bài tập: Cải thiện prompt từ Lesson 2 dựa trên feedback. | Yêu cầu cải thiện ≥10 điểm sau mỗi lần chỉnh. |
| **L5. Quiz & Mini project** | Ôn tập, chuyển giao bài tập mini. | Quiz 10 câu (MCQ + true/false + fill blank). Mini project: Viết prompt hoàn chỉnh cho bài toán cá nhân. | AI chấm, nếu <80 cho phép xem gợi ý và làm lại. | Tất cả tiêu chí ≥70, tổng ≥85. |

### 3.5 Mẫu kịch bản hướng dẫn từng bước (áp dụng cho mọi lesson)
1. **Introduce** – Video/audio giải thích lý thuyết (3-5 phút).
2. **Script Template** – Bảng 3-5 bước + ví dụ mẫu.
3. **Guided Practice** – Bài tập có sẵn dữ liệu, nhắc từng bước.
4. **AI Playground** – Học viên nhập prompt, nhận feedback từ Gemini API.
5. **Reflect & Iterate** – AI gợi ý cải thiện, học viên chỉnh sửa.
6. **Quiz/Checkpoint** – Kiểm tra kiến thức, unlock bài sau.

## 4. Luồng học tập & đánh giá AI
1. **Chọn lesson** → hiển thị checklist nhiệm vụ (video, đọc tài liệu, làm bài).
2. **Thực hiện Guided Practice** → nhập prompt vào AI Playground.
3. **AI Assessment** (Gemini API):
   - Phân tích prompt theo 4 trụ cột.
   - Gợi ý cải thiện bằng bullet.
   - Lưu lịch sử hội thoại cho lesson.
4. **Điều kiện pass:** Điểm trung bình ≥80. Nếu chưa đạt, buộc điều chỉnh.
5. **Unlock bài kế tiếp** → cập nhật streak, điểm kinh nghiệm, leaderboard.
6. **Hoàn thành module** → nhận badge + mở module mới (nếu là user trả phí).

## 5. Nội dung 15 Modules (tóm tắt)
| Module | Chủ đề chính | Kết quả mong đợi |
| --- | --- | --- |
| 1 | Foundations of Prompting | Biết viết prompt cơ bản, hiểu tiêu chí đánh giá |
| 2 | Prompt Mindset & Frameworks | Vận dụng frameworks (5W1H, CLEAR, ABCD) |
| 3 | Writing Clarity & Context | Tạo prompt rõ ràng, đầy đủ ngữ cảnh |
| 4 | Role & Persona Prompting | Đặt vai trò nhân vật, tone chuẩn |
| 5 | Constraint & Format Engineering | Thiết kế output có cấu trúc, format cụ thể |
| 6 | Multi-step Reasoning | Hướng AI suy luận nhiều bước |
| 7 | Creative Content | Sinh ý tưởng, storytelling |
| 8 | Analytical & Data | Tạo báo cáo, insight, bảng biểu |
| 9 | Coding & Debugging | Hỗ trợ viết code, kiểm thử, sửa lỗi |
| 10 | Automation & Workflows | Thiết kế prompt cho tác vụ lặp lại |
| 11 | Evaluation & Critique | Viết prompt chấm điểm, phản biện |
| 12 | Optimization Loop | Kết hợp A/B testing, prompt library |
| 13 | Domain-specific | Prompt marketing, sales, HR |
| 14 | External Tools & APIs | Prompt sử dụng plugin, API, dữ liệu ngoài |
| 15 | Capstone & Portfolio | Xây dựng bộ prompt cá nhân, case study |

## 6. Tính năng sản phẩm (MVP)
### 6.1 Authentication & Profile
- Email/Password, Google OAuth, Apple Sign-In, xác thực email, quên mật khẩu.
- Hồ sơ học viên: ảnh đại diện, bio, mục tiêu học, thống kê tiến độ, streak.

### 6.2 Learning Experience
- Video player hỗ trợ speed 0.5x-2x, phụ đề song ngữ, resume playback.
- Text lesson với hình ảnh minh họa, ví dụ prompt tốt/xấu.
- Interactive exercises: drag-drop, điền mẫu prompt, matching format.
- AI Playground tích hợp Gemini API, lưu lịch sử theo lesson.
- Quiz đa dạng (MCQ, True/False, Fill blank, Matching, Short answer) với feedback tức thì.

### 6.3 Progress & Gamification
- Tracking % hoàn thành lesson/module/course.
- Streak ngày học, điểm, badge milestone (Module completion, streak, leaderboard top 10).
- Leaderboard weekly/monthly/all-time.
- Certificate PDF tự động khi hoàn thành 15 modules.

### 6.4 Notifications & Support
- Push: nhắc học bài, streak, gia hạn subscription.
- Email: welcome, trial ending, payment confirm, certificate, weekly report.
- Support: FAQ, email support (24-48h), in-app feedback form.

## 7. Hệ thống thanh toán & subscription
- Stripe subscription: Monthly 150,000 VND, Annual 1,260,000 VND (-30%).
- Trial 7 ngày, yêu cầu nhập thẻ, auto-charge, không refund.
- Affiliate: tracking link, commission % (cần xác định), payout theo kỳ (đề xuất hàng tháng).

## 8. Kiến trúc kỹ thuật đề xuất
- **Frontend Mobile:** React Native + Expo.
- **Frontend Web:** Next.js + Tailwind CSS, triển khai trên Vercel.
- **Backend API:** Node.js + Express, triển khai Railway/Render.
- **Database:** PostgreSQL (schema lesson, user progress, subscription, AI history).
- **Authentication:** Firebase Authentication.
- **Payment:** Stripe.
- **AI:** Google Gemini API (nhiệm vụ đánh giá prompt & feedback).
- **Storage:** AWS S3 + CloudFront cho video, tài liệu.
- **Email:** SendGrid/Resend.
- **Analytics:** GA4 + Mixpanel; Monitoring: Sentry.
- **CI/CD:** GitHub Actions.

## 9. Luồng hệ thống AI Assessment
1. User gửi prompt → Backend gọi Gemini API với context script đánh giá.
2. Nhận phản hồi gồm: điểm từng tiêu chí, nhận xét chi tiết, đề xuất chỉnh sửa.
3. Lưu kết quả + prompt version vào DB để so sánh trước/sau.
4. Nếu tổng điểm <80 → hiển thị checklist cải thiện, khóa tiến trình.
5. Nếu ≥80 → cấp điểm kinh nghiệm, cập nhật leaderboard, mở khóa lesson.

## 10. Quản trị nội dung & admin
- CRUD modules/lessons/quizzes (form editor, upload video).
- Quản lý người dùng: tìm kiếm, xem trạng thái subscription, khóa/mở.
- Analytics dashboard: signups, active users, conversion, churn, completion rates, quiz scores, AI usage, doanh thu (MRR/ARR).
- Payment management: theo dõi billing, failed payments.
- Affiliate: manage link, hoa hồng, lịch sử payout.

## 11. Bảo mật & Hiệu năng
- HTTPS, JWT auth, dữ liệu nhạy cảm mã hóa, rate limiting.
- Tuân thủ GDPR cơ bản, PCI DSS qua Stripe, Privacy Policy & Terms rõ ràng.
- Performance targets: API <300ms, page load <3s, video start <2s, uptime >99.5%, app size <50MB.

## 12. Kế hoạch triển khai (đến 11/2025)
| Giai đoạn | Thời gian | Deliverables chính |
| --- | --- | --- |
| Discovery & Branding | Q1/2024 | Xác định budget, brand identity, logo, style guide |
| Content Production | Q2-Q3/2024 | 75 bài học (script, video, bài viết), template AI feedback |
| MVP Development | Q4/2024-Q2/2025 | Mobile app, web app, backend, AI evaluation, Stripe integration |
| Testing & Beta | Q3/2025 | Closed beta 200 users, tối ưu UX, chuẩn bị launch store |
| Launch & Scale | Q4/2025 | Public launch, affiliate program, marketing |

## 13. Rủi ro & Giảm thiểu
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Gemini API downtime | Học viên không được đánh giá | Caching, fallback message, rate limiting |
| Video streaming lag | Giảm trải nghiệm | Sử dụng CDN, adaptive bitrate |
| App store rejection | Chậm ra mắt | Tuân thủ guideline, beta test |
| Low conversion | Doanh thu giảm | Tối ưu onboarding, nội dung module 1 chất lượng |
| High churn | Mất người dùng | Gamification, cập nhật nội dung liên tục |

## 14. Vấn đề cần làm rõ
- Budget V1 & chi phí vận hành hàng tháng.
- Nguồn lực sản xuất nội dung (video/text) & tiêu chuẩn chất lượng.
- Branding: tên app, domain, bộ nhận diện.
- Đội ngũ hiện tại & nhu cầu tuyển dụng.
- Chi tiết commission affiliate (tỷ lệ %, kỳ thanh toán).
- Specs video (thời lượng, định dạng), sample lesson để chuẩn hóa.

## 15. Định hướng phát triển sau MVP (Out of scope V1)
- Bổ sung cộng đồng, live chat, giảng viên.
- Tích hợp prompt marketplace, recommendation engine.
- Mở rộng khóa học mới, chuyên sâu theo ngành.

---
**Next Step:** Xác nhận brand, budget, kế hoạch sản xuất nội dung để kick-off giai đoạn Discovery.
