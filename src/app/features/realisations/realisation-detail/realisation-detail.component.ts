import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-realisation-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (realisation(); as r) {
      <p class="eyebrow">réalisation</p>
      <h1>{{ r.nom }}</h1>
      @if (r.imageUrl) {
        <img class="hero-img" [src]="r.imageUrl" [alt]="r.nom" />
      }

      <article>
        <section><h2>Présentation</h2><p>{{ r.presentation }}</p></section>

        <section>
          <h2>Objectifs, contexte, enjeu, risques</h2>
          <p><strong>Objectifs :</strong> {{ r.cadre.objectifs }}</p>
          <p><strong>Contexte :</strong> {{ r.cadre.contexte }}</p>
          <p><strong>Enjeu :</strong> {{ r.cadre.enjeu }}</p>
          <p><strong>Risques :</strong> {{ r.cadre.risques }}</p>
        </section>

        <section>
          <h2>Les étapes</h2>
          <ol>@for (e of r.etapes; track e) { <li>{{ e }}</li> }</ol>
        </section>

        <section><h2>Les acteurs</h2><p>{{ r.acteurs }}</p></section>
        <section><h2>Les résultats</h2><p>{{ r.resultats }}</p></section>
        <section><h2>Les lendemains</h2><p>{{ r.lendemains }}</p></section>
        <section><h2>Mon regard critique</h2><p>{{ r.regardCritique }}</p></section>

        @if (r.technologies.length) {
          <section>
            <h2>Technologies</h2>
            <ul class="chips">@for (t of r.technologies; track t) { <li class="chip">{{ t }}</li> }</ul>
          </section>
        }
        @if (r.liens.length) {
          <section>
            <ul class="chips">
              @for (l of r.liens; track l.url) {
                <li><a class="chip" [href]="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a></li>
              }
            </ul>
          </section>
        }
      </article>

      <div class="crosslinks">
        <p class="eyebrow">compétences mobilisées</p>
        <ul class="chips">
          @for (c of competencesLiees(); track c.id) {
            <li><a class="chip chip--link" [routerLink]="['/competences', c.slug]">{{ c.nom }}</a></li>
          } @empty {
            <li class="chip">—</li>
          }
        </ul>
      </div>
    } @else {
      <p>Réalisation introuvable. <a routerLink="/realisations">Retour</a></p>
    }
  `,
})
export class RealisationDetailComponent {
  protected readonly p = inject(PortfolioService);
  slug = input.required<string>();
  protected readonly realisation = computed(() => this.p.realisationBySlug(this.slug()));
  protected readonly competencesLiees = computed(() => {
    const r = this.realisation();
    return r ? this.p.competencesDeRealisation(r.id) : [];
  });
}
