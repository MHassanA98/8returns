export type CustomerReturnListResponse = {
  customer_returns: CustomerReturn[];
};

export type CustomerReturn = {
  id: number;
  order_id?: string;
  order_number?: string;
  order_name?: string;
  rma?: number;
  total_amount?: string;
  currency?: string;
  status?: string;
  is_registered?: boolean;
  is_arrived?: boolean;
  is_inspected?: boolean;
  is_refunded?: boolean;
  on_hold?: boolean;
  fetched_via_api?: boolean;
  customer?: {
    full_name?: string;
    email?: string;
    country?: string;
  } | null;
  items: ReturnItem[];
};

export type ReturnItem = {
  id: number;
  name?: string;
  sku: string;
  quantity: number;
  amount?: string;
  currency?: string;
  notes?: string | null;
  registered_date?: string | null;
  arrived_date?: string | null;
  inspected_date?: string | null;
  cancelled_date?: string | null;
  hold_date?: string | null;
  return_type?: string | null;
  item_condition?: string | null;
  total_amount?: string | null;
  return_reason_text?: string | null;
  return_reason?: { reason_internal?: string } | null;
  image_url?: string | null;
};

export type PatchItemsRequest = {
  items: Array<{
    sku: string;
    quantity: number;
    status: "arrived" | "inspected" | "missing";
    condition?: string;
    notes?: string;
  }>;
};

export type PatchItemsResponseItem = {
  id?: number;
  sku: string;
  message: string;
  status: "success" | "failure";
};


