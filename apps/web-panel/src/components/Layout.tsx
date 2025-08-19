import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/bookings', label: 'Reservas' },
  { to: '/payments', label: 'Pagamentos' },
  { to: '/notifications', label: 'Notificações' },
  { to: '/rooms', label: 'Quartos' },
  { to: '/rates', label: 'Tarifas' },
  { to: '/guests', label: 'Hóspedes' },
  { to: '/checkin-out', label: 'Check-in/Check-out' },
  { to: '/smart-locks', label: 'Fechaduras' },
  { to: '/settings', label: 'Configurações' }
]

export function Layout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  return (
    <div className="min-h-screen grid" style={{ gridTemplateColumns: open ? '260px 1fr' : '72px 1fr' }}>
      <aside className="bg-slate-950/70 backdrop-blur border-r border-slate-800 p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-8">
          <button className="btn-secondary px-2 py-1" onClick={() => setOpen(!open)}>{open ? '←' : '→'}</button>
          <Link to="/" className="text-xl font-semibold">Hotel</Link>
        </div>
        <nav className="space-y-1">
          {nav.map(i => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60'}`}>{open ? i.label : i.label[0]}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Painel de Controle</h1>
          <div className="flex items-center gap-3">
            <button className="btn-secondary" onClick={() => navigate('/login')}>Sair</button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}

