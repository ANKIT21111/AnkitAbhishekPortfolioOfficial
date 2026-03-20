import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, XCircle, Loader2, ArrowLeft, Send } from 'lucide-react';

const Unsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Auto-unsubscribe if email is in URL
  useEffect(() => {
    if (searchParams.get('email')) {
      handleUnsubscribe(searchParams.get('email')!);
    }
  }, []);

  const handleUnsubscribe = async (eOrEmail: string | React.FormEvent) => {
    if (typeof eOrEmail !== 'string') eOrEmail.preventDefault();
    const targetEmail = typeof eOrEmail === 'string' ? eOrEmail : email;

    if (!targetEmail || !targetEmail.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/.netlify/functions/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You have been successfully unsubscribed from Ankit Abhishek\'s knowledge base.');
      } else {
        setStatus('error');
        if (data.error === 'SUBSCRIPTION_NOT_FOUND') {
          setMessage('This email address was not found in our active subscriber list.');
        } else {
          setMessage(data.error || 'Something went wrong. Please try again later.');
        }
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the server. Please check your interconnection.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-transparent">
      <div className="w-full max-width-[600px] max-w-md">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-10 text-center border-green-500/20 shadow-green-500/5"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative border border-green-500/20">
                <ShieldCheck className="w-10 h-10 text-green-500" />
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full scale-150 animate-pulse"></div>
              </div>
              <h1 className="text-3xl font-black text-white mb-4 tracking-tight">LINK TERMINATED</h1>
              <p className="text-gray-400 mb-10 leading-relaxed text-lg italic">"{message}"</p>
              
              <button
                onClick={() => navigate('/')}
                className="group relative flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl text-white font-bold transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Return to Surface
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-10 border-white/10 shadow-xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -translate-y-16 translate-x-16 rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">UNSUBSCRIBE</h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-blue-500 font-bold">Manage_Subscription_Access</p>
                </div>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed font-light">
                Confirm your request to terminate your technical update synchronization.
              </p>

              <form onSubmit={handleUnsubscribe} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 block font-mono font-bold">Target Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-2xl py-4 px-5 text-white placeholder-gray-600 outline-none transition-all font-medium"
                      required
                      disabled={status === 'loading'}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse group-focus-within:bg-blue-400"></div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400 font-medium leading-tight">{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative w-full h-14 bg-white text-black font-black rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3">
                    {status === 'loading' ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        TERMINATE CONNECTION
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>
              
              <p className="mt-8 text-center text-[11px] text-gray-600 font-mono tracking-tighter uppercase">
                Secure Transmission Termination Protocol v1.0
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Unsubscribe;
