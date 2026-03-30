import type { CreateEventInput, EventDocument } from "./exercise.types";
import { db  } from "./config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

function notImplemented(name: string): never {
    throw new Error(`Not implemented: ${name}`);
}

/**
 * List all documents in the `events` collection.
 * Hint: import `db` from `./config`, then use `collection`, `getDocs`.
 */
export async function listEvents(): Promise<EventDocument[]> {
    notImplemented("listEvents");
}

/**
 * Fetch a single event by document ID.
 * Hint: `doc`, `getDoc`, check `snapshot.exists()`.
 */
export async function getEventById(_eventId: string): Promise<EventDocument | null> {
    notImplemented("getEventById");
}

/**
 * Create a new event document. Return the new document ID.
 * Hint: `addDoc` or `doc` + `setDoc`.
 */
export async function createEvent(_input: CreateEventInput): Promise<string> {
    notImplemented("createEvent");
}

/**
 * Update only the `name` field on an existing event.
 * Hint: `updateDoc`.
 */
export async function updateEventName(_eventId: string, _name: string): Promise<void> {
    notImplemented("updateEventName");
}

/**
 * Delete an event document by ID.
 * Hint: `deleteDoc`.
 */
export async function deleteEvent(_eventId: string): Promise<void> {
    notImplemented("deleteEvent");
}
