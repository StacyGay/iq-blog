import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { authService } from '../services/auth.service';
import { ErrorAlert } from './error-alert';

export function Signup(): ReactElement {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [error, setError] = useState<string | null>(null);

    const postSignup = async () => {
        setError('');
        if (password != retypePass) {
            setError('You must retype a matching password');
            return;
        }
        try {
            const result = await authService.postSignup({ username, password });
            if (!result) {
                setError('Unable to sign up at this time');
                return;
            }
        } catch (e) {
            setError(`Unable to sign up at this time: ${e}`);
            return;
        }

        router.push('/manage');
    };

    return (
        <div className="p-2">
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
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Retype Password</span>
                </label>
                <input
                    type="password"
                    placeholder="retype password"
                    className="input input-bordered"
                    onChange={(e) => setRetypePass(e.target.value)}
                />
            </div>
            {error ? (
                <div className="mt-4">
                    <ErrorAlert>{error.toString()}</ErrorAlert>
                </div>
            ) : (
                ''
            )}
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={() => postSignup()}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
