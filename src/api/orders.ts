import { ordersService, CreateOrderPayload, OrderStatus } from "@/services/orders";

const create = async (payload: CreateOrderPayload) => {
  return await ordersService.create(payload);
};

const getList = async (params?: {
  limit?: number;
  offset?: number;
  search?: string;
  status?: string;
  sortBy?: "newest" | "oldest";
}) => {
  return await ordersService.getList(params);
};

const getById = async (id: number) => {
  return await ordersService.getById(id);
};

const updateStatus = async (id: number, status: OrderStatus) => {
  return await ordersService.updateStatus(id, status);
};

export type { CreateOrderPayload, OrderStatus };
export const apiOrders = {
  create,
  getList,
  getById,
  updateStatus,
};
