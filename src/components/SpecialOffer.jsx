import { Card, CardContent, Typography, Box, Button } from '@mui/material';

export default function SpecialOffer() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Special Offer
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Get 10% off your next biogas refill or solar battery upgrade.
        </Typography>
        <Box textAlign="right">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            href="https://eden-kitchen.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
