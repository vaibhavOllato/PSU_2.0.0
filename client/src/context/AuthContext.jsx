import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  const updateUserVerification = () => {
    const updatedUser = { ...user, isVerified: true };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser); // Update the state to reflect the changes immediately
  };

  
  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist updated user data
    setUser(updatedUser); // Update state
  };

  // Loading state (can be extended for async initialization)
  const [loading, setLoading] = useState(true);

  // Simulate loading for async effects (if needed)
  useEffect(() => {
    setLoading(false);
  }, []);

  const getUserId = () => {
    return user?.userId || null; // Ensure fallback to null if userId is not available
  };

  const login = ({
    first_name,
    last_name,
    id,
    token,
    phone,
    userId,
    dateOfBirth,
    role,
    email,
    profile_picture,
    isVerified,
    payment_status,
    gender,
  }) => {
    const userData = {
      // name: `${first_name} ${last_name}`,
      first_name,
      last_name,
      id,
      phone,
      userId,
      dateOfBirth,
      role,
      email,
      profile_picture,
      isVerified,
      payment_status,
      gender,
    };
    // console.log("API Response:", data);

    console.log("User Data:", userData);

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      // console.log("Stored User Data:", userData);
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  };

  // Logout function to clear user and token
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user data from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getUserId,
        loading,
        updateUserVerification,
        updateUserProfile,
        isAuthenticated: !!user, // ← Add this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
