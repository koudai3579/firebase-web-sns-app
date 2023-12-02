import React, { useState } from "react";
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, TextField, Button, Container, } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "./firebase";
import { ref, uploadBytes } from "firebase/storage"
import { getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

function ProfileSetting() {
  
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  //画像ファイルが選択されたらFirebase上のStorageに保存
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

  //FirebaseStorageから画像のURLを取得
  const fetchImage = (fileName) => {
    const storage = getStorage();
    const starsRef = ref(storage, fileName);
    getDownloadURL(starsRef).then((url) => {
      setImageUrl(url);
    }).catch((error) => {
      console.log("画像の取得に失敗しました");
    });
  };

  //ユーザーUIDに紐づくプロフィールデータをFirebase上に生成
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
    <div>
      {/* ヘッダー */}
      <Header />

      {/* コンテンツ */}
      <Container maxWidth="sm">

        <Paper sx={{ m: 4, p: 4 }}>
          <Typography align="center" fontSize="25px">プロフィール設定</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>

            <Typography align="left" fontSize="15px">①プロフィール写真</Typography>
            <br></br>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br></br>
            <br></br>
            <Typography align="left" fontSize="15px">②ニックネーム</Typography>
            <br></br>

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
    </div>
  );
};

export default ProfileSetting;