import { useMemo, useState } from 'react';
import { courseModules, type Lesson, type Module } from './data/course';
import { evaluatePrompt, type EvaluationResult } from './utils/evaluatePrompt';
import './styles/app.css';

type LessonProgress = {
  attempts: EvaluationResult[];
  promptVersions: string[];
  completed: boolean;
};

const getLessonProgress = (
  progress: Record<string, LessonProgress>,
  lessonId: string,
): LessonProgress =>
  progress[lessonId] ?? {
    attempts: [],
    promptVersions: [],
    completed: false,
  };

const findModuleById = (modules: Module[], moduleId: string) =>
  modules.find((moduleItem) => moduleItem.id === moduleId) ?? modules[0];

const findLessonById = (moduleItem: Module, lessonId?: string): Lesson | undefined =>
  moduleItem.lessons.find((lesson) => lesson.id === lessonId) ?? moduleItem.lessons[0];

const isLessonUnlocked = (
  moduleItem: Module,
  lesson: Lesson,
  progress: Record<string, LessonProgress>,
): boolean => {
  if (moduleItem.releaseStatus !== 'available') {
    return false;
  }
  const index = moduleItem.lessons.findIndex((item) => item.id === lesson.id);
  if (index <= 0) {
    return true;
  }
  return moduleItem.lessons
    .slice(0, index)
    .every((previousLesson) => getLessonProgress(progress, previousLesson.id).completed);
};

const nextLessonId = (moduleItem: Module, lesson: Lesson): string | undefined => {
  const index = moduleItem.lessons.findIndex((item) => item.id === lesson.id);
  return moduleItem.lessons[index + 1]?.id;
};

