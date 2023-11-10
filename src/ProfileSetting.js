import { Link } from 'react-router-dom';
import Header from './Header';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Paper,Typography,Box,TextField,Button,Container,} from "@mui/material";

function ProfileSetting() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

  const handleChange = (e) => {
    
  };

  const handleSubmit = (e) => {
    navigate("/home");
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography align="center">プロフィール設定</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <input type="file" accept="image/*" onChange={handleChange} />

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="ニックネーム"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            保存
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileSetting;