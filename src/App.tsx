import { Route, Routes } from "react-router-dom";
import SearchScreen from "./components/SearchScreen/SearchScreen";
import SearchResultsScreen from "./components/SearchResultsScreen/SearchResultsScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<SearchScreen />} />
        <Route path="/results" element={<SearchResultsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
