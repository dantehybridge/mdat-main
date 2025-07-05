export function userHasAuthorizationByRoles(rolesMEID: string[]): boolean {
  try {
    const allowedRoles: string[] = JSON.parse(import.meta.env.VITE_ROLES || "[]");

    if (!Array.isArray(allowedRoles)) return false;

    return rolesMEID.some((role) => allowedRoles.includes(role.toLowerCase()));
  } catch (error) {
    console.error("VITE_ROLES is not a valid JSON array.", error);
    return false;
  }
}
