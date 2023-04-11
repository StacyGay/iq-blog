import { ReactElement } from 'react';

export interface MenuProps {
    onLogin?: () => void;
    onSignup?: () => void;
    onMenuClose: () => void;
}

export function Menu(props: MenuProps): ReactElement {
    return (
        <div className="absolute inset-0" onClick={props.onMenuClose}>
            <ul className="menu bg-base-100 w-56 absolute top-12 left-0">
                <li>
                    <a>List Blogs</a>
                </li>
                <li>
                    <a onClick={props.onSignup}>Sign Up</a>
                </li>
                <li>
                    <a onClick={props.onLogin}>Log In</a>
                </li>
            </ul>
        </div>
    );
}
