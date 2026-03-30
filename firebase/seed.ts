import * as admin from "firebase-admin";

// Point to emulators BEFORE initializing the app
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";

admin.initializeApp({ projectId: "tamushpemobileapp" });

const db = admin.firestore();
const auth = admin.auth();

// ─── Helpers ────────────────────────────────────────────────────────────────

const now = admin.firestore.Timestamp.now();
const inDays = (n: number) =>
    admin.firestore.Timestamp.fromMillis(Date.now() + n * 86400000);
const hoursFromNow = (h: number) =>
    admin.firestore.Timestamp.fromMillis(Date.now() + h * 3600000);

// ─── Users ───────────────────────────────────────────────────────────────────

const users = [
    {
        email: "admin@tamu.edu",
        password: "password123",
        displayName: "Admin User",
        publicInfo: {
            email: "admin@tamu.edu",
            displayName: "Admin User",
            name: "Admin User",
            bio: "SHPE Admin for testing",
            major: "CSCE",
            classYear: "2025",
            committees: ["technology"],
            roles: {
                admin: true,
                officer: true,
                reader: true,
            },
            points: 150,
            pointsThisMonth: 20,
            pointsRank: 1,
            rankChange: "same",
            isStudent: true,
            isEmailPublic: true,
            resumeVerified: true,
            interests: ["Software Engineering", "AI"],
            nationalExpiration: inDays(180),
            chapterExpiration: inDays(180),
        },
        privateInfo: {
            completedAccountSetup: true,
            settings: { darkMode: false, useSystemDefault: true },
            expoPushTokens: [],
        },
    },
    {
        email: "officer@tamu.edu",
        password: "password123",
        displayName: "Officer User",
        publicInfo: {
            email: "officer@tamu.edu",
            displayName: "Officer User",
            name: "Officer User",
            bio: "SHPE Officer for testing",
            major: "ECEN",
            classYear: "2026",
            committees: ["professional-development", "technology"],
            roles: {
                officer: true,
                reader: true,
            },
            points: 95,
            pointsThisMonth: 15,
            pointsRank: 2,
            rankChange: "increased",
            isStudent: true,
            isEmailPublic: false,
            resumeVerified: true,
            interests: ["Electrical Engineering", "Robotics"],
            nationalExpiration: inDays(180),
            chapterExpiration: inDays(180),
        },
        privateInfo: {
            completedAccountSetup: true,
            settings: { darkMode: true, useSystemDefault: false },
            expoPushTokens: [],
        },
    },
    {
        email: "member1@tamu.edu",
        password: "password123",
        displayName: "Maria Garcia",
        publicInfo: {
            email: "member1@tamu.edu",
            displayName: "Maria Garcia",
            name: "Maria Garcia",
            bio: "Junior studying Mechanical Engineering",
            major: "MEEN",
            classYear: "2026",
            committees: ["scholastic-committee"],
            roles: {
                reader: true,
            },
            points: 42,
            pointsThisMonth: 8,
            pointsRank: 3,
            rankChange: "increased",
            isStudent: true,
            isEmailPublic: false,
            resumeVerified: false,
            interests: ["Mechanical Engineering", "3D Printing"],
            nationalExpiration: inDays(180),
            chapterExpiration: inDays(180),
        },
        privateInfo: {
            completedAccountSetup: true,
            settings: { darkMode: false, useSystemDefault: true },
            expoPushTokens: [],
        },
    },
    {
        email: "member2@tamu.edu",
        password: "password123",
        displayName: "Carlos Rivera",
        publicInfo: {
            email: "member2@tamu.edu",
            displayName: "Carlos Rivera",
            name: "Carlos Rivera",
            bio: "Sophomore in Chemical Engineering",
            major: "CHEN",
            classYear: "2027",
            committees: [],
            roles: {
                reader: true,
            },
            points: 18,
            pointsThisMonth: 3,
            pointsRank: 4,
            rankChange: "same",
            isStudent: true,
            isEmailPublic: false,
            resumeVerified: false,
            interests: ["Chemical Engineering", "Research"],
            nationalExpiration: inDays(90),
            chapterExpiration: inDays(90),
        },
        privateInfo: {
            completedAccountSetup: true,
            settings: { darkMode: false, useSystemDefault: true },
            expoPushTokens: [],
        },
    },
    {
        email: "rep@tamu.edu",
        password: "password123",
        displayName: "Sofia Mendez",
        publicInfo: {
            email: "rep@tamu.edu",
            displayName: "Sofia Mendez",
            name: "Sofia Mendez",
            bio: "Committee Representative",
            major: "AERO",
            classYear: "2025",
            committees: ["professional-development"],
            roles: {
                representative: true,
                reader: true,
            },
            points: 70,
            pointsThisMonth: 12,
            pointsRank: 3,
            rankChange: "decreased",
            isStudent: true,
            isEmailPublic: true,
            resumeVerified: true,
            interests: ["Aerospace", "Leadership"],
            nationalExpiration: inDays(180),
            chapterExpiration: inDays(180),
        },
        privateInfo: {
            completedAccountSetup: true,
            settings: { darkMode: false, useSystemDefault: true },
            expoPushTokens: [],
        },
    },
];

