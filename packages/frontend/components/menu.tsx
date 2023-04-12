import Link from 'next/link';
import { ReactElement } from 'react';
import { authService } from '../services/auth.service';

export interface MenuProps {
    onMenuClose: () => void;
}

export function Menu(props: MenuProps): ReactElement {
    return (
        <div className="absolute inset-0" onClick={props.onMenuClose}>
            <ul className="menu bg-base-100 w-56 absolute top-12 left-0">
                <li>
                    <Link href="/blog">List Blogs</Link>
                </li>
                {authService.isLoggedIn ? (
                    <li>
                        <Link href="/manage">Manage Blogs</Link>
                    </li>
                ) : (
                    ''
                )}
                <li>
                    <Link href="/account/signup">Sign Up</Link>
                </li>
                <li>
                    <Link href="/account">Login</Link>
                </li>
            </ul>
        </div>
    );
}
