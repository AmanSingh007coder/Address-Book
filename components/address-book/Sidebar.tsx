"use client";

import { Users, Star, Heart, Briefcase, UserRound, BookUser, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Filter =
  | { kind: "all" }
  | { kind: "favorites" }
  | { kind: "category"; value: "Family" | "Work" | "Friends" };

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  counts: { all: number; favorites: number; Family: number; Work: number; Friends: number };
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItem =
  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";

export function Sidebar({ filter, onChange, counts, mobileOpen, onMobileClose }: Props) {
  const isActive = (f: Filter) =>
    f.kind === filter.kind &&
    (f.kind !== "category" || (filter.kind === "category" && f.value === filter.value));

  const Item = ({
    f,
    icon: Icon,
    label,
    count,
  }: {
    f: Filter;
    icon: typeof Users;
    label: string;
    count: number;
  }) => (
    <button
      onClick={() => {
        onChange(f);
        onMobileClose();
      }}
      className={cn(
        navItem,
        isActive(f)
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span
        className={cn(
          "text-xs tabular-nums px-1.5 py-0.5 rounded-md",
          isActive(f) ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500",
        )}
      >
        {count}
      </span>
    </button>
  );

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
          <BookUser className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-900">Rolodex</div>
          <div className="text-xs text-slate-500">Address Book</div>
        </div>
        <button
          onClick={onMobileClose}
          className="ml-auto rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 px-3">
        <div className="space-y-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Contacts
          </p>
          <Item f={{ kind: "all" }} icon={Users} label="All Contacts" count={counts.all} />
          <Item f={{ kind: "favorites" }} icon={Star} label="Favorites" count={counts.favorites} />
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Groups
          </p>
          <Item f={{ kind: "category", value: "Family" }} icon={Heart} label="Family" count={counts.Family} />
          <Item f={{ kind: "category", value: "Work" }} icon={Briefcase} label="Work" count={counts.Work} />
          <Item f={{ kind: "category", value: "Friends" }} icon={UserRound} label="Friends" count={counts.Friends} />
        </div>
      </nav>

      <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-700">Pro tip</p>
        <p className="mt-1 text-xs text-slate-500">
          Press <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 text-[10px] font-mono">⌘K</kbd> to search instantly.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        {content}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={onMobileClose} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl animate-in slide-in-from-left">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
