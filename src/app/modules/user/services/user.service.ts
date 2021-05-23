import { Injectable } from '@angular/core';
import { JwtUser } from 'src/types';
import { coerceStringProperty } from 'src/utils';

const USER_LOCAL_STORAGE_KEY = 'JWT_USER';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public setUser(user: JwtUser): void {
        try {
            const userStringified = JSON.stringify(user ?? undefined);
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, userStringified);
        } catch (_) {
            console.warn('Failed to store user data.');

            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }
    }

    public getUser(): JwtUser {
        try {
            const userStringified = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            const user: JwtUser = JSON.parse(userStringified ?? null);
            return user;
        } catch (_) {
            console.warn('Failed to fetch user data.');

            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }

        return null;
    }
}
