'use client';
import React, { useState } from 'react';

export default function Pix() {
  const [source, setSource] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [resp, setResp] = useState<string>('');
  const submit = async () => {
    setResp('');
    const r = await fetch('/api/bff/pix/payments', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_account_id: source, pix_key: pixKey, amount })
    });
    setResp(await r.text());
  };
  return (
    <main style={{ padding: 24 }}>
      <h2>PIX Pagamento</h2>
      <label>Conta origem</label>
      <input value={source} onChange={e => setSource(e.target.value)} />
      <label>Chave PIX</label>
      <input value={pixKey} onChange={e => setPixKey(e.target.value)} />
      <label>Valor</label>
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <div style={{ marginTop: 12 }}>
        <button onClick={submit}>Enviar</button>
      </div>
      {resp && <pre>{resp}</pre>}
    </main>
  );
}

