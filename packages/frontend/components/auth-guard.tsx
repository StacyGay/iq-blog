import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/router';
import { ErrorAlert } from './error-alert';

export function AuthGuard({ children }: PropsWithChildren): ReactElement {
    const router = useRouter();
    useEffect(() => {
        console.log('isLoggedIn', authService.isLoggedIn);
        if (!authService.isLoggedIn) {
            router.push('/account');
        }
    }, [router]);

    return (
        <>
            {authService.isLoggedIn ? (
                children
            ) : (
                <ErrorAlert>You must be logged in to continue</ErrorAlert>
            )}
        </>
    );
}
