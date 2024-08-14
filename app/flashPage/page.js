'use client'

import { Text, Box, Button, Card, CardContent, Container, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { useState } from "react";



export default function flashPageContent() {
    const [text, setText] = useState('');
    const [setName, setSetName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    
    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);


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
        console.log('brother eugh:', response)

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
            </Box>
        </Container>
    );
}
