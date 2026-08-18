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

        <div class="nav-item"
             (mouseenter)="menuOuvert.set('competences')"
             (mouseleave)="menuOuvert.set(null)"
             (click)="fermerMenu()">
          <a routerLink="/competences" routerLinkActive="actif">Compétences</a>
          <div class="dropdown" [class.ouvert]="menuOuvert() === 'competences'">
            <div class="dropdown-panel">
              @for (c of p.competencesParDomaine('technique'); track c.id) {
                <a class="dropdown-link" [routerLink]="['/competences', c.slug]">{{ c.nom }}</a>
              }
              <span class="dropdown-sep"></span>
              @for (c of p.competencesParDomaine('humaine'); track c.id) {
                <a class="dropdown-link" [routerLink]="['/competences', c.slug]">{{ c.nom }}</a>
              }
            </div>
          </div>
        </div>

        <div class="nav-item"
             (mouseenter)="menuOuvert.set('realisations')"
             (mouseleave)="menuOuvert.set(null)"
             (click)="fermerMenu()">
          <a routerLink="/realisations" routerLinkActive="actif">Réalisations</a>
          <div class="dropdown" [class.ouvert]="menuOuvert() === 'realisations'">
            <div class="dropdown-panel">
              @for (r of p.realisations; track r.id) {
                <a class="dropdown-link" [routerLink]="['/realisations', r.slug]">{{ r.nom }}</a>
              }
            </div>
          </div>
        </div>

        <a routerLink="/parcours" routerLinkActive="actif">Parcours</a>
        <a routerLink="/contact" routerLinkActive="actif">Contact</a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly ouvert = signal(false);
  protected readonly menuOuvert = signal<'competences' | 'realisations' | null>(null);

  constructor(router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.ouvert.set(false); this.menuOuvert.set(null); });
  }

  protected fermerMenu(): void {
    this.menuOuvert.set(null);
    // un clic donne aussi le focus au lien, ce qui rouvrirait le menu via :focus-within
    (document.activeElement as HTMLElement | null)?.blur();
  }
}
