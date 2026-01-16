# AI Agent Instructions for my-reviews

## Project Overview

**my-reviews** is a mobile application built with **Ionic + Angular 20 + Capacitor** that enables users to securely log reviews of movies and books in a local SQLite database. No backend server—all data persists on-device with fingerprint authentication.

### Architecture Layers
- **Pages** (`src/app/pages/`): Standalone Angular route components (login, books, movies, user, settings, etc.)
- **Components** (`src/app/components/`): Reusable Ionic UI modules (detail/new modals, header)
- **Services** (`src/app/services/`): Business logic; currently `DatabaseService` manages SQLite lifecycle
- **Models** (`src/app/models/`): TypeScript interfaces for `Book` and `Movie` entities

### Key Tech Stack
- **Angular 20** with standalone components (no NgModules)
- **Ionic 8** standalone components (IonCard, IonModal, IonButton, etc.)
- **Capacitor 8** for mobile bridge + SQLite plugin
- **SQLite** (`@capacitor-community/sqlite`) for on-device persistence
- **SCSS** for styling with theme variables in `src/theme/variables.scss`
- **RxJS 7.8** (minimal use currently; no service observables)

## Critical Developer Workflows

### Build & Development
```bash
npm start          # Runs ng serve (dev server)
npm run build      # Production build → www/
npm run watch      # ng build --watch for active development
npm test           # Karma + Jasmine test runner
npm run lint       # ESLint on TypeScript + templates
```

### Mobile Build
- Android builds use Gradle (`android/build.gradle`)
- Capacitor syncs web build to native: `npx cap sync android`
- Database schema lives in `DatabaseService.createTables()` — **any schema changes must be applied here**

### Testing
- Tests co-locate with components: `*.spec.ts` files (Jasmine/Karma)
- No E2E framework configured; manual or Cypress-like setup needed

## Project-Specific Patterns

### Standalone Component Convention
All components are **standalone: true**. Example from [books.page.ts](src/app/pages/books/books.page.ts):
```typescript
@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonButton, IonModal, ...] // Must import all Ionic deps explicitly
})
```
**Action**: When creating new pages/components, always add `standalone: true` and explicitly list all Ionic imports from `@ionic/angular/standalone`.

### Routing
Routes use **lazy loading** in [app.routes.ts](src/app/app.routes.ts):
```typescript
{ path: 'books', loadComponent: () => import('./pages/books/books.page').then(m => m.BooksPage) }
```
- Default redirects to `start` page
- Modal routing handled via `ModalController` (not router)

### Modal Dialogs
Modals are triggered via `ModalController` with `componentProps`:
```typescript
async openBook(book: Book) {
  const modal = await this.modalCtrl.create({
    component: BookDetailModalComponent,
    componentProps: { book: book }
  });
  await modal.present();
}
```
**Action**: Always dismiss modals with `await this.modalCtrl.dismiss()` or `this.modalCtrl.dismiss(data)`.

### Database Initialization
The `DatabaseService` initializes **only once** in [app.component.ts](src/app/app.component.ts) via `platform.ready()`:
```typescript
this.platform.ready().then(() => {
  this.dbService.initDatabase();
});
```
**Critical**: Never call `initDatabase()` multiple times; it closes and recreates the connection. Database operations are **async** (`Promise` based); all query methods are `async`.

### Data Models
Interfaces define entity shapes ([book.model.ts](src/app/models/book.model.ts), [movie.model.ts](src/app/models/movie.model.ts)). **Current limitation**: Pages mock data in arrays; real CRUD operations exist in `DatabaseService` (e.g., `saveBook()`) but pages don't fetch from DB yet.

### Forms in Modals
New/edit modals use ReactiveForms with FormGroup. Example from [book-new-modal.component.ts](src/app/components/book-new-modal/book-new-modal.component.ts):
```typescript
form = new FormGroup({
  title: new FormControl('', [Validators.required]),
  author: new FormControl('', [Validators.required]),
  // ...
});
```
- Date pickers use IonDatetime with temp state for confirmation
- Save calls DB service and resets form on success

### Styling
- Global styles: [global.scss](src/theme/variables.scss)
- Theme variables defined in `src/theme/variables.scss`
- Components use `.scss` files; leverage Ionic CSS variables for theming

## Integration Points

### Capacitor Plugins
- **SQLite**: Core persistence via `@capacitor-community/sqlite`
- **Platform**: `Platform.ready()` used for lifecycle hook
- **Haptics, StatusBar, Keyboard**: Available but not currently integrated

### Ionic Standalone Imports Pattern
Every page/component must import Ionic components it uses. Common imports:
```typescript
import { IonCard, IonButton, IonContent, IonHeader, IonToolbar, ... } from '@ionic/angular/standalone';
```

## Conventions & Do's/Don'ts

✅ **DO**:
- Use `async/await` for all database operations
- Follow Angular strict mode (enabled in `tsconfig.json`)
- Keep services stateless; rely on `DatabaseService` for persistence
- Test modals with `ModalController` spy in unit tests
- Use `console.log()` with emoji prefixes (🟢, ❌) for visibility

❌ **DON'T**:
- Import from `@ionic/angular` (deprecated path); use `@ionic/angular/standalone`
- Use NgModules; everything is standalone
- Call `initDatabase()` multiple times
- Store async results in component properties without proper lifecycle management

## File Structure Examples
- **New Page**: Copy [src/app/pages/books/](src/app/pages/books/); update route in [app.routes.ts](src/app/app.routes.ts)
- **New Modal**: Place in [src/app/components/](src/app/components/); import in parent component
- **New Service**: Place in [src/app/services/](src/app/services/); provide in root with `@Injectable({ providedIn: 'root' })`

## Open Patterns & TODOs
- Real CRUD for books/movies not yet wired to pages (currently mocked arrays in pages, but DB save methods exist)
- Fingerprint authentication mentioned in README but not implemented
- No state management (NgRx, Signals) — consider if collection scale grows
