import { describe, it } from "mocha";
import assert from "assert";
import { UserManager } from "../service/userManager";

describe('userManager', function() {
    const userManager = UserManager.Instance;
   
    it('should be not null after initialize it', function() {
        assert.notDeepEqual(userManager, null);
    });

    it('should have admin', function() {
        const user = userManager.getUser(process.env.ADMIN_EMAIL!);
        const expected = {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'ADMIN',
            type: 'EMAIL'
        };
        assert.deepEqual(user, expected);
    });
    
    it('get user that does not exists should return null', function() {
        const user = userManager.getUser('user');
        assert.deepEqual(user, null);
    });

    it('should be able to insert user', function() {
        const user = userManager.insertUser('email', 'password');
        const expectedUser = {
            email: 'email',
            password: 'password',
            role: 'USER',
            type: 'EMAIL'
        }
        assert.deepEqual(user, expectedUser);
    });

    it('should be able to get inserted user', function() {
        const user = userManager.getUser('email');
        const expectedUser = {
            email: 'email',
            password: 'password',
            role: 'USER',
            type: 'EMAIL'
        }
        assert.deepEqual(user, expectedUser);
    });

    it('should be able to insert google user', function() {
        const user = userManager.insertGoogleUser('google');
        const expectedUser = {
            email: 'google',
            role: 'USER',
            type: 'GOOGLE'
        }
        assert.deepEqual(user, expectedUser);
    });

    it('should be able to get inserted google user', function() {
        const user = userManager.getUser('google');
        const expectedUser = {
            email: 'google',
            role: 'USER',
            type: 'GOOGLE'
        }
        assert.deepEqual(user, expectedUser);
    });
})