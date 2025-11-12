import { getServerSupabase } from "@/lib/supabase/server";

type Track = { id: string; name: string; location: string | null };

export default async function HomePage() {
  const supabase = getServerSupabase();
  const { data: tracks, error } = await supabase.from("tracks").select("id,name,location").order("name");

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>TrackApp Portal</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>Connected to Supabase • Server-rendered</p>

      {error && (
        <div style={{ padding: 12, background: "#fee", border: "1px solid #f88", borderRadius: 8 }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Tracks</h2>
        {!tracks?.length && <p>No tracks found.</p>}
        <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0 }}>
          {tracks?.map((t: Track) => (
            <li key={t.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
              <div style={{ fontWeight: 600 }}>{t.name}</div>
              <div style={{ color: "#666" }}>{t.location ?? "—"}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
