import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {

    //ログアウト処理
    const handleLogout = () => {
        //JavaScript標準アラート
        const confirm = window.confirm("ログアウトしますか？");
　　    if (confirm) {
        //ログアウト処理(OK)
        }
    };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          My App
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;