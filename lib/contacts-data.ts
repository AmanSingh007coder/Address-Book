export type Category = "Family" | "Work" | "Friends" | "Other";
export type Status = "Active" | "Personal";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  category: Category;
  status: Status;
  notes?: string;
  favorite: boolean;
  avatarUrl?: string;
}