const formatScore = (value: number) => `${value}%`;

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState(courseModules[0]?.id ?? '');
  const [selectedLessonId, setSelectedLessonId] = useState(courseModules[0]?.lessons[0]?.id ?? '');
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [promptDraft, setPromptDraft] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedModule = useMemo(
    () => findModuleById(courseModules, selectedModuleId),
    [selectedModuleId],
  );

  const selectedLesson = useMemo(
    () =>
      selectedModule && selectedModule.lessons.length > 0
        ? findLessonById(selectedModule, selectedLessonId)
        : undefined,
    [selectedModule, selectedLessonId],
  );

  const selectedLessonProgress = useMemo(
    () => (selectedLesson ? getLessonProgress(progress, selectedLesson.id) : undefined),
    [progress, selectedLesson],
  );

  const bestScore = useMemo(() => {
    if (!selectedLessonProgress) return 0;
    return selectedLessonProgress.attempts.reduce(
      (highest, attempt) => Math.max(highest, attempt.totalScore),
      0,
    );
  }, [selectedLessonProgress]);

  const handleModuleChange = (module: Module) => {
    setSelectedModuleId(module.id);
    if (module.lessons.length > 0) {
      setSelectedLessonId(module.lessons[0].id);
    }
    setPromptDraft('');
    setErrorMessage(null);
  };

  const handleLessonChange = (lesson: Lesson) => {
    if (!selectedModule) return;
    if (!isLessonUnlocked(selectedModule, lesson, progress)) {
      setErrorMessage('Bạn cần hoàn thành bài trước để mở khóa bài học này.');
      return;
    }
    setSelectedLessonId(lesson.id);
    setPromptDraft('');
    setErrorMessage(null);
  };

  const handleEvaluate = () => {
    if (!selectedLesson) {
      setErrorMessage('Hãy chọn một bài học để bắt đầu.');
      return;
    }
    if (!promptDraft || promptDraft.trim().length < 30) {
      setErrorMessage('Prompt quá ngắn, hãy mô tả chi tiết hơn (ít nhất 30 ký tự).');
      return;
    }
    setIsEvaluating(true);
    setTimeout(() => {
      const evaluation = evaluatePrompt(promptDraft, selectedLesson.evaluation.criteria);
      setProgress((previous) => {
        const current = getLessonProgress(previous, selectedLesson.id);
        const attempts = [...current.attempts, evaluation];
        const promptVersions = [...current.promptVersions, promptDraft];
        const completed =
          current.completed || evaluation.totalScore >= selectedLesson.evaluation.passingScore;
        return {
          ...previous,
          [selectedLesson.id]: { attempts, promptVersions, completed },
        };
      });
      setIsEvaluating(false);
      setErrorMessage(null);
    }, 380);
  };

  const handleMarkComplete = () => {
    if (!selectedLesson) return;
    const lessonState = getLessonProgress(progress, selectedLesson.id);
    const attemptsCount = lessonState.attempts.length;
    if (attemptsCount < selectedLesson.recommendedIterations) {
      setErrorMessage(
        `Hãy thực hiện ít nhất ${selectedLesson.recommendedIterations} lần đánh giá để khóa bài học.`,
      );
      return;
    }
    if (bestScore < selectedLesson.evaluation.passingScore) {
      setErrorMessage('Điểm tốt nhất chưa đạt yêu cầu. Hãy chỉnh sửa prompt và thử lại.');
      return;
    }
    setProgress((previous) => ({
      ...previous,
      [selectedLesson.id]: {
        ...getLessonProgress(previous, selectedLesson.id),
        completed: true,
      },
    }));
    setErrorMessage(null);
  };

  const handleGoToNext = () => {
    if (!selectedLesson || !selectedModule) return;
    const next = nextLessonId(selectedModule, selectedLesson);
    if (next) {
      setSelectedLessonId(next);
      setPromptDraft('');
      setErrorMessage(null);
    }
  };

  const renderModulesSidebar = () => (
    <aside className="sidebar">
      <header className="sidebar__header">
        <h1>Prompt Learning Studio</h1>
        <p>Khởi động Module 1 và trải nghiệm quy trình luyện prompt với phản hồi tự động.</p>
      </header>
      <nav className="module-list">
        {courseModules.map((module) => {
          const isActive = module.id === selectedModuleId;
          const available = module.releaseStatus === 'available';
          return (
            <button
              key={module.id}
              className={`module-item ${isActive ? 'module-item--active' : ''}`}
              onClick={() => available && handleModuleChange(module)}
              disabled={!available}
            >
              <div>
                <strong>{module.title}</strong>
                <p>{module.description}</p>
              </div>
              <span className="module-item__status">
                {available ? 'Đang học' : 'Sắp ra mắt'}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );

  const renderLessonList = () => {
    if (!selectedModule || selectedModule.lessons.length === 0) {
      return (
        <div className="empty-state">
          <h2>Module đang được xây dựng</h2>
          <p>Hãy quay lại Module 1 để tiếp tục luyện tập ngay hôm nay.</p>
        </div>
      );
    }

    return (
      <section className="lessons">
        <h2>Bài học trong module</h2>
        <ul>
          {selectedModule.lessons.map((lesson) => {
            const lessonState = getLessonProgress(progress, lesson.id);
            const unlocked = isLessonUnlocked(selectedModule, lesson, progress);
            const statusLabel = lessonState.completed
              ? 'Đã hoàn thành'
              : unlocked
              ? 'Có thể học'
              : 'Đang khóa';
            return (
              <li key={lesson.id}>
                <button
                  className={`lesson-card ${selectedLesson?.id === lesson.id ? 'lesson-card--active' : ''}`}
                  onClick={() => handleLessonChange(lesson)}
                >
                  <header>
                    <span className="lesson-card__title">{lesson.title}</span>
                    <span className={`lesson-card__badge lesson-card__badge--${lessonState.completed ? 'completed' : unlocked ? 'ready' : 'locked'}`}>
                      {statusLabel}
                    </span>
                  </header>
                  <p>{lesson.summary}</p>
                  <footer>
                    <span>
                      Điểm tốt nhất: {formatScore(lessonState.attempts.length ? Math.max(...lessonState.attempts.map((attempt) => attempt.totalScore)) : 0)}
                    </span>
                    <span>Lượt đánh giá: {lessonState.attempts.length}</span>
                  </footer>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  const renderLessonDetail = () => {
    if (!selectedModule) {
      return null;
    }
    if (!selectedLesson) {
      return (
        <div className="empty-state">
          <h2>Hãy chọn một bài học</h2>
          <p>Bắt đầu từ bài 1 để mở khóa chuỗi luyện tập có hướng dẫn.</p>
        </div>
      );
    }

    const unlocked = isLessonUnlocked(selectedModule, selectedLesson, progress);
    const lessonState = getLessonProgress(progress, selectedLesson.id);
    const attemptsCount = lessonState.attempts.length;
    const canComplete =
      attemptsCount >= selectedLesson.recommendedIterations &&
      bestScore >= selectedLesson.evaluation.passingScore;

    if (!unlocked) {
      return (
        <div className="empty-state">
          <h2>Bài học đang khóa</h2>
          <p>Hoàn thành bài trước với điểm số đạt yêu cầu để mở khóa bài học này.</p>
        </div>
      );
    }

    return (
      <section className="lesson-detail">
        <header className="lesson-detail__header">
          <div>
            <h2>{selectedLesson.title}</h2>
            <p>{selectedLesson.summary}</p>
          </div>
          <div className="lesson-detail__stats">
            <div>
              <strong>{formatScore(bestScore)}</strong>
              <span>Điểm tốt nhất</span>
            </div>
            <div>
              <strong>{selectedLesson.evaluation.passingScore}%</strong>
              <span>Điểm yêu cầu</span>
            </div>
            <div>
              <strong>{attemptsCount}</strong>
              <span>Lượt đánh giá</span>
            </div>
          </div>
        </header>

        <section className="lesson-section">
          <h3>Script thực hành từng bước</h3>
          <ol>
            {selectedLesson.scriptSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="lesson-section">
          <h3>Bài tập tương tác</h3>
          <div className="practice-card">
            <p className="practice-card__scenario">{selectedLesson.guidedPractice.scenario}</p>
            <details>
              <summary>Template gợi ý</summary>
              <pre>{selectedLesson.guidedPractice.promptTemplate}</pre>
            </details>
            <ul>
              {selectedLesson.guidedPractice.reminders.map((reminder) => (
                <li key={reminder}>{reminder}</li>
              ))}
            </ul>
            <label htmlFor="prompt-input" className="practice-card__label">
              Prompt của bạn
            </label>
            <textarea
              id="prompt-input"
              rows={8}
              placeholder="Viết prompt theo template và điều chỉnh theo nhu cầu thực tế của bạn..."
              value={promptDraft}
              onChange={(event) => setPromptDraft(event.target.value)}
            />
            <button className="primary" onClick={handleEvaluate} disabled={isEvaluating}>
              {isEvaluating ? 'Đang chấm điểm...' : 'Đánh giá bằng AI giả lập'}
            </button>
          </div>
        </section>

        <section className="lesson-section">
          <h3>Tiêu chí đánh giá</h3>
          <div className="criteria-grid">
            {selectedLesson.evaluation.criteria.map((criterion) => (
              <article key={criterion.label} className="criteria-card">
                <header>
                  <h4>{criterion.label}</h4>
                  <span>Tối thiểu {criterion.minimumScore}%</span>
                </header>
                <p>{criterion.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lesson-section">
          <h3>Lịch sử đánh giá</h3>
          {lessonState.attempts.length === 0 ? (
            <p className="muted">Chưa có đánh giá nào. Hãy nhập prompt và chọn "Đánh giá".</p>
          ) : (
            <ul className="attempt-list">
              {lessonState.attempts
                .slice()
                .reverse()
                .map((attempt, index) => {
                  const originalIndex = lessonState.attempts.length - index;
                  const attemptIndex = lessonState.attempts.length - index - 1;
                  const promptPreview = lessonState.promptVersions[attemptIndex] ?? '';
                  return (
                    <li key={`${attempt.totalScore}-${index}`}>
                      <header>
                        <strong>Lần {originalIndex}</strong>
                        <span>{formatScore(attempt.totalScore)}</span>
                      </header>
                      <p className="prompt-preview">{promptPreview}</p>
                      <div className="attempt-breakdown">
                        {attempt.breakdown.map((item) => (
                          <div key={item.label} className={`chip ${item.met ? 'chip--success' : 'chip--warning'}`}>
                            <span>{item.label}</span>
                            <span>{formatScore(item.score)}</span>
                          </div>
                        ))}
                      </div>
                      {attempt.notes.length > 0 && (
                        <ul className="notes">
                          {attempt.notes.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </section>

        <section className="lesson-section">
          <h3>Câu hỏi tự phản tư</h3>
          <ul>
            {selectedLesson.reflection.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>

        <footer className="lesson-actions">
          <button className="secondary" onClick={handleMarkComplete} disabled={!canComplete}>
            Đánh dấu hoàn thành
          </button>
          <button className="secondary" onClick={handleGoToNext} disabled={!lessonState.completed}>
            Sang bài kế tiếp
          </button>
        </footer>

        {errorMessage && <div className="alert">{errorMessage}</div>}
      </section>
    );
  };

  return (
    <div className="app">
      {renderModulesSidebar()}
      <main className="content">
        {renderLessonList()}
        {renderLessonDetail()}
      </main>
    </div>
  );
}

export default App;
