import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a routerLink="/" class="identite" (click)="ouvert.set(false)">
        <img [src]="p.personne.photoUrl" alt="Photo de {{ p.personne.prenom }} {{ p.personne.nom }}" />
        <span>
          <strong>{{ p.personne.prenom }} {{ p.personne.nom }}</strong>
          <small>{{ p.personne.titre }}</small>
        </span>
      </a>

      <button class="burger" (click)="ouvert.set(!ouvert())"
              [attr.aria-expanded]="ouvert()" aria-label="Menu">☰</button>

      <nav [class.ouvert]="ouvert()" (click)="ouvert.set(false)">
        <a routerLink="/presentation" routerLinkActive="actif">Présentation</a>
        <a routerLink="/competences" routerLinkActive="actif">Compétences</a>
        <a routerLink="/realisations" routerLinkActive="actif">Réalisations</a>
        <a routerLink="/parcours" routerLinkActive="actif">Parcours</a>
        <a routerLink="/contact" routerLinkActive="actif">Contact</a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly ouvert = signal(false);

  constructor(router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.ouvert.set(false));
  }
}
