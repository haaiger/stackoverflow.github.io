import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Table.css";
import { IQuestion, ITableProps } from "../../../types/types";

/**
 * Компонент Table для отображения данных в виде таблицы.
 *
 * @param {ITableProps} props - Свойства компонента.
 */
const Table: React.FC<ITableProps> = ({
  data,
  onAuthorClick,
  onTagClick,
}: ITableProps): JSX.Element => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /**
   * Обработчик клика по заголовку столбца.
   * @param {string} column - Название столбца.
   */
  const handleHeaderClick = (column: string) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
    }
    setSortedColumn(column);
  };

  /**
   * Сортировка данных в таблице.
   */
  const sortData = () => {
    if (sortedColumn) {
      const sortedData = [...data!].sort((a: IQuestion, b: IQuestion) => {
        const valueA = a[sortedColumn as keyof IQuestion];
        const valueB = b[sortedColumn as keyof IQuestion];
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      return sortedData;
    }
    return data;
  };

  const sortedData = sortData();

  return (
    <table className="search-results__table">
      <thead>
        <tr>
          <th className="search-results__table-header search-results__table-header--inactive">
            Автор
          </th>
          <th
            className={`search-results__table-header${
              sortedColumn === "title" ? " sorted" : ""
            }`}
            onClick={() => handleHeaderClick("title")}
          >
            Тема
            {sortedColumn === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </th>
          <th
            className={`search-results__table-header${
              sortedColumn === "answer_count" ? " sorted" : ""
            }`}
            onClick={() => handleHeaderClick("answer_count")}
          >
            Ответы
            {sortedColumn === "answer_count"
              ? sortOrder === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th
            className={`search-results__table-header${
              sortedColumn === "tags" ? " sorted" : ""
            }`}
            onClick={() => handleHeaderClick("tags")}
          >
            Теги
            {sortedColumn === "tags" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData && sortedData.length === 0 ? (
          <tr>
            <td colSpan={4} className="search-results__no-results">
              Нет результатов поиска
            </td>
          </tr>
        ) : (
          sortedData &&
          sortedData.map((result: IQuestion) => (
            <tr
              key={result.creation_date}
              className="search-results__table-row"
            >
              <td
                className="search-results__table-cell"
                onClick={() => onAuthorClick(result.owner.user_id)}
              >
                <span className="search-results__table-cell__text">
                  {result.owner?.display_name || "Нет данных"}
                </span>
              </td>
              <td className="search-results__table-cell">
                {result.title ? (
                  <Link
                    to={`/question/${result.question_id}`}
                    className="search-results__link"
                  >
                    {result.title}
                  </Link>
                ) : (
                  "Нет данных"
                )}
              </td>

              <td className="search-results__table-cell">
                <Link
                  to={`/question/${result.question_id}`}
                  className="search-results__link"
                >
                  {result.answer_count ? (
                    <span>{result.answer_count}</span>
                  ) : (
                    "Нет данных"
                  )}
                </Link>
              </td>
              <td className="search-results__table-cell">
                {result.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="search-results__tag"
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </span>
                )) || "Нет данных"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
