import { supabase } from "@/lib/supabase";

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export type CreateOrderPayload = {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  total: number;
  payment_method?: string;
  items: Array<{
    product_id: number;
    product_name: string;
    product_image: string;
    product_url: string;
    price: number;
    discount?: number;
    quantity: number;
  }>;
};

const create = async (payload: CreateOrderPayload) => {
  try {
    const { full_name, phone, email, address, note, total, payment_method = "cod", items } = payload;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        full_name,
        phone,
        email,
        address,
        note: note || null,
        total,
        payment_method,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return { message: "Lỗi tạo đơn hàng", error: orderError.message };
    }

    if (!order?.id || !items?.length) {
      return { data: order };
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      product_url: item.product_url,
      price: item.price,
      discount: item.discount ?? 0,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      return {
        message: "Đơn hàng đã tạo nhưng lỗi khi lưu chi tiết",
        error: itemsError.message,
        data: order,
      };
    }

    return { data: order };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Unexpected error creating order:", err);
    return { message: "Lỗi hệ thống", error: message };
  }
};

const getList = async (params?: {
  limit?: number;
  offset?: number;
  search?: string;
  status?: string;
  sortBy?: "newest" | "oldest";
}) => {
  try {
    let dataQuery = supabase
      .from("orders")
      .select("*", { count: "exact" });

    if (params?.search) {
      const search = params.search.trim();
      dataQuery = dataQuery.or(
        `full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    if (params?.status) {
      dataQuery = dataQuery.eq("status", params.status);
    }

    const sortAsc = params?.sortBy === "oldest";
    dataQuery = dataQuery.order("created_at", {
      ascending: sortAsc,
      nullsFirst: false,
    });

    const limit = params?.limit || 10;
    const offset = params?.offset || 0;
    dataQuery = dataQuery.range(offset, offset + limit - 1);

    const { data: orders, count, error } = await dataQuery;

    if (error) {
      console.error("Error fetching orders:", error);
      return { message: "Lỗi tải đơn hàng", error: error.message };
    }

    return {
      data: orders || [],
      count: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Unexpected error fetching orders:", err);
    return { message: "Lỗi hệ thống", error: message };
  }
};

const getById = async (id: number) => {
  try {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (orderError) {
      console.error("Error fetching order:", orderError);
      return { message: "Lỗi tải đơn hàng", error: orderError.message };
    }

    if (!order) return { message: "Không tìm thấy đơn hàng" };

    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id)
      .order("id", { ascending: true });

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
    }

    return {
      data: {
        ...order,
        order_items: orderItems || [],
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Unexpected error fetching order:", err);
    return { message: "Lỗi hệ thống", error: message };
  }
};

const updateStatus = async (id: number, status: OrderStatus) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating order status:", error);
      return { message: "Lỗi cập nhật trạng thái", error: error.message };
    }

    return { data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Unexpected error updating order:", err);
    return { message: "Lỗi hệ thống", error: message };
  }
};

export const ordersService = {
  create,
  getList,
  getById,
  updateStatus,
};
