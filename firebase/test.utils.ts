import {
    collection,
    doc,
    GeoPoint,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./config";

/** Fixed doc ID used only by the `deleteEvent` test (does not depend on `createEvent`). */
export const EXERCISE_DELETE_TEST_EVENT_ID = "exercise-delete-test-event";

/**
 * Find the first `events` document whose `name` matches (seed uses unique names).
 */
export async function getEventIdByName(name: string): Promise<string | null> {
    const q = query(collection(db, "events"), where("name", "==", name));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].id;
}

/**
 * Ensure a document exists for delete tests. Safe to call before each delete test run.
 */
export async function seedDeleteTestEventDoc(): Promise<void> {
    await setDoc(doc(db, "events", EXERCISE_DELETE_TEST_EVENT_ID), {
        name: "Exercise Delete Test Event",
        description: "Temporary row for delete exercise tests",
        eventType: "General Meeting",
        tags: ["test"],
        startTime: Timestamp.now(),
        endTime: Timestamp.fromMillis(Date.now() + 3600000),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 0,
        signOutPoints: null,
        pointsPerHour: null,
        locationName: "Test",
        geolocation: new GeoPoint(30.6, -96.34),
        geofencingRadius: 50,
        committee: null,
        general: true,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: false,
        hiddenEvent: false,
        creator: null,
    });
}

/** Restore a field on an event (used by tests to undo updates even if exercise code is incomplete). */
export async function restoreEventName(eventId: string, name: string): Promise<void> {
    await updateDoc(doc(db, "events", eventId), { name });
}

export async function eventExists(eventId: string): Promise<boolean> {
    const snap = await getDoc(doc(db, "events", eventId));
    return snap.exists();
}
