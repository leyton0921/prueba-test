"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '../controllers/login.controller';
import Input from '../../UI/input';
import Button from '../../UI/buttons';
import styles from '../style/LoginForm.module.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setMessage('Login successful');
      localStorage.setItem('token', token);
      console.log('User:', user);
      router.push('/usuario');
    } else {
      setError('Login failed: Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        name="Username"
        label="Username:"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'ingrese su correo'}
        className={styles["input"]}
      />
      <Input
        name="Password"
        label="Password:"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={'password'}
        className={styles["input"]}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        type="submit"
        label="Login"
        onClick={() => console.log("Button clicked")}
        className={styles["Button"]}
      />
      {message && <p className={styles.success}>{message}</p>}
    </form>
  );
};

export default LoginForm;
