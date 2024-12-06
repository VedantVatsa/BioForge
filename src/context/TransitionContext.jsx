import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        isTransitioning,
        setIsTransitioning,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export { TransitionContext };

TransitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
