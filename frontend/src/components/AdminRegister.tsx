import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminRegister: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'register' | 'change'>('register');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) setMessage('Admin registered successfully!');
      else setMessage(data.error || 'Registration failed');
    } catch (err) {
      setMessage('Error registering admin');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password, newPassword })
      });
      const data = await res.json();
      if (data.success) setMessage('Password changed successfully!');
      else setMessage(data.error || 'Password change failed');
    } catch (err) {
      setMessage('Error changing password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 card">
      <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'register' ? 'Admin Registration' : 'Change Password'}</h2>
      <form onSubmit={mode === 'register' ? handleRegister : handleChangePassword} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded" required />
        </div>
        <div>
          <label className="block mb-2 font-semibold">{mode === 'register' ? 'Password' : 'Current Password'}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded" required />
        </div>
        {mode === 'change' && (
          <div>
            <label className="block mb-2 font-semibold">New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border rounded" required />
          </div>
        )}
        {mode === 'change' && (
          <div>
            <label className="block mb-2 font-semibold">JWT Token</label>
            <input type="text" value={token} onChange={e => setToken(e.target.value)} className="w-full px-4 py-2 border rounded" required />
          </div>
        )}
        <button type="submit" className="w-full btn-primary py-2 font-bold rounded">
          {mode === 'register' ? 'Register Admin' : 'Change Password'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button className="text-blue-600 underline mr-4" onClick={() => setMode('register')}>Register</button>
        <button className="text-blue-600 underline" onClick={() => setMode('change')}>Change Password</button>
      </div>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
};

export default AdminRegister;
