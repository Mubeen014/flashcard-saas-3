import { Typography, Container } from '@mui/material';

export default function Cancel() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="body1">
        Your payment was canceled. If you have any questions or need assistance, please contact us.
      </Typography>
    </Container>
  );
}
