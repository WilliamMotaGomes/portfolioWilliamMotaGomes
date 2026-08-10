import { Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <p class="eyebrow">contact</p>
    <h1>Travaillons ensemble</h1>

    <p>
      <a [href]="'mailto:' + p.personne.email">{{ p.personne.email }}</a>
      @if (p.personne.telephone) { · {{ p.personne.telephone }} }
    </p>
    <ul class="chips">
      @for (r of p.personne.reseaux; track r.url) {
        <li><a class="chip" [href]="r.url" target="_blank" rel="noopener">{{ r.label }} ↗</a></li>
      }
    </ul>

    @if (envoye()) {
      <div class="contact-succes">
        <p class="eyebrow">message envoyé</p>
        <p>Merci ! Je vous répondrai dans les plus brefs délais.</p>
        <button class="btn-ghost" (click)="envoye.set(false)">Envoyer un autre message</button>
      </div>
    } @else {
      <form (submit)="envoyer($event)">
        <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />
        <label>Nom <input name="name" required /></label>
        <label>Email <input name="email" type="email" required /></label>
        <label>Message <textarea name="message" required></textarea></label>
        <button class="btn" type="submit" [disabled]="envoi()">
          {{ envoi() ? 'Envoi en cours…' : 'Envoyer le message' }}
        </button>
        @if (erreur()) {
          <p class="contact-erreur">Une erreur est survenue. Réessayez ou écrivez directement par email.</p>
        }
      </form>
    }
  `,
})
export class ContactComponent {
  protected readonly p = inject(PortfolioService);
  protected readonly envoye = signal(false);
  protected readonly envoi  = signal(false);
  protected readonly erreur  = signal(false);

  async envoyer(e: Event) {
    e.preventDefault();
    this.envoi.set(true);
    this.erreur.set(false);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    data.append('access_key', '1b24f0f0-1ae2-406b-9472-58380528d2c5');
    data.append('subject', 'Nouveau message — Portfolio William Mota Gomes');
    data.append('from_name', 'Portfolio Contact');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      if (res.ok) { this.envoye.set(true); form.reset(); }
      else { this.erreur.set(true); }
    } catch {
      this.erreur.set(true);
    } finally {
      this.envoi.set(false);
    }
  }
}
