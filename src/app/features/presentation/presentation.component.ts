import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  template: `
    <p class="eyebrow">à propos</p>
    <h1>Qui suis-je</h1>

    <div class="presentation-layout">
      <aside class="presentation-aside">
        <img [src]="p.personne.photoUrl" [alt]="p.personne.prenom + ' ' + p.personne.nom" class="presentation-photo" />
        <ul class="presentation-faits">
          @if (p.personne.localisation) { <li>📍 {{ p.personne.localisation }}</li> }
          <li>{{ p.personne.titre }}</li>
        </ul>
        @if (pres.langues?.length) {
          <ul class="chips">
            @for (l of pres.langues; track l) { <li class="chip">{{ l }}</li> }
          </ul>
        }
      </aside>

      <article>
        <section><h2>Mes valeurs</h2><p>{{ pres.valeurs }}</p></section>
        <section><h2>Mon projet</h2><p>{{ pres.projet }}</p></section>
        <section><h2>Mes qualités humaines</h2><p>{{ pres.qualitesHumaines }}</p></section>
        <section><h2>Mes centres d’intérêt</h2><p>{{ pres.centresInteret }}</p></section>
      </article>
    </div>
  `,
})
export class PresentationComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly pres = this.p.presentation;
}
