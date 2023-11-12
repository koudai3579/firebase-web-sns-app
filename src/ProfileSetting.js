import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, TextField, Button, Container, } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "./firebase";

// 画像機能用のライブラリ
import { ref, uploadBytes } from "firebase/storage"
import { getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

function ProfileSetting() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileName = uuidv4();
    const storageRef = ref(storage, "image/" + fileName);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        fetchImage("image/" + fileName);
      })
      .catch((error) => {
        console.log("画像のアップロードに失敗");
        console.log(error);
      });
  };

  //Storageから画像のURLを取得する処理
  const fetchImage = (fileName) => {
    const storage = getStorage();
    const starsRef = ref(storage, fileName);
    getDownloadURL(starsRef).then((url) => {
      setImageUrl(url);
    }).catch((error) => {
      console.log("画像の取得に失敗しました");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ユーザーがログインしていることを確認
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("ユーザーがログインしていません。")
      return;
    }
    //ドキュメントIDを指定してドキュメント作成または上書きをする時はsetDocメソッドを使用(addDoc()はドキュメントIDを指定しないときに使用)
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        profileImageUrl: imageUrl,
      });
      navigate("/home");

    } catch (error) {
      alert("ユーザー情報の追加に失敗しました。")
      console.error("プロフィール保存に失敗:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography align="center">プロフィール設定</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="ニックネーム"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            保存
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileSetting;