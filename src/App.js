//UI MUI
//DataBase Firebase
//実行　npm start
//shift option F 一括インデント
//各ページを呼び出し、react-router-domでルーティングを行う(画面遷移設定)

import * as React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 遷移先コンポーネントのインポート
import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import ProfileSetting from "./ProfileSetting";
import CreatePost from "./CreatePost";

export default function App() {
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
}