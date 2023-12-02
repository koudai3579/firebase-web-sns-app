import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAuth} from "firebase/auth";
import { useNavigate,useLocation} from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  //現在のパスを取得するために必要
  const location = useLocation();

  //constは再代入が不可能でmletは可能
  let isLogoutButtonVisible = true;
  if (location.pathname === "/" || location.pathname === "/signin") {
    isLogoutButtonVisible = false
  }

  //ログアウト処理
  const LogOutButtonAction = () => {

    //ログイン前の画面の時の処理
    if (location.pathname === "/" || location.pathname === "/signIn") {return}
    
    const confirm = window.confirm("ログアウトしますか？");
    if (confirm == true) {
      const auth = getAuth()
      auth.signOut();
      navigate("/");
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          AppName
        </Typography>
        {/* サインアップ、ログイン画面ではログアウトボタンは表示させない */}
        {isLogoutButtonVisible && (
          <Button color="inherit" onClick={LogOutButtonAction}>
            ログアウト
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;