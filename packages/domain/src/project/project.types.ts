// Project domain types. Mirrors the `project` row in migration 0001.

export interface Project {
  projectId: string;
  ownerUserId: string;
  title: string;
  description: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
