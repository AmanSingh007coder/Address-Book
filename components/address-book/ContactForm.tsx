"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { type Contact, type Category, type Status } from "@/lib/contacts-data";
import { Camera } from "lucide-react";
import { initials, colorFor } from "./atoms";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: Contact | null;
  onSubmit: (c: Omit<Contact, "id"> | Contact) => void;
}

const empty: Omit<Contact, "id"> = {
  name: "",
  email: "",
  phone: "",
  address: "",
  category: "Work",
  status: "Active",
  notes: "",
  favorite: false,
};

export function ContactForm({ open, onOpenChange, initial, onSubmit }: Props) {
  const [data, setData] = useState<Omit<Contact, "id"> & { id?: string }>(empty);

  useEffect(() => {
    if (open) setData(initial ?? empty);
  }, [open, initial]);

  const update = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim()) return;
    onSubmit(data as Contact);
    onOpenChange(false);
  };

  const avatarColor = data.id ? colorFor(data.id) : "bg-slate-200 text-slate-600";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{initial ? "Edit contact" : "New contact"}</SheetTitle>
          <SheetDescription>
            {initial ? "Update the details for this contact." : "Add someone new to your address book."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={submit} className="mt-6 space-y-5 px-4 pb-6">
          <div className="flex items-center gap-4">
            <div className={`relative flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold ${avatarColor}`}>
              {initials(data.name || "?")}
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                aria-label="Upload avatar"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-xs text-slate-500">
              <p className="font-medium text-slate-700">Profile picture</p>
              <p>Avatar upload coming soon.</p>
            </div>
          </div>

          <Field label="Full name" required>
            <input value={data.name} onChange={(e) => update("name", e.target.value)} className={input} required />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" required>
              <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={input} required />
            </Field>
            <Field label="Phone">
              <input value={data.phone} onChange={(e) => update("phone", e.target.value)} className={input} />
            </Field>
          </div>

          <Field label="Address">
            <input value={data.address ?? ""} onChange={(e) => update("address", e.target.value)} className={input} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select value={data.category} onChange={(e) => update("category", e.target.value as Category)} className={input}>
                <option>Family</option><option>Work</option><option>Friends</option><option>Other</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={data.status} onChange={(e) => update("status", e.target.value as Status)} className={input}>
                <option>Active</option><option>Personal</option>
              </select>
            </Field>
          </div>

          <Field label="Notes">
            <textarea value={data.notes ?? ""} onChange={(e) => update("notes", e.target.value)} rows={3} className={`${input} resize-none`} />
          </Field>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={data.favorite} onChange={(e) => update("favorite", e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
            Mark as favorite
          </label>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={() => onOpenChange(false)} className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
              {initial ? "Save changes" : "Create contact"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

const input =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
