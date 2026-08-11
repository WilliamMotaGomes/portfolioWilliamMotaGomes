import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { PortfolioService } from './core/services/portfolio.service';

export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'presentation',
    title: 'Présentation',
    loadComponent: () =>
      import('./features/presentation/presentation.component')
        .then(m => m.PresentationComponent),
  },
  {
    path: 'competences',
    title: 'Compétences',
    loadComponent: () =>
      import('./features/competences/competences-list/competences-list.component')
        .then(m => m.CompetencesListComponent),
  },
  {
    path: 'competences/:slug',
    title: (route: ActivatedRouteSnapshot) =>
      inject(PortfolioService).competenceBySlug(route.paramMap.get('slug')!)?.nom
        ?? 'Compétence introuvable',
    loadComponent: () =>
      import('./features/competences/competence-detail/competence-detail.component')
        .then(m => m.CompetenceDetailComponent),
  },
  {
    path: 'realisations',
    title: 'Réalisations',
    loadComponent: () =>
      import('./features/realisations/realisations-list/realisations-list.component')
        .then(m => m.RealisationsListComponent),
  },
  {
    path: 'realisations/:slug',
    title: (route: ActivatedRouteSnapshot) =>
      inject(PortfolioService).realisationBySlug(route.paramMap.get('slug')!)?.nom
        ?? 'Réalisation introuvable',
    loadComponent: () =>
      import('./features/realisations/realisation-detail/realisation-detail.component')
        .then(m => m.RealisationDetailComponent),
  },
  {
    path: 'parcours',
    title: 'Parcours',
    loadComponent: () =>
      import('./features/parcours/parcours.component')
        .then(m => m.ParcoursComponent),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () =>
      import('./features/contact/contact.component')
        .then(m => m.ContactComponent),
  },
  { path: '**', redirectTo: '' },
];
