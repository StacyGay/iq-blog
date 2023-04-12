import { PropsWithChildren, ReactElement } from 'react';
import { Header } from './header';

export function Layout({ children }: PropsWithChildren): ReactElement {
    return (
        <div className='min-h-screen min-w-screen bg-base-200'>
            <Header></Header>
            <div className="p-8">
                {children}
            </div>
        </div>
    );
}
