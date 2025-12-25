/**
 * Firebase placeholders (Auth + Firestore stubs).
 * Replace with real Firebase SDK config later.
 */

export type FirebaseUser = {
  uid: string;
  email?: string;
  displayName?: string;
};

export const firebaseApp = null as any;
export const auth = null as any;
export const db = null as any;

export async function signInPlaceholder(): Promise<FirebaseUser> {
  // TODO: Replace with Firebase Auth
  return { uid: "placeholder-user" };
}

export async function signOutPlaceholder(): Promise<void> {
  // TODO: Replace with Firebase Auth
}

export async function addDocPlaceholder(collectionPath: string, data: any): Promise<{ id: string }> {
  // TODO: Replace with Firestore addDoc
  return { id: `placeholder_${collectionPath}_${Date.now()}` };
}

export async function getDocsPlaceholder(collectionPath: string): Promise<any[]> {
  // TODO: Replace with Firestore getDocs
  return [];
}
