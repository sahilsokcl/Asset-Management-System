import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup clicked');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen bg-purple-300 flex justify-center items-center">
      <div className="bg-white p-8 rounded-sm  shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              onClick={handleLogin}
            >
              Login
            </button>
           
              {/* <Link to="/signup"   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Signup
            </Link> */}
          
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
