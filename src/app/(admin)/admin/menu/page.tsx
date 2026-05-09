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
  short_description: "",
  image_url: "",
  toppings: []
};

export default function AdminMenuPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleAddToppingRow = () => {
    setFormData({
      ...formData,
      toppings: [...(formData.toppings || []), { name: "", price: 0 }]
    });
  };

  const handleUpdateTopping = (index: number, field: string, value: any) => {
    const newToppings = [...formData.toppings];
    newToppings[index] = { ...newToppings[index], [field]: value };
    setFormData({ ...formData, toppings: newToppings });
  };

  const handleRemoveToppingRow = (index: number) => {
    const newToppings = formData.toppings.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, toppings: newToppings });
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
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

  const getCategoryName = (id: number) => {
    const category = categories.find(c => c.product_categories_id === id);
    return category ? category.name : `ID: ${id}`;
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData({ ...defaultFormData, product_categories_id: categories[0]?.product_categories_id || 1 });
    setIsModalOpen(true);
  };

const handleOpenEdit = async (product: any) => {
    setIsEditMode(true);
    // Gán dữ liệu cơ bản trước, để mảng toppings rỗng trong lúc chờ tải
    setFormData({ ...product, toppings: [] }); 
    setIsModalOpen(true);

    try {
      // Gọi API lấy danh sách topping riêng của món ăn này
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/toppings/product/${product.products_id}`);
      if (response.ok) {
        const result = await response.json();
        // Cập nhật lại form với danh sách topping đã tải xong
        setFormData((prev: any) => ({ ...prev, toppings: result.data || [] }));
      }
    } catch (error) {
      console.error("Lỗi lấy topping khi sửa món", error);
    }
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
        await fetchData();
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

      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl border ${toast.type === 'success' ? 'bg-[#1e293b] border-green-500 text-green-400' : 'bg-[#1e293b] border-red-500 text-red-400'} animate-bounce`}>
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* MODAL THÊM / SỬA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-[#1e1e1e] shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 shrink-0">
              <h2 className="text-xl font-bold text-white">
                {isEditMode ? "Chỉnh sửa món ăn" : "Thêm món mới"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            {/* Nội dung form có thể cuộn được */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Tên món ăn</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" required />
                  </div>
                  
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

                  {/* Khu vực nhập Link Ảnh (Đã tách riêng) */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Đường dẫn ảnh (URL)</label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={formData.image_url || ""} 
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
                      className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Chuột phải vào ảnh trên mạng chọn "Copy image address" và dán vào đây.</p>
                  </div>

                  {/* Mô tả ngắn */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Mô tả ngắn</label>
                    <textarea rows={2} value={formData.short_description || ""} onChange={(e) => setFormData({...formData, short_description: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2 text-white focus:border-orange-500 outline-none" />
                  </div>

                  {/* --- KHU VỰC THÊM TOPPING --- */}
                  <div className="col-span-2 mt-2 p-4 rounded-xl border border-gray-700 bg-[#1a1a1a]">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-orange-400">🥘 Các Topping bán kèm</label>
                      <button 
                        type="button" 
                        onClick={handleAddToppingRow}
                        className="text-xs px-3 py-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        + Thêm Topping
                      </button>
                    </div>

                    {formData.toppings && formData.toppings.length === 0 && (
                      <p className="text-xs text-gray-500 italic text-center py-2">Chưa có topping nào được thêm.</p>
                    )}

                    <div className="space-y-3">
                      {formData.toppings && formData.toppings.map((topping: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 bg-[#121212] p-2 rounded-lg border border-gray-800">
                          <input
                            type="text"
                            placeholder="Tên topping (VD: Thêm Tôm)"
                            value={topping.name}
                            onChange={(e) => handleUpdateTopping(index, "name", e.target.value)}
                            className="flex-1 w-full bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 px-2"
                          />
                          <div className="w-px h-6 bg-gray-700 shrink-0"></div>
                          <input
                            type="number"
                            placeholder="Giá (VD: 15000)"
                            value={topping.price === 0 ? "" : topping.price}
                            onChange={(e) => handleUpdateTopping(index, "price", parseInt(e.target.value) || 0)}
                            className="w-28 shrink-0 bg-transparent border-none text-orange-400 font-bold text-sm focus:outline-none focus:ring-0 px-2 text-right"
                          />
                          <span className="text-gray-500 text-sm pr-2 shrink-0">VNĐ</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveToppingRow(index)}
                            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* --- KẾT THÚC KHU VỰC TOPPING --- */}

                </div>
              </form>
            </div>

            {/* Footer Modal (Nút bấm) */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-800 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 font-medium transition-colors">Hủy</button>
              <button form="productForm" type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors shadow-lg shadow-orange-600/20">
                {isSaving ? "Đang xử lý..." : "Lưu dữ liệu"}
              </button>
            </div>

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
              <button onClick={() => setDeletingId(null)} className="px-5 py-2 rounded-lg text-gray-400 bg-gray-800 hover:bg-gray-700 transition-colors">Hủy bỏ</button>
              <button onClick={handleDelete} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}