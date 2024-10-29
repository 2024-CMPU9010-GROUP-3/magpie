"use client"; 

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            if (router) {
                router.push('/login'); // if no token, redirect to login page
            }
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
