'use client';
import React, { useState } from 'react';

export default function LedgerPosting() {
  const [debit, setDebit] = useState('');
  const [credit, setCredit] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [currency, setCurrency] = useState('BRL');
  const [reference, setReference] = useState('');
  const [resp, setResp] = useState<string>('');

  const submit = async () => {
    setResp('');
    const r = await fetch('/api/bff/ledger/postings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ debit_account_id: debit, credit_account_id: credit, amount, currency, reference_id: reference })
    });
    setResp(await r.text());
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Ledger Posting</h2>
      <label>Conta Débito</label>
      <input value={debit} onChange={e => setDebit(e.target.value)} />
      <label>Conta Crédito</label>
      <input value={credit} onChange={e => setCredit(e.target.value)} />
      <label>Valor</label>
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <label>Moeda</label>
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="BRL">BRL</option>
      </select>
      <label>Referência</label>
      <input value={reference} onChange={e => setReference(e.target.value)} />
      <div style={{ marginTop: 12 }}>
        <button onClick={submit}>Enviar</button>
      </div>
      {resp && <pre>{resp}</pre>}
    </main>
  );
}

