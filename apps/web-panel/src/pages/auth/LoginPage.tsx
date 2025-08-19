import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      const token = res.data.access_token
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Falha ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        <div className="space-y-2">
          <label className="block text-sm">E-mail</label>
          <input className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Senha</label>
          <input className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
    </div>
  )
}

