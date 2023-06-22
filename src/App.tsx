import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { IResponse, IQuestion } from "./types/types";
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
