// src/components/user/Footer.tsx
import React from "react";
import Link from "next/link";
import Logo from "@/components/svg/Logo";
import {
  MapPin,
  Phone,
  Mail,
  Music2,
  CreditCard,
  Banknote,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          {/* Thông tin thương hiệu & Liên hệ */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 w-max cursor-pointer"
            >
              <Logo className="w-12 h-auto text-primary" />
              <span className="text-2xl font-black tracking-tight text-white">
                Mì Cay <span className="text-orange-500">Đỉnh</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 italic mb-2">
              Đánh thức vị giác - Bùng nổ đam mê
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>An Dương Vương, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  //   href="tel:0123456789"
                  href="#!"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  0123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contact@micaydinh.com"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  contact@micaydinh.com
                </a>
              </div>
            </div>
          </div>

          {/*  Mạng xã hội & Thanh toán */}
          <div className="flex flex-col gap-8">
            {/* Kết nối mạng xã hội */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
                Kết nối với chúng tôi
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all cursor-pointer"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer border border-transparent hover:border-gray-600"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
                Thanh toán an toàn
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-default">
                  <Banknote className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Tiền mặt (COD)</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-default">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Chuyển khoản</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Bản quyền & nhóm phát triển */}
      <div className="border-t border-gray-800 bg-black/50 py-4 px-5 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-2">
        <p>© 2026 Mì Cay Đỉnh. All rights reserved.</p>
        <p>
          Phát triển bởi: Nguyễn Văn Dũ, Đào Ngọc Thắng, Giang Lê Khang, Trần
          Nguyễn Hậu và Vũ Ngọc An Thuận
        </p>
      </div>
    </footer>
  );
}
