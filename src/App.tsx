import { Route, Routes } from "react-router-dom";
import SearchScreen from "./components/SearchScreen/SearchScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<SearchScreen />} />
      </Routes>
    </div>
  );
}

export default App;
