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


function Home() {

    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* コンテンツ */}
            <br></br>
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
            >
                
                <Card sx={{ maxWidth: 500 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                        }
                        action={
                            <IconButton aria-label="settings"></IconButton>
                        }
                        title="タイトル"
                        subheader="2023/11/14"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={logo}
                        alt="image"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
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