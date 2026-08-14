import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SESSION_COOKIE, expectedSessionValue } from "@/lib/auth";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  return !!cookie && cookie === expectedSessionValue();
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const json = JSON.stringify(body, null, 2) + "\n";

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "username/repo"
  const branch = process.env.GITHUB_BRANCH || "main";

  // Production path: commit straight to GitHub so Vercel auto-redeploys.
  if (token && repo) {
    try {
      const apiUrl = `https://api.github.com/repos/${repo}/contents/data/content.json`;

      const currentRes = await fetch(`${apiUrl}?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      });

      if (!currentRes.ok) {
        const detail = await currentRes.text();
        return NextResponse.json(
          { ok: false, error: `Gagal membaca file di GitHub: ${detail}` },
          { status: 500 }
        );
      }
      const current = await currentRes.json();

      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "chore: update pricelist content via admin panel",
          content: Buffer.from(json, "utf-8").toString("base64"),
          sha: current.sha,
          branch,
        }),
      });

      if (!putRes.ok) {
        const detail = await putRes.text();
        return NextResponse.json(
          { ok: false, error: `Gagal menyimpan ke GitHub: ${detail}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "github",
        note: "Perubahan sudah di-commit. Vercel akan redeploy otomatis (±1-2 menit).",
      });
    } catch (err) {
      return NextResponse.json(
        { ok: false, error: `Error saat menghubungi GitHub: ${String(err)}` },
        { status: 500 }
      );
    }
  }

  // Local dev fallback: no GITHUB_TOKEN configured, write straight to disk.
  try {
    fs.writeFileSync(CONTENT_PATH, json, "utf-8");
    return NextResponse.json({
      ok: true,
      mode: "local",
      note: "Disimpan ke file lokal (mode dev). Set GITHUB_TOKEN & GITHUB_REPO di production untuk commit otomatis.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Gagal menulis file lokal: ${String(err)}` },
      { status: 500 }
    );
  }
}
