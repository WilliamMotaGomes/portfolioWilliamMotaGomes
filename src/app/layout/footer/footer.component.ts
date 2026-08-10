import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <span>{{ p.personne.prenom }} {{ p.personne.nom }}</span>
      <a [href]="'mailto:' + p.personne.email">{{ p.personne.email }}</a>
      @for (r of p.personne.reseaux; track r.url) {
        <a [href]="r.url" target="_blank" rel="noopener">{{ r.label }}</a>
      }
    </footer>
  `,
  styles: [`
    .site-footer {
      display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;
      padding: 1.5rem; margin-top: 3rem;
    }
  `],
})
export class FooterComponent {
  protected readonly p = inject(PortfolioService);
}
