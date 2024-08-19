'use client';

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Typography, TextField, CardContent, Container, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { motion } from 'framer-motion';
import db from "@/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const saveFlashCard = async (userId, flashcardDataJSON, flashcardName) => {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    if (!flashcardName.trim()) {
      console.error('Flashcard name is required');
      return;
    }

    const userCollection = collection(db, `users/${userId}/flashcards`);
    const flashcardDataWithName = { name: flashcardName, ...flashcardDataJSON };
    const docRef = await addDoc(userCollection, flashcardDataWithName);

    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error saving flashcards:', e.message);
  }
};

const getFlashcards = async (userId) => {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    const userCollection = collection(db, `users/${userId}/flashcards`);
    const querySnapshot = await getDocs(userCollection);

    const flashcards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return flashcards;
  } catch (e) {
    console.error('Error retrieving flashcards:', e.message);
    return [];
  }
};

const deleteFlashcard = async (userId, flashcardId) => {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    const flashcardRef = doc(db, `users/${userId}/flashcards`, flashcardId);
    await deleteDoc(flashcardRef);
    console.log('Flashcard deleted successfully');
  } catch (error) {
    console.error('Error deleting flashcard:', error.message);
  }
};

export default function FlashPageContent() {
  const { user } = useUser();
  const userId = user?.id;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardList, setFlashcardList] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [savedFlashcards, setSavedFlashcards] = useState([]);

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

  const handleSaveFlashcard = async (flashcardDataJSON) => {
    const flashcardName = prompt('Enter a name for your flashcard:');
    await saveFlashCard(userId, flashcardDataJSON, flashcardName);
    await fetchFlashcards(); // Refresh the list after saving
  };

  const fetchFlashcards = async () => {
    const flashcards = await getFlashcards(userId);
    setFlashcardList(flashcards);
  };

  const handleFlashcardClick = (flashcard) => {
    setFlashcards(flashcard.flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFlashcard(flashcard);
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    await deleteFlashcard(userId, flashcardId);
    setSavedFlashcards(prevFlashcards => prevFlashcards.filter(f => f.id !== flashcardId));
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

    if (Array.isArray(data.flashcards)) {
      setFlashcards(data.flashcards);
    } else {
      alert('Unexpected response format');
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [userId]);

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
      <Box className="text-center mb-8">
        <Button
          onClick={() => handleSaveFlashcard({ flashcards })}
          className="bg-gradient-to-r from-[#98DED9] to-[#687EFF] text-white py-2 px-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Save Flashcard
        </Button>
      </Box>
      <Container maxWidth="md">
        <Typography variant="h5" className="mb-4">Your Flashcards</Typography>
        <List>
          {flashcardList.map((flashcard) => (
            <ListItem key={flashcard.id} button onClick={() => handleFlashcardClick(flashcard)}>
              <ListItemText primary={flashcard.name} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFlashcard(flashcard.id)}/>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}
