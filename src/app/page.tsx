import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default async function Dashboard() {
  const { data: tracks } = await supabase.from('tracks').select('*');
  const { data: sessions } = await supabase
    .from('sessions')
    .select('id,date,trackId,totalTimeMs,bestLapMs')
    .order('date', { ascending: false })
    .limit(5);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">TrackApp Portal</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="text-sm text-neutral-500">Tracks</div>
          <div className="text-2xl font-bold">{tracks?.length ?? 0}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="text-sm text-neutral-500">Recent Sessions</div>
          <div className="text-2xl font-bold">{sessions?.length ?? 0}</div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Latest Sessions</h2>
          <Link href="/sessions" className="text-blue-600 hover:underline">View all</Link>
        </div>
        <ul className="divide-y">
          {(sessions ?? []).map((s) => (
            <li key={s.id} className="py-2 text-sm">
              <span className="font-medium">{new Date(s.date).toLocaleString()}</span>
              <span className="ml-2 text-neutral-500">trackId: {s.trackId}</span>
              <span className="ml-2 text-neutral-500">best: {s.bestLapMs ?? '—'} ms</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
