'use client'

import { Text, Box, Button, Card, CardContent, Container, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function FlashPageContent() {
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
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" gutterBottom>
                  Generate Flashcards
              </Typography>
              <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  label='Enter text'
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
            </Box>
            <Box>
              {flashcards.length > 0 ? (
                flashcards.map((card, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Front: {card.front}
                      </Typography>
                      <Typography variant="body1">
                        Back: {card.back}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body1">No flashcards generated yet.</Typography>
              )}
            </Box>
        </Container>
    );
}
