import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-parcours',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p class="eyebrow">parcours</p>
    <h1>Mon parcours</h1>

    <ol class="frise">
      @for (e of experiences; track e.id) {
        <li class="evenement" [attr.data-type]="e.type">
          <time>{{ e.debut }}@if (e.fin) { – {{ e.fin }} } @else if (e.type === 'entreprise') { – aujourd’hui }</time>

          @switch (e.type) {
            @case ('entreprise') {
              <h2>{{ e.poste }} · {{ e.societe }}</h2>
              <details>
                <summary>Détails</summary>
                @if (e.statut) { <p><strong>Statut :</strong> {{ e.statut }}</p> }
                @if (e.responsabilite) { <p><strong>Responsabilité :</strong> {{ e.responsabilite }}</p> }
                <p>{{ e.missions }}</p>
                @if (e.realisationIds.length) {
                  <ul class="chips">
                    @for (id of e.realisationIds; track id) {
                      @if (p.realisationById(id); as r) {
                        <li><a class="chip chip--link" [routerLink]="['/realisations', r.slug]">{{ r.nom }}</a></li>
                      }
                    }
                  </ul>
                }
              </details>
            }
            @case ('formation') {
              <h2>{{ e.titre }}</h2>
              <details>
                <summary>{{ e.etablissement }}</summary>
                @if (e.presentation) { <p>{{ e.presentation }}</p> }
                @if (e.urlEtablissement) {
                  <ul class="chips"><li><a class="chip" [href]="e.urlEtablissement" target="_blank" rel="noopener">Site de l’établissement ↗</a></li></ul>
                }
              </details>
            }
            @case ('certification') {
              <h2>{{ e.intitule }}</h2>
            }
          }
        </li>
      }
    </ol>
  `,
})
export class ParcoursComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly experiences = this.p.experiencesAntiChrono();
}
