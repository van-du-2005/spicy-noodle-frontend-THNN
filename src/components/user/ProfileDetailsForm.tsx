// src/components/user/ProfileDetailsForm.tsx

import React, { useState } from "react";
import { IUser } from "@/types/user.type"; // Import type

type Props = {
  initialName?: IUser["name"];
  initialEmail?: IUser["email"];
  initialPhone?: IUser["phone"];
  initialBirthDate?: IUser["date_of_birth"];
  initialTotalPoints?: IUser["total_points"];
  onSave?: (values: { name: string; email: string; phone: string; birthDate: string; }) => Promise<void>; 
};

const ProfileDetailsForm: React.FC<Props> = ({
  initialName,
  initialEmail,
  initialPhone,
  initialBirthDate,
  initialTotalPoints,
  onSave,
}) => {
  // State lưu trữ dữ liệu
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [totalPoints, setTotalPoints] = useState(initialTotalPoints);

  // State quản lý UI (Chế độ Edit & Loading)
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    if (initialName) setName(initialName);
    if (initialEmail) setEmail(initialEmail);
    if (initialPhone) setPhone(initialPhone);
    if (initialBirthDate) setBirthDate(initialBirthDate);
    if (initialTotalPoints !== undefined) setTotalPoints(initialTotalPoints);
  }, [initialName, initialEmail, initialPhone, initialBirthDate, initialTotalPoints]);

  function formatDate(value: string) {
    if (!value) return "Chưa cập nhật";
    try {
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(value));
    } catch {
      return value;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEditingName && !isEditingPhone && !isEditingBirthDate) return;

    setIsLoading(true);

    // Chờ API chạy xong thật sự thay vì delay ảo
    if (onSave) {
      await onSave({ name: name || "", email: email || "", phone: phone || "", birthDate: birthDate || "" });
    }

    setIsEditingName(false);
    setIsEditingPhone(false);
    setIsEditingBirthDate(false);
    setIsLoading(false);
  }

  // Khai báo các style
  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--color-panel-elevated)",
    borderColor: "var(--color-panel-elevated-border)",
  };
  const fieldShellStyle: React.CSSProperties = {
    backgroundColor: "var(--color-panel-elevated-2)",
    borderColor: "var(--color-border)",
  };
  const labelStyle: React.CSSProperties = { color: "rgba(255,255,255,0.62)" };
  const accentStyle: React.CSSProperties = { color: "var(--color-primary)" };
  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-panel-elevated-2)",
    borderColor: "var(--color-border)",
    color: "#ffffff",
  };

  return (
    <section className="profile-details-form" style={containerStyle}>
      <form className="profile-details-form-form" onSubmit={handleSubmit}>
        <div className="profile-details-form-grid">
          {/*  Tên */}
          <div className="profile-details-form-row">
            <label className="profile-details-form-label" style={labelStyle}>
              Tên
            </label>
            {isEditingName ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-details-form-input"
                style={inputStyle}
                disabled={isLoading}
              />
            ) : (
              <div
                className="profile-details-form-shell"
                style={fieldShellStyle}
              >
                <span className="profile-details-form-value">{name}</span>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="profile-details-form-action"
                  style={accentStyle}
                >
                  Thay Đổi
                </button>
              </div>
            )}
          </div>

          {/* Email (KHÔNG CÓ NÚT THAY ĐỔI) */}
          <div className="profile-details-form-row">
            <label className="profile-details-form-label" style={labelStyle}>
              Email
            </label>
            <div className="profile-details-form-shell" style={fieldShellStyle}>
              <span
                className="profile-details-form-value"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {email}
              </span>
            </div>
          </div>

          {/*  Số điện thoại */}
          <div className="profile-details-form-row">
            <label className="profile-details-form-label" style={labelStyle}>
              Số điện thoại
            </label>
            {isEditingPhone ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="profile-details-form-input"
                style={inputStyle}
                disabled={isLoading}
              />
            ) : (
              <div
                className="profile-details-form-shell"
                style={fieldShellStyle}
              >
                {phone ? (
                  <span className="profile-details-form-value">{phone}</span>
                ) : (
                  <span className="profile-details-form-placeholder">
                    Chưa cập nhật
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingPhone(true)}
                  className="profile-details-form-action"
                  style={accentStyle}
                >
                  Thay Đổi
                </button>
              </div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className="profile-details-form-row">
            <label className="profile-details-form-label" style={labelStyle}>
              Ngày sinh
            </label>
            {isEditingBirthDate ? (
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="profile-details-form-input"
                style={inputStyle}
                disabled={isLoading}
              />
            ) : (
              <div
                className="profile-details-form-shell"
                style={fieldShellStyle}
              >
                <span className="profile-details-form-value">
                  {formatDate(birthDate)}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingBirthDate(true)}
                  className="profile-details-form-action"
                  style={accentStyle}
                >
                  Thay Đổi
                </button>
              </div>
            )}
          </div>

          {/* Tổng điểm (Chỉ xem) */}
          <div className="profile-details-form-row">
            <label className="profile-details-form-label" style={labelStyle}>
              Tổng điểm
            </label>
            <div className="profile-details-form-shell" style={fieldShellStyle}>
              <span
                className="profile-details-form-value"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                {totalPoints.toLocaleString()} điểm
              </span>
            </div>
          </div>

          {/* Hàng Nút Lưu (Chỉ hiện khi có ô đang được edit) */}
          {(isEditingName || isEditingPhone || isEditingBirthDate) && (
            <div className="profile-details-form-submit-row">
              <button
                type="submit"
                className="profile-details-form-save"
                disabled={isLoading}
              >
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          )}
        </div>
      </form>

      <style jsx>{`
        /* CSS được giữ nguyên bản sắc của bạn, chỉ thêm css cho nút Lưu ở giữa */
        .profile-details-form {
          width: 100%;
          border-width: 1px;
          border-style: solid;
          border-radius: 0.75rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
        }
        .profile-details-form-form {
          padding: 1.25rem 1rem;
        }
        .profile-details-form-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .profile-details-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          align-items: center;
        }

        /* CSS căn giữa nút LƯU */
        .profile-details-form-submit-row {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .profile-details-form-label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .profile-details-form-input,
        .profile-details-form-shell {
          width: 100%;
          border-width: 1px;
          border-style: solid;
          border-radius: 0.5rem;
        }
        .profile-details-form-input {
          padding: 0.875rem 1rem;
          outline: none;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease;
        }
        .profile-details-form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(255, 90, 31, 0.14);
        }
        .profile-details-form-shell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
        }
        .profile-details-form-value {
          min-width: 0;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .profile-details-form-placeholder {
          min-width: 0;
          color: rgba(255, 255, 255, 0.55);
        }
        .profile-details-form-action {
          border: 0;
          background: transparent;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            opacity 150ms ease,
            color 150ms ease;
          flex-shrink: 0;
        }
        .profile-details-form-action:hover {
          opacity: 0.9;
        }

        .profile-details-form-save {
          border: 0;
          border-radius: 0.5rem;
          padding: 0.875rem 3rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          background: var(--color-primary);
          cursor: pointer;
          transition:
            opacity 150ms ease,
            filter 150ms ease;
        }
        .profile-details-form-save:hover {
          filter: brightness(1.08);
        }
        .profile-details-form-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (min-width: 768px) {
          .profile-details-form-form {
            padding: 1.5rem;
          }
          .profile-details-form-row {
            grid-template-columns: 180px minmax(0, 1fr);
            gap: 1.5rem;
          }
          .profile-details-form-label {
            text-align: right;
          }
        }
      `}</style>
    </section>
  );
};

export default ProfileDetailsForm;
