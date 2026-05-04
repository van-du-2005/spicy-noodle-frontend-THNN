// src/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { profileService } from "@/services/profile.service";
import { useAuth } from "@/context/auth/AuthContext"; 
import { IUser } from "@/types/user.type"; // Import type vào đây


export const useProfile = () => {
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Lấy hàm checkLoginStatus để reload lại thông tin Header, Sidebar
  const { checkLoginStatus } = useAuth(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        if (res.success) {
          setProfileData(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (values: Partial<IUser>) => {
    try {
      const res = await profileService.updateProfile(values as any);
      if (res.success) {
        setProfileData(res.data); 
        
        // Báo cho Context biết user đã đổi tên/thông tin để nó tải lại
        await checkLoginStatus(); 
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      return false;
    }
  };

  return { profileData, isLoading, updateProfile };
};