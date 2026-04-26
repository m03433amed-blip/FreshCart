import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'brands/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categories/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'subcategories/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];