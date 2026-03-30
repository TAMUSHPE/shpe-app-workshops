/**
 * Reference implementation for [`exercise.ts`](./exercise.ts).
 * Compare after your own attempt; do not import this file from the exercise tests.
 */
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import type { CreateEventInput, EventDocument, UserDocument } from "./exercise.types";

export async function listEvents(): Promise<EventDocument[]> {
    const snap = await getDocs(collection(db, "events"));
    return snap.docs.map((d) => d.data() as EventDocument);
}

export async function getEventById(eventId: string): Promise<EventDocument | null> {
    const snap = await getDoc(doc(db, "events", eventId));
    if (!snap.exists()) return null;
    return snap.data() as EventDocument;
}

export async function createEvent(input: CreateEventInput): Promise<string> {
    const ref = await addDoc(collection(db, "events"), input);
    return ref.id;
}

export async function updateEventName(eventId: string, name: string): Promise<void> {
    await updateDoc(doc(db, "events", eventId), { name });
}

export async function deleteEvent(eventId: string): Promise<void> {
    await deleteDoc(doc(db, "events", eventId));
}

function userLabel(user: UserDocument | undefined, fallbackUid: string): string {
    if (!user) return fallbackUid;
    return user.displayName || user.name || fallbackUid;
}

/**
 * Challenge: for each event, print the event name and the creator’s profile.
 * Loads `events` and `users` once each, then joins in memory (fewer round-trips than per-event `getDoc`).
 */
export async function printEventCreators(): Promise<void> {
    const [eventsSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, "events")),
        getDocs(collection(db, "users")),
    ]);

    const usersByUid = new Map<string, UserDocument>();
    for (const u of usersSnap.docs) {
        usersByUid.set(u.id, u.data() as UserDocument);
    }

    for (const eventRef of eventsSnap.docs) {
        const event = eventRef.data() as EventDocument;
        const title = event.name;
        const creatorUid = event.creator;
        if (!creatorUid) {
            console.log(`Event: "${title}" — no creator set`);
            continue;
        }
        const profile = usersByUid.get(creatorUid);
        if (!profile) {
            console.log(`Event: "${title}" — creator uid ${creatorUid} (no user document)`);
            continue;
        }
        console.log(`Event: "${title}" — created by ${userLabel(profile, creatorUid)} <${creatorUid}>`);
    }
}
