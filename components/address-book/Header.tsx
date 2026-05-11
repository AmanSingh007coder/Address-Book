"use client";

import { Search, Plus, Menu, LayoutGrid, List } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  search: string;
  onSearch: (s: string) => void;
  onCreate: () => void;
  onMenu: () => void;
  view: "table" | "grid";
  onView: (v: "table" | "grid") => void;
}

export function Header({ search, onSearch, onCreate, onMenu, view, onView }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={ref}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search contacts, emails, phones…"
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center rounded-lg border border-slate-200 bg-white p-0.5 sm:flex">
          <button
            onClick={() => onView("table")}
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              view === "table" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
            }`}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onView("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              view === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onCreate}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Contact</span>
        </button>
      </div>
    </header>
  );
}
