import { useEffect, useState } from 'react'
import axios from 'axios'

type Booking = {
  id: number
  room_number: string
  check_in: string
  check_out: string
  status: string
}

export function BookingsPage() {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
        setRows(res.data)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Reservas</h2>
        <button className="btn-primary">Nova reserva</button>
      </div>
      {loading ? 'Carregando...' : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Quarto</th>
                <th className="py-2 pr-4">Check-in</th>
                <th className="py-2 pr-4">Check-out</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t border-slate-800 hover:bg-slate-800/40">
                  <td className="py-2 pr-4">{r.id}</td>
                  <td className="py-2 pr-4">{r.room_number}</td>
                  <td className="py-2 pr-4">{r.check_in}</td>
                  <td className="py-2 pr-4">{r.check_out}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

