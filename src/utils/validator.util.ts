// src/utils/validator.util.ts

export const validatorUtil = {
  isValidName: (name: string) => {
    return name && name.trim().length > 0;
  },

  isValidPhone: (phone: string) => {
    if (!phone) return true; // Cho phép rỗng (nếu DB cho phép), nếu nhập thì phải đúng
    const phoneRegex = /^0(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone);
  },
  
};