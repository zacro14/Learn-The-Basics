import { useRouter, NextRouter } from 'next/router';
export const useNextRouter = (): NextRouter => {
    const router = useRouter();
    return router;
};
