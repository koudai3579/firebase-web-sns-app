import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  //ログアウト処理
  const LogOutButtonAction = () => {
    const confirm = window.confirm("ログアウトしますか？");
    if (confirm == true) {
      const auth = getAuth()
      auth.signOut();
      navigate("/");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          My App
        </Typography>
        <Button color="inherit" onClick={LogOutButtonAction}>
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;