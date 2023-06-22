import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IQuestion, IResponse } from "../../types/types";
import "./SearchResultsScreen.css";
import Table from "./Table/Table";
import Modal from "../Modal/Modal";

/**
 * Компонент страницы с результатами поиска.
 */
const SearchResultsScreen: React.FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [popularQuestionsByAuthor, setPopularQuestionsByAuthor] = useState<
    IQuestion[] | null
  >(null);
  const [popularQuestionsByTag, setPopularQuestionsByTag] = useState<
    IQuestion[] | null
  >(null);
  const searchResults: IQuestion[] = location.state?.searchResults || [];

  /**
   * Функция для получения популярных вопросов автора.
   * @param {number} userId - Идентификатор пользователя (user_id).
   */
  const fetchPopularQuestionsByAuthor = async (
    userId: number
  ): Promise<void> => {
    try {
      const url = `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=votes&site=stackoverflow`;
      const response = await fetch(url);
      const data: IResponse = await response.json();
      const popularQuestions: IQuestion[] = data.items;
      setPopularQuestionsByAuthor(popularQuestions);
    } catch (error) {
      console.error("Ошибка при получении популярных вопросов автора:", error);
    }
  };

  /**
   * Функция для получения популярных вопросов по указанному тегу.
   * @param {string} tag - Тег, по которому нужно получить популярные вопросы.
   */
  const fetchPopularQuestionsByTag = async (tag: string): Promise<void> => {
    try {
      const encodedTag = encodeURIComponent(tag);
      const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&tagged=${encodedTag}&site=stackoverflow`;
      const response = await fetch(url);
      const data: IResponse = await response.json();
      const popularQuestions: IQuestion[] = data.items;
      setPopularQuestionsByTag(popularQuestions);
    } catch (error) {
      console.error("Ошибка при получении популярных вопросов по тегу:", error);
    }
  };

  /**
   * Обработчик клика по имени автора в строке таблицы
   * @param {number} userId - Идентификатор пользователя (user_id).
   */
  const handleAuthorClick = (userId: number) => {
    fetchPopularQuestionsByAuthor(userId).then(() => setIsShowModal(true));
  };

  /**
   * Обработчик клика по тегу в строке таблицы
   * @param {string} tag - Тег, по которому нужно получить популярные вопросы.
   */
  const handleTagClick = (tag: string) => {
    fetchPopularQuestionsByTag(tag).then(() => setIsShowModal(true));
  };

  /**
   * Обработчик клика по кнопке закрытия модального окна.
   */
  const handleCloseModal = () => {
    setPopularQuestionsByAuthor(null);
    setPopularQuestionsByTag(null);
    setIsShowModal(false);
  };

  return (
    <div>
      <div className="search-result__wrapper-answer-button">
        <button
          className="search-result__answer-button"
          onClick={() => navigate(-1)}
        >
          Назад к поиску
        </button>
      </div>

      <Table
        data={searchResults}
        onAuthorClick={handleAuthorClick}
        onTagClick={handleTagClick}
      />

      {isShowModal && popularQuestionsByAuthor && (
        <Modal onClose={handleCloseModal}>
          <Table
            data={popularQuestionsByAuthor}
            onAuthorClick={handleAuthorClick}
            onTagClick={handleTagClick}
          />
        </Modal>
      )}

      {isShowModal && popularQuestionsByTag && (
        <Modal onClose={handleCloseModal}>
          <Table
            data={popularQuestionsByTag}
            onAuthorClick={handleAuthorClick}
            onTagClick={handleTagClick}
          />
        </Modal>
      )}
    </div>
  );
};

export default SearchResultsScreen;
