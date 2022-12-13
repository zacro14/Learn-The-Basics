import Link from 'next/link';

export default function Home() {
    return (
        <div>
            home
            <Link href={'/auth/sign-in'}>sign in</Link>
        </div>
    );
}
