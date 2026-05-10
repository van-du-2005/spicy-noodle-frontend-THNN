# 🍜 Spicy Noodle Frontend

Hệ thống frontend cho nền tảng đặt hàng mì cay trực tuyến, được xây dựng với công nghệ hiện đại nhất. Nền tảng cung cấp trải nghiệm mua sắm tuyệt vời cho khách hàng, công cụ quản lý toàn diện cho quản trị viên, và trợ lý AI thông minh hỗ trợ khách hàng 24/7.

---

## 📑 Mục Lục

1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Personas & Tính Năng](#2-personas--tính-năng)
3. [Công Nghệ Sử Dụng](#3-công-nghệ-sử-dụng)
4. [Kiến Trúc Hệ Thống](#4-kiến-trúc-hệ-thống)
5. [Yêu Cầu & Cài Đặt](#5-yêu-cầu--cài-đặt)
6. [Hướng Dẫn Chạy Dự Án](#6-hướng-dẫn-chạy-dự-án)
7. [Tính Năng & Workflows](#7-tính-năng--workflows)
8. [API Endpoints](#8-api-endpoints)
9. [Cấu Trúc Tệp & Quy Ước](#9-cấu-trúc-tệp--quy-ước)
10. [Hướng Dẫn Phát Triển](#10-hướng-dẫn-phát-triển)
11. [Hướng Dẫn Triển Khai](#11-hướng-dẫn-triển-khai)
12. [Biến Môi Trường](#12-biến-môi-trường)
13. [Khắc Phục Sự Cố & FAQ](#13-khắc-phục-sự-cố--faq)
14. [Hướng Dẫn Đóng Góp](#14-hướng-dẫn-đóng-góp)
15. [License & Thông Tin](#15-license--thông-tin)

---

## 1. Tổng Quan Dự Án

### Giới Thiệu

**Spicy Noodle Online** là một nền tảng đặt hàng mì cay trực tuyến hiện đại, được thiết kế để:
- 🛒 Cung cấp trải nghiệm mua sắm mượt mà cho khách hàng
- 📊 Cung cấp công cụ quản lý mạnh mẽ cho admin
- 🤖 Cung cấp hỗ trợ AI tích hợp cho khách hàng
- 📱 Hỗ trợ đầy đủ trên web và mobile

### Loại Dự Án
**E-commerce Platform** - Hệ thống đặt hàng thực phẩm trực tuyến (food ordering system)

### Stack & Kiến Trúc Chính
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API (Auth, Cart)
- **Authentication**: Google OAuth + Session-based
- **Communication**: Axios HTTP client

### Ai Đó Dùng Hệ Thống Này?

| Persona | Mục Đích | Tính Năng Chính |
|---------|---------|---|
| **👥 Khách Hàng** | Đặt hàng, quản lý đơn hàng | Browse menu, cart, checkout, order tracking, profile, chatbot |
| **👨‍💼 Admin** | Quản lý hệ thống | Dashboard, menu management, order management, analytics, AI config |
| **🤖 AI Assistant** | Hỗ trợ khách hàng | Chat, FAQs, order status, menu inquiries |

---

## 2. Personas & Tính Năng

### 👥 Khách Hàng (Customer)

**Quy Trình Sử Dụng:**
1. **Duyệt Menu** → Xem các loại mì cay, giá cả, đánh giá
2. **Tùy Chỉnh Đơn Hàng** → Chọn mức cay (1-5), thêm topping, số lượng
3. **Quản Lý Giỏ Hàng** → Thêm/xóa/cập nhật items, lưu giỏ persistent
4. **Thanh Toán** → Chọn địa chỉ giao hàng, phương thức thanh toán (COD, Online)
5. **Theo Dõi Đơn** → Xem lịch sử, lọc theo trạng thái, xem chi tiết
6. **Quản Lý Hồ Sơ** → Cập nhật tên, phone, địa chỉ, ngày sinh
7. **Chat AI** → Hỏi về menu, đơn hàng, khuyến mãi
8. **Đăng Nhập** → Google OAuth single-click

**Tính Năng Chi Tiết:**
- ✅ Browse menu by category
- ✅ View product details (description, price, rating, images)
- ✅ Customize order (spicy level, toppings, quantity)
- ✅ Persistent shopping cart
- ✅ Checkout with delivery address
- ✅ Multiple payment methods (COD, Online Payment)
- ✅ Order history with filtering (processing, shipped, delivered, cancelled)
- ✅ Order details modal with combo items
- ✅ Profile update (personal info, addresses)
- ✅ Google OAuth login
- ✅ AI chatbot support

### 👨‍💼 Admin (Administrator)

**Quy Trình Quản Lý:**
1. **Dashboard** → Real-time revenue, orders, top products, low stock
2. **Quản Lý Menu** → CRUD products, combos, toppings, categories
3. **Quản Lý Đơn Hàng** → View all orders, update status, track shipping
4. **Quản Lý Khách Hàng** → View profiles, purchase history, demographics
5. **Cảnh Báo Tồn Kho** → Monitor low-stock products, set thresholds
6. **Cấu Hình AI** → Set chatbot prompts, response rules
7. **Báo Cáo & Analytics** → Generate revenue reports, order metrics, customer insights

**Tính Năng Chi Tiết:**
- ✅ Dashboard overview (revenue cards, order count, top-selling products)
- ✅ Low stock alerts
- ✅ Product management (CRUD operations)
- ✅ Combo/topping management
- ✅ Order management (view, filter, update status)
- ✅ Customer management (view profiles, purchase history)
- ✅ AI chatbot configuration
- ✅ Analytics & reporting
- ✅ Role-based access control (protected routes)

---

## 3. Công Nghệ Sử Dụng

### Frontend Framework & Runtime

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **Next.js** | 16.1.6 | React framework với App Router, SSR, static generation |
| **React** | 19.2.3 | UI library, component-based architecture |
| **TypeScript** | 5 | Strict type checking, better IDE support |
| **React DOM** | 19.2.3 | React rendering target |

### Styling & CSS

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **PostCSS** | 4 | CSS processing, Tailwind compilation |

### HTTP Client & State Management

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **Axios** | 1.15.2 | HTTP client, API calls with credentials |
| **React Context API** | Built-in | Global state (Auth, Cart) |

### Authentication & Security

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **@react-oauth/google** | 0.13.5 | Google OAuth integration |
| **Cookies/Sessions** | Native | Server-side session management |

### UI Components & Notifications

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **Lucide React** | 1.14.0 | SVG icon library |
| **React Icons** | 5.6.0 | Additional icon sets |
| **React Hot Toast** | 2.6.0 | Toast notifications |

### Development Tools

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **ESLint** | 9 | Code quality linting |
| **Node.js** | 18+ | Runtime environment |

---

## 4. Kiến Trúc Hệ Thống

### 4.1 Tổng Quan Kiến Trúc

```
┌─────────────────────────────────────────────────────────┐
│                  Web Browser (User)                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js 16 Application                      │
│  ├─ App Router (route groups: main, auth, admin)        │
│  ├─ Server Components (layout, root)                    │
│  └─ Client Components (pages, modals, forms)            │
└────────────────────┬────────────────────────────────────┘
                     │ renders
                     ▼
┌─────────────────────────────────────────────────────────┐
│            React Component Tree                          │
│  ├─ Layout (Header, Footer, CartDrawer - main routes)   │
│  ├─ AdminLayout (AdminHeader, AdminSidebar - admin)     │
│  ├─ AuthLayout (login pages)                            │
│  └─ Page components + Modal components                  │
└────────────────────┬────────────────────────────────────┘
                     │ uses
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Custom Hooks (useOrders, useProfile)            │
│  ├─ Handle data fetching                                │
│  ├─ Manage loading/error states                         │
│  └─ Provide data to components                          │
└────────────────────┬────────────────────────────────────┘
                     │ calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│        Service Layer (Services via Axios)               │
│  ├─ authService.ts                                      │
│  ├─ orderService.ts                                     │
│  ├─ profileService.ts                                   │
│  ├─ chatbotService.ts                                   │
│  └─ (all with withCredentials: true)                    │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Backend API (NEXT_PUBLIC_API_URL)               │
│  ├─ /api/auth/*      (authentication)                   │
│  ├─ /api/orders/*    (order management)                 │
│  ├─ /api/users/*     (user profiles)                    │
│  ├─ /api/products/*  (menu items)                       │
│  ├─ /api/chatbot/*   (AI chat)                          │
│  └─ /api/reports/*   (analytics)                        │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Luồng Dữ Liệu & State Management

#### Authentication Flow
```
User clicks Google Login
  ↓
@react-oauth/google component
  ↓
Backend verifies token
  ↓
Server sets session cookie
  ↓
Browser stores credentials
  ↓
AuthContext → useAuth() hook
  ↓
checkLoginStatus() called on app startup
  ↓
Protected routes check user.role
  ↓
AdminGuard redirects non-admins
```

#### Cart Management Flow
```
User selects product → clicks "Add to Cart"
  ↓
Component calls useCart().addToCart(item)
  ↓
CartContext updates cartItems state
  ↓
CartDrawer component re-renders
  ↓
User goes to checkout
  ↓
Component calls orderService.createOrder(cartData)
  ↓
Service sends POST /api/orders with credentials
  ↓
Backend creates order, returns confirmation
  ↓
Component shows toast notification
  ↓
CartContext clears cartItems
```

#### Data Fetching Flow
```
Component mounts
  ↓
useOrders() hook called
  ↓
Hook calls orderService.getOrders(page, limit)
  ↓
Service sends GET /api/orders with credentials
  ↓
Hook sets loading = true
  ↓
Response returns { data: [...], total, pages }
  ↓
Hook updates orders state
  ↓
Component re-renders with new data
```

### 4.3 Route Groups & Protected Routes

```
src/app/
├── (main)/                    # Public customer routes
│   ├── layout.tsx            # Header, Footer, CartDrawer
│   ├── page.tsx              # Home/Menu browsing
│   ├── chatbot/              # /chatbot
│   ├── checkout/             # /checkout
│   └── user/                 # /user/*
│       ├── profile/          # /user/profile
│       └── purchase/         # /user/purchase
│
├── (auth)/                    # Public auth routes
│   └── login/                # /login
│
└── (admin)/                   # Protected admin routes
    ├── layout.tsx            # AdminHeader, AdminSidebar, AdminGuard
    └── admin/                # /admin/*
        ├── page.tsx          # /admin (dashboard)
        ├── dashboard/        # /admin/dashboard
        ├── menu/             # /admin/menu
        ├── orders/           # /admin/orders
        ├── customers/        # /admin/customers
        └── ai/               # /admin/ai

Route Protection:
- (main) routes: No protection (public)
- (auth) routes: No protection (public)
- (admin) routes: AdminGuard checks user.role === 'admin'
```

### 4.4 Folder Structure & Purpose

```
src/
├── app/                           # Next.js App Router pages & routes
│
├── components/                    # Reusable React components
│   ├── admin/                    # Admin-specific components
│   │   ├── AdminHeader.tsx       # Top navigation for admin
│   │   ├── AdminSidebar.tsx      # Sidebar menu for admin
│   │   └── dashboard/            # Dashboard widgets
│   ├── auth/
│   │   └── AdminGuard.tsx        # Protected route wrapper
│   ├── cart/
│   │   └── CartDrawer.tsx        # Shopping cart panel
│   ├── product/
│   │   └── ProductModal.tsx      # Product details modal
│   ├── user/                     # User-specific components
│   │   ├── Header.tsx            # Main navigation
│   │   ├── Footer.tsx            # Footer section
│   │   ├── ProfileHeader.tsx     # User profile section
│   │   ├── OrderCard.tsx         # Order list item
│   │   └── order-detail/        # Order detail modals
│   └── svg/
│       └── Logo.tsx              # Logo component
│
├── config/
│   └── api.config.js            # Backend API URL config
│
├── constants/                    # Application constants
│   ├── index.ts
│   ├── user.constant.ts         # USER_ROLE = { ADMIN, USER }
│   ├── order.constant.ts        # ORDER_STATUS, PAYMENT_METHOD
│   ├── product.constant.ts      # Product-related constants
│   └── voucher.constant.ts      # Voucher-related constants
│
├── context/                      # React Context for global state
│   ├── auth/
│   │   └── AuthContext.tsx      # User auth state & methods
│   └── CartContext.tsx          # Shopping cart state
│
├── hooks/                        # Custom React hooks
│   ├── useOrders.ts             # Fetch user orders with pagination
│   ├── useProfile.ts            # Get/update user profile
│   ├── useOrderDetail.ts        # Get single order details
│   ├── useComboDetail.ts        # Get combo item details
│   ├── useDashboardData.ts      # Fetch admin dashboard data
│   ├── useLowStock.ts           # Fetch low stock alerts
│   └── useToast.ts              # Toast notification helper
│
├── services/                     # API integration layer (Axios)
│   ├── auth.service.ts          # Login, logout, getCurrentUser
│   ├── order.service.ts         # CRUD operations for orders
│   ├── profile.service.ts       # User profile API calls
│   ├── chatbot.service.ts       # Send chat messages
│   ├── chat-session.service.ts  # Manage chat sessions
│   ├── chat-storage.service.ts  # Local storage for chat
│   ├── report.service.ts        # Generate admin reports
│   └── ai-admin.service.ts      # AI configuration API
│
├── types/                        # TypeScript interfaces & types
│   ├── user.type.ts             # IUser, UserRole
│   ├── product.type.ts          # IProduct, IProductImage
│   ├── order.type.ts            # IOrder, IOrderDetail
│   ├── cart-item.type.ts        # ICartItem with toppings
│   ├── chat-message.type.ts     # IChatMessage
│   ├── chat-session.type.ts     # IChatSession
│   ├── combo-component.type.ts  # IComboComponent
│   ├── product-category.type.ts # IProductCategory
│   └── [7+ more type files]
│
├── utils/
│   └── validator.util.ts        # Input validation helpers
│
├── styles/
│   ├── global.css               # Global styles
│   └── global.d.ts              # CSS module types
│
└── public/                       # Static assets
```

### 4.5 Global State Management

#### AuthContext
```typescript
// Usage: const { user, loading, checkLoginStatus, logout } = useAuth()

Properties:
- user: IUser | null          // Current logged-in user
- loading: boolean            // Loading state during auth check
- checkLoginStatus(): Promise  // Call on app startup (GET /api/auth/me)
- logout(): Promise           // Logout user (POST /api/auth/logout)

User object includes:
- id: string
- email: string
- name: string
- role: 'admin' | 'user'
- avatar: string
```

#### CartContext
```typescript
// Usage: const { cartItems, addToCart, removeFromCart, ... } = useCart()

Properties:
- cartItems: ICartItem[]      // Current cart items
- addToCart(item)             // Add item to cart
- removeFromCart(itemId)      // Remove item from cart
- updateQuantity(itemId, qty) // Update item quantity
- clearCart()                 // Empty the cart
- getTotalPrice()             // Calculate total

Persistent: Cart saved to localStorage
```

---

## 5. Yêu Cầu & Cài Đặt

### 5.1 Yêu Cầu Hệ Thống

| Yêu Cầu | Phiên Bản | Ghi Chú |
|---------|----------|--------|
| **Node.js** | 18.17+ | LTS version recommended |
| **npm** | 9+ | Or yarn 3+ / pnpm |
| **Git** | Mới nhất | For version control |
| **Backend API** | Running | NEXT_PUBLIC_API_URL needed |

### 5.2 Clone Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd spicy-noodle-frontend

# Check Node version
node --version  # Should be 18.17 or higher
npm --version   # Should be 9 or higher
```

### 5.3 Cài Đặt Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Next.js 16
# - React 19
# - TypeScript
# - Tailwind CSS
# - Axios
# - Google OAuth library
# - And other required packages
```

### 5.4 Cấu Hình Environment Variables

Tạo file `.env.local` ở root directory:

```bash
# .env.local

# REQUIRED - Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# For Google OAuth (optional)
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

**Biến Bắt Buộc:**
- `NEXT_PUBLIC_API_URL` - URL của backend API
  - Development: `http://localhost:5000`
  - Production: `https://api.yourdomain.com`

**Biến Tùy Chọn:**
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - For Google OAuth login

### 5.5 Xác Minh Cài Đặt

```bash
# Check if all dependencies are installed correctly
npm list

# Run linting to catch any syntax errors
npm run lint

# These should complete without errors if setup is correct
```

---

## 6. Hướng Dẫn Chạy Dự Án

### 6.1 Development Mode

```bash
# Start development server
npm run dev

# Output:
# ▲ Next.js 16.1.6
# - Local:        http://localhost:3000
# - Environments: .env.local

# Open browser and navigate to http://localhost:3000
```

**Tính Năng:**
- 🔄 Hot reload on file changes
- 🐛 Detailed error messages
- 🔍 Built-in DevTools
- ⚡ Fast refresh

**Cách Sử Dụng:**
1. Mở terminal ở root directory
2. Chạy `npm run dev`
3. Mở http://localhost:3000 trên browser
4. Thay đổi file → tự động refresh

### 6.2 Build & Production Mode

```bash
# Build for production (creates .next/ optimized folder)
npm run build

# Start production server (uses optimized build)
npm start

# Output: ▲ Next.js 16.1.6 (production)
# Ready in 1.2s
```

**Process:**
```
npm run build
  ↓
Next.js compiles & optimizes
  ↓
Creates .next/ folder (minified, tree-shaken)
  ↓
npm start
  ↓
Serves optimized production build
```

### 6.3 Linting & Code Quality

```bash
# Run ESLint to check code quality
npm run lint

# This will:
# - Check for syntax errors
# - Find unused variables
# - Check TypeScript types
# - Apply formatting rules
```

### 6.4 Khắc Phục Sự Cố Thường Gặp

#### Port 3000 Đã Được Sử Dụng
```bash
# Option 1: Kill process on port 3000
# Windows (PowerShell):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- -p 3001
```

#### Build Thất Bại
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Module Not Found
```bash
# Ensure all dependencies are installed
npm install

# If still failing, check tsconfig.json path aliases
cat tsconfig.json | grep '"@/*"'
```

#### API Connection Error
```bash
# Check NEXT_PUBLIC_API_URL is set
echo $env:NEXT_PUBLIC_API_URL  # Windows PowerShell

# Ensure backend is running
# curl http://localhost:5000/api/health  # Or similar health check
```

---

## 7. Tính Năng & Workflows

### 7.1 Customer Workflows

#### Workflow 1: Duyệt Menu & Đặt Hàng

```
1. User mở http://localhost:3000
   ↓
2. Nhìn thấy Homepage với menu products (danh sách mì cay)
   ↓
3. Click vào product → ProductModal mở
   - Xem chi tiết: tên, giá, mô tả, ảnh, đánh giá
   ↓
4. Customization:
   - Chọn mức cay (1-5 scale)
   - Chọn toppings (thêm từ danh sách)
   - Đặt số lượng
   ↓
5. Click "Thêm vào giỏ" → toast "Added to cart"
   ↓
6. CartDrawer cập nhật: hiển thị item count, total price
   ↓
7. User có thể thêm nhiều items hoặc tiếp tục
```

#### Workflow 2: Thanh Toán & Checkout

```
1. User click Cart icon hoặc Checkout button
   ↓
2. CartDrawer/Checkout page mở
   - Hiển thị tất cả items trong giỏ
   - Hiển thị total price
   ↓
3. User điền delivery address:
   - Select từ saved addresses hoặc thêm mới
   ↓
4. Chọn payment method:
   - COD (Cash On Delivery)
   - Online Payment (VNPay, etc.)
   ↓
5. Click "Đặt Hàng" → orderService.createOrder(cartData)
   ↓
6. Backend processes order → return order confirmation
   ↓
7. CartContext clears, toast shows success
   ↓
8. Redirect to order detail page
```

#### Workflow 3: Theo Dõi Đơn Hàng

```
1. User go to /user/purchase (order history)
   ↓
2. useOrders() hook fetches:
   - GET /api/orders?page=1&limit=10
   ↓
3. OrderList component displays:
   - Order ID, date, total, status
   - Filters: All, Processing, Shipped, Delivered, Cancelled
   ↓
4. Click order → OrderDetail modal opens:
   - Order items with combo details
   - Delivery address
   - Payment method
   - Real-time status updates
   ↓
5. User can track shipping, cancel (if applicable)
```

#### Workflow 4: Chat với AI Chatbot

```
1. User go to /chatbot
   ↓
2. ChatInterface component renders chat history
   - Loaded from localStorage or chat-session service
   ↓
3. User types message & hits send
   ↓
4. chatbotService.sendMessage(message) called
   - POST /api/chatbot
   ↓
5. Backend processes with AI model
   ↓
6. Response received & displayed in chat
   ↓
7. Conversation saved to localStorage & backend
```

### 7.2 Admin Workflows

#### Workflow 1: Dashboard Overview

```
1. Admin login with Google OAuth
   ↓
2. AuthContext validates role === 'admin'
   ↓
3. Navigate to /admin
   ↓
4. Dashboard page loads useDashboardData()
   ↓
5. Shows:
   - Revenue cards (today, week, month, total)
   - Order overview (count by status)
   - Top selling products (top 5 best sellers)
   - Low stock warnings (< threshold)
   ↓
6. Admin can click cards to drill down into details
```

#### Workflow 2: Quản Lý Menu

```
1. Admin go to /admin/menu
   ↓
2. ProductList page shows all products
   - Table: ID, Name, Category, Price, Stock, Actions
   ↓
3. Actions available:
   - View details
   - Edit (update price, description, stock)
   - Add to featured
   - Delete (with confirmation)
   ↓
4. Create New Product:
   - Click "Add Product" button
   - ProductForm opens (modal or page)
   - Fill: name, category, description, price, images, toppings
   - Submit → POST /api/products
   ↓
5. Success toast, product appears in list
```

#### Workflow 3: Quản Lý Đơn Hàng

```
1. Admin go to /admin/orders
   ↓
2. OrderManagementPage shows all orders
   - Table: Order ID, Customer, Date, Total, Status, Actions
   ↓
3. Filters:
   - By date range
   - By status (processing, shipped, delivered, cancelled)
   - By customer
   ↓
4. Click order → OrderDetailModal:
   - Customer info
   - Items & quantities
   - Delivery address
   - Current status
   - Payment method
   ↓
5. Update status:
   - Processing → Shipped → Delivered
   - Or cancel if applicable
   - Click "Update" → PUT /api/orders/{id}/status
```

#### Workflow 4: Cảnh Báo Tồn Kho

```
1. Admin dashboard automatically shows:
   - LowStockWarning component
   - List: Product, Current Stock, Threshold
   ↓
2. Admin can:
   - Click product to edit & restock
   - Set new threshold
   - Mark as restocked
   ↓
3. Or go to /admin/menu and update stock manually
```

---

## 8. API Endpoints

### 8.1 Base Configuration

```javascript
// API base URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL

// All requests use:
withCredentials: true  // For cookie-based session auth

// Example endpoint call:
GET http://localhost:5000/api/orders
```

### 8.2 Authentication Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/auth/me` | GET | None | Yes | `{ user: IUser }` |
| `/api/auth/logout` | POST | None | Yes | `{ success: boolean }` |
| `/api/auth/google` | POST | `{ token: string }` | No | `{ user: IUser, token: string }` |

**Usage:**
```typescript
// Check if user is logged in (on app startup)
const response = await axios.get(`${API_URL}/api/auth/me`, {
  withCredentials: true
});
const user = response.data.user;

// Logout
await axios.post(`${API_URL}/api/auth/logout`, {}, {
  withCredentials: true
});
```

### 8.3 Order Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/orders` | GET | `page=1&limit=10` | Yes | `{ data: IOrder[], total: number, pages: number }` |
| `/api/orders` | POST | `{ items: [...], address: {...}, payment: string }` | Yes | `{ order: IOrder }` |
| `/api/orders/{id}` | GET | None | Yes | `{ order: IOrder with details }` |
| `/api/orders/{id}/status` | PUT | `{ status: string }` | Yes (Admin) | `{ order: IOrder }` |
| `/api/orders/admin/all` | GET | `page=1&limit=20&status=?` | Yes (Admin) | `{ data: IOrder[], total, pages }` |
| `/api/orders/{id}/combo-items/{itemId}` | GET | None | Yes | `{ comboItem: IComboComponent }` |

**Usage:**
```typescript
// Get user orders (paginated)
const response = await axios.get(`${API_URL}/api/orders?page=1&limit=10`, {
  withCredentials: true
});

// Create order
const response = await axios.post(`${API_URL}/api/orders`, {
  items: cartItems,
  address: selectedAddress,
  paymentMethod: 'COD'
}, {
  withCredentials: true
});

// Update order status (admin only)
const response = await axios.put(`${API_URL}/api/orders/${orderId}/status`, {
  status: 'shipped'
}, {
  withCredentials: true
});
```

### 8.4 User Profile Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/users/profile` | GET | None | Yes | `{ user: IUser }` |
| `/api/users/profile` | PUT | `{ name, phone, address, ... }` | Yes | `{ user: IUser }` |
| `/api/users/addresses` | GET | None | Yes | `{ addresses: IAddress[] }` |
| `/api/users/addresses` | POST | `{ address: IAddress }` | Yes | `{ address: IAddress }` |

**Usage:**
```typescript
// Get profile
const response = await axios.get(`${API_URL}/api/users/profile`, {
  withCredentials: true
});

// Update profile
const response = await axios.put(`${API_URL}/api/users/profile`, {
  name: 'John Doe',
  phone: '0123456789',
  dateOfBirth: '1990-01-01'
}, {
  withCredentials: true
});
```

### 8.5 Product Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/products` | GET | `category=?&page=1&limit=20` | No | `{ data: IProduct[], total, pages }` |
| `/api/products/{id}` | GET | None | No | `{ product: IProduct }` |
| `/api/products` | POST | `{ name, price, category, ... }` | Yes (Admin) | `{ product: IProduct }` |
| `/api/products/{id}` | PUT | `{ ...updates }` | Yes (Admin) | `{ product: IProduct }` |
| `/api/products/{id}` | DELETE | None | Yes (Admin) | `{ success: boolean }` |
| `/api/categories` | GET | None | No | `{ categories: IProductCategory[] }` |

### 8.6 Chatbot Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/chatbot` | POST | `{ message: string, sessionId?: string }` | No | `{ response: string, sessionId: string }` |
| `/api/chatbot/sessions` | GET | None | No | `{ sessions: IChatSession[] }` |
| `/api/chatbot/sessions/{id}` | GET | None | No | `{ session: IChatSession with messages }` |

### 8.7 Admin Report Endpoints

| Endpoint | Method | Params | Auth | Response |
|----------|--------|--------|------|----------|
| `/api/reports/revenue` | GET | `startDate=?&endDate=?&period=day\|week\|month` | Yes (Admin) | `{ data: IRevenueReport }` |
| `/api/reports/orders` | GET | `status=?&date=?` | Yes (Admin) | `{ count: number, byStatus: {...} }` |
| `/api/reports/customers` | GET | None | Yes (Admin) | `{ totalCustomers, newThisMonth, ... }` |
| `/api/reports/products` | GET | `top=10` | Yes (Admin) | `{ products: IProduct[] with sales }` |
| `/api/reports/low-stock` | GET | `threshold=10` | Yes (Admin) | `{ products: IProduct[] }` |

---

## 9. Cấu Trúc Tệp & Quy Ước

### 9.1 Cấu Trúc Chi Tiết

#### src/app/ - Routes & Pages

```
src/app/
├── globals.css                  # Global styles
├── layout.tsx                   # Root layout (Auth + Cart providers)
├── (main)/                      # Public customer routes group
│   ├── layout.tsx              # Header, Footer, CartDrawer
│   ├── page.tsx                # Home - Menu browsing
│   ├── chatbot/
│   │   └── page.tsx            # /chatbot - AI chat interface
│   ├── checkout/
│   │   └── page.tsx            # /checkout - Cart & payment
│   └── user/                   # /user/* - Protected customer routes
│       ├── layout.tsx          # User section layout
│       ├── profile/
│       │   └── page.tsx        # /user/profile
│       └── purchase/
│           └── page.tsx        # /user/purchase (order history)
│
├── (auth)/                      # Public auth routes group
│   ├── layout.tsx              # Auth layout
│   └── login/
│       └── page.tsx            # /login - Google OAuth
│
└── (admin)/                     # Protected admin routes group
    ├── layout.tsx              # AdminHeader, AdminSidebar, AdminGuard
    └── admin/                  # /admin/* - Admin pages
        ├── page.tsx            # /admin - Dashboard
        ├── ai/
        │   └── page.tsx        # /admin/ai - AI config
        ├── customers/
        │   └── page.tsx        # /admin/customers
        ├── dashboard/
        │   └── page.tsx        # /admin/dashboard (detailed)
        ├── menu/
        │   └── page.tsx        # /admin/menu - Product management
        └── orders/
            └── page.tsx        # /admin/orders - Order management
```

#### src/components/ - Reusable Components

```
src/components/
├── admin/                       # Admin-only components
│   ├── AdminHeader.tsx         # Top navigation (logo, user menu, search)
│   ├── AdminSidebar.tsx        # Side menu (dashboard, menu, orders, etc.)
│   └── dashboard/              # Dashboard widgets
│       ├── LowStockWarning.tsx # Low stock alert card
│       ├── OrderOverview.tsx   # Order stats
│       ├── RevenueCards.tsx    # Revenue metrics
│       └── TopSellingProducts.tsx  # Best sellers
│
├── auth/
│   └── AdminGuard.tsx          # Role-based access control wrapper
│
├── cart/
│   └── CartDrawer.tsx          # Shopping cart side panel
│
├── product/
│   └── ProductModal.tsx        # Product details & customization modal
│
├── user/                       # Customer components
│   ├── Header.tsx              # Main navigation (logo, menu, cart, profile)
│   ├── Footer.tsx              # Footer info & links
│   ├── OrderCard.tsx           # Single order card in order list
│   ├── OrderList.tsx           # List of orders with filters
│   ├── OrderTabs.tsx           # Tabs for filtering orders (All, Processing, etc.)
│   ├── ProfileDetailsForm.tsx  # User profile edit form
│   ├── ProfileHeader.tsx       # User profile header section
│   ├── ProfileSidebar.tsx      # Profile page sidebar (menu)
│   └── order-detail/           # Order detail components
│       ├── ComboDetailModal.tsx # Combo items in order
│       ├── OrderItemList.tsx   # Order items list
│       └── OrderStatusHeader.tsx # Order status display
│
└── svg/
    └── Logo.tsx                # Logo component
```

#### src/context/ - Global State

```
src/context/
├── auth/
│   ├── AuthContext.tsx         # Auth state (user, loading, methods)
│   ├── AuthProvider.tsx        # Auth provider component
│   └── useAuth.ts              # useAuth() hook
│
└── CartContext.tsx             # Cart state & operations
    ├── CartProvider.tsx        # Cart provider component
    └── useCart.ts              # useCart() hook
```

#### src/hooks/ - Custom Hooks

```
src/hooks/
├── useAuth.ts                  # Access AuthContext
├── useCart.ts                  # Access CartContext
├── useComboDetail.ts           # Fetch combo item details
├── useDashboardData.ts         # Fetch admin dashboard data
├── useLowStock.ts              # Fetch low stock products
├── useOrderDetail.ts           # Fetch single order details
├── useOrders.ts                # Fetch user orders with pagination
├── useProfile.ts               # Get/update user profile
└── useToast.ts                 # Toast notification helper
```

#### src/services/ - API Layer

```
src/services/
├── ai-admin.service.ts         # AI chatbot admin config API
├── auth.service.ts             # Authentication API
├── chat-session.service.ts     # Chat session management API
├── chat-storage.service.ts     # Local chat storage (localStorage)
├── chatbot.service.ts          # Chat message API
├── order.service.ts            # Order CRUD operations API
├── profile.service.ts          # User profile API
└── report.service.ts           # Admin reports API
```

#### src/types/ - TypeScript Interfaces

```
src/types/
├── cart-item-topping.type.ts  # Topping for cart items
├── cart-item.type.ts          # Shopping cart item structure
├── chat-message.type.ts       # Chat message format
├── chat-session.type.ts       # Chat session metadata
├── chatbot.type.ts            # Chatbot response structure
├── combo-component.type.ts    # Combo (group of items)
├── order-item-topping.type.ts # Topping for order items
├── order-item.type.ts         # Order line item
├── order.type.ts              # Order main structure
├── payment-online.type.ts     # Online payment info
├── product-category.type.ts   # Product category
├── product-image.type.ts      # Product image metadata
├── product-review.type.ts     # Customer review
├── product.type.ts            # Product definition
├── report.type.ts             # Report data structures
├── topping.type.ts            # Topping option
├── user.type.ts               # User profile & auth
├── voucher-user.type.ts       # User voucher usage
└── voucher.type.ts            # Voucher/coupon
```

#### src/constants/ - App Constants

```
src/constants/
├── index.ts                    # Exported constants
├── order.constant.ts           # ORDER_STATUS, PAYMENT_METHOD, DELIVERY_STATUS
├── product.constant.ts         # SPICY_LEVEL, CATEGORY enum
├── user.constant.ts            # USER_ROLE = { ADMIN: 'admin', USER: 'user' }
└── voucher.constant.ts         # VOUCHER_TYPE, DISCOUNT_TYPE
```

#### src/utils/ - Utility Functions

```
src/utils/
└── validator.util.ts           # Email validation, phone validation, etc.
```

### 9.2 Naming Conventions

#### File Naming
- **Components**: PascalCase + `.tsx`
  - ✅ `Header.tsx`, `CartDrawer.tsx`, `ProductModal.tsx`
  - ❌ `header.tsx`, `cart-drawer.tsx`
  
- **Services**: camelCase + `.service.ts`
  - ✅ `auth.service.ts`, `order.service.ts`
  - ❌ `AuthService.ts`, `auth-service.ts`

- **Hooks**: camelCase + `.ts`
  - ✅ `useOrders.ts`, `useCart.ts`
  - ❌ `useorders.ts`, `use-orders.ts`

- **Types**: camelCase + `.type.ts`
  - ✅ `user.type.ts`, `order.type.ts`
  - ❌ `User.type.ts`, `userType.ts`

- **Constants**: camelCase + `.constant.ts`
  - ✅ `order.constant.ts`, `user.constant.ts`
  - ❌ `ORDER.constant.ts`, `order-constant.ts`

#### Variable & Function Naming
- **Functions**: camelCase
  - ✅ `addToCart()`, `getOrders()`, `updateProfile()`
  
- **Constants**: UPPER_SNAKE_CASE
  - ✅ `ORDER_STATUS`, `USER_ROLE`, `API_URL`

- **React State**: camelCase
  - ✅ `const [isLoading, setIsLoading] = useState()`

- **React Components**: PascalCase
  - ✅ `<Header />`, `<ProductModal />`

- **Interfaces**: I + PascalCase
  - ✅ `IUser`, `IOrder`, `IProduct`

### 9.3 Import Aliases

```typescript
// Use @ alias instead of relative paths
// ✅ Good
import { useAuth } from '@/context/auth/AuthContext'
import { orderService } from '@/services/order.service'
import { IOrder } from '@/types/order.type'

// ❌ Avoid
import { useAuth } from '../../../context/auth/AuthContext'
```

**Configuration**: Defined in `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 10. Hướng Dẫn Phát Triển

### 10.1 Project Setup Workflow

```
1. Fork/Clone repository
   ↓
2. Create feature branch (git checkout -b feature/feature-name)
   ↓
3. Install dependencies (npm install)
   ↓
4. Create .env.local with API_URL
   ↓
5. Start dev server (npm run dev)
   ↓
6. Make changes (components, pages, services)
   ↓
7. Test locally
   ↓
8. Run linting (npm run lint)
   ↓
9. Commit & push to feature branch
   ↓
10. Create Pull Request
```

### 10.2 Adding New Features

#### Adding a New Page

```typescript
// 1. Create page file: src/app/(main)/new-feature/page.tsx

import React from 'react'

export default function NewFeaturePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">New Feature</h1>
      {/* Page content */}
    </div>
  )
}
```

#### Adding a New Component

```typescript
// 1. Create file: src/components/product/NewProductCard.tsx

import React from 'react'
import { IProduct } from '@/types/product.type'

interface NewProductCardProps {
  product: IProduct
  onSelect?: (product: IProduct) => void
}

export default function NewProductCard({ 
  product, 
  onSelect 
}: NewProductCardProps) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold text-red-500 mt-2">
        ${product.price}
      </p>
      <button
        onClick={() => onSelect?.(product)}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
      >
        Select
      </button>
    </div>
  )
}
```

#### Adding a New Service/API Call

```typescript
// 1. Create file: src/services/new-feature.service.ts

import axios from 'axios'
import { API_URL } from '@/config/api.config'
import { INewFeature } from '@/types/new-feature.type'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export const newFeatureService = {
  // GET - Fetch list with pagination
  getAll: async (page: number = 1, limit: number = 20) => {
    const response = await api.get('/api/new-feature', {
      params: { page, limit }
    })
    return response.data
  },

  // GET - Fetch single item
  getById: async (id: string) => {
    const response = await api.get(`/api/new-feature/${id}`)
    return response.data
  },

  // POST - Create new item
  create: async (data: Partial<INewFeature>) => {
    const response = await api.post('/api/new-feature', data)
    return response.data
  },

  // PUT - Update item
  update: async (id: string, data: Partial<INewFeature>) => {
    const response = await api.put(`/api/new-feature/${id}`, data)
    return response.data
  },

  // DELETE - Delete item
  delete: async (id: string) => {
    const response = await api.delete(`/api/new-feature/${id}`)
    return response.data
  }
}
```

#### Adding a New Hook

```typescript
// 1. Create file: src/hooks/useNewFeature.ts

import { useState, useEffect } from 'react'
import { newFeatureService } from '@/services/new-feature.service'
import { INewFeature } from '@/types/new-feature.type'

export const useNewFeature = () => {
  const [items, setItems] = useState<INewFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await newFeatureService.getAll()
        setItems(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return { items, loading, error }
}
```

### 10.3 State Management Pattern

#### Using Context API

```typescript
// In component
import { useAuth } from '@/context/auth/AuthContext'

export default function MyComponent() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not logged in</div>

  return <div>Welcome, {user.name}!</div>
}
```

#### Using Custom Hooks

```typescript
// In component
import { useOrders } from '@/hooks/useOrders'

export default function OrdersPage() {
  const { orders, loading, error } = useOrders()

  if (loading) return <div>Loading orders...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
```

### 10.4 Component Patterns & Best Practices

#### Functional Component Pattern
```typescript
import React, { FC } from 'react'

interface MyComponentProps {
  title: string
  onClick?: () => void
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="btn">
      {title}
    </button>
  )
}

export default MyComponent
```

#### With Hooks & Error Handling
```typescript
import React, { useEffect, useState } from 'react'
import { useOrders } from '@/hooks/useOrders'
import { useToast } from '@/hooks/useToast'

export default function OrdersComponent() {
  const { orders, loading, error } = useOrders()
  const { showToast } = useToast()

  useEffect(() => {
    if (error) {
      showToast('Failed to load orders', 'error')
    }
  }, [error])

  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### 10.5 Styling with Tailwind

```typescript
// Use Tailwind classes for styling
export default function StyledComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Title
      </h1>
      <p className="text-gray-600 mb-4">Description</p>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        Action
      </button>
    </div>
  )
}
```

### 10.6 TypeScript Best Practices

```typescript
// ✅ Good - Typed everything
interface OrderRequest {
  items: ICartItem[]
  address: string
  paymentMethod: 'COD' | 'ONLINE'
}

async function placeOrder(data: OrderRequest): Promise<IOrder> {
  const response = await orderService.create(data)
  return response.data
}

// ❌ Avoid - Using `any`
async function placeOrder(data: any): Promise<any> {
  // ...
}
```

---

## 11. Hướng Dẫn Triển Khai

### 11.1 Build Process

```bash
# 1. Create production build
npm run build

# Output:
# ✓ Creating an optimized production build...
# ✓ Compiled successfully
# ✓ Successfully created build cache
# ✓ Collecting build output...
# ✓ Finalizing build...

# This creates: .next/ folder (optimized, minified)
```

**What happens:**
- Compiles TypeScript
- Minifies JavaScript & CSS
- Optimizes images
- Tree-shakes unused code
- Creates static pre-renders for static pages
- Output: `.next/` folder (~50-100MB)

### 11.2 Production Environment Variables

Create `.env.production.local` with production values:

```bash
# .env.production.local

# REQUIRED - Production backend URL
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Optional - Production Google OAuth
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=prod-client-id
```

### 11.3 Deployment Platforms

#### Option 1: Vercel (Recommended for Next.js)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Follow prompts to connect project
# 5. Set environment variables in Vercel dashboard
#    - NEXT_PUBLIC_API_URL
```

**Steps in Dashboard:**
1. Import project from GitHub
2. Select root directory (spicy-noodle-frontend)
3. Add environment variables
4. Deploy

#### Option 2: Docker Container

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t spicy-noodle-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  spicy-noodle-frontend
```

#### Option 3: Traditional VPS (Ubuntu/Debian)

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Clone repo
git clone <repo-url>
cd spicy-noodle-frontend

# 3. Install Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install dependencies
npm install

# 5. Build project
npm run build

# 6. Use PM2 to run server
npm install -g pm2
pm2 start npm --name "spicy-noodle" -- start
pm2 startup
pm2 save

# 7. Setup nginx reverse proxy
# /etc/nginx/sites-available/spicy-noodle
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# Enable & test
sudo ln -s /etc/nginx/sites-available/spicy-noodle /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 8. Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 11.4 Production Deployment Checklist

Before deploying to production:

- [ ] All environment variables set correctly
- [ ] Backend API URL is production URL
- [ ] npm run build succeeds without errors
- [ ] npm run lint passes (no warnings)
- [ ] Tested all critical user flows
- [ ] Tested checkout process
- [ ] Tested admin dashboard
- [ ] API connectivity verified
- [ ] CORS configured on backend for production domain
- [ ] SSL certificate installed
- [ ] Email notifications working (if applicable)
- [ ] Error logging setup
- [ ] Monitoring setup (uptime, errors)
- [ ] Backup strategy in place
- [ ] Database backups automated

---

## 12. Biến Môi Trường

### 12.1 Development Variables (.env.local)

```bash
# .env.local (for development)

# REQUIRED
NEXT_PUBLIC_API_URL=http://localhost:5000

# OPTIONAL
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-dev-google-client-id
# NEXT_PUBLIC_DEBUG_MODE=true
```

### 12.2 Production Variables (.env.production.local)

```bash
# .env.production.local (for production)

# REQUIRED
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# OPTIONAL
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-prod-google-client-id
```

### 12.3 All Available Variables

| Variable | Required | Type | Example | Purpose |
|----------|----------|------|---------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | URL | `http://localhost:5000` | Backend API base URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | ❌ No | String | `123...abc@apps.googleusercontent.com` | Google OAuth client ID |
| `NEXT_PUBLIC_DEBUG_MODE` | ❌ No | Boolean | `true` | Enable debug logging |

### 12.4 Cara Akses Variables di Code

```typescript
// Dalam components atau services
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Example:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
})
```

---

## 13. Khắc Phục Sự Cố & FAQ

### 13.1 Build Failures

#### Error: "Cannot find module '@/*'"

**Cause**: TypeScript path alias not configured correctly

**Solution**:
```bash
# Check tsconfig.json
cat tsconfig.json | grep -A 2 '"paths"'

# Should have:
"paths": {
  "@/*": ["./src/*"]
}

# Rebuild
rm -rf .next
npm run build
```

#### Error: "Missing NEXT_PUBLIC_API_URL"

**Cause**: Environment variable not set

**Solution**:
```bash
# Check .env.local file exists
ls -la .env.local

# Or create if missing
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Restart dev server
npm run dev
```

### 13.2 Runtime Errors

#### "CORS error: No 'Access-Control-Allow-Origin' header"

**Cause**: Backend CORS not configured for your frontend URL

**Solution - Tell Backend Team**:
```
Frontend URL: http://localhost:3000 (dev) or https://yourdomain.com (prod)
Add to CORS whitelist on backend
Include credentials: true in CORS config
```

#### "Cannot read property 'user' of undefined" in AuthContext

**Cause**: Accessing auth before context provider mounts

**Solution**:
```typescript
// Check provider is in layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

// Then use useAuth() in child components
```

#### "SyntaxError: Unexpected token <" in JSON response

**Cause**: API returned HTML (error page) instead of JSON

**Solution**:
```bash
# Check if backend is running
curl http://localhost:5000/api/auth/me

# Check API URL in .env.local
cat .env.local

# Check network tab in DevTools (F12 → Network)
# Verify response status & content-type
```

### 13.3 Port Already in Use

**Error**: "Error: listen EADDRINUSE: address already in use :::3000"

**Solution - Windows (PowerShell)**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual PID)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

**Solution - Mac/Linux**:
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### 13.4 TypeScript Errors

#### Type 'X' is not assignable to type 'Y'

```typescript
// Add proper types
const myVar: IOrder = {
  id: '123',
  // ... fill all required fields
}
```

#### Property 'xxx' does not exist on type 'yyy'

```typescript
// Check interface/type definition
// Make sure property is defined in type file
```

### 13.5 Performance Issues

#### Slow Build Time

```bash
# Clear cache
rm -rf .next node_modules/.cache

# Rebuild
npm run build

# Check for large dependencies
npm ls --depth=0
```

#### Slow Page Load

```typescript
// Use React.memo for heavy components
const HeavyComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})

// Use dynamic imports
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('@/components/Modal'), {
  loading: () => <div>Loading...</div>
})
```

### 13.6 FAQ

**Q: How do I add authentication to a new page?**
```typescript
// Wrap with AdminGuard for admin routes
import AdminGuard from '@/components/auth/AdminGuard'

export default function AdminOnlyPage() {
  return (
    <AdminGuard>
      {/* Page content */}
    </AdminGuard>
  )
}
```

**Q: How do I save data to localStorage?**
```typescript
// Save
localStorage.setItem('key', JSON.stringify(data))

// Get
const data = JSON.parse(localStorage.getItem('key') || '{}')

// Use in useEffect
useEffect(() => {
  const saved = localStorage.getItem('cart')
  if (saved) setCart(JSON.parse(saved))
}, [])
```

**Q: How do I handle API errors?**
```typescript
try {
  const response = await orderService.getOrders()
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data?.message)
    showToast('Error: ' + error.response?.data?.message, 'error')
  }
}
```

**Q: How do I debug with console logs?**
```typescript
// Browser DevTools (F12)
console.log('Debug:', data)
console.error('Error:', error)

// Network tab
// Check API requests, responses, status codes

// React DevTools extension
// Inspect component props, state
```

---

## 14. Hướng Dẫn Đóng Góp

### 14.1 Git Workflow

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 2. Make changes
# ... edit files ...

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "feat: add new feature description"

# 5. Push to remote
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
# - Go to GitHub → Pull Requests
# - Click "New Pull Request"
# - Select your branch
# - Add description & testing notes
# - Request reviewers

# 7. After merge, update local
git checkout main
git pull origin main
git branch -d feature/your-feature-name
```

### 14.2 Commit Message Convention

Use conventional commits format:

```
<type>(<scope>): <description>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic changes)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build, dependencies

**Examples**:
```bash
# Good
git commit -m "feat(cart): add remove item functionality"
git commit -m "fix(auth): fix google oauth token parsing"
git commit -m "docs(readme): update deployment instructions"
git commit -m "refactor(services): extract common api logic"

# Bad
git commit -m "update"
git commit -m "fix stuff"
git commit -m "random changes"
```

### 14.3 Code Style Guidelines

- **Naming**: camelCase for variables/functions, PascalCase for components
- **Indentation**: 2 spaces (configured in ESLint)
- **Line Length**: Keep under 100 characters where possible
- **Comments**: Only for complex logic, not obvious code
- **Imports**: Group by external, internal, types

```typescript
// Good
import React, { useState } from 'react'  // External
import { useAuth } from '@/context/auth'  // Internal
import { IUser } from '@/types/user.type'  // Types

const MyComponent = () => {
  const [state, setState] = useState(null)

  return <div>{/* JSX */}</div>
}

export default MyComponent

// Bad
import {useState} from 'react'
import {useAuth} from '../../../../context/auth/AuthContext'

const mycomponent=()=>{
  const [state,setState]=useState(null);
  return (<div>{/* JSX */}</div>)
}
export default mycomponent
```

### 14.4 PR Review Checklist

Before submitting PR, make sure:

- ✅ Code follows style guidelines
- ✅ No console.log() left in code (except debugging)
- ✅ Added/updated relevant types
- ✅ Tested locally
- ✅ npm run lint passes
- ✅ No breaking changes
- ✅ Added comments for complex logic
- ✅ Updated README if needed
- ✅ PR description is clear

---

## 15. License & Thông Tin

### 15.1 License

This project is licensed under the **MIT License** - see LICENSE file for details.

### 15.2 Project Information

- **Project Name**: Spicy Noodle Frontend
- **Version**: 0.1.0
- **Repository**: [GitHub Repository URL]
- **Live Demo**: [Deployment URL - if available]

### 15.3 Contributors & Maintainers

| Role | Name | Email |
|------|------|-------|
| Project Lead | [Your Name] | [email@example.com] |
| Frontend Lead | [Name] | [email@example.com] |
| Backend Lead | [Name] | [email@example.com] |

### 15.4 Support & Communication

- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for feature requests
- **Documentation**: This README + inline code comments
- **Contact**: [support email or contact method]

### 15.5 Acknowledgments

- Next.js for the amazing framework
- React for component architecture
- Tailwind CSS for styling utilities
- Community contributors

---

## 📞 Support

- 📧 Email: [support@spicy-noodle.com]
- 💬 Discord: [Discord server link]
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Documentation: [Link to wiki/docs]

---

## 📝 Last Updated

- **Date**: May 10, 2026
- **Version**: 0.1.0
- **Status**: 🟢 Production Ready

---

**Happy Coding! 🍜✨**
