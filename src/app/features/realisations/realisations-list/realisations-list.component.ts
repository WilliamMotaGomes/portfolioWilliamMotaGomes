import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-realisations-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p class="eyebrow">projets</p>
    <h1>Mes réalisations</h1>
    <div class="grille">
      @for (r of p.realisations; track r.id) {
        <a class="card pave" [routerLink]="['/realisations', r.slug]">
          <div class="pave-body">
            <h2>{{ r.nom }}</h2>
            <p>{{ r.descriptifCourt }}</p>
            <ul class="chips">@for (t of r.technologies; track t) { <li class="chip">{{ t }}</li> }</ul>
          </div>
        </a>
      }
    </div>
  `,
})
export class RealisationsListComponent {
  protected readonly p = inject(PortfolioService);
}
