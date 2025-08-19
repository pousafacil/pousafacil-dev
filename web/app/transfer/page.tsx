'use client';
import React, { useState } from 'react';

export default function Transfer() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [currency, setCurrency] = useState('BRL');
  const [resp, setResp] = useState<string>('');

  const submit = async () => {
    setResp('');
    const r = await fetch('/api/bff/payments/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from_account_id: from, to_account_id: to, amount, currency })
    });
    setResp(await r.text());
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Transferência Interna</h2>
      <label>Conta origem</label>
      <input value={from} onChange={e => setFrom(e.target.value)} />
      <label>Conta destino</label>
      <input value={to} onChange={e => setTo(e.target.value)} />
      <label>Valor</label>
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <label>Moeda</label>
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="BRL">BRL</option>
      </select>
      <div style={{ marginTop: 12 }}>
        <button onClick={submit}>Enviar</button>
      </div>
      {resp && <pre>{resp}</pre>}
    </main>
  );
}

