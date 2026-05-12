

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// GET /api/contacts — fetch all contacts
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map DB columns to frontend shape
    const contacts = (data ?? []).map((row) => ({
      id: row.id,
      name: row.full_name,
      email: row.email,
      phone: row.phone ?? "",
      address: row.address ?? undefined,
      category: row.category ?? "Work",
      status: row.status ?? "Active",
      notes: row.notes ?? undefined,
      favorite: row.favorite ?? false,
      avatarUrl: row.avatar_url ?? undefined,
    }));

    return NextResponse.json(contacts);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/contacts — create a new contact
export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from("contacts")
      .insert({
        full_name: body.name,
        email: body.email,
        phone: body.phone ?? "",
        address: body.address || null,
        category: body.category ?? "Work",
        status: body.status ?? "Active",
        notes: body.notes || null,
        favorite: body.favorite ?? false,
        avatar_url: body.avatarUrl || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map back to frontend shape
    const contact = {
      id: data.id,
      name: data.full_name,
      email: data.email,
      phone: data.phone ?? "",
      address: data.address ?? undefined,
      category: data.category ?? "Work",
      status: data.status ?? "Active",
      notes: data.notes ?? undefined,
      favorite: data.favorite ?? false,
      avatarUrl: data.avatar_url ?? undefined,
    };

    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
