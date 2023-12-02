import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { storage, db } from "./firebase";
import { ref, uploadBytes } from "firebase/storage"
import { getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Header from './Header';

//投稿完了モーダルウィンドウ（ポップアップ）
function Modal({ show, setShow }) {

    const navigate = useNavigate();
    const closeModal = () => {
        setShow(false);
        navigate("/home");
    };
    if (show) {
        return (
            <div id="overlay">
                <div id="modalWindowContent" onClick={(e) => e.stopPropagation()}>
                    <h3 id="modalMessageText">投稿が完了しました！</h3>
                    <button id="modalCloseButton" onClick={closeModal}>閉じる</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectingImageUrl, setSelectingImageUrl] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    //FirebaseStorageに選択された画像ファイルをアップロード
    const selectingImageChanged = (e) => {
        const file = e.target.files[0];
        const fileName = uuidv4();
        const storageRef = ref(storage, "image/" + fileName);
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                fetchImage("image/" + fileName);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //FirebaseStorageから画像のURLを取得
    const fetchImage = (fileName) => {
        const storage = getStorage();
        const starsRef = ref(storage, fileName);
        getDownloadURL(starsRef).then((url) => {
            setSelectingImageUrl(url);
        }).catch((error) => {
            console.log(error);
        });
    }

    const PostButtonClicked = () => {
        const uid = getAuth().currentUser.uid
        if (!uid) {
            alert("err：ユーザーがログイン状態ではありません。")
            return
        }
        const postUid = uuidv4();
        const userData = doc(db, "users", uid);
        //ユーザーのプロフィール画像URLを取得するためにユーザーUIDに基づくドキュメントを取得
        getDoc(userData).then((snapShot) => {
            if (snapShot.exists()) {
                //setDocでドキュメントIDも指定してドキュメントをFirebase上に作成
                setDoc(doc(db, "Posts", postUid), {
                    title: title,
                    content: content,
                    date: format(new Date(), 'yyyy/MM/dd HH:mm'),
                    imageUrl: selectingImageUrl,
                    userUid: uid,
                    userImageUrl: snapShot.data().profileImageUrl,
                    postUid: postUid,
                    favoriteUsers: [""],
                });
                //投稿完了ポップアップ
                setShow(true)
            } else {
                alert("err:処理に失敗しました。")
            }
        })
    }

    return (
        <div>

            {/* ヘッダー */}
            <Header />

            {/* コンテンツ */}
            <div style={{ paddingTop: '36px', paddingBottom: '56px' }}>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="titleLabel">
                        <h2>タイトル</h2>
                    </div>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="タイトル"
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                        multiline
                        sx={{
                            height: '80px',
                            width: '400px',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="textLabel">
                        <h2>本文（詳細）</h2>
                    </div>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="本文"
                        variant="outlined"
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        sx={{
                            height: '80px',
                            width: '400px',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <div className="outerBox">
                        <div className="title">
                            <h2>画像をアップロード</h2>
                        </div>
                        <div className="imageUplodeBox">
                            <img id="selectedImage" src={selectingImageUrl} alt="" />
                        </div>
                        <br></br>
                        <Button variant="contained">
                            画像ファイルを選択
                            <input className="imageUploadInput" multiple name="imageURL" type="file" accept="image/*" onChange={selectingImageChanged} />
                        </Button>
                    </div>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="contained" onClick={PostButtonClicked} endIcon={<SendIcon />} style={{ color: 'black', backgroundColor: '#00ECFF', width: '300px', height: '100px', fontSize: '25px' }} >
                        投稿
                    </Button>

                    {/* モーダルウィンドウ（ポップアップ）初期状態は非表示　*/}
                    <Modal show={show} setShow={setShow} />

                </Box>
            </div>
        </div>
    );
};

export default CreatePost;