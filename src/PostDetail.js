import React, { useState, useEffect } from 'react';
import Header from './Header';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation } from "react-router-dom";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc, updateDoc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { getAuth } from "firebase/auth";

function PostDetail() {

    const { state } = useLocation();
    const [commentText, setCommentText] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (getAuth().currentUser == null) {
            return
        }
        //ログイン済みだった場合、コメントデータを取得
        FetchCommentData()
        //自分がすでにお気に入りボタンを押しているか確認
        if (state.favoriteUsers.includes(getAuth().currentUser.uid ?? "")){
            setIsFavorite(true)
          }
    }, []);

    //お気に入りボタン(ハートマーク)が押された際の処理
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
        const postData = doc(db, "Posts", state.postUid);
        getDoc(postData).then((snapShot) => {
            if (snapShot.exists()) {
                const favoriteUsers = snapShot.data().favoriteUsers
                favoriteUsers.push(uid)
                const postRef = doc(db, "Posts", state.postUid);
                updateDoc(postRef, {
                    favoriteUsers: favoriteUsers,
                });
            } else {
                console.log(state.postUid);
                alert("err:処理に失敗しました。")
            }
        })
    }

    //最新の投稿データを取得し、お気に入りしたユーザーのUID情報を削除(再取得するのは漏れをなくすため)
    const favoriteCanselAction = () => {
        const currentUser = getAuth().currentUser;

        if (!currentUser) {
            alert("エラー：ユーザーがログイン状態ではありません。");
            return;
        }

        const uid = currentUser.uid;
        const postData = doc(db, "Posts", state.postUid);
        getDoc(postData).then((snapShot) => {
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

    //投稿UIDに紐づくコメントデータを全取得
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

    //コメントをFirebase上に保存
    const commentSaveAction = () => {

        const currentUser = getAuth().currentUser;

        if (!currentUser) {
            alert("エラー：ユーザーがログイン状態ではありません。");
            return;
        }

        const uid = currentUser.uid;
        //まずはユーザー情報を取得する
        const postData = doc(db, "users", uid);
        getDoc(postData).then((snapShot) => {
            if (snapShot.exists()) {
                addDoc(collection(db, 'Posts', state.postUid, 'Comments'), {
                    comment: commentText,
                    date: format(new Date(), 'yyyy/MM/dd HH:mm'),
                    userUid: uid,
                    userImageUrl: snapShot.data().profileImageUrl,
                });
                //入力UI初期化
                setCommentText("")
                //コメント再取得
                FetchCommentData()
            } else {
                alert("err:処理に失敗しました。")
            }
        })
    }

    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* Gridレイアウトで2カラムの構成にする */}
            <Grid container>
                {/* 左側コンテンツ(投稿詳細) */}
                <Grid item xs={6}>
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
                                        <Avatar sx={{ width: 70, height: 70 }} src={state.userImageUrl} aria-label="guardian">
                                        </Avatar>
                                    }
                                    title=
                                    {<Typography variant="h5">{state.title}</Typography>}
                                    subheader={
                                        <Typography variant="h7" color="text.secondary">
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
                                />
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        //自動で改行させて表示
                                        style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
                                    >
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

                <Grid item xs={6}>
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
                                                <Avatar sx={{ width: 50, height: 50 }} src={comment.userImageUrl}>
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
                                variant="standard"
                                multiline
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                sx={{ width: 400, }}
                            />

                            <Button variant="contained" endIcon={<ReplyIcon />} style={{ color: "black", backgroundColor: "#00ECFF" }} onClick={commentSaveAction}>
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