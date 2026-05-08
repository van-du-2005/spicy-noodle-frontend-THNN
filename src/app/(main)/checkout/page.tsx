"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SHIPPING_FEE = 25000;

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  // 1. Quản lý thông tin nhập vào
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: "Hồ Chí Minh",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [discountCode, setDiscountCode] = useState("");

  // 2. Logic tính tiền
  const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const finalTotal = subTotal > 0 ? subTotal + SHIPPING_FEE : 0;

  // 3. Ràng buộc: Phải nhập đủ các trường có dấu * mới cho đặt hàng
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.district.trim() !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!isFormValid) return;

    // 1. Tạo một đơn hàng mới từ giỏ hàng hiện tại
    const newOrder = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`, // Tạo mã ngẫu nhiên #1234
      time: new Date().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      }),
      customerName: formData.fullName,
      phone: formData.phone,
      // Gom tên các món lại thành 1 chuỗi để hiển thị
      itemsPreview: cartItems
        .map((item) => `${item.name} ×${item.quantity}`)
        .join(", "),
      totalPrice: finalTotal,
      status: "pending", // Mặc định đơn mới luôn là Chờ xác nhận
    };

    // 2. Lấy danh sách đơn cũ từ Database tạm (localStorage) và thêm đơn mới vào
    const existingOrders = JSON.parse(
      localStorage.getItem("adminOrders") || "[]",
    );
    localStorage.setItem(
      "adminOrders",
      JSON.stringify([newOrder, ...existingOrders]),
    );

    // 3. Thông báo và dọn dẹp
    alert(
      `🎉 Đơn hàng đã được ghi nhận!\nCảm ơn ${formData.fullName}, Mì Cay Đỉnh sẽ giao đến bạn trong tích tắc.`,
    );
    clearCart();
    router.push("/");
  };

  // Nếu lỡ vào trang này mà không có món nào thì mời quay lại mua tiếp
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <div className="text-6xl mb-6">🍜</div>
        <h1 className="text-2xl font-bold mb-4">
          Giỏ hàng của bạn đang trống!
        </h1>
        <Link
          href="/"
          className="bg-[#ff4500] px-8 py-3 rounded-xl font-bold hover:bg-[#e63e00] transition-transform active:scale-95"
        >
          Quay lại chọn món ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition">
            Thực đơn
          </Link>
          <span>/</span>
          <span className="text-gray-400">Giỏ hàng</span>
          <span>/</span>
          <span className="text-[#ff4500] font-semibold">Thanh toán</span>
        </nav>

        <h1 className="text-3xl font-black mb-10 flex items-center gap-3 italic">
          <span className="bg-[#ff4500] p-1.5 rounded-lg">💳</span> THANH TOÁN
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI: FORM THÔNG TIN */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Địa Chỉ Giao Hàng */}
            <section className="bg-[#0f0505] border border-[#3f1616] rounded-2xl p-8 shadow-xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <span className="text-[#ff4500] text-xl">📍</span> ĐỊA CHỈ GIAO
                HÀNG
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#140505] border border-[#2a0e0e] rounded-xl px-4 py-3.5 focus:border-[#ff4500] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0901 234 567"
                    className="w-full bg-[#140505] border border-[#2a0e0e] rounded-xl px-4 py-3.5 focus:border-[#ff4500] outline-none transition"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Địa chỉ cụ thể *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className="w-full bg-[#140505] border border-[#2a0e0e] rounded-xl px-4 py-3.5 focus:border-[#ff4500] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Quận/Huyện *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Quận 1"
                    className="w-full bg-[#140505] border border-[#2a0e0e] rounded-xl px-4 py-3.5 focus:border-[#ff4500] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tỉnh/Thành phố
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    readOnly
                    className="w-full bg-[#1a0808] border border-[#2a0e0e] rounded-xl px-4 py-3.5 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            {/* Mã Giảm Giá */}
            <section className="bg-[#0f0505] border border-[#3f1616] rounded-2xl p-8 shadow-xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <span className="text-[#ff4500] text-xl">🏷️</span> MÃ GIẢM GIÁ
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) =>
                    setDiscountCode(e.target.value.toUpperCase())
                  }
                  placeholder="Nhập mã giảm giá..."
                  className="flex-1 bg-[#140505] border border-[#2a0e0e] rounded-xl px-5 py-3.5 focus:border-[#ff4500] outline-none transition uppercase font-bold"
                />
                <button className="bg-[#ff4500] hover:bg-[#e63e00] text-white px-8 py-3.5 rounded-xl font-black transition active:scale-95">
                  ÁP DỤNG
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Gợi ý cho bạn:{" "}
                <span
                  className="text-[#ff4500] cursor-pointer hover:underline font-bold"
                  onClick={() => setDiscountCode("MICAY10")}
                >
                  MICAY10
                </span>
                ,{" "}
                <span
                  className="text-[#ff4500] cursor-pointer hover:underline font-bold"
                  onClick={() => setDiscountCode("NEWUSER")}
                >
                  NEWUSER
                </span>
              </p>
            </section>

            {/* Phương Thức Thanh Toán */}
            <section className="bg-[#0f0505] border border-[#3f1616] rounded-2xl p-8 shadow-xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <span className="text-[#ff4500] text-xl">💵</span> PHƯƠNG THỨC
                THANH TOÁN
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <label
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-[#ff4500] bg-[#3f1616]/20" : "border-[#2a0e0e] bg-[#140505] hover:border-[#3f1616]"}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-[#ff4500]" : "border-gray-600"}`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 bg-[#ff4500] rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">
                        Thanh toán khi nhận hàng (COD)
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Trả tiền mặt trực tiếp cho shipper khi nhận món
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "online" ? "border-[#ff4500] bg-[#3f1616]/20" : "border-[#2a0e0e] bg-[#140505] hover:border-[#3f1616]"}`}
                  onClick={() => setPaymentMethod("online")}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-[#ff4500]" : "border-gray-600"}`}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-3 h-3 bg-[#ff4500] rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">Thanh toán Online</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Hỗ trợ VNPay, MoMo, ZaloPay và thẻ nội địa
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
          <div className="lg:col-span-5 xl:col-span-4">
            <aside className="bg-[#0f0505] border border-[#3f1616] rounded-3xl p-8 shadow-2xl sticky top-24">
              <h2 className="text-xl font-black mb-8 flex items-center gap-3 italic">
                <span className="text-[#ff4500]">🔥</span> ĐƠN HÀNG
              </h2>

              <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || ""}
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl object-cover bg-gray-900 border border-[#2a0e0e]"
                      />
                      <span className="absolute -top-2 -right-2 bg-white text-[#ff4500] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm truncate">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.spicyLevel > 0 && (
                          <span className="bg-[#ffcc00] text-[#0c0505] text-[9px] font-black px-2 py-0.5 rounded-full italic">
                            🔥 CAY {item.spicyLevel}
                          </span>
                        )}
                        {item.toppings.map((t) => (
                          <span
                            key={t.toppings_id}
                            className="bg-[#3f1616] text-[#ffcc00] text-[9px] font-bold px-2 py-0.5 rounded-full"
                          >
                            +{t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="font-bold text-[#ff4500] text-sm whitespace-nowrap">
                      {item.totalPrice.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-[#2a0e0e] pt-6 mb-8">
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Tạm tính</span>
                  <span className="text-white">
                    {subTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Phí ship (Cố định)</span>
                  <span className="text-white">
                    {SHIPPING_FEE.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-white font-black text-2xl pt-4 border-t border-[#3f1616]">
                  <span>TỔNG CỘNG</span>
                  <span className="text-[#ff4500]">
                    {finalTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className={`w-full py-4.5 rounded-2xl font-black text-white flex justify-center items-center gap-3 transition-all ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#cc0000] to-[#ff4500] hover:brightness-110 shadow-[0_8px_30px_rgba(255,69,0,0.3)] cursor-pointer active:scale-95"
                    : "bg-[#3f1616] text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                <span>✔️ ĐẶT HÀNG NGAY</span>
              </button>

              {!isFormValid && (
                <p className="text-center text-[11px] text-gray-600 mt-4 italic font-medium">
                  * Hãy hoàn tất thông tin địa chỉ để kích hoạt nút đặt hàng
                </p>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
