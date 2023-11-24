// import { Link } from "react-router-dom";
// import React, { useState, useRef } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import { storage, db } from "./firebase";
// import { ref, uploadBytes } from "firebase/storage"
// import { getStorage, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from 'uuid';
// import { format } from "date-fns";
// import { addDoc, collection } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// 画面遷移用のモジュールのインポート
import { Link } from "react-router-dom";

// useStateのインポート
import React, { useState } from 'react';
import Header from './Header';


// フッターを表示するためのライブラリ
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import ChairIcon from '@mui/icons-material/Chair';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';

// ヘッダーを表示するためのライブラリ
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// テキストフィールドを表示するためのライブラリ
import TextField from '@mui/material/TextField';

// ボタンを表示するためのライブラリ
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';

// 相談の一覧を表示するためのライブラリ
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// 投稿ボタンを表示するためのライブラリ
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Fab from '@mui/material/Fab';

// Stateを遷移させるためのライブラリ
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

//返信入力内容を保存するためのライブラリ
import { useRef } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth";


function PostDetail() {

    // 遷移してきたStateを管理するためのもの
    const { state } = useLocation();
    const [commentText, setCommentText] = useState("");
    const [show, setShow] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite == false) {
            favoriteRegisterAction()
        } else {
            favoriteCanselAction()
        }
    };

    //最新の投稿データを取得し、お気に入りしたユーザーのUID情報を追加(再取得するのは漏れをなくすため)
    const favoriteRegisterAction = () => {
        const uid = getAuth().currentUser.uid
        if (!uid) {
            alert("err：ユーザーがログイン状態ではありません。")
            return
        }
        const userData = doc(db, "Posts", state.postUid);
        getDoc(userData).then((snapShot) => {
            if (snapShot.exists()) {
                const favoriteUsers = snapShot.data().favoriteUsers
                favoriteUsers.push(uid)
                const postRef = doc(db, "Posts", state.postUid);
                updateDoc(postRef, {
                    favoriteUsers: favoriteUsers,
                });
            } else {
                alert("err:処理に失敗しました。")
            }
        })
    }

    //最新の投稿データを取得し、お気に入りしたユーザーのUID情報を削除(再取得するのは漏れをなくすため)
    const favoriteCanselAction = () => {
        const uid = getAuth().currentUser.uid
        if (!uid) {
            alert("err：ユーザーがログイン状態ではありません。")
            return
        }
        const userData = doc(db, "Posts", state.postUid);
        getDoc(userData).then((snapShot) => {
            if (snapShot.exists()) {
                const favoriteUsers = snapShot.data().favoriteUsers
                //filterメソッドで自身のUIDのみを削除した新しい配列を定義
                const newfavoriteUsers = favoriteUsers.filter(item => item !== uid);
                const postRef = doc(db, "Posts", state.postUid);
                updateDoc(postRef, {
                    favoriteUsers: newfavoriteUsers,
                });
            } else {
                alert("err:処理に失敗しました。")
            }
        })
    }

    const FetchCommentData = () => {
        const commentData = collection(db, 'Posts', state.postUid, 'Comments');
        getDocs(commentData).then((snapShot) => {
            const comments = []
            snapShot.forEach((docs) => {
                const doc = docs.data();
                comments.push({ comment: doc.comment, date: doc.date, userImageUrl: doc.userImageUrl, userUid: doc.userUid });
            })
            setComments(comments);
        })
    }

    const commentSaveAction = () => {
        const uid = getAuth().currentUser.uid
        if (!uid) {
            alert("err：ユーザーがログイン状態ではありません。")
            return
        }
        const commentUid = uuidv4();
        //まずはユーザー情報を取得する
        const userData = doc(db, "users", uid);
        getDoc(userData).then((snapShot) => {
            if (snapShot.exists()) {
                addDoc(collection(db, 'Posts', state.postUid, 'Comments'), {
                    comment: commentText,
                    date: format(new Date(), 'yyyy/MM/dd HH:mm'),
                    userUid: uid,
                    userImageUrl: snapShot.data().profileImageUrl,
                });
                //投稿完了ポップアップ
                //setShow(true)
                //入力UI初期化
                //
                setCommentText("")
                FetchCommentData()

            } else {
                alert("err:処理に失敗しました。")
            }
        })
    }

    //useEffect():コンポーネントの画面生成後または、更新後に自動実行する関数処理を設定するHooks
    useEffect(() => {
        FetchCommentData()
    }, []);

    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* Gridレイアウトで2カラムの構成にする */}
            <Grid container>
                {/* 左側コンテンツ(投稿詳細) */}
                <Grid item xs={5}>
                    <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Card sx={{ width: "100%" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#BEDFC2' }} src={state.userImageUrl} aria-label="guardian">
                                        </Avatar>
                                    }
                                    title={state.title}
                                    subheader={
                                        <Typography variant="body2" color="text.secondary">
                                            投稿時刻:{state.date}
                                        </Typography>
                                    }
                                />
                                <CardMedia
                                    component="img"
                                    //height={100}
                                    width={200}
                                    image={state.imageUrl}
                                    alt="image"
                                // inputMode="fill"
                                //style={{ display: state.imageUrl ? 'block' : 'none' }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="black">
                                        {state.content}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}
                                        style={{ color: isFavorite ? 'red' : 'gray' }}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    {/* 右側コンテンツ(コメント) */}
                    <div style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '40px' }}>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>コメント一覧</Typography>
                        </Box>

                        <br></br>

                        {comments.map(comment => comment.comment &&
                            <div>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Card sx={{ width: '100%' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: '#f3cbc3' }} aria-label="teacher" src={comment.userImageUrl}>
                                                </Avatar>
                                            }
                                            subheader={
                                                <Typography variant="body2" color="text.secondary">
                                                    送信時刻:{comment.date}
                                                </Typography>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="black">
                                                {comment.comment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                                <br></br>
                            </div>
                        )}

                        <br></br>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <TextField
                                id="comment-input"
                                label="コメント"
                                type="ID"
                                //autoComplete="current-password"
                                variant="standard"
                                multiline
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />

                            <Button variant="contained" endIcon={<ReplyIcon />} style={{ color: "black", backgroundColor: "#BEDFC2" }} onClick={commentSaveAction}>
                                送信
                            </Button>

                        </Box>
                    </div>

                </Grid>
            </Grid>
        </div>

    );
};

export default PostDetail;