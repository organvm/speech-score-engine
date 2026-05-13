// User domain types. Mirrors the `app_user` row in migration 0001.
// `account_plan` is TEXT in SQL with no enum constraint; modeled as `string`
// here until the plan taxonomy stabilizes.

export interface User {
  userId: string;
  email: string;
  displayName: string;
  accountPlan: string;
  createdAt: string;
  lastActiveAt: string | null;
}
