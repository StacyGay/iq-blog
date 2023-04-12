import axios from 'axios';
import { SignupDto } from '../types/api-types';

export interface LoginResponse {
    access_token: string;
}

class AuthService {
    private static _tokenKey = 'access_token';

    public get isLoggedIn(): boolean {
        const result = !!this.getAccessToken();
        console.log('checkIsLoggedIn', result);
        if (!result) this.setAccessToken(null);
        return result;
    }

    public async login(username: string, password: string): Promise<string | null> {
        try {
            const { data } = await axios.post<LoginResponse>(
                '/api/auth/login',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );

            this.setAccessToken(data.access_token);

            return data.access_token ? data.access_token : null;
        } catch (e) {
            // TODO: add logging
            console.log('error logging in', e);
            return null;
        }
    }

    public async postSignup(signup: SignupDto): Promise<string | null> {
        try {
            await axios.post(
                '/api/users',
                signup,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
            return await this.login(signup.username, signup.password);
        } catch (e) {
            throw new Error(`Error creating new user: ${e}`);
        }
    }

    public async testLogin(): Promise<boolean> {
        if (typeof window === 'undefined') return false; // Deal with ssr
        try {
            axios.get(
                '/api/auth/profile',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
        } catch (e) {
            console.log('login not valid');
            return false;
        }

        return true;
    }

    public setAccessToken(token: string): void {
        if (typeof window === 'undefined') return; // account for ssr

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem(AuthService._tokenKey, token);
            return;
        }

        delete axios.defaults.headers.common['Authorization'];
    }

    public getAccessToken(): string {
        if (typeof window === 'undefined') return undefined; // account for ssr
        return localStorage.getItem(AuthService._tokenKey);
    }
}

export const authService = new AuthService();
