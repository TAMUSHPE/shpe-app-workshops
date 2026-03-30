# Firebase workshop (`firebase/`)

## Firestore Events CRUD exercise

Practice Firestore **Create, Read, Update, Delete** against the **Firestore** and **Auth** emulators, using data seeded by [`seed.ts`](./seed.ts).

### Prerequisites

- Node.js (LTS)
- Firebase CLI (`npm i -g firebase-tools`)

### 1. Start emulators

From this directory:

```bash
firebase emulators:start
```

Leave this running. By default, Firestore is on **8080** and Auth on **9099** (see [`firebase.json`](./firebase.json)).

### 2. Seed the database

In a **second** terminal (same folder):

```bash
npm run seed
```

(Equivalent: `npx ts-node seed.ts`.)

This creates users, committees, and `events` documents (including subcollections where applicable).

### 3. Run the exercise tests

```bash
npm test
```

Until you implement the functions in [`exercise.ts`](./exercise.ts), tests will fail with `Not implemented: ...` — that is expected.

Or watch mode while you code:

```bash
npm run test:watch
```

### How the tests work

- Each function in [`exercise.ts`](./exercise.ts) has **its own** `describe` block in [`exercise.test.ts`](./exercise.test.ts).
- You can implement **one method at a time**; other tests may still fail, but progress on one function does not require the others to be finished.
- Helpers in [`test.utils.ts`](./test.utils.ts) load seeded data by name or prepare a fixed doc for the delete test (so `deleteEvent` does not depend on `createEvent`).

### 4. Implement the exercise

Edit [`exercise.ts`](./exercise.ts):

1. Import `db` from [`config.ts`](./config.ts) (already wired to the emulators).
2. Use the modular Firestore API (`collection`, `doc`, `getDocs`, `getDoc`, `addDoc`, `updateDoc`, `deleteDoc`, etc.).
3. Types for documents and `createEvent` input are in [`exercise.types.ts`](./exercise.types.ts).

When a test passes, move on to the next `describe` block.

### Challenge: event creators

After you are comfortable with reads, implement **`printEventCreators`** in [`exercise.ts`](./exercise.ts): loop every document in `events`, read `creator` (a user uid), load `users/{uid}`, and **`console.log`** one line per event (event name plus creator display name).

There is no automated test for this. Compare with the reference in [`exercise.solution.ts`](./exercise.solution.ts) when you are done. With emulators running and data seeded:

```bash
npm run challenge
```

This runs [`challenge-run.ts`](./challenge-run.ts), which calls the solution’s `printEventCreators`. To try your own implementation, change the import in that file to `./exercise`.

### Emulator UI

After seeding, open the Emulator Suite UI (often **http://localhost:4000**) to inspect `events` and other collections.

### Test accounts (from seed)

| Email | Password | Notes |
|-------|----------|--------|
| `admin@tamu.edu` | `password123` | admin + officer |
| `officer@tamu.edu` | `password123` | officer |
| `member1@tamu.edu` | `password123` | member |
| `member2@tamu.edu` | `password123` | member |
| `rep@tamu.edu` | `password123` | representative |
