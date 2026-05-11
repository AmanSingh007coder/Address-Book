"use client";

import { type Contact } from "@/lib/contacts-data";

const palette = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-teal-100 text-teal-700",
];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function colorFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

export function Avatar({ contact, size = 40 }: { contact: Contact; size?: number }) {
  const cls = colorFor(contact.id);
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${cls}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials(contact.name)}
    </div>
  );
}

export function StatusBadge({ status }: { status: Contact["status"] }) {
  const cls =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
      : "bg-slate-100 text-slate-700 ring-slate-500/20";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}

export function CategoryBadge({ category }: { category: Contact["category"] }) {
  const map: Record<string, string> = {
    Family: "bg-rose-50 text-rose-700 ring-rose-600/20",
    Work: "bg-sky-50 text-sky-700 ring-sky-600/20",
    Friends: "bg-violet-50 text-violet-700 ring-violet-600/20",
    Other: "bg-slate-50 text-slate-700 ring-slate-500/20",
  };
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[category]}`}>
      {category}
    </span>
  );
}
