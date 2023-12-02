import React, { useState, useEffect } from 'react';
import Header from './Header';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {

    const navigate = useNavigate();
    const auth = getAuth();
    const [checked, setChecked] = useState(false);
    const defaultTheme = createTheme();
    
    //SignUpボタンが押された時の処理
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')

        if (checked == false) {
            alert("年齢に関するチェックボックスをご確認ください。")
            return
        }
        if (email.length < 1) {
            alert("emailが空欄になっています。")
            return
        }
        if (password.length < 6) {
            alert("パスワードは6文字以上でご入力ください。")
            return
        }
        //EmailとPasswordで新規ユーザーをFirebase上に作成
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            alert("ユーザー登録に成功しました。")
            navigate("/profileSetting");
        })
            .catch((error) => {
                alert("ユーザー登録に失敗しました。")
                console.log(error.message)
            });
    };

    return (
        <div>

            {/* ヘッダー */}
            <Header />

            {/* コンテンツ */}
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            新規ユーザー作成
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            // value="allowExtraEmails"
                                            color="primary" />}
                                        label="18歳以上ですか？"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                新規ユーザー作成
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/signin" variant="body2">ログインはこちらから</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}