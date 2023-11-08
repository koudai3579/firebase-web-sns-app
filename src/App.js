//UI MUI
//DataBase Firebase
//実行　npm start
//各ページを呼び出し、react-router-domでルーティングを行う(画面遷移設定)

import * as React from "react";
import { Button } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignUp />} />
        <Route path={`/home`} element={<Home />} />
        <Route path={`/signin`} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;