'use client'

import { Text, Box, Button, Card, CardContent, Container, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function FlashPageContent() {

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
    setIsFlipped((prev) => !prev);
  };


  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const saveFlashCard = async () => {
      
  };

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

  return (
      <Container maxWidth='md'>
          <Box sx={{
            my: 4,
            height: 200,
            }}>
            <Typography variant="h4" gutterBottom>
                Generate Flashcards
            </Typography>
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label='Enter text'
                fullWidth
                fullHeight
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
          </Box>
          <Box sx={{ display: 'fixed',
            alignItems: 'center',
            bgcolor:'background.paper',
            mt: 10,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 2,
            boxShadow: 3,
            zIndex: 2000,
            marginTop: 20,
            }}>
            {flashcards.length > 0 ? (
              <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {isFlipped ? `${flashcards[currentIndex].back}` : `${flashcards[currentIndex].front}`}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, mb: 2 }}>
                  <Button onClick={handlePrevious} disabled={currentIndex === 0}>Prev</Button>
                  <Button onClick={handleFlip}>{isFlipped ? 'Show Front' : 'Flip'}</Button>
                  <Button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next</Button>
                </Box>
              </Card>
            ) : (
              <Typography variant="body1">No flashcards generated yet.</Typography>
            )}
          </Box>
      </Container>
  );
}
