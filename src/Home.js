//メインコンテンツ
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

// 相談の一覧を表示するためのライブラリ
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
import Box from '@mui/material/Box';

// 区切り線を表示するためのライブラリ
import { Divider } from '@mui/material';
// 画像のインポート
import logo from "./Images/logo.png"
// 投稿ボタンを表示するためのライブラリ
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Fab from '@mui/material/Fab';


function Home() {

    const [posts, setPosts] = useState([]);

    return (
        <div>
            {/* ヘッダー */}
            <Header />
            
            {/* コンテンツ */}
            <br></br>
            <Box
                sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',}}
            >
                <Card sx={{ maxWidth: 500, maxHeight:300}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: '#BEDFC2' }} aria-label="guardian">
                            </Avatar>
                        }
                        title="タイトル"
                    />
                    <CardMedia component="img" height="100%" width="100%" image={logo} alt="image"/>
                </Card>
            </Box>

            {/* 右下固定投稿ボタン */}
            <Link to={"/create_post"}>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{
                            position: 'fixed',
                            bottom: 73,
                            right: 18,
                            zIndex: 9999,
                        }}
                        icon={
                            <Fab
                                sx={{
                                    backgroundColor: '#BEDFC2', // 背景色を変更
                                    color: 'black', // アイコンの色を変更
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