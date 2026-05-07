"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, AlertTriangle } from "lucide-react";

const defaultFormData = {
  name: "",
  product_categories_id: 1, 
  price: 0,
  max_spicy_level: 7,
  stock_quantity: 0,
  is_active: true,
  short_description: ""
};

export default function AdminMenuPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // State mới lưu danh mục
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Lấy cả Sản phẩm và Danh mục cùng lúc
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`) // Gọi thêm API danh mục
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.data || prodData); 
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.data || catData);
      }
    } catch (error) {
      showToast("Lỗi tải dữ liệu", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm phụ trợ: Lấy tên danh mục từ ID
  const getCategoryName = (id: number) => {
    const category = categories.find(c => c.product_categories_id === id);
    return category ? category.name : `ID: ${id}`;
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    // Mặc định chọn danh mục đầu tiên nếu có
    setFormData({ ...defaultFormData, product_categories_id: categories[0]?.product_categories_id || 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setIsEditMode(true);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const url = isEditMode 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${formData.products_id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchData(); // Tải lại dữ liệu mới nhất
        setIsModalOpen(false);
        showToast(isEditMode ? "Cập nhật thành công!" : "Đã thêm món mới!", "success");
      } else {
        showToast("Có lỗi xảy ra!", "error");
      }
    } catch (error) {
      showToast("Không thể kết nối server", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${deletingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.products_id !== deletingId));
        showToast("Đã xóa món ăn!", "success");
      } else {
        showToast("Lỗi khi xóa", "error");
      }
    } catch (error) {
      showToast("Lỗi hệ thống", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Quản lý Món ăn</h1>
          <p className="text-sm text-gray-400 mt-1">Xem, thêm, sửa, xóa danh sách các món ăn trong thực đơn.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={20} /> Thêm món mới
        </button>
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#121212] overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-[#1e1e1e] text-gray-400 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Tên món</th>
              <th className="px-6 py-4">Danh mục</th> 
              <th className="px-6 py-4">Giá tiền</th>
              <th className="px-6 py-4 text-center">Cấp độ cay</th>
              <th className="px-6 py-4 text-center">Tồn kho</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {isLoading ? (
              <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">Đang tải...</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.products_id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-6 py-4 font-medium">#{product.products_id}</td>
                  <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium text-xs">
                      {/* Hiển thị TÊN DANH MỤC ở đây */}
                      {getCategoryName(product.product_categories_id)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-orange-400">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </td>
                  <td className="px-6 py-4 text-center">{product.max_spicy_level}</td>
                  <td className="px-6 py-4 text-center text-blue-400">{product.stock_quantity}</td>
                  <td className="px-6 py-4 text-center">
                    {product.is_active ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">Đang bán</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md">Ngừng bán</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleOpenEdit(product)} className="text-blue-400 hover:text-blue-300 transition-colors" title="Sửa">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => setDeletingId(product.products_id)} className="text-red-500 hover:text-red-400 transition-colors" title="Xóa">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* TOAST THÔNG BÁO */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl border ${toast.type === 'success' ? 'bg-[#1e293b] border-green-500 text-green-400' : 'bg-[#1e293b] border-red-500 text-red-400'} animate-bounce`}>
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* MODAL THÊM / SỬA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-[#1e1e1e] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditMode ? "Chỉnh sửa món ăn" : "Thêm món mới"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tên món ăn</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" required />
                </div>
                
                {/* SELECT BOX DANH MỤC THAY VÌ Ô NHẬP SỐ */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Danh mục</label>
                  <select 
                    value={formData.product_categories_id} 
                    onChange={(e) => setFormData({...formData, product_categories_id: parseInt(e.target.value)})} 
                    className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none"
                    required
                  >
                    <option value="" disabled>-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                      <option key={cat.product_categories_id} value={cat.product_categories_id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Giá tiền (VNĐ)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Số lượng tồn kho</label>
                  <input type="number" value={formData.stock_quantity} onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cấp độ cay tối đa</label>
                  <input type="number" max="7" min="0" value={formData.max_spicy_level} onChange={(e) => setFormData({...formData, max_spicy_level: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Trạng thái bán</label>
                  <select value={formData.is_active ? "true" : "false"} onChange={(e) => setFormData({...formData, is_active: e.target.value === "true"})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none">
                    <option value="true">Đang bán</option>
                    <option value="false">Ngừng bán</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Mô tả ngắn</label>
                  <textarea rows={2} value={formData.short_description || ""} onChange={(e) => setFormData({...formData, short_description: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-gray-400 hover:bg-gray-800">Hủy</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white">
                  {isSaving ? "Đang xử lý..." : "Lưu dữ liệu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-gray-700 bg-[#1e1e1e] p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bạn có chắc chắn?</h3>
            <p className="text-gray-400 text-sm mb-6">Món ăn này sẽ bị xóa vĩnh viễn khỏi Database và không thể khôi phục.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeletingId(null)} className="px-5 py-2 rounded-lg text-gray-400 bg-gray-800 hover:bg-gray-700">Hủy bỏ</button>
              <button onClick={handleDelete} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}