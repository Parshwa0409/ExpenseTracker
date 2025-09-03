import { useState, createContext, useContext } from "react";

const GlobalStatusContext = createContext(null);

export const GlobalStatusContextProvider = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState([]);
  const [apiErrors, setApiErrors] = useState(null);

  const resetStatuses = () => {
    setIsSubmitting(false);
    setIsLoading(true);
    setSuccess(false);
    setApiErrors({});
  };

  const contextValue = {
    isSubmitting,
    setIsSubmitting,
    isLoading,
    setIsLoading,
    success,
    setSuccess,
    apiErrors,
    setApiErrors,
    resetStatuses
  };

  return (
    <GlobalStatusContext.Provider value={contextValue}>
      {children}
    </GlobalStatusContext.Provider>
  );
};

// Add a custom hook to use the context
export const useGlobalStatus = () => {
  const context = useContext(GlobalStatusContext);
  if (!context) {
    throw new Error('useGlobalStatus must be used within a GlobalStatusProvider');
  }
  return context;
};

export default GlobalStatusContext;
