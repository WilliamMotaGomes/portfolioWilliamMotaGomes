import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  template: `
    <p class="eyebrow">à propos</p>
    <h1>Qui suis-je</h1>
    <article>
      <section><h2>Mes valeurs</h2><p>{{ pres.valeurs }}</p></section>
      <section><h2>Mon projet</h2><p>{{ pres.projet }}</p></section>
      <section><h2>Mes qualités humaines</h2><p>{{ pres.qualitesHumaines }}</p></section>
      <section><h2>Mes centres d’intérêt</h2><p>{{ pres.centresInteret }}</p></section>
    </article>
  `,
})
export class PresentationComponent {
  protected readonly pres = inject(PortfolioService).presentation;
}
