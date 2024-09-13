"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../controllers/register.controller';
import styles from '../style/RegisterForm.module.css';

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
    <form onSubmit={handleSubmit} className={styles["form"]}>
      <div className={styles["formGrup"]}>
        <label htmlFor="name" >Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required="true"
          className={styles["input"]}

         
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles["label"]}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          className={styles["input"]}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          className={styles.input}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <button type="submit" className={styles.button}>Register</button>
    </form>
  );
};

export default RegisterForm;
