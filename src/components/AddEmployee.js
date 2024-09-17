import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';

const theme = createTheme();

export default function AddEmployee() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // รับโทเคนจาก localStorage

      // ส่งคำขอพร้อมกับโทเคนใน Authorization header
      const response = await axios.post('http://localhost:4000/api/employee', {
        username,
        password, // password ควรจะถูกแฮชในฝั่ง server
        firstName,
        lastName,
        email,
        gender
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = response.data;
      console.log(result);
      alert(result['message']);

      if (result['status'] === true) {
        window.location.href = '/EmployeeList';
      }

    } catch (err) {
      console.log(err);
      alert('เกิดข้อผิดพลาดระหว่างการเพิ่มพนักงาน');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3, // เพิ่มเงาให้กับกล่อง
            border: '1px solid #ccc', // เพิ่มขอบให้กับกล่อง
            padding: 3,
            borderRadius: 2,
            backgroundColor: 'white', // ตั้งค่าพื้นหลังเป็นสีขาว
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* คุณสามารถเพิ่มไอคอนที่นี่ได้หากต้องการ */}
          </Avatar>
          <Typography component="h1" variant="h5">
            เพิ่มพนักงาน
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="ชื่อจริง"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="นามสกุล"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="อีเมล"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="เพศ"
              name="gender"
              autoComplete="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เพิ่มพนักงาน
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="/EmployeeList" variant="body2">
                  ดูรายชื่อพนักงาน
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Adminlogin" variant="body2">
                  กลับไปที่เข้าสู่ระบบแอดมิน
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
