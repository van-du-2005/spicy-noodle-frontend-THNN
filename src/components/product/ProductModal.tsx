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
  ProductImages?: { image_url: string }[];
  product_images?: { image_url: string }[];
  image_url?: string;
}

// Hàm xử lý màu sắc và nhãn dán cho từng cấp độ cay
const getSpicyConfig = (level: number | null) => {
  if (level === null)
    return {
      circleBg: "bg-gray-600",
      circleText: "text-white",
      border: "border-[#3f1616]",
      bg: "bg-transparent",
      label: "Chưa chọn",
      labelBg: "bg-[#3f1616] text-gray-400",
    };
  if (level === 0)
    return {
      circleBg: "bg-gray-600",
      circleText: "text-white",
      border: "border-gray-500",
      bg: "bg-gray-500/10",
      label: "Không cay",
      labelBg: "bg-gray-600 text-white",
    };
  if (level <= 2)
    return {
      circleBg: "bg-[#eab308]",
      circleText: "text-black",
      border: "border-[#eab308]",
      bg: "bg-[#eab308]/10",
      label: level === 1 ? "Cay nhẹ" : "Cay vừa",
      labelBg: "bg-[#eab308] text-black",
    };
  if (level <= 5)
    return {
      circleBg: "bg-[#f97316]",
      circleText: "text-white",
      border: "border-[#f97316]",
      bg: "bg-[#f97316]/10",
      label: level === 3 ? "Cay khá" : level === 4 ? "Cay nhiều" : "Rất cay",
      labelBg: "bg-[#f97316] text-white",
    };
  if (level === 6)
    return {
      circleBg: "bg-[#dc2626]",
      circleText: "text-white",
      border: "border-[#dc2626]",
      bg: "bg-[#dc2626]/10",
      label: "Siêu cay",
      labelBg: "bg-[#dc2626] text-white",
    };
  return {
    circleBg: "bg-[#991b1b]",
    circleText: "text-white",
    border: "border-[#991b1b]",
    bg: "bg-[#991b1b]/10",
    label: "🔥 Thử thách",
    labelBg: "bg-[#991b1b] text-white",
  };
};

