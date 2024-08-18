'use client'
import  getStripe  from "@/utils/get-stripe";
import { useState } from "react";
import { Button,Box, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Checkout() {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true);
      
        try {
          const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });
      
          console.log('Fetch response:', res);
      
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
      
          const session = await res.json();
          console.log('Parsed session data:', session);
      
          if (typeof session.id !== 'string') {
            throw new Error('Session ID is not a string');
          }
      
          const stripe = await getStripe();
      
          if (!stripe) {
            throw new Error('Failed to initialize Stripe');
          }
      
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
      
          if (error) {
            console.error('Error redirecting to checkout:', error);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
      
      // Create a dark blue theme
const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a192f',
      paper: '#1e3a8a',
    },
  },
});
      
    return (
      <ThemeProvider theme={darkBlueTheme}>
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
                <Container  maxWidth='md' sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{mb:20}}>Checkout</Typography>
            <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={loading}
            >
                {loading ? 'Processing...' : 'Pay wtih stripe'}
            </Button>
        </Container>
        </Box>
        </ThemeProvider>
    )
}