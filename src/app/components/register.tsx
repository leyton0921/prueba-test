"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../controllers/register.controller';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { user, message } = await registerUser(name, email, password);

    if (user) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 2000); 
    } else {
      setError(message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      {error && <p>{error}</p>}
      {success && <p >{success}</p>}
      <button type="submit" >Register</button>
    </form>
  );
};

export default RegisterForm;