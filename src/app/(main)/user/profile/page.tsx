// src/app/(main)/user/profile/page.tsx

"use client";

import React from "react";
import ProfileHeader from "@/components/user/ProfileHeader";
import ProfileDetailsForm from "@/components/user/ProfileDetailsForm";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  // Lấy dữ liệu và hàm xử lý từ hook
  const { profileData, isLoading, updateProfile } = useProfile();

  const handleSave = async (values: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
  }) => {
    // Gọi hàm update từ hook (đã kết nối API)
    // Lưu ý: backend yêu cầu format birthDate là DD/MM/YYYY, bạn có thể format ở đây nếu cần
    await updateProfile({
      name: values.name,
      phone: values.phone,
      // Chuyển đổi định dạng từ input date (YYYY-MM-DD) sang định dạng backend cần (DD/MM/YYYY)
      birthDate: values.birthDate
        ? values.birthDate.split("-").reverse().join("/")
        : "",
    });
  };

  return (
    <div className="profile-page">
      <ProfileHeader
        title="Hồ Sơ Cá Nhân"
        subtitle="Quản lý thông tin tài khoản của bạn"
      />

      <div className="profile-page-body">
        {isLoading ? (
          <div className="text-center text-white py-10">
            Đang tải dữ liệu...
          </div>
        ) : (
          <ProfileDetailsForm
            // Truyền dữ liệu thật từ API xuống
            initialName={profileData?.name}
            initialEmail={profileData?.email}
            initialPhone={profileData?.phone}
            // Backend trả về YYYY-MM-DD, input type="date" cũng nhận chuẩn này
            initialBirthDate={profileData?.date_of_birth}
            initialTotalPoints={profileData?.total_points}
            onSave={handleSave}
          />
        )}
      </div>

      <style jsx>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .profile-page-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .profile-page {
            gap: 1rem;
          }

          .profile-page-body {
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
