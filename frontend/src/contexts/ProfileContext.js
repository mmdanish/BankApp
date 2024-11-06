import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect (() => {
      fetchProfileData()
    }, [])
  

  return (
    <ProfileContext.Provider value={{ profileData, loading, fetchProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