// ─── Committees ───────────────────────────────────────────────────────────────

const committees = [
    {
        id: "technology",
        data: {
            name: "Technology",
            firebaseDocName: "technology",
            color: "#4285F4",
            description:
                "The Technology committee focuses on software, hardware, and technical skill development for SHPE members.",
            logo: "technicalAffairs",
            isOpen: true,
            memberCount: 12,
            applicationLink: "https://forms.gle/example",
        },
    },
    {
        id: "professional-development",
        data: {
            name: "Professional Development",
            firebaseDocName: "professional-development",
            color: "#34A853",
            description:
                "Prepares members for their professional careers through workshops, networking events, and mentorship.",
            logo: "professionalDevelopment",
            isOpen: true,
            memberCount: 20,
            applicationLink: "https://forms.gle/example2",
        },
    },
    {
        id: "scholastic-committee",
        data: {
            name: "Scholastic Committee",
            firebaseDocName: "scholastic-committee",
            color: "#FBBC05",
            description:
                "Supports academic excellence through study hours, tutoring, and test bank resources.",
            logo: "scholasticCommittee",
            isOpen: true,
            memberCount: 15,
            applicationLink: "https://forms.gle/example3",
        },
    },
    {
        id: "mentorshpe-committee",
        data: {
            name: "MentorSHPE Committee",
            firebaseDocName: "mentorshpe-committee",
            color: "#EA4335",
            description:
                "Connects SHPE members with industry mentors and coordinates mentorship programs.",
            logo: "mentorshpeCommittee",
            isOpen: false,
            memberCount: 8,
            applicationLink: "",
        },
    },
];

// ─── Events ───────────────────────────────────────────────────────────────────

const events = [
    {
        name: "Spring General Meeting",
        description:
            "Monthly general meeting for all SHPE members. Updates on upcoming events, opportunities, and announcements.",
        eventType: "General Meeting",
        tags: ["general", "announcements"],
        startTime: hoursFromNow(2),
        endTime: hoursFromNow(3),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 1,
        signOutPoints: 1,
        pointsPerHour: null,
        locationName: "Zachry Engineering Building, Room 310",
        geolocation: new admin.firestore.GeoPoint(30.6214, -96.3404),
        geofencingRadius: 100,
        committee: null,
        general: true,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: true,
        hiddenEvent: false,
        creator: "admin-uid-placeholder",
    },
    {
        name: "Resume Workshop",
        description:
            "Learn how to craft a standout engineering resume. Bring a draft to get personalized feedback from officers and industry reps.",
        eventType: "Workshop",
        tags: ["resume", "career", "professional"],
        startTime: hoursFromNow(26),
        endTime: hoursFromNow(28),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 3,
        signOutPoints: null,
        pointsPerHour: null,
        locationName: "Student Services Building, Room 601",
        geolocation: new admin.firestore.GeoPoint(30.6154, -96.3407),
        geofencingRadius: 75,
        committee: "professional-development",
        general: false,
        coverImageURI: null,
        workshopType: "Professional",
        nationalConventionEligible: false,
        notificationSent: false,
        hiddenEvent: false,
        creator: "officer-uid-placeholder",
    },
    {
        name: "Study Hours",
        description:
            "Open study hours at the library. Earn points for every hour you study. Tutors available for MATH, CSCE, and ECEN courses.",
        eventType: "Study Hours",
        tags: ["study", "academic"],
        startTime: hoursFromNow(48),
        endTime: hoursFromNow(54),
        startTimeBuffer: 0,
        endTimeBuffer: 900000, // 15 minutes in ms
        signInPoints: 0,
        signOutPoints: 0,
        pointsPerHour: 1,
        locationName: "Evans Library, 3rd Floor",
        geolocation: new admin.firestore.GeoPoint(30.6183, -96.3392),
        geofencingRadius: 150,
        committee: "scholastic-committee",
        general: true,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: true,
        hiddenEvent: false,
        creator: "officer-uid-placeholder",
    },
    {
        name: "Technology Committee Meeting",
        description:
            "Bi-weekly meeting for the Technology committee. Discuss ongoing projects, assign tasks, and plan upcoming workshops.",
        eventType: "Committee Meeting",
        tags: ["committee", "technology"],
        startTime: hoursFromNow(72),
        endTime: hoursFromNow(73),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 1,
        signOutPoints: null,
        pointsPerHour: null,
        locationName: "HRBB Room 124",
        geolocation: new admin.firestore.GeoPoint(30.6207, -96.3381),
        geofencingRadius: 50,
        committee: "technology",
        general: false,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: false,
        hiddenEvent: false,
        creator: "admin-uid-placeholder",
    },
    {
        name: "SHPE Volleyball Social",
        description:
            "Come out and meet fellow SHPE members in a fun and relaxed setting! Teams will be formed on arrival.",
        eventType: "Social Event",
        tags: ["social", "sports", "networking"],
        startTime: hoursFromNow(120),
        endTime: hoursFromNow(122),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 1,
        signOutPoints: null,
        pointsPerHour: null,
        locationName: "Penberthy Intramural Fields",
        geolocation: new admin.firestore.GeoPoint(30.6101, -96.3448),
        geofencingRadius: 200,
        committee: null,
        general: true,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: false,
        hiddenEvent: false,
        creator: "officer-uid-placeholder",
    },
    {
        name: "Habitat for Humanity Volunteer Day",
        description:
            "Give back to the community by volunteering with Habitat for Humanity. Earn volunteer points and make a difference!",
        eventType: "Volunteer Event",
        tags: ["volunteer", "community"],
        startTime: hoursFromNow(168),
        endTime: hoursFromNow(174),
        startTimeBuffer: null,
        endTimeBuffer: null,
        signInPoints: 0,
        signOutPoints: null,
        pointsPerHour: 2,
        locationName: "College Station Community Center",
        geolocation: new admin.firestore.GeoPoint(30.6019, -96.3145),
        geofencingRadius: 300,
        committee: null,
        general: true,
        coverImageURI: null,
        workshopType: "None",
        nationalConventionEligible: false,
        notificationSent: false,
        hiddenEvent: false,
        creator: "admin-uid-placeholder",
    },
];

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedUsers() {
    console.log("👤 Seeding users...");
    const uidMap: Record<string, string> = {};

    for (const user of users) {
        // Create auth user
        const authUser = await auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.displayName,
        });

        uidMap[user.email] = authUser.uid;

        // Public info document at users/{uid}
        await db
            .collection("users")
            .doc(authUser.uid)
            .set({ ...user.publicInfo, uid: authUser.uid });

        // Private info at users/{uid}/private/privateInfo
        await db
            .collection("users")
            .doc(authUser.uid)
            .collection("private")
            .doc("privateInfo")
            .set(user.privateInfo);

        console.log(`  ✓ Created user: ${user.email} (${authUser.uid})`);
    }

    return uidMap;
}

