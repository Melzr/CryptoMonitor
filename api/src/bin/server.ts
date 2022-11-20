import express, { Express } from 'express';
import cors from 'cors';
import AuthRouter from '../routes/auth';
import RulesRouter from '../routes/rules';
import WalletRouter from '../routes/wallet';
import UserRouter from '../routes/user';
import { Wallet } from '../service/wallet';
import { DataManager } from '../service/dataManager';
import { RuleManager } from '../service/ruleManager';
import { VariableManager } from '../service/variableManager';

export class Server {
    app: Express;
    port: string;
    paths: {
        auth: string;
        rules: string;
        wallet: string;
        user: string;
    }
    wallet: Wallet;
    dataManager: DataManager;
    ruleManager: RuleManager;
    variableManager: VariableManager;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.wallet = Wallet.Instance;
        this.dataManager = DataManager.Instance;
        this.ruleManager = RuleManager.Instance;
        this.variableManager = VariableManager.Instance;

        this.paths = {
            auth: '/api/token',
            rules: '/api/rules',
            wallet: '/api/wallet',
            user: '/api/user'
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes() {  
        this.app.use( this.paths.auth, AuthRouter() );
        this.app.use( this.paths.rules, RulesRouter() );
        this.app.use( this.paths.wallet, WalletRouter() );
        this.app.use( this.paths.user, UserRouter() );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }
}
