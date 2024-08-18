'use client'

import { Box, Button,AppBar, Card, Toolbar, Divider, CardContent, Container, Typography, TextField } from "@mui/material";
import { useState } from "react";
import db from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
// Animated button component
const AnimatedButton = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button {...props}>
      {children}
    </Button>
  </motion.div>
);

const saveFlashCard = async (userId, flashcardDataJSON) => {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    // Create a user-specific collection
    const userCollection = collection(db, 'users/${userId}/flashcards');
    const docRef = await addDoc(userCollection, flashcardDataJSON);

    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error saving flashcards:', e.message);
  }
};

export default function FlashPageContent() {
  // ... (keep all the existing state and functions)

  const { user } = useUser();
  const userId = user?.id;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, flashcards.length - 1))
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleFlip = () => {
    event.stopPropagation();
    setIsFlipped((prev) => !prev);
  };


  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);


  

  const handleSaveFlashcard = (flashcardDataJSON) => {
    saveFlashCard(userId, flashcardDataJSON);
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
        alert('Please enter some text to generate flashcards');
        return;
    }

    const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
    });

    const data = await response.json();

    // Log the data to inspect its structure
    console.log('API response:', data);

    // Ensure the data is in the expected format
    if (Array.isArray(data.flashcards)) {
        setFlashcards(data.flashcards);
    } else {
        alert('Unexpected response format');
    }
  };  
  const router = useRouter();
  const handleClick = (path) => {
    router.push(path);
  }
  

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FlashMind
            </Typography>
            
          </Toolbar>
        </AppBar>
      <Container maxWidth='md' sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card sx={{ bgcolor: 'background.paper', borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Flashcards 
            </Typography>
            <Box onClick={handleFlip} // Add onClick handler here
             sx={{ 
              bgcolor: 'background.default', 
              height: 200, 
              borderRadius: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2,
              cursor: 'pointer', // Add cursor style to indicate it's clickable
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>
              <Typography 
                variant="body1" 
                sx={{
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
              {flashcards.length > 0 ? (
                <Typography variant="body1">
                  {isFlipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                </Typography>
              ) : (
                <Typography variant="body1">
                  No flashcards generated yet. Enter text and click "Generate Flashcards".
                </Typography>
              )}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Click Card to Flip
              </Typography>
              <Box>
                <Button startIcon={<ArrowBackIcon />} onClick={handlePrevious} disabled={currentIndex === 0}>
                  
                </Button>
                <Button endIcon={<ArrowForwardIcon />} onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
                  
                </Button>
              </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
              Enter text:
            </Typography>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Enter text to generate flashcards'
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Generate Flashcards
            </Button>
            <Button
              onClick={() => handleSaveFlashcard({flashcards})}
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Flashcard
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Divider sx={{ my: 4 }} />

            {/* Footer */}
            <Box component="footer" sx={{ textAlign: 'center', pt: 2, pb:3 }}>
              <Typography variant="body2">
                &copy; {new Date().getFullYear()} FlashMind. All rights reserved.
              </Typography>
              <Typography variant="body2">
                Contact us: info@flashmind.com
              </Typography>
            </Box>
      </Box>
    </ThemeProvider>
  );
}