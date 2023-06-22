import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchScreen.css";
import { IQuestion, IResponse } from "../../types/types";

/**
 * Компонент страницы поиска.
 */
const SearchScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  // Состояние для хранения текста поиска.
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Обработчик изменения значения в поле ввода.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения поля ввода.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  /**
   * Обработчик нажатия кнопки "Поиск".
   * Выполняет поиск на основе введенного текста.
   */
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchText.trim() === "") {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${encodeURIComponent(
          searchText
        )}&site=stackoverflow`
      );
      const data: IResponse = await response.json();
      const searchResults: IQuestion[] = data.items;

      setIsLoading(false);

      if (searchResults !== undefined) {
        navigate("/results", { state: { searchResults } });
      }
    } catch (error) {
      console.error("Ошибка при выполнении поиска:", error);
      setIsLoading(false);
    }
  };

  return (
    <form className="search-screen" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Введите текст для поиска"
        className="search-screen__input"
      />
      <button
        type="submit"
        className="search-screen__button"
        disabled={isLoading}
        style={{ backgroundColor: isLoading ? "red" : "" }}
      >
        {isLoading ? "Загрузка..." : "Искать"}
      </button>
    </form>
  );
};

export default SearchScreen;
