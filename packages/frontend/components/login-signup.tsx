import { ReactElement, useState } from 'react';
import { Login } from './login';
import { Signup } from './signup';
import Link from 'next/link';

const loginTitle = 'Login';
const signupTitle = 'Sign Up';

export interface LoginSignupProps {
    initial: 'login' | 'signup';
}

export function LoginSignup({ initial }: LoginSignupProps): ReactElement {
    const [screen, setScreen] = useState(initial);

    return (
        <div className="card w-96 m-auto bg-base-100 shadow-xl mt-8">
            <div className="card-body text-center">
                <div className="flex gap-4 justify-between">
                    <div className="tabs tabs-boxed grow">
                        <a
                            className={`tab w-1/2 ${screen == 'login' ? 'tab-active' : ''}`}
                            onClick={() => setScreen('login')}
                        >
                            {loginTitle}
                        </a>
                        <a
                            className={`tab w-1/2 ${screen == 'signup' ? 'tab-active' : ''}`}
                            onClick={() => setScreen('signup')}
                        >
                            {signupTitle}
                        </a>
                    </div>
                    <Link href="/" className="btn btn-sm mt-1 btn-square">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Link>
                </div>
                {screen == 'login' ? <Login /> : <Signup />}
            </div>
        </div>
    );
}
