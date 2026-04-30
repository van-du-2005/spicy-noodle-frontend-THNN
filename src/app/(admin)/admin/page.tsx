export default function AdminPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="rounded-3xl border border-panel-elevated-border bg-panel-elevated p-6 shadow-[0_12px_32px_var(--panel-shadow)] lg:col-span-2">
        <p className="text-sm font-medium text-primary">Bảng điều khiển</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">
          Tổng quan nhanh về vận hành hôm nay
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/70">
          Đây là khu vực nội dung của trang admin. Bạn có thể thay thế bằng biểu
          đồ, bảng dữ liệu, hoặc các khối thống kê khi tích hợp thật.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="rounded-3xl border border-panel-elevated-border bg-surface p-5">
          <p className="text-sm text-foreground/60">Doanh thu hôm nay</p>
          <p className="mt-2 text-3xl font-bold text-foreground">12.4M</p>
        </div>
        <div className="rounded-3xl border border-panel-elevated-border bg-surface p-5">
          <p className="text-sm text-foreground/60">Đơn hàng mới</p>
          <p className="mt-2 text-3xl font-bold text-foreground">38</p>
        </div>
      </div>
    </div>
  );
}
