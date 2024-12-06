import React from "react";
import PropTypes from "prop-types";

export default function BioGenerationLoader({
  message = "Generating your bio...",
}) {
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
                backgroundColor: i % 2 ? "#4F46E5" : "#EC4899",
                top: `${Math.sin((i / 8) * Math.PI * 2) * 40 + 50}%`,
                left: `${Math.cos((i / 8) * Math.PI * 2) * 40 + 50}%`,
                transform: "translate(-50%, -50%)",
                animation: `dnaRotate 2s infinite ease-in-out ${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        {/* Message */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-lg font-medium text-gray-800">{message}</p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

BioGenerationLoader.propTypes = {
  message: PropTypes.string,
};
