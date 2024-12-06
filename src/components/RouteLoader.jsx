import React from "react";
import PropTypes from "prop-types";

export default function RouteLoader({ message = "Processing..." }) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* DNA Helix Animation */}
        <div className="relative w-24 h-24">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: i % 2 ? "#8b5cf6" : "#ec4899",
                left: `${Math.sin((i / 8) * Math.PI * 2) * 32 + 40}px`,
                top: `${i * 10}px`,
                animation: `dnaMove 2s infinite ease-in-out ${i * 0.25}s`,
                transform: `scale(${
                  Math.cos((i / 8) * Math.PI * 2) * 0.5 + 0.5
                })`,
              }}
            />
          ))}
        </div>

        {/* Processing Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 font-medium">{message}</p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

RouteLoader.propTypes = {
  message: PropTypes.string,
};
