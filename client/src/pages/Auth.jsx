import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-bg">
      <Header />
      <main>
        <section className="auth-section">
          <div className="auth-form-container">
            <h2 className="auth-title">{isLogin ? 'Sign In' : 'Sign Up Now'}</h2>
            {isLogin ? (
              <form className="auth-form">
                <input type="email" placeholder="Your email" className="auth-input" required />
                <input type="password" placeholder="Your password" className="auth-input" required />
                <button type="submit" className="auth-btn">Sign In</button>
                <div className="auth-switch">
                  Don&apos;t have an account?{' '}
                  <span className="auth-link" onClick={() => setIsLogin(false)}>Sign Up</span>
                </div>
              </form>
            ) : (
              <form className="auth-form">
                <input type="email" placeholder="Your email" className="auth-input" required />
                <input type="password" placeholder="Your password" className="auth-input" required />
                <label className="auth-checkbox-label">
                  <input type="checkbox" required />
                  <span className="auth-checkbox-custom" />
                  I agree to the Terms of Service.
                </label>
                <button type="submit" className="auth-btn">Create an Account</button>
                <div className="auth-switch">
                  Do you have an Account?{' '}
                  <span className="auth-link" onClick={() => setIsLogin(true)}>Sign In</span>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth; 