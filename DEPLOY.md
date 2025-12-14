# Hướng dẫn Deploy Website lên Vercel

## Yêu cầu trước khi deploy

### 1. Cài đặt Vercel CLI (tùy chọn)

```bash
npm i -g vercel
```

### 2. Chuẩn bị Environment Variables

Bạn cần các biến môi trường sau:

#### Supabase Configuration

- `NEXT_PUBLIC_SUPABASE_URL`: URL của Supabase project của bạn
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key của Supabase project

#### API Configuration (Tùy chọn)

- `NEXT_PUBLIC_API_URL`: URL của website nếu bạn muốn chỉ định rõ ràng (thường không cần vì API routes chạy trên cùng domain)

## Cách deploy

### Phương pháp 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Đăng nhập Vercel**
   - Truy cập: https://vercel.com
   - Đăng nhập bằng GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "New Project"
   - Chọn repository GitHub của bạn (hoặc import từ Git)
   - Vercel sẽ tự động detect Next.js project

3. **Cấu hình Environment Variables**
   - Trong phần "Environment Variables", thêm các biến:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     # NEXT_PUBLIC_API_URL là tùy chọn (thường không cần)
     ```
   - ⚠️ **Lưu ý**: Sau khi deploy lần đầu, bạn cần cập nhật `NEXT_PUBLIC_API_URL` với URL thực tế từ Vercel và redeploy

4. **Deploy Settings**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (hoặc `yarn build`)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (hoặc `yarn install`)

5. **Click Deploy**
   - Vercel sẽ tự động build và deploy website
   - Sau khi hoàn tất, bạn sẽ nhận được URL production

### Phương pháp 2: Deploy bằng Vercel CLI

1. **Login vào Vercel**

   ```bash
   vercel login
   ```

2. **Deploy lần đầu (preview)**

   ```bash
   vercel
   ```

3. **Deploy production**

   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   # NEXT_PUBLIC_API_URL là tùy chọn (thường không cần)
   ```

## Sau khi deploy

### Kiểm tra

- ✅ Website hoạt động đúng
- ✅ API routes hoạt động (`/api/product-categories`)
- ✅ Kết nối Supabase hoạt động
- ✅ Images và assets load đúng

## Lưu ý quan trọng

1. **Environment Variables**: Tất cả biến môi trường phải có prefix `NEXT_PUBLIC_` để có thể truy cập từ client-side

2. **Supabase**: Đảm bảo Supabase project của bạn đã được cấu hình đúng và có quyền truy cập

3. **API Routes**: Nếu có API routes trong `src/pages/api/`, chúng sẽ hoạt động tự động trên Vercel

4. **Build Errors**: Nếu gặp lỗi build, check logs trong Vercel Dashboard để xem chi tiết

## Troubleshooting

### Lỗi build

- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo tất cả dependencies đã được cài đặt đúng
- Check TypeScript errors: `npm run build` locally trước

### Environment Variables không hoạt động

- Đảm bảo đã set đúng trong Vercel Dashboard
- Redeploy sau khi thêm/sửa environment variables
- Check console trong browser để xem giá trị biến môi trường

### API không hoạt động

- Kiểm tra `NEXT_PUBLIC_API_URL` đã đúng chưa
- Check Supabase connection
- Xem network tab trong browser DevTools
