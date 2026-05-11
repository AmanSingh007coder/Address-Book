"use client";

import { useState, useEffect, useCallback } from "react";
import { type Contact } from "@/lib/contacts-data";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all contacts on mount
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Create a new contact
  const create = async (c: Omit<Contact, "id">) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      if (!res.ok) throw new Error("Failed to create contact");
      const newContact = await res.json();
      setContacts((prev) => [newContact, ...prev]);
      return newContact;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    }
  };

  // Update an existing contact
  const update = async (id: string, patch: Partial<Contact>) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Failed to update contact");
      const updated = await res.json();
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    }
  };

  // Delete a contact
  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    }
  };

  // Toggle favorite
  const toggleFavorite = async (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    if (!contact) return;

    // Optimistic update
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !contact.favorite }),
      });
      if (!res.ok) {
        // Revert on failure
        setContacts((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, favorite: contact.favorite } : c
          )
        );
        throw new Error("Failed to toggle favorite");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return { contacts, loading, error, create, update, remove, toggleFavorite };
}
