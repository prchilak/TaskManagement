import app from './src/app.js';
import dotenv from 'dotenv';
import { initSocket } from './src/socket/index.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initSocket(server);