import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const idempotencyKey = crypto.randomUUID();
  const tenant = process.env.DEFAULT_TENANT_ID!;
  const base = process.env.BACKEND_LEDGER_URL!;
  const r = await fetch(`${base}/v1/ledger/postings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
      'X-Tenant-Id': tenant
    },
    body: JSON.stringify(body)
  });
  const text = await r.text();
  return new NextResponse(text, { status: r.status });
}

