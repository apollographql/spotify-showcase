import * as Dialog from '@radix-ui/react-dialog';
import Button from './Button';
import { X, Pizza } from 'lucide-react';
import {
  QueryReference,
  gql,
  useBackgroundQuery,
  useLoadableQuery,
  useReadQuery,
  useSuspenseQuery,
} from '@apollo/client';
import { Suspense, useState } from 'react';
import cx from 'classnames';

// TypedDocumentNode<
//   CurrentUserQuery,
//   CurrentUserQueryVariables
// >
const SONG_QUIZ_QUERY = gql`
  query SongQuiz($trackId: ID!) {
    track(id: $trackId) {
      quiz {
        question
        options {
          answer
          label
        }
        correctAnswer
      }
    }
  }
`;

const SongQuiz = ({ id }: { id: string }) => {
  const [loadQuiz, queryRef] = useLoadableQuery(SONG_QUIZ_QUERY);

  return (
    <QuizDialog id={id} queryRef={queryRef}>
      <Pizza
        size="1.2rem"
        className="cursor-pointer hover:stroke-green"
        onMouseEnter={() => {
          loadQuiz({ trackId: id });
        }}
      />
    </QuizDialog>
  );
};

export default SongQuiz;

const QuizDialog = ({
  id,
  children,
  queryRef,
}: React.PropsWithChildren<{
  id: string;
  queryRef: QueryReference<any> | null;
}>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-surface/50 animate-fade-in fixed inset-0 [--animate-duration:200ms]" />
        <Dialog.Content className="bg-surface animate-slide-left-fade fixed inset-2 left-1/3 rounded p-4 text-base shadow-2xl outline-0 [--animate-slide-distance:30px]">
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 !p-0"
            >
              <X size="1.5rem" />
            </Button>
          </Dialog.Close>
          <div className="text-white px-4">
            <Suspense fallback={<p>Loading...</p>}>
              {queryRef && <QuizContent id={id} queryRef={queryRef} />}
            </Suspense>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const QuizContent = ({
  queryRef,
}: {
  id: string;

  queryRef: QueryReference<any>;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { data } = useReadQuery(queryRef);

  // @ts-ignore - I should run codegen
  const quiz = data?.track?.quiz as any;

  const handleAnswer = () => {
    setSubmitted(true);
  };

  return (
    <>
      <h1>{quiz.question}</h1>
      <ul className="mb-4">
        {quiz.options.map((option: any) => (
          <li key={option.answer}>
            <label
              className={cx('cursor-pointer', {
                'text-green': submitted && option.answer === quiz.correctAnswer,
                'text-[#ff2a2a]':
                  submitted &&
                  option.answer !== quiz.correctAnswer &&
                  selectedAnswer === option.answer,
              })}
            >
              <input
                type="radio"
                name="answer"
                disabled={submitted}
                value={option.answer}
                checked={selectedAnswer === option.answer}
                onChange={() => setSelectedAnswer(option.answer)}
              />{' '}
              {option.label}
            </label>
          </li>
        ))}
      </ul>

      <Button variant="primary" onClick={handleAnswer}>
        Submit
      </Button>
    </>
  );
};
