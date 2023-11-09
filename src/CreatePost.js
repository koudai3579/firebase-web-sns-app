import { Link } from "react-router-dom";
import React, { useState } from 'react';

// 文字列を表示するためのライブラリ
import Box from '@mui/material/Box';

// テキストフィールドを表示するためのライブラリ
import TextField from '@mui/material/TextField';

// ボタンを表示するためのライブラリ
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


function CreatePost() {

    return (
        <div>
            {/* コンテンツ */}
            <div style={{ paddingTop: '36px', paddingBottom: '56px' }}>
                <br></br>

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
                        multiline
                        sx={{
                            height: '80px',
                            width: '250px',
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
                        multiline
                        sx={{
                            height: '80px',
                            width: '250px',
                        }}
                    />
                </Box>

                <div className="outerBox">
                    <div className="title">
                        <h2>画像をアップロードできます</h2>
                    </div>
                    <div className="imageUplodeBox">
                        <img id="selectedImage" alt="イメージ" />
                    </div>
                    <br></br>
                    <Button variant="contained">
                        画像ファイルを選択
                        <input className="imageUploadInput" multiple name="imageURL" type="file" accept=".png,jpeg,jpg" />
                    </Button>
                </div>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="contained" endIcon={<SendIcon />} style={{ color: 'black', backgroundColor: '#BEDFC2', width: '250px', height: '80px', fontSize: '25px' }} >
                        投稿
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default CreatePost;