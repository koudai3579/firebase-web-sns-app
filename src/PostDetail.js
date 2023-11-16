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
// import { getAuth } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";

// 画面遷移用のモジュールのインポート
import { Link } from "react-router-dom";

// useStateのインポート
import React, { useState } from 'react';

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
import { format } from "date-fns";

//返信内容を取得するためのライブラリ
import { getDocs } from "firebase/firestore";

function PostDetail() {

    // 遷移してきたStateを管理するためのもの
    const { state } = useLocation();

    return (
        <div>
            {/* コンテンツ */}
            <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{ width: 500, }}>
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
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Box>
            </div>
        </div>

    );
};

export default PostDetail;