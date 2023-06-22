import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionInfoScreen.css";
import { IAnswer } from "../../types/types";

/**
 * Компонент страницы с информацией о вопросе.
 */
const QuestionInfoScreen: React.FC = (): JSX.Element => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Загрузка информации о вопросе и ответах
    const fetchQuestionInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`
        );
        const data = await response.json();
        const searchResults: IAnswer[] = data.items;
        setAnswers(searchResults);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении информации о вопросе:", error);
      }
    };

    fetchQuestionInfo();
  }, [questionId]);

  return (
    <div className="question-info">
      <div className="question-info__wrapper-header">
        <h2 className="question-info__title">Ответы:</h2>

        <button
          className="question-info__answer-button"
          onClick={() => navigate(-1)}
        >
          Назад к результатам поиска
        </button>
      </div>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : answers.length > 0 ? (
        <ul className="question-info__answers-list">
          {answers.map((answer: IAnswer) => (
            <li key={answer.answer_id} className="question-info__answer-item">
              <p className="question-info__owner-name">
                {answer.owner.display_name}:
              </p>

              <div
                className="question-info__answer-body"
                dangerouslySetInnerHTML={{ __html: answer.body }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Ответы на данный вопрос отсутствуют.</p>
      )}
    </div>
  );
};

export default QuestionInfoScreen;