async function seedCommittees(uidMap: Record<string, string>) {
    console.log("🏛️  Seeding committees...");

    for (const committee of committees) {
        // Add head/leads/reps using real UIDs
        const enriched = {
            ...committee.data,
            head: uidMap["officer@tamu.edu"] ?? null,
            leads: [uidMap["rep@tamu.edu"] ?? null].filter(Boolean),
            representatives: [],
        };

        await db.collection("committees").doc(committee.id).set(enriched);
        console.log(`  ✓ Created committee: ${committee.data.name}`);
    }
}

async function seedEvents(uidMap: Record<string, string>) {
    console.log("📅 Seeding events...");

    for (const event of events) {
        // Replace placeholder creator UIDs with real ones
        const creatorEmail =
            event.creator === "admin-uid-placeholder"
                ? "admin@tamu.edu"
                : "officer@tamu.edu";

        const enriched = {
            ...event,
            creator: uidMap[creatorEmail] ?? null,
        };

        const ref = await db.collection("events").add(enriched);

        // Add a sample event log (sign-in) for the first user on the first event
        if (event.name === "Spring General Meeting") {
            await ref.collection("logs").add({
                uid: uidMap["member1@tamu.edu"],
                points: event.signInPoints,
                signInTime: now,
                signOutTime: null,
                creationTime: now,
                verified: true,
            });
        }

        console.log(`  ✓ Created event: ${event.name}`);
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log("\n🌱 Starting TAMUSHPE emulator seed...\n");

    try {
        const uidMap = await seedUsers();
        await seedCommittees(uidMap);
        await seedEvents(uidMap);

        console.log("\n✅ Seed complete! Open localhost:4000 to explore the data.\n");
        console.log("Test accounts:");
        console.log("  admin@tamu.edu    / password123  (admin + officer)");
        console.log("  officer@tamu.edu  / password123  (officer)");
        console.log("  member1@tamu.edu  / password123  (member - Maria Garcia)");
        console.log("  member2@tamu.edu  / password123  (member - Carlos Rivera)");
        console.log("  rep@tamu.edu      / password123  (representative - Sofia Mendez)");
    } catch (err) {
        console.error("❌ Seed failed:", err);
    }

    process.exit(0);
}

main();