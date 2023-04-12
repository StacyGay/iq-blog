import { ReactElement, useState } from 'react';
import { authService } from '../services/auth.service';
import { ErrorAlert } from './error-alert';
import { useRouter } from 'next/router';

export function Login(): ReactElement {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setError(null);
        const result = await authService.login(username, password);
        if (!result) {
            setError('Username or password not found');
            return;
        }

        router.push('/manage');
    };

    return (
        <form 
            className="p-2" 
            onSubmit={(e) => {
                login();
                e.preventDefault();
            }}
        >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">username</span>
                </label>
                <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={() => login()}>
                    Login
                </button>
            </div>
            <div className="mt-4">
                {error ? <ErrorAlert>Invalid username or password</ErrorAlert> : ''}
            </div>
        </form>
    );
}
