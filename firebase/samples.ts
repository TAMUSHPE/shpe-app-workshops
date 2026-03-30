/**
 * Basic Firestore examples for workshops — **not** part of the `events` exercise.
 * Works best with emulators + seed (`npm run seed`) so committees/users exist.
 */
import { db } from "./config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    Timestamp,
    where,
} from "firebase/firestore";

/** Read one document by path: `committees/{committeeId}` (seed ids: `technology`, etc.). */
export async function sampleGetCommittee(committeeId: string) {
    const snap = await getDoc(doc(db, "committees", committeeId));
    return snap.exists() ? snap.data() : null;
}

/** Read every document in `committees` (small collection in the seed). */
export async function sampleListAllCommittees() {
    const snap = await getDocs(collection(db, "committees"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Read up to `max` users whose `major` field matches (e.g. `"CSCE"`, `"MEEN"`). */
export async function sampleUsersByMajor(major: string, max = 10) {
    const q = query(collection(db, "users"), where("major", "==", major), limit(max));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
        uid: d.id,
        displayName: d.data().displayName as string | undefined,
    }));
}

/** Read `users/{uid}/private/privateInfo` for the first user in the collection. */
export async function sampleFirstUserPrivateInfo() {
    const q = query(collection(db, "users"), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const uid = snap.docs[0].id;
    const privSnap = await getDoc(doc(db, "users", uid, "private", "privateInfo"));
    return privSnap.exists() ? { uid, ...privSnap.data() } : { uid, privateInfo: null };
}

/** Write (or merge) a simple doc under `_workshop_samples/{key}` for practice writes. */
export async function sampleSaveScratchNote(key: string, message: string) {
    await setDoc(
        doc(db, "_workshop_samples", key),
        {
            message,
            updatedAt: Timestamp.now(),
        },
        { merge: true },
    );
}
