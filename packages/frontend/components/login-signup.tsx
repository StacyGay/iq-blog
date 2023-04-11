import { ReactElement, useState } from 'react';
import { Login } from './login';
import { Signup } from './signup';

const loginTitle = 'Login';
const signupTitle = 'Sign Up';

export interface LoginSignupProps {
    initial: 'login' | 'signup';
    onClose: () => void;
}

export function LoginSignup({
    initial,
    onClose,
}: LoginSignupProps): ReactElement {
    const [screen, setScreen] = useState(initial);
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <div className="flex gap-4 justify-between">
                    <div className="tabs tabs-boxed grow">
                        <a
                            className={`tab ${
                                screen == 'login' ? 'tab-active' : ''
                            }`}
                            onClick={() => setScreen('login')}
                        >
                            {loginTitle}
                        </a>
                        <a
                            className={`tab ${
                                screen == 'signup' ? 'tab-active' : ''
                            }`}
                            onClick={() => setScreen('signup')}
                        >
                            {signupTitle}
                        </a>
                    </div>
                    <button
                        className="btn btn-sm mt-1 btn-square"
                        onClick={onClose}
                    >
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
                    </button>
                </div>
                {screen == 'login' ? <Login /> : <Signup />}
            </div>
        </div>
    );
}
