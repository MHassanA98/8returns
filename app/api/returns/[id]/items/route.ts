import { eightReturnsFetch } from '@/lib/8returns';
import type { PatchItemsRequest, PatchItemsResponseItem } from '@/lib/types';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  }

  const body = (await req.json()) as PatchItemsRequest | undefined;
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing items' }), { status: 400 });
  }

  const payload = { customer_return: { items: body.items } } as const;

  const result = await eightReturnsFetch<PatchItemsResponseItem[]>(
    `/v1/customer_returns/${encodeURIComponent(id)}/items`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  return Response.json(result);
}


