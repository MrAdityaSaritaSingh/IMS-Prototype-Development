import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from './Input';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';
import { LogIn } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        showToast('Login successful!', 'success');
      } else {
        showToast('Invalid credentials. Please try again.', 'error');
      }
      setLoading(false);
    }, 800);
  };

  const demoAccounts = [
    { role: 'Student', email: 'rajesh.kumar@college.edu', password: 'demo123' },
    { role: 'SPC Admin', email: 'priya.sharma@college.edu', password: 'demo123' },
    { role: 'Recruiter (Google)', email: 'larry@google.com', password: 'demo123' },
    { role: 'Recruiter (Eightfold)', email: 'ashutosh@eightfold.ai', password: 'demo123' },
    { role: 'Recruiter (NVIDIA)', email: 'jensen@nvidia.com', password: 'demo123' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EFF6FF] to-[#F3F4F6] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">IMS</span>
            </div>
            <h1 className="text-[#111827] mb-2">Institute Placement System</h1>
            <p className="text-[#6B7280] text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              <LogIn size={20} />
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-3">Demo Accounts:</p>
            <div className="space-y-2">
              {demoAccounts.map((account, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                    login(account.email, account.password);
                  }}
                  className="w-full text-left px-3 py-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors text-sm"
                >
                  <span className="font-medium text-[#111827]">{account.role}</span>
                  <span className="text-[#6B7280] ml-2">- {account.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
