export function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="card">Ocupação hoje: 72%</div>
      <div className="card">Check-ins pendentes: 5</div>
      <div className="card">Receita do dia: R$ 8.450,00</div>
      <div className="card md:col-span-2">Gráfico de reservas (placeholder)</div>
      <div className="card">Alertas recentes (placeholder)</div>
    </div>
  )
}

