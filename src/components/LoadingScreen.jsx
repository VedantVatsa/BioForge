import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-primary-50 to-secondary-50 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-40 h-40 rounded-full border-8 border-primary-200 animate-spin-slow"></div>

        {/* Middle rotating ring */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-32 h-32 rounded-full border-8 border-t-secondary-500 
                      border-r-secondary-400 border-b-secondary-300 border-l-secondary-200 
                      animate-spin-reverse"
        ></div>

        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 
                        rounded-full animate-pulse shadow-lg"
          ></div>
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-primary-400 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Loading text */}
        <div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                      text-center text-primary-700 font-medium"
        >
          <div className="flex items-center space-x-2">
            <span className="animate-bounce delay-100">Loading</span>
            <span className="animate-bounce delay-200">.</span>
            <span className="animate-bounce delay-300">.</span>
            <span className="animate-bounce delay-400">.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
