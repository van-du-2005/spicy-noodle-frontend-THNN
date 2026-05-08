"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

const SPICY_LABELS = [
  "Không cay",
  "Cay nhẹ",
  "Cay vừa",
  "Cay khá",
  "Cay nhiều",
  "Rất cay",
  "Siêu cay",
  "Max",
];
const SHIPPING_FEE = 25000;

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity } =
    useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const finalTotal = subTotal > 0 ? subTotal + SHIPPING_FEE : 0;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Lớp nền mờ tối phía sau (Bấm vào để đóng) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Thanh trượt Giỏ hàng (Bên phải) */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0c0505] border-l border-[#3f1616] shadow-2xl z-[110] flex flex-col animate-slide-in-right">
        {/* Header Giỏ hàng */}
        <div className="p-5 flex items-center justify-between border-b border-[#2a0e0e]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-[#ff4500] w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,69,0,0.5)]">
                🛒
              </div>
              <span className="absolute -top-1 -right-1 bg-white text-[#ff4500] text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                Giỏ Hàng
              </h2>
              <p className="text-gray-400 text-xs">{totalItems} món đã chọn</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 bg-[#1a0808] text-gray-400 hover:text-white rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Danh sách món ăn */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#140505] border border-[#2a0e0e] rounded-2xl p-3 relative group"
              >
                {/* Nút xóa */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                <div className="flex gap-3">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-900 border border-[#3f1616]"
                  />
                  <div className="flex-1 pr-5">
                    <h3 className="font-bold text-white text-sm leading-tight mb-1">
                      {item.name}
                    </h3>

                    {/* Badge Cay & Topping */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.spicyLevel === 0 ? "bg-[#2a0e0e] text-gray-300" : "bg-[#ffcc00] text-[#0c0505]"}`}
                      >
                        {item.spicyLevel > 0 ? "🔥 " : ""}
                        {SPICY_LABELS[item.spicyLevel] || "Tùy chọn"}
                      </span>
                      {item.toppings.map((t) => (
                        <span
                          key={t.toppings_id}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#3f1616] text-[#ffcc00]"
                        >
                          +{t.name}
                        </span>
                      ))}
                    </div>

                    {/* Giá & Chỉnh số lượng */}
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-[#ff4500] font-bold">
                        {item.totalPrice.toLocaleString("vi-VN")}đ
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full bg-[#2a0e0e] text-gray-300 flex items-center justify-center hover:bg-[#3f1616]"
                        >
                          -
                        </button>
                        <span className="font-bold text-white text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full bg-[#ff4500] text-white flex items-center justify-center hover:bg-[#e63e00]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* AI Gợi ý đồ uống (Chỉ hiển thị mộc UI cho đẹp theo thiết kế) */}
          {cartItems.length > 0 && (
            <div className="mt-6 border border-[#ff4500]/30 bg-gradient-to-br from-[#2a0e0e] to-[#0c0505] rounded-2xl p-4 relative">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffcc00] text-lg">✨</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      AI Gợi ý đồ uống
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      Bạn đang cay MAX! 🔥 Trà Đào Cam Sả là cứu tinh...
                    </p>
                  </div>
                </div>
                <span className="bg-[#3f1616] text-[#ffcc00] text-[9px] px-2 py-0.5 rounded-md font-bold">
                  AI
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    name: "Trà Đào Cam Sả",
                    desc: "Giải nhiệt hoàn hảo sau bữa cay",
                    price: "+35k",
                    icon: "🍑",
                  },
                  {
                    name: "Sữa Chua Nếp Cẩm",
                    desc: "Vị chua ngọt dịu cơn cay hiệu quả",
                    price: "+25k",
                    icon: "🥛",
                  },
                ].map((drink, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{drink.icon}</span>
                      <div>
                        <p className="text-white text-xs font-bold">
                          {drink.name}
                        </p>
                        <p className="text-[#ff4500] text-[9px]">
                          {drink.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#ffcc00] text-xs font-bold">
                        {drink.price}
                      </span>
                      <button className="bg-[#ff4500] text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-[#e63e00]">
                        + Thêm
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Tổng Tiền */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#3f1616] bg-[#0c0505]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Tạm tính ({totalItems} món)</span>
                <span>{subTotal.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Phí giao hàng</span>
                <span>{SHIPPING_FEE.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-lg pt-2 border-t border-[#2a0e0e]">
                <span>Tổng cộng</span>
                <span className="text-[#ff4500]">
                  {finalTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            {/* Nút Thanh Toán (Thêm cursor-pointer và hiệu ứng nhấn) */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full cursor-pointer bg-gradient-to-r from-[#cc0000] to-[#ff4500] py-3.5 rounded-xl font-bold text-white flex justify-between items-center px-4 hover:brightness-110 shadow-[0_4px_20px_rgba(255,69,0,0.4)] transition-all active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                💳 Thanh Toán • {totalItems} món
              </span>
              <span>→</span>
            </Link>

            {/* Nút Tiếp tục mua sắm (Thêm viền, màu nền xám nhạt, cursor-pointer) */}
            <button
              onClick={closeCart}
              className="w-full mt-3 cursor-pointer py-3.5 rounded-xl border border-[#2a0e0e] bg-[#140505] text-gray-400 text-sm font-semibold hover:border-[#3f1616] hover:bg-[#2a0e0e] hover:text-white transition-all active:scale-[0.98]"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
