// src/pages/Homepage.js
'use client'

// import {  Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  Switch,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider,
  createTheme, Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';

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

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};


const Homepage = () => {

  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };
  const plans = [
    {
      name: 'Basic',
      price: '$0',
      description: 'Get started with our free plan.',
      features: ['100 flashcards', 'Basic study modes', 'Limited analytics'],
      buttonText: 'Current Plan',
    },
    {
      name: 'Pro',
      price: isYearly ? '$18/year' : '$9/mo',
      description: 'Unlock more features for serious learners.',
      features: ['Unlimited flashcards', 'Advanced study modes', 'Detailed analytics', 'Custom decks'],
      buttonText: 'Get Pro',
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      description: 'Tailored solutions for teams and organizations.',
      features: ['Unlimited flashcards', 'Advanced study modes', 'Detailed analytics', 'Custom branding', 'Dedicated support'],
      buttonText: 'Contact Sales',
    }
  ];
  
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
            <AnimatedButton color="inherit" variant="outlined" onClick={() => handleClick('/signin')} endIcon={<ArrowForwardIcon />}>
              Sign In
            </AnimatedButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center', position: 'relative', backgroundColor: 'transparent' }}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={titleVariants}
          >
            <Typography variant="h2"
  component="h2"
  gutterBottom
  sx={{
    fontWeight: 'bold',
    fontSize: '4rem',
    lineHeight: 1,
    backgroundImage: 'linear-gradient(to right, #4a90e2, #007aff, #a55ab4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}>
              AI Flashcards
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', lineHeight: 1 }}>
              Your Best
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', lineHeight: 1 }}>
              Learning Companion
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={titleVariants}
          >
            <Typography  variant="body1"
        sx={{
          mt: 2,
          mb: 4,
          mx: 'auto', // Centers the text horizontally
          textAlign: 'center', // Centers the text within the container
          maxWidth: '80%', // Adjusts the max width of the text container to add margin
        }}>
              It is established that concepts stick better with quick revision questions. Our flashcards offer
              you the best experience when revising in whichever topics.
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={titleVariants}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <AnimatedButton variant="contained" onClick={() => handleClick('/checkout')} color="primary">
                Go Pricing
              </AnimatedButton>
              <AnimatedButton
                variant="outlined"
                color="primary"
                onClick={() => handleClick('/flashPage')}
                endIcon={<ArrowForwardIcon />}
              >
                Get Started
              </AnimatedButton>
            </Box>
          </motion.div>
        </Box>

        <Box
              sx={{
                my: 8,
                maxWidth: '600px', // Adjusts the max width of the Box
                mx: 'auto', // Centers the Box horizontally
              }}
            >
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 5, 
                  border: '3px solid white', // Adds a grey border around the Card
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    Flashcards
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Card 8 of 10
                  </Typography>
                  <Typography variant="body2">
                    What topics are covered in the AWS Developer Associate Certification?
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    AWS services such as EC2, S3, SQS, Lambda, API Gateway, VPC, and IAM, as well as cloud security, data encryption, and migration strategies.
                  </Typography>
                </CardContent>
              </Card>
            </Box>


          <Box sx={{ my: 8, textAlign: 'center' }}>
            <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', lineHeight: 1 }}>
            Choose the plan that fits your learning style and budget. 
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom sx={{fontSize:'1rem'}}>
            Get started with our free Basic plan or unlock more features with our Pro and Enterprise options.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <Typography>Monthly</Typography>
        
        
        <Switch checked={isYearly} onChange={handleToggle} />
        
        <Typography>Yearly</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
      {plans.map((plan) => (
        <Grid item xs={12} sm={4} key={plan.name}>
          <Card
            sx={{
              bgcolor: 'background.paper',
              height: '100%',
              borderRadius: '20px', // More rounded edges
              border: '1px solid white', // White borderline
              boxShadow: 'none', // Remove shadow for a thinner appearance
              flexDirection: 'column'  // Set flex direction to column
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="h4" component="div" gutterBottom>
                {plan.price}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {plan.description}
              </Typography>
              <Box sx={{ flexGrow: 3 }}>
                {plan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                  >
                    <CheckIcon sx={{ color: 'white', marginRight: '8px' }} />
                    <Typography variant="body2">{feature}</Typography>
                  </motion.div>
                ))}
              </Box>
              <Box sx={{ mt: 8 }}>  
              <AnimatedButton variant="outlined" color="primary" fullWidth>
                {plan.buttonText}
              </AnimatedButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
          </Box>

          <Box sx={{ my: 8 , pb: 8 } }>
            <Typography variant="h4" component="h2" gutterBottom textAlign="center">
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }} textAlign="center">
              Have more questions? Check out our answers below or contact us for further assistance.
            </Typography>
            {['How does AI generate flashcards?', 'Can I customize my flashcards?', 'Is there a limit to how many flashcards I can create?'].map((question) => (
              <Accordion key={question} sx={{ bgcolor: 'background.paper', mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {question === 'How does AI generate flashcards?' ?
                      'Our AI analyzes the content you provide, identifying key concepts and terms to create effective flashcards that enhance your learning experience.' :
                     question === 'Can I customize my flashcards?' ?
                      'Yes, you can customize flashcards by editing questions, answers, and adding additional notes to tailor them to your study preferences.' :
                      'The number of flashcards you can create depends on your plan. Check our pricing section for more details.'}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
                      {/* Adding a horizontal line */}
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
        </Container>
      </Box>
    </ThemeProvider>
  );

};

export default Homepage;