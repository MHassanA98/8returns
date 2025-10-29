# Warehouse Returns Inspection Tool

Mobile-first (iPad-optimized) web app for warehouse workers to scan an order/return, view items, and mark each as inspected. Built with Next.js App Router, Tailwind, and React Query.

- API: 8returns REST API — see docs: https://docs.8returns.com/api-documentation/rest-api
- Auth header format required by 8returns: `Authorization: Bearer token="<password>", api_key="<api_key>"`

## Quickstart

1. Install deps

```bash
pnpm i # or npm i / yarn
```

2. Configure env

```bash
cp env.local.example .env.local
# Fill EIGHTRETURNS_API_KEY and EIGHTRETURNS_PASSWORD from the provided secret
```

3. Run the app

```bash
pnpm dev
```

Open `http://localhost:3000` — keep the scan field focused and scan an order number (e.g., R5982, R5935, R6029).

## How it works

- `/api/returns/search` → `GET /v1/customer_returns?s=<query>` and returns the most recent match.
- `/api/returns/[id]/items` → `PATCH /v1/customer_returns/:id/items` with `customer_return.items[]` to set `status: "inspected"`.
- The scan page shows items and enables per-item or bulk mark-inspected.

## Tech

- Next.js 14 App Router, TypeScript
- Tailwind CSS
- React Query for caching and optimistic updates

## Deployment

- Push to a public GitHub repo and deploy on Vercel.
- Add env vars in the Vercel project settings.

## Notes

- “Received” in UI maps to API `inspected`.
- Already inspected items are displayed as such and cannot be re-marked.

---

See `warehouse.plan.md` for the full implementation plan and phases.
