import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { doc, getDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { db } from "./config";
import {
    createEvent,
    deleteEvent,
    getEventById,
    listEvents,
    updateEventName,
} from "./exercise";
import type { CreateEventInput } from "./exercise.types";
import {
    EXERCISE_DELETE_TEST_EVENT_ID,
    eventExists,
    getEventIdByName,
    restoreEventName,
    seedDeleteTestEventDoc,
} from "./test.utils";

describe("listEvents", () => {
    it("returns all seeded events including Spring General Meeting", async () => {
        const events = await listEvents();
        expect(events.length).toBeGreaterThanOrEqual(6);
        const names = events.map((e) => e.name);
        expect(names).toContain("Spring General Meeting");
    });
});

describe("getEventById", () => {
    it("returns the Resume Workshop document when given its ID", async () => {
        const id = await getEventIdByName("Resume Workshop");
        expect(id).toBeTruthy();
        const event = await getEventById(id!);
        expect(event).not.toBeNull();
        expect(event!.name).toBe("Resume Workshop");
        expect(event!.eventType).toBe("Workshop");
    });
});

describe("createEvent", () => {
    it("creates a document and returns a new ID", async () => {
        const unique = `Exercise Created Event ${Date.now()}`;
        const input: CreateEventInput = {
            name: unique,
            description: "Created by exercise test",
            eventType: "General Meeting",
            tags: ["exercise"],
            startTime: Timestamp.now(),
            endTime: Timestamp.fromMillis(Date.now() + 7200000),
            startTimeBuffer: null,
            endTimeBuffer: null,
            signInPoints: 1,
            signOutPoints: null,
            pointsPerHour: null,
            locationName: "Test Venue",
            geolocation: new GeoPoint(30.62, -96.34),
            geofencingRadius: 100,
            committee: null,
            general: true,
            coverImageURI: null,
            workshopType: "None",
            nationalConventionEligible: false,
            notificationSent: false,
            hiddenEvent: false,
            creator: null,
        };
        const newId = await createEvent(input);
        expect(typeof newId).toBe("string");
        expect(newId.length).toBeGreaterThan(0);
        const snap = await getDoc(doc(db, "events", newId));
        expect(snap.exists()).toBe(true);
        expect(snap.data()?.name).toBe(unique);
    });
});

describe("updateEventName", () => {
    const originalName = "Study Hours";
    let eventId: string | null = null;

    beforeAll(async () => {
        eventId = await getEventIdByName(originalName);
        expect(eventId).toBeTruthy();
    });

    afterAll(async () => {
        if (eventId) {
            await restoreEventName(eventId, originalName);
        }
    });

    it("changes only the name field", async () => {
        const id = eventId!;
        const newName = `Study Hours (updated ${Date.now()})`;
        await updateEventName(id, newName);
        const snap = await getDoc(doc(db, "events", id));
        expect(snap.exists()).toBe(true);
        const data = snap.data();
        expect(data?.name).toBe(newName);
        expect(data?.eventType).toBe("Study Hours");
    });
});

describe("deleteEvent", () => {
    beforeAll(async () => {
        await seedDeleteTestEventDoc();
        expect(await eventExists(EXERCISE_DELETE_TEST_EVENT_ID)).toBe(true);
    });

    it("removes the document", async () => {
        await deleteEvent(EXERCISE_DELETE_TEST_EVENT_ID);
        expect(await eventExists(EXERCISE_DELETE_TEST_EVENT_ID)).toBe(false);
    });
});
