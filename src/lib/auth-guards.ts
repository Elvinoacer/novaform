import { auth } from "@/auth";

/**
 * Returns the authenticated admin user, or null.
 * Use inside server routes / server actions to gate admin-only mutations.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) return null;
  return session.user;
}
