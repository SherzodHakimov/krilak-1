import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

/**
 * The whole app lives under a `:lang` segment (`/ru/...`, `/en/...`). The bare
 * root redirects to the default locale. Page components are lazy-loaded.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ru' },
  {
    path: ':lang',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'catalog',
        loadChildren: () => import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES)
      },
      {
        path: 'solutions',
        loadComponent: () =>
          import('./features/solutions/solutions.component').then((m) => m.SolutionsComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services.component').then((m) => m.ServicesComponent)
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.component').then((m) => m.ProjectsComponent)
      },
      {
        path: 'configurator',
        loadComponent: () =>
          import('./features/configurator/configurator.component').then(
            (m) => m.ConfiguratorComponent
          )
      },
      {
        path: 'dealers',
        loadComponent: () =>
          import('./features/dealers/dealers.component').then((m) => m.DealersComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent)
      },
      {
        path: 'awards',
        loadComponent: () =>
          import('./features/awards/awards.component').then((m) => m.AwardsComponent)
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/reviews/reviews.component').then((m) => m.ReviewsComponent)
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./features/news/news-list.component').then((m) => m.NewsListComponent)
      },
      {
        path: 'news/:slug',
        loadComponent: () =>
          import('./features/news/news-article.component').then((m) => m.NewsArticleComponent)
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./features/contacts/contacts.component').then((m) => m.ContactsComponent)
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'ru' }
];
