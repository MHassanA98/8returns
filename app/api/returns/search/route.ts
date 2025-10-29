import { eightReturnsFetch } from '@/lib/8returns';
import type { CustomerReturnListResponse, CustomerReturn } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  if (!q) {
    return new Response(JSON.stringify({ error: 'Missing query parameter q' }), { status: 400 });
  }

  const list = await eightReturnsFetch<CustomerReturnListResponse>(
    `/v1/customer_returns?s=${encodeURIComponent(q)}&per_page=50&sort=updated_at&direction=desc`
  );

  // pick first item (most recent)
  const selected: CustomerReturn | undefined = list.customer_returns?.[0];
  if (!selected) {
    return new Response(JSON.stringify({ found: false, q }), { status: 404 });
  }

  return Response.json({ found: true, customer_return: selected });
}


