import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../data/books';
import type {
  Content,
  ContentType,
  OxQuizContent,
  MultipleChoiceContent,
  OrderingContent,
  FillBlankContent,
} from '../data/books';
import { generateNextContent } from '../services/ai';
import styles from './ContentPlay.module.css';

function getQuestionText(c: Content): string {
  return c.type === 'fill_blank' ? c.sentence : c.question;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function ContentPlay() {
  const { bookId, contentType } = useParams<{ bookId: string; contentType: ContentType }>();
  const navigate = useNavigate();
  const book = bookId ? getBookById(bookId) : undefined;

  const [questions, setQuestions] = useState<Content[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [noFirstQuestion, setNoFirstQuestion] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const handleBack = useCallback(() => {
    navigate(`/books/${bookId}`);
  }, [navigate, bookId]);

  useEffect(() => {
    if (!book || !contentType) return;
    if (questions.length > 0) return;

    let cancelled = false;
    setLoadingFirst(true);
    setNoFirstQuestion(false);
    generateNextContent({
      bookTitle: book.title,
      contentForPrompt: book.contentForPrompt,
      contentType,
      previousQuestions: [],
    })
      .then((one) => {
        if (cancelled) return;
        setLoadingFirst(false);
        if (one) {
          const withOrder = { ...one, order: 1 };
          setQuestions([withOrder]);
        } else {
          setNoFirstQuestion(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadingFirst(false);
          setNoFirstQuestion(true);
        }
      });
    return () => { cancelled = true; };
  }, [book?.id, contentType]);

  function handleNext() {
    const total = questions.length;
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setShowResult(false);
      return;
    }

    if (!book || !contentType) return;
    setLoadingNext(true);
    const prevTexts = questions.map(getQuestionText);
    generateNextContent({
      bookTitle: book.title,
      contentForPrompt: book.contentForPrompt,
      contentType,
      previousQuestions: prevTexts,
    })
      .then((one) => {
        setLoadingNext(false);
        if (one) {
          setQuestions((q) => [...q, { ...one, order: q.length + 1 }]);
          setCurrentIndex(prevTexts.length);
          setShowResult(false);
        } else {
          setNoMore(true);
        }
      })
      .catch(() => {
        setLoadingNext(false);
        setNoMore(true);
      });
  }

  if (!book) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>책을 찾을 수 없어요.</p>
        <button type="button" className={styles.backBtn} onClick={() => navigate('/books')}>
          뒤로
        </button>
      </div>
    );
  }

  if (!contentType) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>활동을 선택해 주세요.</p>
        <button type="button" className={styles.backBtn} onClick={handleBack}>
          뒤로
        </button>
      </div>
    );
  }

  if (loadingFirst) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.loading}>잠시만 기다려 주세요...</p>
        </main>
      </div>
    );
  }

  if (noFirstQuestion) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.empty}>이 책에서는 이 활동 문제를 만들 수 없어요.</p>
          <button type="button" className={styles.backToContentBtn} onClick={handleBack}>
            활동 목록으로
          </button>
        </main>
      </div>
    );
  }

  if (noMore) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.finished}>모든 문제를 풀었어요!</p>
          <button type="button" className={styles.backToContentBtn} onClick={handleBack}>
            활동 목록으로
          </button>
        </main>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const total = questions.length;
  const current = questions[Math.min(currentIndex, total - 1)];
  const canRequestMore = !noMore;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={handleBack} aria-label="이전으로">
          뒤로
        </button>
        <span className={styles.bookTitle}>{book.title}</span>
      </header>
      <main className={styles.main}>
        {current.type === 'ox_quiz' && (
          <OxQuizPlay
            key={current.id}
            content={current as OxQuizContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'multiple_choice' && (
          <MultipleChoicePlay
            key={current.id}
            content={current as MultipleChoiceContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'ordering' && (
          <OrderingPlay
            key={current.id}
            content={current as OrderingContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'fill_blank' && (
          <FillBlankPlay
            key={current.id}
            content={current as FillBlankContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
      </main>
    </div>
  );
}

interface PlayCommonProps {
  showResult: boolean;
  setShowResult: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  canRequestMore: boolean;
  loadingNext: boolean;
  index: number;
}

function OxQuizPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: OxQuizContent }) {
  const [selected, setSelected] = useState<'O' | 'X' | null>(null);
  const isCorrect = selected === content.correctAnswer;

  function handleAnswer(choice: 'O' | 'X') {
    if (showResult) return;
    setSelected(choice);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.oxSplit}>
          <button
            type="button"
            className={styles.oxHalf}
            data-side="o"
            onClick={() => handleAnswer('O')}
            aria-label="O 정답"
          >
            <span className={styles.oxLetter}>O</span>
          </button>
          <button
            type="button"
            className={styles.oxHalf}
            data-side="x"
            onClick={() => handleAnswer('X')}
            aria-label="X 정답"
          >
            <span className={styles.oxLetter}>X</span>
          </button>
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.explanation}>{content.explanation}</p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function MultipleChoicePlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: MultipleChoiceContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {content.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.explanation}>{content.explanation}</p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function OrderingPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: OrderingContent }) {
  const [order, setOrder] = useState<number[]>(() =>
    shuffle(content.items.map((_, i) => i))
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const isCorrect = showResult && order.every((idx, i) => idx === i);

  function handleDragStart(e: React.DragEvent, listIndex: number) {
    if (showResult) return;
    setDraggedIndex(listIndex);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(listIndex));
    (e.currentTarget as HTMLElement).classList.add(styles.orderingItemDragging);
  }

  function handleDragOver(e: React.DragEvent, listIndex: number) {
    e.preventDefault();
    if (showResult || draggedIndex === null) return;
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(listIndex);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(e: React.DragEvent, dropListIndex: number) {
    e.preventDefault();
    setDragOverIndex(null);
    if (showResult || draggedIndex === null) return;
    if (draggedIndex === dropListIndex) {
      setDraggedIndex(null);
      return;
    }
    setOrder((prev) => {
      const next = [...prev];
      const [removed] = next.splice(draggedIndex, 1);
      next.splice(dropListIndex, 0, removed);
      return next;
    });
    setDraggedIndex(null);
  }

  function handleDragEnd(e: React.DragEvent) {
    (e.target as HTMLElement).classList.remove(styles.orderingItemDragging);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleCheck() {
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
        <p className={styles.orderingHint}>드래그해서 순서를 바꿔 보세요</p>
      </div>
      {!showResult ? (
        <div className={styles.orderingArea}>
          <ul className={styles.orderingList}>
            {order.map((itemIdx, listIndex) => (
              <li
                key={`${itemIdx}-${listIndex}`}
                className={`${styles.orderingItem} ${draggedIndex === listIndex ? styles.orderingItemDragging : ''} ${dragOverIndex === listIndex ? styles.orderingItemDragOver : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, listIndex)}
                onDragOver={(e) => handleDragOver(e, listIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, listIndex)}
                onDragEnd={handleDragEnd}
              >
                <span className={styles.orderingNum}>{listIndex + 1}</span>
                <span className={styles.orderingText}>{content.items[itemIdx]}</span>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.checkButton} onClick={handleCheck}>
            순서 확인하기
          </button>
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.explanation}>{content.explanation}</p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FillBlankPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: FillBlankContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.sentence}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {content.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.explanation}>{content.explanation}</p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
