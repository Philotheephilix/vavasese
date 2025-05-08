'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfApp, SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

function Playground() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);
  
  if (!userId) return null;

  const selfApp = new SelfAppBuilder({
    appName: "VAVASASA",
    scope: "VAVASASA",
    endpoint: "/api/verify",
    
    userId,
    devMode: true,
  } as Partial<SelfApp>).build();
  
  console.log("selfApp configuration:", {
    appName: selfApp.appName,
    scope: selfApp.scope,
    endpoint: selfApp.endpoint,
  
    userId: selfApp.userId
  });

  return (
    <div className="App flex flex-col min-h-screen bg-black text-white" suppressHydrationWarning>
      <nav className="w-full bg-black border-b border-gray-800 py-3 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">VAVASASA</h1>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-8">Login with Self Protocol by CELO</h2>
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <SelfQRcodeWrapper
        selfApp={selfApp}
        onSuccess={() => {
          console.log('Verification successful');
          
          // Store user ID in local storage
          localStorage.setItem('userId', userId);
          // Redirect to dashboard
          window.location.href = '/dashboard';
        }}
        darkMode={true}
        />
        <p className="mt-4 text-sm text-gray-400">
        User ID: {userId}
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
