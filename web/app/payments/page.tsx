import Link from 'next/link';

export default function PaymentsPage() {
  return (
    <section>
      <h2>Payments</h2>
      <ul>
        <li><Link href="/transfer">Transferência Interna</Link></li>
        <li><Link href="/pix">PIX</Link></li>
        <li><Link href="/boletos">Boletos</Link></li>
      </ul>
    </section>
  );
}

