"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Pencil, Trash2, Mail, Phone, Eye } from "lucide-react";
import { type Contact } from "@/lib/contacts-data";
import { Avatar, StatusBadge, CategoryBadge } from "./atoms";

interface Props {
  contacts: Contact[];
  onEdit: (c: Contact) => void;
  onDelete: (c: Contact) => void;
  onView: (c: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export function ContactTable({ contacts, onEdit, onDelete, onView, onToggleFavorite }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Group</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {contacts.map((c, i) => (
                <motion.tr
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i * 0.02, 0.2) } }}
                  exit={{ opacity: 0, y: -6 }}
                  className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3">
                    <button onClick={() => onView(c)} className="flex items-center gap-3 text-left">
                      <Avatar contact={c} />
                      <div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-900">
                          {c.name}
                          {c.favorite && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                        </div>
                        {c.address && <div className="text-xs text-slate-500">{c.address}</div>}
                      </div>
                    </button>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{c.email}</td>
                  <td className="px-5 py-3 tabular-nums text-slate-600">{c.phone}</td>
                  <td className="px-5 py-3"><CategoryBadge category={c.category} /></td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                      <IconBtn label="Favorite" onClick={() => onToggleFavorite(c.id)}>
                        <Star className={`h-4 w-4 ${c.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
                      </IconBtn>
                      <IconBtn label="View" onClick={() => onView(c)}><Eye className="h-4 w-4" /></IconBtn>
                      <IconBtn label="Edit" onClick={() => onEdit(c)}><Pencil className="h-4 w-4" /></IconBtn>
                      <IconBtn label="Delete" danger onClick={() => onDelete(c)}><Trash2 className="h-4 w-4" /></IconBtn>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ContactGrid({ contacts, onEdit, onDelete, onView, onToggleFavorite }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence initial={false}>
        {contacts.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i * 0.03, 0.25) } }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <Avatar contact={c} size={48} />
              <div className="min-w-0 flex-1">
                <button onClick={() => onView(c)} className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold text-slate-900">{c.name}</span>
                    {c.favorite && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <CategoryBadge category={c.category} />
                    <StatusBadge status={c.status} />
                  </div>
                </button>
              </div>
              <button
                onClick={() => onToggleFavorite(c.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-amber-500"
                aria-label="Favorite"
              >
                <Star className={`h-4 w-4 ${c.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
              </button>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /><span className="truncate">{c.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /><span className="tabular-nums">{c.phone}</span></div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1 border-t border-slate-100 pt-3">
              <IconBtn label="View" onClick={() => onView(c)}><Eye className="h-4 w-4" /></IconBtn>
              <IconBtn label="Edit" onClick={() => onEdit(c)}><Pencil className="h-4 w-4" /></IconBtn>
              <IconBtn label="Delete" danger onClick={() => onDelete(c)}><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 ${
        danger ? "hover:bg-red-50 hover:text-red-600" : "hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}
