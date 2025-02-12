import React from 'react';
import { useState } from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async(e) => {
            e.preventDefault();

            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token',data.token);
                alert('Login Successfully !')
            }else{
                alert(data.error);
            }
    };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="bg-blue-500 p-8 rounded-xl shadow-md w-full max-w-md ">
        <h2 className="text-2xl  mb-6 text-center text-white font-bold">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">
             Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border bg-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white " htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-white focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-white hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-white hover:font-bold hover:text-blue-500 transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>

  )
}
