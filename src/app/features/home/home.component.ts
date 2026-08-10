import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div>
        <p class="eyebrow">portfolio</p>
        <h1>{{ p.personne.prenom }} {{ p.personne.nom }}</h1>
        <p class="titre">{{ p.personne.titre }}</p>
        <p class="lede">{{ p.personne.accroche }}</p>
        <div class="cta">
          <a class="btn" routerLink="/realisations">Voir mes réalisations</a>
          <a class="btn-ghost" routerLink="/contact">Me contacter</a>
        </div>
      </div>
      <div class="portrait">
        <img [src]="p.personne.photoUrl" [alt]="p.personne.prenom + ' ' + p.personne.nom" />
      </div>
    </section>

    <section>
      <p class="eyebrow">compétences clés</p>
      <ul class="chips">
        @for (c of apercu; track c.id) {
          <li><a class="chip" [routerLink]="['/competences', c.slug]">{{ c.nom }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class HomeComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly apercu = this.p.competencesParDomaine('technique').slice(0, 4);
}
