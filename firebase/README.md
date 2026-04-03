# Firebase workshop (`firebase/`)

## Firestore Events CRUD exercise

Practice Firestore **Create, Read, Update, Delete** against the **Firestore** and **Auth** emulators, using data seeded by [`seed.ts`](./seed.ts).

### Prerequisites

- **Node.js** (LTS) — [nodejs.org](https://nodejs.org/) (for `npm run seed`, tests, and TypeScript)
- **Firebase CLI** — see [Firebase CLI setup](#firebase-cli-setup) below **or** use [Docker for emulators](#option-b-docker-skip-local-java-and-global-firebase-tools-for-emulators) and skip installing the CLI for local emulator runs
- **Docker** (optional) — only if you use Option B to start emulators in a container

### Firebase CLI setup

The CLI starts the local emulators used by this workshop.

**Install (pick one):**

1. **Global install** (common on macOS / Linux / Windows):

   ```bash
   npm install -g firebase-tools
   ```

   On some systems you need elevated permissions or may prefer a [version manager](https://firebase.google.com/docs/cli#install-cli); follow the [official install guide](https://firebase.google.com/docs/cli#install_the_firebase_cli) if `npm` global path issues appear.

2. **No global install** — run via `npx` when you need a command:

   ```bash
   npx firebase-tools@latest --version
   ```

   For emulators, use `npx firebase-tools@latest emulators:start` from this `firebase/` directory instead of `firebase emulators:start`.

**Check that it works:**

```bash
firebase --version
```

You should see a semver (for example `13.x.x`). If the shell reports `firebase` is not recognized, confirm your global npm bin directory is on your `PATH`, or use the `npx firebase-tools@latest …` form.

**Signing in**

For this repo you only need the **emulators** in [`firebase.json`](./firebase.json). Local emulator runs do not require `firebase login`. Use `firebase login` only when you deploy to a real Firebase project or use project-specific CLI features against production.

### 1. Start emulators

Pick **one** option and leave it running while you seed, test, or run the challenge.

#### Option A: Firebase CLI on your machine

From this directory:

```bash
firebase emulators:start
```

#### Option B: Docker (skip local Java and global `firebase-tools` for emulators)

Use this if you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / macOS) or Docker Engine with the [Compose plugin](https://docs.docker.com/compose/install/).

From this directory:

```bash
docker compose up --build
```

Or:

```bash
npm run emulators:docker
```

The image is based on **Eclipse Temurin 21 JRE** plus **Node.js 22** and `firebase-tools` (the Firestore emulator requires Java **21+**; Java 17 is no longer supported). Published ports match [`firebase.json`](./firebase.json): Emulator UI **4000**, Firestore **8080**, Auth **9099** (plus **4400** / **4500** for the emulator hub and logging). [`config.ts`](./config.ts), `npm run seed`, `npm test`, and `npm run challenge` on the host still use **`localhost`** on those ports.

- Foreground: stop with `Ctrl+C`, then `docker compose down` if the container keeps running.
- Background: `npm run emulators:docker:detach` — stop later with `docker compose down`.

By default, Firestore is on **8080** and Auth on **9099** (see [`firebase.json`](./firebase.json)).

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