export default function ProductModal({
  productId,
  onClose,
}: {
  productId: number;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [toppingsList, setToppingsList] = useState<Topping[]>([]); // 👈 Thêm state quản lý Topping chuẩn
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👈 Gọi song song API món ăn và API Topping (Cái mới tạo)
        const [productRes, toppingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/toppings/product/${productId}`)
        ]);

        const productResult = await productRes.json();
        const toppingsResult = await toppingsRes.json();

        // Xử lý dữ liệu món ăn
        if (productResult.success) {
          setProduct(productResult.data);
          if (productResult.data.max_spicy_level === 0) {
            setSpicyLevel(0);
          }
        }

        // Xử lý dữ liệu Topping chuẩn xác theo ID món
        if (toppingsResult.success) {
          setToppingsList(toppingsResult.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productId]);

  if (!product) return null;

  const basePrice = parseInt(product.price);
  const toppingsPrice = selectedToppings.reduce(
    (sum, t) => sum + parseInt(t.price),
    0,
  );
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const pAny = product as any;
  const imageUrl =
    pAny.ProductImages?.[0]?.image_url ||
    pAny.product_images?.[0]?.image_url ||
    pAny.image_url ||
    "";

  const handleToggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const isExist = prev.some((t) => t.toppings_id === topping.toppings_id);
      if (isExist)
        return prev.filter((t) => t.toppings_id !== topping.toppings_id);
      return [...prev, topping];
    });
  };

  const handleAddToCart = () => {
    if (product.max_spicy_level > 0 && spicyLevel === null) return;
    addToCart({
      productId: product.products_id,
      name: product.name,
      image: imageUrl,
      basePrice: basePrice,
      spicyLevel: spicyLevel,
      toppings: selectedToppings,
      quantity: quantity,
      totalPrice: totalPrice,
    });
    onClose();
  };

  const currentSpicyConfig = getSpicyConfig(spicyLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="bg-[#0c0505] border border-[#3f1616] w-full max-w-[500px] rounded-3xl overflow-hidden relative flex flex-col max-h-[90vh] shadow-[0_0_40px_rgba(255,69,0,0.1)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#140505]/80 border border-[#3f1616] text-gray-400 hover:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          ✕
        </button>

        <div className="h-[250px] w-full relative flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#140505] flex items-center justify-center text-4xl">
              🍜
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0505] via-[#0c0505]/40 to-transparent"></div>
        </div>

        <div className="px-7 pb-4 overflow-y-auto custom-scrollbar text-white -mt-8 relative z-10 flex-1">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-[22px] font-extrabold tracking-tight leading-tight w-2/3">
              {product.name}
            </h2>
            <p className="text-[#ff4500] font-bold text-xl">
              {basePrice.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-7">
            {product.short_description || "Món ngon chuẩn vị Hàn Quốc"}
          </p>

          {product.max_spicy_level > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[15px] flex items-center gap-2">
                  <span className="text-[#ff4500]">🔥</span> Mức Độ Cay
                </h3>
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${currentSpicyConfig.labelBg}`}
                >
                  {currentSpicyConfig.label}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[...Array(Math.min(product.max_spicy_level + 1, 8))].map(
                  (_, i) => {
                    const isSelected = spicyLevel === i;
                    const config = getSpicyConfig(i);

                    return (
                      <button
                        key={i}
                        onClick={() => setSpicyLevel(i)}
                        className={`py-3 rounded-[20px] border-[1.5px] flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? `${config.border} ${config.bg}`
                            : "border-[#3f1616] bg-[#110505] hover:border-gray-600"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${config.circleBg}`}
                        >
                          <span
                            className={`font-black text-lg leading-none ${config.circleText}`}
                          >
                            {i}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] ${isSelected ? (i <= 2 ? "text-[#eab308]" : i <= 5 ? "text-[#f97316]" : "text-[#dc2626]") : "text-gray-500"}`}
                        >
                          {i === 0 ? "-" : "🔥".repeat(Math.min(i, 4))}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* 👈 Thay đổi lớn ở phần CHỌN TOPPING: Dùng state toppingsList */}
          {toppingsList && toppingsList.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-[15px] mb-4 flex items-center gap-2">
                <span>🥘</span> Topping Thêm
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {toppingsList.map((topping) => {
                  const isSelected = selectedToppings.some(
                    (t) => t.toppings_id === topping.toppings_id,
                  );
                  return (
                    <div
                      key={topping.toppings_id}
                      onClick={() => handleToggleTopping(topping)}
                      className={`flex items-center justify-between p-3.5 rounded-full border-[1.5px] transition-colors cursor-pointer ${
                        isSelected
                          ? "border-[#ff4500] bg-[#ff4500]/10"
                          : "border-[#3f1616] bg-[#110505] hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`w-[18px] h-[18px] rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-[#ff4500] bg-transparent"
                              : "border-gray-500"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-[8px] h-[8px] bg-[#ff4500] rounded-full"></div>
                          )}
                        </div>
                        <span className="text-[13px] text-gray-300 truncate">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-[13px] font-bold text-[#ff4500] flex-shrink-0">
                        +{parseInt(topping.price) / 1000}k
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 bg-[#0c0505] border-t border-[#3f1616] z-20">
          <div className="flex justify-between items-center mb-5 px-1">
            <span className="text-white font-medium text-sm">Số lượng</span>
            <div className="flex items-center gap-4 bg-[#1a0a0a] rounded-full p-1 border border-[#3f1616]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3f1616] transition text-xl font-medium"
              >
                -
              </button>
              <span className="font-bold w-4 text-center text-white text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-[#ff4500] text-white flex items-center justify-center hover:bg-[#e63e00] transition text-xl font-medium shadow-md shadow-[#ff4500]/30"
              >
                +
              </button>
            </div>
          </div>

          <button
            disabled={product.max_spicy_level > 0 && spicyLevel === null}
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-[18px] font-bold flex justify-between items-center px-6 transition-all ${
              product.max_spicy_level > 0 && spicyLevel === null
                ? "bg-[#2a0e0e] text-gray-500 cursor-not-allowed border border-[#3f1616]"
                : "bg-gradient-to-r from-[#ff4500] to-[#e63e00] text-white hover:scale-[1.02] shadow-lg shadow-[#ff4500]/25"
            }`}
          >
            <span className="flex items-center gap-2 text-[15px]">
              🛒{" "}
              {product.max_spicy_level > 0 && spicyLevel === null
                ? "Chọn mức cay trước"
                : "Thêm vào giỏ hàng"}
            </span>
            <span
              className={`px-3 py-1 rounded-xl text-[15px] ${product.max_spicy_level > 0 && spicyLevel === null ? "bg-transparent" : "bg-black/20"}`}
            >
              {totalPrice.toLocaleString("vi-VN")}đ
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}