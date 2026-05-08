"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Topping {
  toppings_id: number;
  name: string;
  price: string;
}

interface Product {
  products_id: number;
  name: string;
  price: string;
  max_spicy_level: number;
  short_description: string;
  Toppings: Topping[];
  ProductImages?: { image_url: string }[];
}

const SPICY_LABELS = [
  "Không cay",
  "Cay nhẹ",
  "Cay vừa",
  "Cay khá",
  "Cay nhiều",
  "Rất cay",
  "Siêu cay",
  "Thử thách",
];

export default function ProductModal({
  productId,
  onClose,
}: {
  productId: number;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        );
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
          // XỬ LÝ THÔNG MINH: Nếu món không có độ cay (như nước, salad), tự set mức 0
          if (result.data.max_spicy_level === 0) {
            setSpicyLevel(0);
          } else {
            setSpicyLevel(null);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return null;

  const basePrice = parseInt(product.price);
  const toppingsPrice = selectedToppings.reduce(
    (sum, t) => sum + parseInt(t.price),
    0,
  );
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const handleToggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.toppings_id === topping.toppings_id)
        ? prev.filter((t) => t.toppings_id !== topping.toppings_id)
        : [...prev, topping],
    );
  };

  const handleAddToCart = () => {
    if (spicyLevel === null) return;

    addToCart({
      productId: product.products_id,
      name: product.name,
      image: product.ProductImages?.[0]?.image_url || "",
      basePrice: basePrice,
      spicyLevel: spicyLevel,
      toppings: selectedToppings,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="bg-[#0c0505] border border-[#3f1616] w-full max-w-[420px] rounded-2xl overflow-hidden relative flex flex-col max-h-[90vh] shadow-[0_0_40px_rgba(255,69,0,0.1)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/60 text-gray-400 hover:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          ✕
        </button>

        <div className="h-64 w-full relative flex-shrink-0">
          {product.ProductImages?.[0] ? (
            <img
              src={product.ProductImages[0].image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#140505] flex items-center justify-center text-4xl">
              🍜
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0505] via-[#0c0505]/70 to-transparent"></div>
        </div>

        <div className="px-6 pb-2 overflow-y-auto custom-scrollbar text-white -mt-16 relative z-10 flex-1">
          <div className="flex justify-between items-end mb-1">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {product.name}
            </h2>
            <p className="text-[#ff4500] font-bold text-xl">
              {basePrice.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            {product.short_description || "Món ngon chuẩn vị"}
          </p>

          {/* CHỈ HIỂN THỊ MỨC CAY NẾU MÓN CÓ ĐỘ CAY > 0 */}
          {product.max_spicy_level > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[15px] flex items-center gap-2">
                  <span className="text-[#ff4500]">🔥</span> Mức Độ Cay
                </h3>
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${
                    spicyLevel === null
                      ? "bg-[#2a0e0e] text-gray-400"
                      : "bg-[#ffcc00] text-[#0c0505]"
                  }`}
                >
                  {spicyLevel === null
                    ? "Chưa chọn"
                    : SPICY_LABELS[spicyLevel] || "Tùy chọn"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[...Array(Math.min(product.max_spicy_level + 1, 8))].map(
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setSpicyLevel(i)}
                      className={`py-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        spicyLevel === i
                          ? "border-[#ff4500] bg-[#3f1616]/40"
                          : "border-[#2a0e0e] bg-transparent hover:border-[#3f1616]"
                      }`}
                    >
                      <span
                        className={`font-black text-lg leading-none ${spicyLevel === i ? "text-[#ffcc00]" : "text-gray-300"}`}
                      >
                        {i}
                      </span>
                      <span
                        className={`text-[10px] mt-1.5 ${spicyLevel === i ? "text-[#ff4500]" : "text-[#ff4500]/70"}`}
                      >
                        {i === 0 ? "-" : "🔥".repeat(Math.min(i, 4))}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* CHỈ HIỂN THỊ TOPPING NẾU MÓN ĐÓ CÓ TOPPING */}
          {product.Toppings && product.Toppings.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-[15px] mb-4 flex items-center gap-2">
                <span>🍲</span> Topping Thêm
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.Toppings.map((topping) => {
                  const isSelected = selectedToppings.some(
                    (t) => t.toppings_id === topping.toppings_id,
                  );
                  return (
                    <div
                      key={topping.toppings_id}
                      onClick={() => handleToggleTopping(topping)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-[#2a0e0e] bg-transparent cursor-pointer hover:border-[#3f1616] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-[#ff4500] bg-transparent"
                              : "border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-[#ff4500] rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm text-gray-300">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#ff4500]">
                        +{parseInt(topping.price) / 1000}k
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Thanh Toán */}
        <div className="p-5 bg-[#0c0505]">
          <div className="flex justify-between items-center mb-5 px-1">
            <span className="text-white font-medium text-sm">Số lượng</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-[#2a0e0e] text-gray-400 flex items-center justify-center hover:bg-[#3f1616] transition text-xl font-medium"
              >
                -
              </button>
              <span className="font-bold w-4 text-center text-white text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-[#ff4500] text-white flex items-center justify-center hover:bg-[#e63e00] transition text-xl font-medium"
              >
                +
              </button>
            </div>
          </div>

          <button
            disabled={spicyLevel === null}
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-2xl font-bold flex justify-between items-center px-5 transition-all ${
              spicyLevel === null
                ? "bg-[#3f1616] text-gray-400 cursor-not-allowed"
                : "bg-[#cc0000] text-white hover:bg-[#e60000]"
            }`}
          >
            <span className="flex items-center gap-2 text-[15px]">
              🛒{" "}
              {spicyLevel === null ? "Chọn mức cay trước" : "Thêm vào giỏ hàng"}
            </span>
            <span
              className={`px-3 py-1 rounded-xl text-[15px] ${spicyLevel === null ? "bg-transparent" : "bg-[#ff4500]"}`}
            >
              {totalPrice.toLocaleString("vi-VN")}đ
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
