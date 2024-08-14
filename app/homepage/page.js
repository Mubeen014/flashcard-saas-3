// src/pages/Homepage.js
'use client'
import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';



const Homepage = () => {

  const router = useRouter();
  const handleClick = (path) => {
    router.push(path);
  }

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        top: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        padding: '0 20px',
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        Welcome to Flashcard Maker
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
        Discover the amazing features and benefits of our app. Get started now and explore what we have to offer!
      </Typography>
      <Button variant="contained"
      color="primary"
      onClick={() => handleClick('/flashPage')}
      sx={{ mb: 4 }}>
        Get Started
      </Button>
      <Box
        sx={{
          position: 'absolute',
          bottom: 180,
          left: 16,
          backgroundColor: '#f5f5f5',
          padding: 3, // Increase padding
          width: '300px', // Set width
          height: '100px', // Set height
        }}
        >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Create an account to get started</Typography>
          <Button variant='contained'
          sx={{
            mt: 2
          }}> Sign Up </Button>
        </Paper>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 180,
          right: 16,
          backgroundColor: '#e3f2fd',
          padding: 3, // Increase padding
          width: '300px', // Set width
          height: '100px', // Set height
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Join Premium</Typography>
          <Typography variant="body2">Unlock exclusive features with our premium plan.</Typography>
          <Button variant='contained'
          onClick={() => handleClick('/checkout')}
          sx={{
            mt: 2
          }}>Join Premium</Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Homepage;
