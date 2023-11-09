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
import ProfileSetting from "./ProfileSetting";
import CreatePost from "./CreatePost";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignUp />} />
        <Route path={`/home`} element={<Home />} />
        <Route path={`/signin`} element={<SignIn />} />
        <Route path={`/profileSetting`} element={<ProfileSetting />} />
        <Route path={`/create_post`} element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;