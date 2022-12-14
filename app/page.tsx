'use client';
import { AppHeader } from 'component/Header/AppHeader';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <AppHeader />
            <Link href={'/auth/sign-in'}>sign in</Link>
        </div>
    );
}
