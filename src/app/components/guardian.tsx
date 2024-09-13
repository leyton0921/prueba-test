'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthGuard = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);
};

export default useAuthGuard;

