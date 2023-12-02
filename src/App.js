//実行　npm start
//shift option F 一括インデント
import * as React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 遷移先コンポーネントのインポート
import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import ProfileSetting from "./ProfileSetting";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignUp />} />
        <Route path={`/home`} element={<Home />} />
        <Route path={`/signin`} element={<SignIn />} />
        <Route path={`/profileSetting`} element={<ProfileSetting />} />
        <Route path={`/create_post`} element={<CreatePost />} />
        <Route path={`/postDetail`} element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}