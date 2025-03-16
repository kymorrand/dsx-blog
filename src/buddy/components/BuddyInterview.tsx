import { useState, useEffect } from 'react';
import type { BuddyQuestion, BuilderResponse } from '../types';
import { BuddyService } from '../services/BuddyService';

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
      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800">Interview Complete!</h3>
        <p className="mt-2 text-green-700">
          Thanks for sharing your progress. Your blog post is being generated and will be published shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentQuestion && (
        <>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900">{currentQuestion.text}</h3>
            <p className="mt-1 text-sm text-blue-700">Type: {currentQuestion.type}</p>
          </div>

          <div className="space-y-2">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
