import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function SessionsPage() {
  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('id,date,trackId,totalTimeMs,bestLapMs')
    .order('date', { ascending: false })
    .limit(50);

  if (error) return <pre className="text-red-600">{error.message}</pre>;

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Sessions</h1>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-100 text-left">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">TrackId</th>
              <th className="p-3">Total</th>
              <th className="p-3">Best Lap</th>
            </tr>
          </thead>
          <tbody>
            {(sessions ?? []).map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{new Date(s.date).toLocaleString()}</td>
                <td className="p-3">{s.trackId}</td>
                <td className="p-3">{s.totalTimeMs ?? '—'}</td>
                <td className="p-3">{s.bestLapMs ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
