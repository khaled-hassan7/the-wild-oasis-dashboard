# The Wild Oasis — AGENTS.md

## Developer Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost://5173` |
| `npm run build` | Production build with Vite — outputs to `dist/` |
| `npm run lint` | ESLint on `.js`, `.jsx` files (extends `react-app`) |
| `npm run preview` | Preview the production build locally |

## Project Structure

This is a **single-package** React + Vite admin dashboard. Key directories:

- `src/features/` — feature modules: `authentication`, `bookings`, `cabins`, `check-in-out`, `dashboard`, `settings`
- `src/pages/` — page components rendered by React Router
- `src/ui/` — reusable UI components (buttons, forms, tables, modals, etc.)
- `src/services/` — Supabase API wrappers: `supabase.js`, `apiBookings.js`, `apiCabins.js`, `apiSettings.js`
- `src/context/` — `DarkModeContext` provider
- `src/hooks/` — custom hooks (`useLocalStorageState`, `useMoveBack`, `useOutsideClick`)
- `src/utils/` — constants (`PAGE_SIZE=10`) and helpers (`getToday`, `formatCurrency`, `subtractDates`)
- `src/data/` — sample data fixtures (`cabins`, `bookings`, `guests`) used by the `Uploader` component

## Critical Quirks & Gotchas

### Data upload order matters
The `Uploader` component (`src/data/Uploader.jsx`) must follow this exact sequence:

1. `deleteBookings()` — delete all bookings first
2. `deleteGuests()` — delete all guests
3. `deleteCabins()` — delete all cabins
4. `createGuests()` — upload guest data
5. `createCabins()` — upload cabin data
6. `createBookings()` — upload booking data **last** (references guestId + cabinId)

Bookings depend on existing guest and cabin IDs, so create guests and cabins first.

### Supabase configuration
- URL and anon key are in `src/services/supabase.js`. Do not change these keys unless you reconfigure the Supabase project.
- Bookings support server-side filtering (`?status=...`) and sorting (`?sortBy=...`) via query parameters.
- `getToday()` in `src/utils/helpers.js` strips time components for Supabase date comparisons — crucial for `status` filters and date ranges.

### Dark mode
- Managed by `DarkModeContext` (`src/context/DarkModeContext.jsx`).
- Toggles `dark-mode`/`light-mode` classes on `document.documentElement`.
- Preference persists in `localStorage` and falls back to `prefers-color-scheme`.
- The `DarkModeProvider` wraps the entire app in `src/App.jsx`.

### QueryClient config
- `src/main.jsx` configures `QueryClient` with `staleTime: 0` — all queries become stale immediately. This is intentional for the real-time/dashboard use case.

### Protected routes
- All routes are wrapped in `ProtectRoute` (`src/ui/ProtectRoute.jsx`) which checks authentication before rendering `AppLayout`.
- The login route (`/login`) is outside the protector.

### Pagination
- `PAGE_SIZE` is 10 (defined in `src/utils/constans.js` and imported as `/src/utils/constants`).
- Bookings table uses server-side pagination with `?page=N` query parameter.

### Image upload
- Cabin images are uploaded to Supabase Storage bucket `cabins-images`.
- The `CreateEditCabins` service (`src/services/apiCabins.js`) handles generating image paths and uploading files via the Supabase JavaScript client.

## Architecture Notes

- **React Router 6** with `BrowserRouter` — routes defined in `src/App.jsx`.
- **TanStack React Query 4** for remote state — `QueryClientProvider` in `src/App.jsx`, devtools initially closed.
- **Styled Components 6** for CSS-in-JS — all styling is component-scoped.
- **React Hook Form** for all forms — see `src/features/*/ forms` for patterns.
- **ErrorBoundary** wraps the app in `src/main.jsx` — falls back to `src/ui/ErrorFallback.jsx` with a reset handler that navigates to `/`.
- **React Hot Toast** for all toast notifications — success duration 3000ms, error duration 5000ms.