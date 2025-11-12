import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

/**
 * Expected JSON body (basic MVP):
 * {
 *   "trackId": "uuid",
 *   "date": "2025-11-12T10:38:00Z",
 *   "totalTimeMs": 123456,
 *   "bestLapMs": 56123,
 *   "laps": [{ "lapNumber": 1, "lapTimeMs": 136000 }, ...]
 * }
 */
export async function POST(req: Request) {
  try {
    const supabase = getServerSupabase();
    const body = await req.json();

    const { trackId, date, totalTimeMs, bestLapMs, laps } = body ?? {};
    if (!trackId || !date || !Array.isArray(laps)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // insert session
    const { data: session, error: sErr } = await supabase
      .from("sessions")
      .insert([{ trackId, date, totalTimeMs, bestLapMs }])
      .select()
      .single();

    if (sErr) throw sErr;

    // insert laps (if any)
    if (laps.length) {
      const rows = laps.map((l: any) => ({
        sessionId: session.id,
        lapNumber: l.lapNumber,
        lapTimeMs: l.lapTimeMs,
      }));
      const { error: lErr } = await supabase.from("laps").insert(rows);
      if (lErr) throw lErr;
    }

    return NextResponse.json({ ok: true, sessionId: session.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
