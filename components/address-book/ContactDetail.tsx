"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { type Contact } from "@/lib/contacts-data";
import { Avatar, StatusBadge, CategoryBadge } from "./atoms";
import { Mail, Phone, MapPin, StickyNote, Star, Pencil, Trash2 } from "lucide-react";

interface Props {
  contact: Contact | null;
  onOpenChange: (o: boolean) => void;
  onEdit: (c: Contact) => void;
  onDelete: (c: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export function ContactDetail({ contact, onOpenChange, onEdit, onDelete, onToggleFavorite }: Props) {
  return (
    <Sheet open={!!contact} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {contact && (
          <>
            <SheetHeader>
              <SheetTitle className="sr-only">{contact.name}</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center pt-4 text-center">
                <Avatar contact={contact} size={84} />
                <h2 className="mt-3 flex items-center gap-1.5 text-xl font-semibold text-slate-900">
                  {contact.name}
                  {contact.favorite && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <CategoryBadge category={contact.category} />
                  <StatusBadge status={contact.status} />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <ActionBtn onClick={() => onToggleFavorite(contact.id)}>
                  <Star className={`h-4 w-4 ${contact.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
                  Favorite
                </ActionBtn>
                <ActionBtn onClick={() => onEdit(contact)}><Pencil className="h-4 w-4" /> Edit</ActionBtn>
                <ActionBtn danger onClick={() => onDelete(contact)}><Trash2 className="h-4 w-4" /> Delete</ActionBtn>
              </div>

              <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <Row icon={<Mail className="h-4 w-4" />} label="Email" value={contact.email} />
                <Row icon={<Phone className="h-4 w-4" />} label="Phone" value={contact.phone} />
                {contact.address && <Row icon={<MapPin className="h-4 w-4" />} label="Address" value={contact.address} />}
              </div>

              {contact.notes && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <StickyNote className="h-3.5 w-3.5" /> Notes
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{contact.notes}</p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</div>
        <div className="truncate text-sm text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function ActionBtn({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors ${
        danger
          ? "border-red-200 bg-white text-red-600 hover:bg-red-50"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
