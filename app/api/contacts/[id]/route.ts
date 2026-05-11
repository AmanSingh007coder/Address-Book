import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/contacts/[id] — update a contact
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabase();
    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.full_name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) updateData.address = body.address || null;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes || null;
    if (body.favorite !== undefined) updateData.favorite = body.favorite;
    if (body.avatarUrl !== undefined) updateData.avatar_url = body.avatarUrl || null;

    const { data, error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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

    return NextResponse.json(contact);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/contacts/[id] — toggle favorite
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabase();
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("contacts")
      .update({ favorite: body.favorite })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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

    return NextResponse.json(contact);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/contacts/[id] — delete a contact
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabase();
    const { id } = await params;

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
