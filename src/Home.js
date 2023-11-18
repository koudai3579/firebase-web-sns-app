import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import logo from "./Images/logo.png"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Fab from '@mui/material/Fab';
//投稿内容を表示するためのライブラリ
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { storage, db } from "./firebase";


function Home() {

    const postDatas = [];
    const [posts, setPosts] = useState([]);
    let ignore = false;
    const [favorites, setFavorites] = useState({});

    const handleFavoriteClick = (post) => {
        // const currentFavoriteState = favorites[post.userUid] || false;
        // setFavorites({ ...favorites, [post.userUid]: !currentFavoriteState });
    };

    //useEffect():コンポーネントの画面生成後または、更新後に自動実行する関数処理を設定するHooks
    useEffect(() => {
        const postData = collection(db, "Posts");
        if (ignore == false) {
            getDocs(postData).then((snapShot) => {
                snapShot.forEach((docs) => {
                    const doc = docs.data();
                    postDatas.push({postUid:doc.postUid, title: doc.title, content: doc.content, date: doc.date, userImageUrl: doc.userImageUrl, userUid: doc.userUid ,imageUrl:doc.imageUrl});
                })
                setPosts(postDatas);
            });
        }
        ignore = true;
    }, []);

    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* コンテンツ */}
            <br></br>
            <div>
                {posts.map(post => post.title ?
                    <Link to={"/postDetail"} state={{ postUid:post.postUid ,title: post.title, content: post.content, date: post.date, userImageUrl: post.userImageUrl, userUid: post.userUid,imageUrl:post.imageUrl }}>

                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                        >

                            <Card sx={{ width: 500}}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} src={post.userImageUrl} aria-label="recipe"></Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings"></IconButton>
                                    }
                                    title={post.title}
                                    subheader={post.date}
                                    sx={{ textDecoration: 'none' }}//←変化なし
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={post.imageUrl}
                                    alt="image"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">{post.content}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton 
                                    aria-label="add to favorites"
                                    onClick={(e) => {
                                        handleFavoriteClick(post);
                                    }}    
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
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
                        zIndex: 9999,
                    }}
                    icon={
                        <Fab
                            sx={{
                                backgroundColor: '#BEDFC2', color: 'black',
                            }}
                        >
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