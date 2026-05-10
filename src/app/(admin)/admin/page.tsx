import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Tự động chuyển hướng về trang Tổng quan khi truy cập /admin
  redirect("/admin/dashboard");
}
