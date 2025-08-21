import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const AuthWrapper = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Инициализация приложения...
      </div>
    );
  }

  return children;
};

export default AuthWrapper;
