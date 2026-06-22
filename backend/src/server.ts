import dotenv from 'dotenv';
import path from 'path';

// Load correct environment variables
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : process.env.NODE_ENV === 'staging' 
    ? '.env.staging' 
    : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

import app from './app';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
