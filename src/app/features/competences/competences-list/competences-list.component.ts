import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-competences-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p class="eyebrow">savoir-faire</p>
    <h1>Mes compétences</h1>

    <section class="comp-schema" aria-labelledby="schema-titre">
      <p class="eyebrow">vue d'ensemble</p>
      <h2 id="schema-titre">Schéma comparatif</h2>
      <p class="schema-intro">Niveau de maîtrise auto-évalué (0-100) pour chacune des 10 compétences, techniques et humaines.</p>
      <div class="schema-grille">
        <div class="schema-colonne">
          <h3>Techniques</h3>
          @for (c of p.competencesParDomaine('technique'); track c.id) {
            <a class="meter-row" [routerLink]="['/competences', c.slug]">
              <span class="meter-label">{{ c.nom }}</span>
              <span class="meter-track">
                <span class="meter-fill" [style.width.%]="c.niveau"></span>
              </span>
              <span class="meter-valeur">{{ c.niveau }}</span>
            </a>
          }
        </div>
        <div class="schema-colonne">
          <h3>Humaines</h3>
          @for (c of p.competencesParDomaine('humaine'); track c.id) {
            <a class="meter-row" [routerLink]="['/competences', c.slug]">
              <span class="meter-label">{{ c.nom }}</span>
              <span class="meter-track">
                <span class="meter-fill" [style.width.%]="c.niveau"></span>
              </span>
              <span class="meter-valeur">{{ c.niveau }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="comp-section">
      <h2>Techniques</h2>
      <div class="comp-grille">
        @for (c of p.competencesParDomaine('technique'); track c.id) {
          <a class="card comp-card" [routerLink]="['/competences', c.slug]">
            <span class="badge badge--{{ niveauClass(c.niveau) }}">{{ niveauLabel(c.niveau) }}</span>
            <h3>{{ c.nom }}</h3>
            <p>{{ c.definition }}</p>
          </a>
        }
      </div>
    </section>

    <section class="comp-section">
      <h2>Humaines</h2>
      <div class="comp-grille">
        @for (c of p.competencesParDomaine('humaine'); track c.id) {
          <a class="card comp-card" [routerLink]="['/competences', c.slug]">
            <span class="badge badge--{{ niveauClass(c.niveau) }}">{{ niveauLabel(c.niveau) }}</span>
            <h3>{{ c.nom }}</h3>
            <p>{{ c.definition }}</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class CompetencesListComponent {
  protected readonly p = inject(PortfolioService);

  niveauLabel(n: number): string {
    if (n >= 70) return 'Confirmé';
    if (n >= 50) return 'Intermédiaire';
    return 'En progression';
  }

  niveauClass(n: number): string {
    if (n >= 70) return 'confirme';
    if (n >= 50) return 'intermediaire';
    return 'en-progression';
  }
}
