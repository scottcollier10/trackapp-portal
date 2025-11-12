type Session = { id: string; date: string; trackId: string; bestLapMs: number | null };

export function SessionList({ sessions }: { sessions: Session[] }) {
  return (
    <ul className="divide-y rounded-lg bg-white shadow">
      {sessions.map(s => (
        <li key={s.id} className="p-3 text-sm">
          <span className="font-medium">{new Date(s.date).toLocaleString()}</span>
          <span className="ml-2 text-neutral-500">trackId: {s.trackId}</span>
          <span className="ml-2 text-neutral-500">best: {s.bestLapMs ?? '—'} ms</span>
        </li>
      ))}
    </ul>
  );
}
