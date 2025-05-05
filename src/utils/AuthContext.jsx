import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    
    try {
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      const userData = await account.get();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error('Error creating session:', error);
      setError(error.message);
      throw error;
    }
  };

  const handleUserLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Error logging out:', error);
      setError(error.message);
    }
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      setError("Passwords don't match!");
      return;
    }

    try {
      // Create account
      await account.create(
        ID.unique(), 
        credentials.email, 
        credentials.password1,
        credentials.name
      );
      
      // Automatically log in the user
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password1
      );
      
      // Get user data
      const userData = await account.get();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      throw error;
    }
  };

  const contextData = {
    user, 
    error,
    handleUserLogin,
    handleUserLogout,
    checkUserStatus,
    handleUserRegister
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;