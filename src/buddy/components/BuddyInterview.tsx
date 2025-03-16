import { useState, useEffect } from 'react';
import type { BuddyQuestion, BuilderResponse } from '../types';
import { BuddyService } from '../services/BuddyService';
import './BuddyInterview.css';

interface BuddyInterviewProps {
  builderId: string;
  onComplete: (responses: BuilderResponse[]) => void;
}

export function BuddyInterview({ builderId, onComplete }: BuddyInterviewProps) {
  const [buddy] = useState(() => new BuddyService());
  const [currentQuestion, setCurrentQuestion] = useState<BuddyQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      await buddy.startSession(builderId);
      const question = await buddy.getNextQuestion();
      setCurrentQuestion(question);
    };
    initSession();
  }, [builderId]);

  const handleSubmit = async () => {
    if (!currentQuestion || !answer.trim()) return;

    await buddy.submitResponse(currentQuestion, answer);
    setAnswer('');

    const nextQuestion = await buddy.getNextQuestion();
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsComplete(true);
      const post = await buddy.generateBlogPost();
      const results = await buddy.publishPost(post);
      console.log('Publishing results:', results);
      await buddy.endSession();
      onComplete([]); // TODO: Pass actual responses
    }
  };

  if (isComplete) {
    return (
      <div className="buddy-complete">
        <h3>Interview Complete!</h3>
        <p>
          Thanks for sharing your progress. Your blog post is being generated and will be published shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="buddy-container">
      {currentQuestion && (
        <>
          <div className="buddy-question">
            <h3>{currentQuestion.text}</h3>
            <p className="question-type">Type: {currentQuestion.type}</p>
          </div>

          <div className="buddy-answer">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="answer-input"
              placeholder="Share your thoughts..."
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
