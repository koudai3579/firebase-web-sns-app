import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Fab from '@mui/material/Fab';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function Home() {

    const postDatas = [];
    const [posts, setPosts] = useState([]);
    const [showEmptyState,setShowEmptyState] =  useState(false);
    //let ignore = false;

    //useEffect():コンポーネントの画面生成後または、更新後に自動実行する関数処理を設定するHooks
    useEffect(() => {
        fetchPostData()
    }, []);

    const fetchPostData = () => {
        //全投稿データを取得
        const postData = collection(db, "Posts");
            getDocs(postData).then((snapShots) => {

                if (snapShots == null) {
                    setShowEmptyState(true)
                    return
                }

                snapShots.forEach((docs) => {
                    const doc = docs.data();
                    postDatas.push({ postUid: doc.postUid, title: doc.title, content: doc.content, date: doc.date, userImageUrl: doc.userImageUrl, userUid: doc.userUid, imageUrl: doc.imageUrl, favoriteUsers: doc.favoriteUsers });
                })
                setShowEmptyState(false)
                setPosts(postDatas);
            });
    };

    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* EmptyState(投稿が0の場合に表示するUI) */}
            {showEmptyState == true && (
                <div class="empty_state">
                    <h3>投稿数が0のようです。</h3>
                    <p>右下の＋ボタンから投稿を作成するか、「再度実行」ボタンを押してください。</p>
                    <button class="reFetchPostDataButton" onClick={fetchPostData()}>再度実行</button>
                </div>
            )}

            {/* コンテンツ */}
            <br></br>
            <div>
                {posts.map(post => post.title ?
                    <Link style={{ textDecoration: 'none' }} to={"/postDetail"} state={{ postUid: post.postUid, title: post.title, content: post.content, date: post.date, userImageUrl: post.userImageUrl, userUid: post.userUid, imageUrl: post.imageUrl, favoriteUsers: post.favoriteUsers }}>

                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                        >

                            <Card sx={{ width: 600, maxHeight: 600 }}>
                                <CardHeader
                                    avatar={
                                        //画像アバターや文字アバターを追加
                                        <Avatar
                                            sx={{ width: 70, height: 70 }}
                                            src={post.userImageUrl}
                                        />
                                    }
                                    title={
                                        <Typography variant="h5">
                                            {post.title}
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography variant="h7" color="textSecondary">
                                            {post.date}
                                        </Typography>
                                    }
                                />
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={post.imageUrl}
                                    alt="image"
                                />

                                <CardContent style={{ whiteSpace: 'pre-line' }}>
                                    <Typography
                                        variant="body1"
                                        //自動で改行させて表示
                                        style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
                                    >
                                        {post.content}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Box>
                        <br></br>
                    </Link>
                    : <></>
                )}
            </div>

            {/* 右下固定投稿ボタン */}
            <Link to={"/create_post"}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        position: 'fixed',
                        bottom: 50,
                        right: 50,
                    }}
                    icon={
                        <Fab sx={{ backgroundColor: 'blue', color: 'white', }}>
                            <SpeedDialIcon />
                        </Fab>
                    }
                >
                </SpeedDial>
            </Link>
        </div>
    );
}

export default Home;