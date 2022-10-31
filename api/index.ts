import * as dotenv from 'dotenv'
import { Server } from './src/bin/server';

dotenv.config();

const server = new Server();
server.listen();
