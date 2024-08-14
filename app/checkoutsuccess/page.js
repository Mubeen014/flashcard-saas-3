import { Typography, Container } from '@mui/material';

export default function Success() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your purchase. Your payment has been processed successfully.
      </Typography>
    </Container>
  );
}
