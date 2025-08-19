import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>AppBank</h1>
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/transfer">Transferência Interna</Link></li>
        <li><Link href="/pix">PIX Pagamento</Link></li>
        <li><Link href="/ledger">Ledger Posting</Link></li>
      </ul>
    </main>
  );
}

