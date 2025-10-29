"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ScanInput from "@/components/scan-input";
import ItemCard from "@/components/item-card";
import FooterActions from "@/components/footer-actions";
import Spinner from "@/components/spinner";
import type { CustomerReturn, PatchItemsRequest, PatchItemsResponseItem, ReturnItem } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

type SearchResponse = { found: true; customer_return: CustomerReturn } | { found: false; q: string };

export default function Page() {
  const [current, setCurrent] = useState<CustomerReturn | null>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  async function search(query: string) {
    // Clear previous return immediately and show spinner
    setCurrent(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/returns/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as SearchResponse;
      console.log(json);
      if (json && json.found) setCurrent(json.customer_return);
      else setCurrent(null);
    } catch (e) {
      console.error(e);
      alert(`No return found for ${query}`);
    } finally {
      setLoading(false);
    }
  }

  const uninspected = useMemo(() => {
    if (!current) return [] as ReturnItem[];
    console.log(current.items);
    return (current.items || []).filter((i) => !i.inspected_date);
  }, [current]);

  const markMutation = useMutation({
    mutationFn: async ({ items, status }: { items: ReturnItem[]; status: 'arrived' | 'inspected' | 'missing' }) => {
      if (!current) return [] as PatchItemsResponseItem[];
      const payload: PatchItemsRequest = {
        items: items.map((i) => ({
          sku: i.sku,
          quantity: i.quantity ?? 1,
          status,
          ...(i.item_condition ? { condition: i.item_condition } : {})
        }))
      };
      const res = await fetch(`/api/returns/${current.id}/items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());
      const out = (await res.json()) as PatchItemsResponseItem[];
      console.log(out);
      return out;
    },
    onSuccess: async () => {
      if (!current) return;
      // Refetch the return
      const res = await fetch(`/api/returns/search?q=${encodeURIComponent(current.order_number || current.order_name || String(current.id))}`);
      if (res.ok) {
        const json = (await res.json()) as SearchResponse;
        if (json && json.found) setCurrent(json.customer_return);
      }
    }
  });

  function onMarkItem(status: 'arrived' | 'inspected' | 'missing', item: ReturnItem) {
    markMutation.mutate({ items: [item], status });
  }

  function onMarkAllInspected() {
    if (uninspected.length === 0) return;
    markMutation.mutate({ items: uninspected, status: 'inspected' });
  }

  function onMarkAllReceived() {
    const notArrived = (current?.items || []).filter((i) => !i.arrived_date);
    if (notArrived.length === 0) return;
    markMutation.mutate({ items: notArrived, status: 'arrived' });
  }

  function onReset() {
    setCurrent(null);
  }

  useEffect(() => {
    // no-op placeholder to satisfy lint of queryClient unused if added later
    void queryClient;
  }, [queryClient]);

  return (
    <main className="flex-1 flex flex-col">
      <ScanInput onSubmit={search} />

      {!current && !loading && (
        <div className="p-6 text-center text-gray-600">Scan an order number to begin</div>
      )}

      {loading && <Spinner />}

      {current && (
        <section className="flex-1 p-4 space-y-4 pb-28">
          <header className="mb-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{current.order_number ?? current.order_name ?? `#${current.id}`}</h1>
              <div className="text-sm text-gray-600">{current.currency}</div>
            </div>
          </header>

          {(current.items || []).map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              currency={current.currency}
              disabled={markMutation.isPending}
              onMarkArrived={(i) => onMarkItem('arrived', i)}
              onMarkInspected={(i) => onMarkItem('inspected', i)}
              onMarkMissing={(i) => onMarkItem('missing', i)}
            />
          ))}
        </section>
      )}

      {current && (
        <FooterActions
          onMarkAllReceived={onMarkAllReceived}
          onMarkAllInspected={onMarkAllInspected}
          onReset={onReset}
          disabledReceived={markMutation.isPending || (current.items || []).every((i) => !!i.arrived_date)}
          disabledInspected={markMutation.isPending || uninspected.length === 0}
        />
      )}
    </main>
  );
}


