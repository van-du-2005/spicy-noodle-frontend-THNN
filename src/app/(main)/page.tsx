"use client";

import { useEffect, useState } from "react";
import ProductModal from "@/components/product/ProductModal";

interface Product {
  products_id: number;
  name: string;
  price: string;
  short_description: string;
  image_url?: string;
  rating?: number; // Giả lập data rating cho giống Figma
  prep_time?: string; // Giả lập thời gian chuẩn bị
}

const CATEGORIES = [
  "Tất cả",
  "Mì Cay",
  "Lẩu 2 Người",
  "Khai Vị",
  "Giải Khát",
  "Combo",
  "Món Trộn",
  "Gà Rán Hàn Quốc",
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        );
        const result = await res.json();
        if (result.success) {
          // Gắn thêm data giả lập cho giống Figma (Đánh giá & Thời gian)
          const enhancedProducts = result.data.map((p: Product) => ({
            ...p,
            rating: (Math.random() * (5 - 4) + 4).toFixed(1),
            prep_time: "15 - 20 phút",
          }));
          setProducts(enhancedProducts);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách món:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative font-sans overflow-hidden">
      {/* Hiệu ứng Glow nền đỏ phía trên giống Figma */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#3f1616]/40 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-[#1c0808] border border-[#3f1616] text-[#ff4500] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 flex items-center gap-2">
            <span>🔥</span> Thực Đơn Mì Cay <span>🔥</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Thỏa Mãn Đam Mê <span className="text-[#ff4500]">Cay Cực Đỉnh</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base mb-8">
            Hơn 6 loại mì cay đặc sắc, từ cay nhẹ đến thử thách khả năng chịu
            đựng của bạn!
          </p>

          {/* Thanh tìm kiếm */}
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              className="w-full bg-[#140505] border border-[#2a0e0e] focus:border-[#ff4500] outline-none rounded-full py-3.5 pl-12 pr-6 text-sm transition-all"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* CÁC TAB DANH MỤC */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar border-b border-[#2a0e0e] [&::-webkit-scrollbar]:hidden">
          <div className="p-2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#ff4500] text-white shadow-lg shadow-orange-900/20"
                  : "bg-transparent text-gray-400 hover:bg-[#1a0808] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* DANH SÁCH MÓN ĂN */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4500]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.products_id}
                className="bg-[#140505] border border-[#2a0e0e] rounded-3xl overflow-hidden hover:border-[#ff4500]/50 transition-all group flex flex-col cursor-pointer"
                onClick={() => setSelectedProductId(product.products_id)}
              >
                {/* Ảnh sản phẩm */}
                <div className="relative h-56 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-4xl">
                      🍜
                    </div>
                  )}
                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white shadow-md ${product.products_id % 2 === 0 ? "bg-[#10b981]" : "bg-[#f59e0b]"}`}
                  >
                    {product.products_id % 2 === 0 ? "Mới" : "Bán chạy"}
                  </span>

                  {/* Rating Badge nổi trên ảnh (Giống Figma) */}
                  <div className="absolute bottom-3 right-3 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3.5 h-3.5 text-[#ff4500]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[10px] text-white ml-1 font-bold">
                      +2
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                    {product.short_description || "Mì cay thượng hạng"}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>{" "}
                      {product.rating} (120)
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {product.prep_time}
                    </span>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-[#ff4500] font-bold text-xl">
                      {parseInt(product.price).toLocaleString("vi-VN")}đ
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductId(product.products_id);
                      }}
                      className="bg-[#2a0e0e] hover:bg-[#ff4500] text-[#ff4500] hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-colors"
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Chi Tiết Sản Phẩm */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
}
