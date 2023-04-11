import { ReactElement, useState } from 'react';
import { Menu } from './menu';
import { LoginSignup } from './login-signup';

export function Header(): ReactElement {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginScreen, setLoginScreen] = useState<'login' | 'signup' | null>(null);

    return (
        <div className="navbar bg-base-100">
            {
                menuOpen ?
                    <Menu 
                        onMenuClose={() => setMenuOpen(false)} 
                        onLogin={() => setLoginScreen('login')}
                        onSignup={() => setLoginScreen('signup')}
                    /> : ''
            }

            { 
                loginScreen ? 
                    <LoginSignup 
                        initial={loginScreen} 
                        onClose={() => setLoginScreen(null)} 
                    /> : '' 
            }
            
            <div className="flex-none">
                <button className="btn btn-square btn-ghost" onClick={() => setMenuOpen(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
