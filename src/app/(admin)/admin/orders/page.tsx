"use client";

import { useState, useEffect } from "react";
import { orderService } from "@/services/order.service";

type OrderStatus =
  | "pending"
  | "cooking"
  | "delivering"
  | "completed"
  | "cancelled";

interface Order {
  id: string;
  time: string;
  customerName: string;
  phone: string;
  itemsPreview: string;
  totalPrice: number;
  status: OrderStatus;
}

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "cooking", label: "Đang nấu" },
  { id: "delivering", label: "Đang giao" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);

  // 1. GỌI API LẤY DỮ LIỆU THẬT TỪ DATABASE
  useEffect(() => {
    const fetchOrdersFromDB = async () => {
      try {
        // Truyền params theo cấu trúc API của backend
        const res: any = await orderService.getAllOrdersForAdmin({
          page: 1,
          limit: 100,
        });

        // Data backend trả về (tùy cấu trúc mà bạn có thể sửa res.data hoặc res.orders)
        const dbOrders = res.data?.orders || res.data || [];

        // Chuyển đổi dữ liệu từ DB (4 trạng thái) sang UI (5 trạng thái)
        const mappedOrders = dbOrders.map((order: any) => {
          let uiStatus = "pending";
          if (order.order_status === "dang_xu_ly") uiStatus = "pending";
          if (order.order_status === "dang_giao") uiStatus = "delivering";
          if (order.order_status === "da_giao") uiStatus = "completed";
          if (order.order_status === "da_huy") uiStatus = "cancelled";

          return {
            id: `#${order.orders_id || order.id}`,
            rawId: order.orders_id || order.id,
            time: new Date(order.created_at || Date.now()).toLocaleString(
              "vi-VN",
            ),

            customerName: order.receiver_name || "Khách hàng",
            phone: order.receiver_phone || "Chưa có SĐT",
            itemsPreview: order.items_preview || "Đang tải món...",

            totalPrice: Number(order.total_amount),
            status: uiStatus,
          };
        });

        setOrders(mappedOrders);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng từ Database:", error);
      }
    };

    fetchOrdersFromDB();
  }, []);

  // 2. HÀM CẬP NHẬT TRẠNG THÁI (KẾT NỐI API)
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      // Vì order.id của giao diện đang có dấu # (VD: #4254), ta cần cắt lấy số thực để gửi API
      const realId = orderId.replace("#", "");

      // Chuyển logic từ UI về logic DB
      let dbStatus = "dang_xu_ly";
      if (newStatus === "cooking") dbStatus = "dang_xu_ly"; // Đang nấu vẫn gộp chung vào Đang xử lý
      if (newStatus === "delivering") dbStatus = "dang_giao";
      if (newStatus === "completed") dbStatus = "da_giao";
      if (newStatus === "cancelled") dbStatus = "da_huy";

      // Gọi API báo Backend đổi trạng thái
      await orderService.updateOrderStatus(realId, dbStatus);

      // Cập nhật lại state trên giao diện cho mượt mà (không cần load lại trang)
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật DB. Vui lòng thử lại!");
    }
  };

  // 3. LỌC VÀ ĐẾM SỐ LƯỢNG
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);
  const countPending = orders.filter((o) => o.status === "pending").length;
  const countCooking = orders.filter((o) => o.status === "cooking").length;
  const countDelivering = orders.filter(
    (o) => o.status === "delivering",
  ).length;

  // 4. HÀM RENDER DROPDOWN TRẠNG THÁI BẰNG THẺ <SELECT>
  const renderStatusDropdown = (order: Order) => {
    const statusColors = {
      pending: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
      cooking: "text-orange-500 border-orange-500/50 bg-orange-500/10",
      delivering: "text-blue-400 border-blue-500/50 bg-blue-500/10",
      completed: "text-green-500 border-green-500/50 bg-green-500/10",
      cancelled: "text-red-500 border-red-500/50 bg-red-500/10",
    };

    return (
      <div
        className={`relative border rounded-lg px-2 py-1.5 min-w-[130px] ${statusColors[order.status]}`}
      >
        <select
          value={order.status}
          onChange={(e) =>
            updateOrderStatus(order.id, e.target.value as OrderStatus)
          }
          className="w-full bg-transparent outline-none appearance-none font-medium text-sm cursor-pointer"
        >
          <option value="pending" className="bg-[#140505] text-white">
            Chờ xác nhận
          </option>
          <option value="cooking" className="bg-[#140505] text-white">
            Đang nấu
          </option>
          <option value="delivering" className="bg-[#140505] text-white">
            Đang giao
          </option>
          <option value="completed" className="bg-[#140505] text-white">
            Hoàn thành
          </option>
          <option value="cancelled" className="bg-[#140505] text-white">
            Đã hủy
          </option>
        </select>
        {/* Icon mũi tên custom */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
          ▼
        </span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">Quản lý Đơn hàng</h1>
        <p className="text-gray-500 text-sm">
          Theo dõi và cập nhật trạng thái đơn hàng
        </p>
      </div>

      {/* 3 Thẻ Tổng Quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#2a1a08] to-[#140a05] border border-yellow-900/30 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
          <span className="text-4xl font-black text-yellow-500 mb-2">
            {countPending}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            Chờ xác nhận
          </span>
        </div>
        <div className="bg-gradient-to-br from-[#2a1005] to-[#140505] border border-orange-900/30 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
          <span className="text-4xl font-black text-[#ff4500] mb-2">
            {countCooking}
          </span>
          <span className="text-gray-400 text-sm font-medium">Đang nấu</span>
        </div>
        <div className="bg-gradient-to-br from-[#0a1a2a] to-[#050a14] border border-blue-900/30 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
          <span className="text-4xl font-black text-blue-400 mb-2">
            {countDelivering}
          </span>
          <span className="text-gray-400 text-sm font-medium">Đang giao</span>
        </div>
      </div>

      {/* Tabs Phân loại */}
      <div className="flex flex-wrap gap-3 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#ff4500] text-white"
                : "bg-transparent border border-[#2a0e0e] text-gray-400 hover:border-[#ff4500] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bảng Quản Lý */}
      <div className="bg-[#0f0505] border border-[#2a0e0e] rounded-2xl overflow-hidden shadow-xl relative">
        <div className="flex justify-between items-center p-5 border-b border-[#2a0e0e] bg-[#140505]">
          <h2 className="text-lg font-bold">Danh sách đơn hàng</h2>
          <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Real-time Sync
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-[#2a0e0e]">
                <th className="p-5 font-bold">Đơn / Giờ</th>
                <th className="p-5 font-bold">Khách hàng</th>
                <th className="p-5 font-bold min-w-[200px]">Món đặt</th>
                <th className="p-5 font-bold">Tổng tiền</th>
                <th className="p-5 font-bold">Trạng thái</th>
                <th className="p-5 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a0e0e]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-16 text-center text-gray-500 flex flex-col items-center"
                  >
                    <span className="text-4xl mb-3">📦</span>
                    <p>Không có đơn hàng nào ở mục này.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#1a0808] transition-colors group"
                  >
                    <td className="p-5">
                      <p className="font-bold text-[#ff4500] mb-1">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        🕒 {order.time}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-gray-200 mb-1">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        📞 {order.phone}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="text-sm text-gray-400 line-clamp-2 max-w-[250px]">
                        {order.itemsPreview}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-white">
                        {order.totalPrice.toLocaleString("vi-VN")}đ
                      </p>
                    </td>
                    <td className="p-5">
                      {/* Gọi hàm render Dropdown (Trạng thái có thể chỉnh sửa) */}
                      {renderStatusDropdown(order)}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        {/* HIỂN THỊ NÚT THEO ĐÚNG LOGIC BẠN YÊU CẦU */}

                        {/* 1. Nếu đang Chờ xác nhận -> Hiện Xác Nhận & Hủy */}
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "cooking")
                              }
                              className="border border-green-700 text-green-500 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                              ✓ Xác nhận
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "cancelled")
                              }
                              className="border border-red-900 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                              ✕ Hủy
                            </button>
                          </>
                        )}

                        {/* 2. Nếu đang Nấu -> Chỉ hiện Hủy */}
                        {order.status === "cooking" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
                            }
                            className="border border-red-900 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                          >
                            ✕ Hủy
                          </button>
                        )}

                        {/* 3. Nếu đang Giao, Hoàn Thành, Đã Hủy -> Hiện nút Xem */}
                        {(order.status === "completed" ||
                          order.status === "cancelled" ||
                          order.status === "delivering") && (
                          <button className="border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                            👁 Xem
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
      </div>
    </div>
  );
}
