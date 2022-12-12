import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Link href={'/auth/signin'}>sign in</Link>
        </div>
    );
}
