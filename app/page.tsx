"use client";

import { useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import { Users, Loader2 } from "lucide-react";
import { Sidebar, type Filter } from "@/components/address-book/Sidebar";
import { Header } from "@/components/address-book/Header";
import { ContactTable, ContactGrid } from "@/components/address-book/ContactViews";
import { ContactForm } from "@/components/address-book/ContactForm";
import { ContactDetail } from "@/components/address-book/ContactDetail";
import { DeleteDialog } from "@/components/address-book/DeleteDialog";
import { useContacts } from "@/hooks/use-contacts";
import { type Contact } from "@/lib/contacts-data";

export default function Home() {
  const { contacts, loading, error, create, update, remove, toggleFavorite } = useContacts();
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [viewing, setViewing] = useState<Contact | null>(null);
  const [deleting, setDeleting] = useState<Contact | null>(null);

  const counts = useMemo(
    () => ({
      all: contacts.length,
      favorites: contacts.filter((c) => c.favorite).length,
      Family: contacts.filter((c) => c.category === "Family").length,
      Work: contacts.filter((c) => c.category === "Work").length,
      Friends: contacts.filter((c) => c.category === "Friends").length,
    }),
    [contacts],
  );

  const filtered = useMemo(() => {
    let list = contacts;
    if (filter.kind === "favorites") list = list.filter((c) => c.favorite);
    if (filter.kind === "category") list = list.filter((c) => c.category === filter.value);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q),
      );
    }
    return list;
  }, [contacts, filter, search]);

  const title =
    filter.kind === "all"
      ? "All Contacts"
      : filter.kind === "favorites"
      ? "Favorites"
      : filter.value;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (c: Contact) => {
    setViewing(null);
    setEditing(c);
    setFormOpen(true);
  };
  const openDelete = (c: Contact) => {
    setViewing(null);
    setDeleting(c);
  };

  const handleSubmit = async (data: Omit<Contact, "id"> | Contact) => {
    try {
      if ("id" in data && data.id) {
        await update(data.id, data);
        toast.success("Contact updated");
      } else {
        await create(data as Omit<Contact, "id">);
        toast.success("Contact created");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (deleting) {
      try {
        await remove(deleting.id);
        toast.success(`${deleting.name} deleted`);
        setDeleting(null);
      } catch {
        toast.error("Failed to delete contact");
      }
    }
  };

  // Show error toast once
  if (error) {
    toast.error(error);
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar
        filter={filter}
        onChange={setFilter}
        counts={counts}
        mobileOpen={menuOpen}
        onMobileClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          search={search}
          onSearch={setSearch}
          onCreate={openCreate}
          onMenu={() => setMenuOpen(true)}
          view={view}
          onView={setView}
        />

        <main className="flex-1 px-4 py-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">
                  {filtered.length} {filtered.length === 1 ? "contact" : "contacts"}
                  {search && ` matching "${search}"`}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                <p className="mt-4 text-sm text-slate-500">Loading contacts…</p>
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState onCreate={openCreate} hasSearch={!!search} />
            ) : view === "table" ? (
              <ContactTable
                contacts={filtered}
                onEdit={openEdit}
                onDelete={openDelete}
                onView={setViewing}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <ContactGrid
                contacts={filtered}
                onEdit={openEdit}
                onDelete={openDelete}
                onView={setViewing}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </main>
      </div>

      <ContactForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />
      <ContactDetail
        contact={viewing}
        onOpenChange={(o) => !o && setViewing(null)}
        onEdit={openEdit}
        onDelete={openDelete}
        onToggleFavorite={toggleFavorite}
      />
      <DeleteDialog
        contact={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}

function EmptyState({ onCreate, hasSearch }: { onCreate: () => void; hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Users className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {hasSearch ? "No matches found" : "No contacts here yet"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {hasSearch
          ? "Try a different search term, or clear filters to see everyone."
          : "Add your first contact to get started building your address book."}
      </p>
      {!hasSearch && (
        <button
          onClick={onCreate}
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
        >
          New contact
        </button>
      )}
    </div>
  );
}
