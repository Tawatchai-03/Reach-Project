import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CssBaseline, Typography, List, ListItem, ListItemText, Grid, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees data from server
    const fetchEmployees = async () => {
      try {
        // รับโทเคนจาก localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          alert('ไม่พบโทเคน กรุณาเข้าสู่ระบบก่อน');
          window.location.href = '/Adminlogin';
          return;
        }

        // ส่งคำขอไปยังเซิร์ฟเวอร์พร้อมโทเคน
        const response = await axios.get('http://localhost:4000/api/employee', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน');
      }
    };

    fetchEmployees();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
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
          <Typography component="h1" variant="h5" gutterBottom>
            รายชื่อพนักงาน
          </Typography>
          <List>
            {employees.map((employee) => (
              <ListItem key={employee.empID}>
                <ListItemText 
                  primary={`${employee.firstName} ${employee.lastName}`} 
                  secondary={`ชื่อผู้ใช้: ${employee.username}, อีเมล: ${employee.email}, เพศ: ${employee.gender}`} 
                />
              </ListItem>
            ))}
          </List>
          <Grid container justifyContent="space-between"> {/* เปลี่ยนเป็น space-between เพื่อเพิ่มพื้นที่ระหว่างลิงก์ */}
            <Grid item>
              <Link href="/AddEmployee" variant="body2">
                เพิ่มพนักงานใหม่
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Adminlogin" variant="body2">
                กลับไปที่เข้าสู่ระบบแอดมิน
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
