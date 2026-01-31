-- Bảng đơn hàng và chi tiết đơn hàng (chạy trong Supabase SQL Editor nếu chưa có bảng)

-- Bảng orders
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  note TEXT,
  total NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  product_url TEXT,
  price NUMERIC NOT NULL,
  discount NUMERIC NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index cho truy vấn
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- RLS: cho phép insert từ client (anon) nếu cần. Có thể bật RLS và thêm policy:
-- ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow insert orders" ON public.orders FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);
