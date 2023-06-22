import { Route, Routes } from "react-router-dom";
import SearchScreen from "./components/SearchScreen/SearchScreen";
import SearchResultsScreen from "./components/SearchResultsScreen/SearchResultsScreen";
import QuestionInfoScreen from "./components/QuestionInfoScreen/QuestionInfoScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<SearchScreen />} />
        <Route path="/results" element={<SearchResultsScreen />} />
        <Route path="/question/:questionId" element={<QuestionInfoScreen />} />
      </Routes>
    </div>
  );
}

export default App;
