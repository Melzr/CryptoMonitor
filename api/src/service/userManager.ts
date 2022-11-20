export type User = {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
};

export class UserManager {
    private static _instance: UserManager;
    private _data: User[] =  [{
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'ADMIN'
    }]

    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public insertUser(email: string, password: string): User {
        if (this._data.find((user) => user.email === email)) {
            throw new Error('User already exists');
        }

        const user: User = { email, password, role: 'USER' };
        this._data.push(user);

        return user;
    }

    public getUser(email: string): User | null {
        return this._data.find((user) => user.email === email) || null;
    }
}