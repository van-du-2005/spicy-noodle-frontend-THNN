"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, X, AlertTriangle, ShieldCheck, User as UserIcon } from "lucide-react";

const defaultFormData = {
  name: "",
  date_of_birth: "",
  address: "",
  email: "",
  phone: "",
  role: "user",
  total_points: 0
};

export default function AdminCustomerPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.data || data); 
      }
    } catch (error) {
      showToast("Lỗi tải dữ liệu khách hàng", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (customer: any) => {
    const formattedDate = customer.date_of_birth 
      ? new Date(customer.date_of_birth).toISOString().split('T')[0] 
      : "";
      
    setFormData({ ...customer, date_of_birth: formattedDate });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${formData.users_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchCustomers();
        setIsModalOpen(false);
        showToast("Cập nhật thành công!", "success");
      } else {
        showToast("Có lỗi xảy ra khi cập nhật!", "error");
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${deletingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomers(customers.filter(c => c.users_id !== deletingId));
        showToast("Đã xóa khách hàng!", "success");
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
      {/* ĐÃ XÓA ĐOẠN TIÊU ĐỀ LẶP Ở ĐÂY ĐỂ TRANG GỌN GÀNG HƠN */}

      <div className="rounded-xl border border-gray-800 bg-[#121212] overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-[#1e1e1e] text-gray-400 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Liên hệ</th>
              <th className="px-6 py-4 text-center">Vai trò</th>
              <th className="px-6 py-4 text-center">Điểm</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {isLoading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Đang tải...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Chưa có khách hàng nào!</td></tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.users_id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-6 py-4 font-medium">#{customer.users_id}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {customer.avatar_url ? (
                        <img src={customer.avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <UserIcon size={16} className="text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-white font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-500">
                          {customer.date_of_birth ? new Date(customer.date_of_birth).toLocaleDateString('vi-VN') : 'Chưa cập nhật ngày sinh'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-blue-400">{customer.email}</div>
                    <div className="text-gray-500 text-xs mt-1">{customer.phone || 'Chưa có SĐT'}</div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {customer.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-md border border-purple-500/30">
                        <ShieldCheck size={12} /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                        <UserIcon size={12} /> User
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center font-bold text-orange-400">
                    {customer.total_points || 0}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Nút Sửa (Vẫn giữ nguyên cho phép sửa thông tin Admin) */}
                      <button onClick={() => handleOpenEdit(customer)} className="text-blue-400 hover:text-blue-300 transition-colors" title="Sửa">
                        <Pencil size={18} />
                      </button>

                      {/* Nút Xóa: Nếu là admin thì khóa lại (làm mờ), nếu là user thì cho xóa */}
                      {customer.role === 'admin' ? (
                        <button disabled className="text-gray-700 cursor-not-allowed" title="Không thể xóa Quản trị viên">
                          <Trash2 size={18} />
                        </button>
                      ) : (
                        <button onClick={() => setDeletingId(customer.users_id)} className="text-red-500 hover:text-red-400 transition-colors" title="Xóa">
                          <Trash2 size={18} />
                        </button>
                      )}
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

      {/* MODAL SỬA THÔNG TIN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-[#1e1e1e] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Cập nhật tài khoản</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Họ và tên</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Số điện thoại</label>
                  <input type="tel" value={formData.phone || ""} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Quyền truy cập (Role)</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none">
                    <option value="user">Khách hàng (User)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Điểm tích lũy</label>
                  <input type="number" min="0" value={formData.total_points || 0} onChange={(e) => setFormData({...formData, total_points: parseInt(e.target.value)})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-orange-400 font-bold focus:border-orange-500 outline-none" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Địa chỉ</label>
                  <input type="text" value={formData.address || ""} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-white focus:border-orange-500 outline-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">Hủy</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium">
                  {isSaving ? "Đang xử lý..." : "Lưu thay đổi"}
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
            <p className="text-gray-400 text-sm mb-6">Tài khoản này sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeletingId(null)} className="px-5 py-2.5 rounded-lg text-gray-400 bg-gray-800 hover:bg-gray-700">Hủy bỏ</button>
              <button onClick={handleDelete} className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}