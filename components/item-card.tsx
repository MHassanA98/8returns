"use client";

import { ReturnItem } from "@/lib/types";
import { cx, formatMoney } from "@/lib/utils";

type Props = {
  item: ReturnItem;
  currency?: string | null;
  disabled?: boolean;
  onMarkArrived?: (item: ReturnItem) => void;
  onMarkInspected?: (item: ReturnItem) => void;
  onMarkMissing?: (item: ReturnItem) => void;
};

export default function ItemCard({ item, currency, disabled, onMarkArrived, onMarkInspected, onMarkMissing }: Props) {
  const isInspected = !!item.inspected_date;
  const isArrived = !!item.arrived_date;

  return (
    <div className="p-4 border rounded-lg grid grid-cols-[auto_1fr_auto] gap-4">
      <div className="shrink-0">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name ?? item.sku}
            className="w-16 h-16 rounded-md object-cover bg-gray-100"
          />
        ) : (
          <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500">No image</div>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="font-medium text-lg truncate">{item.name ?? item.sku}</div>
            <div className="text-sm text-gray-600">SKU: {item.sku} · Qty: {item.quantity}</div>
            {item.return_reason_text || item.return_reason?.reason_internal ? (
              <div className="mt-2 text-sm text-gray-700">
                {item.return_reason_text || item.return_reason?.reason_internal}
              </div>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-2">
              {item.return_type ? (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{item.return_type}</span>
              ) : null}
              {item.item_condition ? (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Condition: {item.item_condition}</span>
              ) : null}
              {isArrived ? (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Received</span>
              ) : null}
              {isInspected ? (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Inspected</span>
              ) : null}
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-lg font-semibold">{formatMoney(item.amount, currency ?? item.currency)}</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            className={cx(
              "px-4 py-2 rounded-md text-white",
              isArrived || isInspected || disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            )}
            disabled={isArrived || isInspected || disabled}
            onClick={() => onMarkArrived?.(item)}
          >
            Mark as received
          </button>
          <button
            className={cx(
              "px-4 py-2 rounded-md text-white",
              isInspected || disabled ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
            )}
            disabled={isInspected || disabled}
            onClick={() => onMarkInspected?.(item)}
          >
            Mark inspected
          </button>
          <button
            className={cx(
              "px-4 py-2 rounded-md",
              disabled ? "bg-gray-200 text-gray-500" : "bg-red-100 text-red-700 hover:bg-red-200"
            )}
            disabled={disabled}
            onClick={() => onMarkMissing?.(item)}
          >
            Mark item as missing
          </button>
        </div>
      </div>
    </div>
  );
}


