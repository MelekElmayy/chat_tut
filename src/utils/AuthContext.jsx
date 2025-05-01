import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(false);


  useEffect(()=> {
     setloading(false)
  },[])


  /// this  the object that contains data about the user
  const contextData = {
    user
  };

  //////

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading.... </p> : children}
    </AuthContext.Provider>
  );
};



export const userAuth =() => {return useContext(AuthContext)}

export default AuthContext;
