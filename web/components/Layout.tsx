import Link from 'next/link';
import React from 'react';

const navItems: { label: string; href: string; group: string }[] = [
  { label: 'Dashboard', href: '/dashboard', group: 'Geral' },
  { label: 'Customers', href: '/customers', group: 'Geral' },
  { label: 'Onboarding', href: '/onboarding', group: 'Geral' },
  { label: 'Accounts', href: '/accounts', group: 'Financeiro' },
  { label: 'Statements', href: '/statements', group: 'Financeiro' },
  { label: 'Payments', href: '/payments', group: 'Financeiro' },
  { label: 'PIX Pagamentos', href: '/pix', group: 'PIX' },
  { label: 'PIX Chaves', href: '/pix/keys', group: 'PIX' },
  { label: 'PIX Cobranças', href: '/pix/cobrancas', group: 'PIX' },
  { label: 'Boletos', href: '/boletos', group: 'Cobrança' },
  { label: 'Cards', href: '/cards', group: 'Cartões' },
  { label: 'Invoices', href: '/billing/invoices', group: 'Billing' },
  { label: 'Treasury', href: '/treasury', group: 'Operações' },
  { label: 'Risk & Compliance', href: '/risk', group: 'Risco' },
  { label: 'Notifications', href: '/notifications', group: 'Comms' },
  { label: 'Pricing & Fees', href: '/pricing', group: 'Produto' },
  { label: 'Analytics & Reports', href: '/analytics', group: 'Dados' },
  { label: 'Payroll (PJ)', href: '/payroll', group: 'PJ' },
  { label: 'Admin Console', href: '/admin', group: 'Admin' },
  { label: 'Settings', href: '/settings', group: 'Admin' },
  { label: 'Themes', href: '/themes', group: 'Admin' },
  { label: 'Ledger Posting', href: '/ledger', group: 'Dev' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const groups = Array.from(new Set(navItems.map(n => n.group)));
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 260, borderRight: '1px solid #eee', padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>AppBank</div>
        {groups.map(g => (
          <div key={g} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', margin: '12px 0 6px' }}>{g}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navItems.filter(n => n.group === g).map(n => (
                <li key={n.href} style={{ margin: '6px 0' }}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 56, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <div>
            <Link href="/">Início</Link>
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>Tenant: {process.env.DEFAULT_TENANT_ID}</div>
        </header>
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}

