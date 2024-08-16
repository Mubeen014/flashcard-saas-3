'use client'

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Typography, TextField, Card, CardContent, Container } from "@mui/material";
import { motion } from 'framer-motion';
import db from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const saveFlashCard = async (userId, flashcardDataJSON) => {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    // Create a user-specific collection
    const userCollection = collection(db, `users/${userId}/flashcards`);
    const docRef = await addDoc(userCollection, flashcardDataJSON);

    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error saving flashcards:', e.message);
  }
};

export default function FlashPageContent() {
  const { user } = useUser();
  const userId = user?.id;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, flashcards.length - 1));
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleSaveFlashcard = (flashcardDataJSON) => {
    saveFlashCard(userId, flashcardDataJSON);
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
    <div className="bg-animated-gradient text-white min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <Container maxWidth="md" className="text-center mb-8">
        <Typography variant="h4" className="text-4xl sm:text-5xl font-bold mb-6">
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
          className="bg-white text-[#161D6F] rounded-lg shadow-md border-[#98DED9] focus:outline-none focus:ring-2 focus:ring-[#98DED9] transition-all duration-300 ease-in-out mb-6"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#98DED9] to-[#687EFF] text-white py-2 px-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Generate Flashcards
        </Button>
      </Container>
      <Box className="flex flex-col items-center mb-8 space-y-6">
        {flashcards.length > 0 ? (
          <motion.div
            className="relative bg-white text-[#161D6F] p-6 rounded-lg shadow-lg max-w-lg w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <CardContent className="text-center">
              <Typography variant="h6" className="text-xl font-semibold mb-4">
                {isFlipped ? `${flashcards[currentIndex].back}` : `${flashcards[currentIndex].front}`}
              </Typography>
            </CardContent>
            <Box className="flex justify-between px-4 mb-4 space-x-4">
              <Button onClick={handlePrevious} disabled={currentIndex === 0} className="bg-[#98DED9] text-white hover:bg-[#687EFF] transition duration-300 ease-in-out px-4 py-2 rounded-lg">
                Prev
              </Button>
              <Button onClick={handleFlip} className="bg-[#687EFF] text-white hover:bg-[#161D6F] transition duration-300 ease-in-out px-4 py-2 rounded-lg">
                {isFlipped ? 'Show Front' : 'Flip'}
              </Button>
              <Button onClick={handleNext} disabled={currentIndex === flashcards.length - 1} className="bg-[#98DED9] text-white hover:bg-[#687EFF] transition duration-300 ease-in-out px-4 py-2 rounded-lg">
                Next
              </Button>
            </Box>
          </motion.div>
        ) : (
          <Typography variant="body1" className="text-center">No flashcards generated yet.</Typography>
        )}
      </Box>
      <Box className="text-center">
        <Button
          onClick={() => handleSaveFlashcard({ flashcards })}
          className="bg-gradient-to-r from-[#98DED9] to-[#687EFF] text-white py-2 px-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Save Flashcard
        </Button>
      </Box>
    </div>
  );
}
