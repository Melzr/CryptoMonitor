export type User =
| {
    email: string;
    type: "EMAIL";
    password: string;
    role: "ADMIN" | "USER";
}
| {
    email: string;
    type: "GOOGLE";
    role: "ADMIN" | "USER";
}

export class UserManager {
    private static _instance: UserManager;
    private _data: User[] = 
        process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD ? [{
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            type: "EMAIL",
            role: 'ADMIN'
        }] : [];

    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public insertUser(email: string, password: string): User {
        if (this._data.find((user) => user.email === email)) {
            throw new Error('User already exists');
        }

        const user: User = { email, password, role: 'USER', type: 'EMAIL' };
        this._data.push(user);

        return user;
    }

    public insertGoogleUser(email: string): User {
        if (this._data.find((user) => user.email === email)) {
            throw new Error('User already exists');
        }

        const user: User = { email, role: 'USER', type: 'GOOGLE' };
        this._data.push(user);

        return user;
    }

    public getUser(email: string): User | null {
        return this._data.find((user) => user.email === email) || null;
    }
}