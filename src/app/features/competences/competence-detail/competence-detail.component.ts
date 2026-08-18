import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-competence-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (competence(); as c) {
      <a routerLink="/competences" class="lien-retour">← Toutes les compétences</a>
      <p class="eyebrow">compétence · {{ c.domaine }}</p>
      <h1>{{ c.nom }}</h1>

      <article>
        <section>
          <h2>Ma définition</h2>
          <p>{{ c.definition }}</p>
        </section>

        <section>
          <h2>Mes éléments de preuve</h2>
          @for (preuve of c.preuves; track $index) {
            <div class="anecdote">
              <p>{{ preuve.recit }}</p>
              <p><strong>Résultat :</strong> {{ preuve.resultat }}</p>
              <p><strong>Valeur ajoutée :</strong> {{ preuve.valeurAjoutee }}</p>
              @if (preuve.realisationId && p.realisationById(preuve.realisationId); as r) {
                <ul class="chips"><li><a class="chip chip--link" [routerLink]="['/realisations', r.slug]">{{ r.nom }}</a></li></ul>
              }
            </div>
          }
        </section>

        <section>
          <h2>Mon autocritique</h2>
          <p><strong>Maîtrise :</strong> {{ c.autocritique.maitrise }}</p>
          <p><strong>Importance :</strong> {{ c.autocritique.importance }}</p>
          @if (c.autocritique.vitesseAcquisition) {
            <p><strong>Acquisition :</strong> {{ c.autocritique.vitesseAcquisition }}</p>
          }
          <p><strong>Recul :</strong> {{ c.autocritique.recul }}</p>
        </section>

        <section>
          <h2>Mon évolution</h2>
          <p>{{ c.evolution.niveauVise }}</p>
          @if (c.evolution.formations.length) {
            <ul>@for (f of c.evolution.formations; track f) { <li>{{ f }}</li> }</ul>
          }
        </section>
      </article>

      <div class="crosslinks">
        <p class="eyebrow">réalisations associées</p>
        <ul class="chips">
          @for (r of realisationsLiees(); track r.id) {
            <li><a class="chip chip--link" [routerLink]="['/realisations', r.slug]">{{ r.nom }}</a></li>
          } @empty {
            <li class="chip">—</li>
          }
        </ul>
      </div>
    } @else {
      <p>Compétence introuvable. <a routerLink="/competences">Retour</a></p>
    }
  `,
})
export class CompetenceDetailComponent {
  protected readonly p = inject(PortfolioService);
  slug = input.required<string>();
  protected readonly competence = computed(() => this.p.competenceBySlug(this.slug()));
  protected readonly realisationsLiees = computed(() => {
    const c = this.competence();
    return c ? this.p.realisationsDeCompetence(c.id) : [];
  });
}
