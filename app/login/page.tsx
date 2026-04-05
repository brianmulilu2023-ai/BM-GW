'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      document.cookie = `token=${token}; path=/`;
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-xl md:text-2xl mb-4 text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 mb-3 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 border rounded-md"
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
}