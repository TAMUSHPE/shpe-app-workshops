import type { GeoPoint, Timestamp } from "firebase/firestore";

/**
 * Top-level `users/{uid}` document shape (seed writes `publicInfo` fields plus `uid`).
 */
export interface UserDocument {
    uid: string;
    email: string;
    displayName: string;
    name: string;
    bio: string;
    major: string;
    classYear: string;
    committees: string[];
    roles: Record<string, boolean>;
    points: number;
    pointsThisMonth: number;
    pointsRank: number;
    rankChange: string;
    isStudent: boolean;
    isEmailPublic: boolean;
    resumeVerified: boolean;
    interests: string[];
    nationalExpiration: Timestamp;
    chapterExpiration: Timestamp;
}

/**
 * Shape of an `events` document (aligned with seeded data in `seed.ts`).
 * Client SDK returns `Timestamp` and `GeoPoint` instances when reading from Firestore.
 */
export interface EventDocument {
    name: string;
    description: string;
    eventType: string;
    tags: string[];
    startTime: Timestamp;
    endTime: Timestamp;
    startTimeBuffer: number | null;
    endTimeBuffer: number | null;
    signInPoints: number | null;
    signOutPoints: number | null;
    pointsPerHour: number | null;
    locationName: string;
    geolocation: GeoPoint;
    geofencingRadius: number;
    committee: string | null;
    general: boolean;
    coverImageURI: string | null;
    workshopType: string;
    nationalConventionEligible: boolean;
    notificationSent: boolean;
    hiddenEvent: boolean;
    creator: string | null;
}

/**
 * Minimum fields for `createEvent` — learners may add more fields as needed.
 */
export interface CreateEventInput {
    name: string;
    description: string;
    eventType: string;
    tags: string[];
    startTime: Timestamp;
    endTime: Timestamp;
    locationName: string;
    geolocation: GeoPoint;
    geofencingRadius: number;
    committee: string | null;
    general: boolean;
    workshopType: string;
    signInPoints: number | null;
    signOutPoints: number | null;
    pointsPerHour: number | null;
    startTimeBuffer: number | null;
    endTimeBuffer: number | null;
    coverImageURI: string | null;
    nationalConventionEligible: boolean;
    notificationSent: boolean;
    hiddenEvent: boolean;
    /** Use a real Auth UID from the emulator (e.g. after sign-in) or `null` for practice. */
    creator: string | null;
}
