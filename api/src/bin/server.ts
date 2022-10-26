import express, { Express } from 'express';
import cors from 'cors';
import RulesRouter from '../routes/rules';

export class Server {
    app: Express;
    port: string;
    paths: {
        rules: string;
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.paths = {
            rules: '/api/rules'
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes() {  
        this.app.use( this.paths.rules, RulesRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }
}
