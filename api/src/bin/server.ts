import express, { Express } from 'express';
import cors from 'cors';
import RulesRouter from '../routes/rules';
import { Wallet } from '../wallet';
import { DataManager } from '../dataManager';
import { RuleManager } from '../ruleManager';
import { VariableManager } from '../variableManager';

export class Server {
    app: Express;
    port: string;
    paths: {
        rules: string;
    }
    wallet: Wallet;
    dataManager: DataManager;
    ruleManager: RuleManager;
    variableManager: VariableManager;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.wallet = Wallet.Instance;
        this.dataManager = DataManager.Instance;
        this.ruleManager = RuleManager.Instance;
        this.variableManager = VariableManager.Instance;

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
        this.app.use( this.paths.rules, RulesRouter() );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }
}
