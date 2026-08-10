import { Injectable } from '@angular/core';
import {
  PERSONNE, PRESENTATION, COMPETENCES, REALISATIONS, EXPERIENCES,
} from '../data/portfolio.data';
import { Competence, DomaineCompetence } from '../models/competence.model';
import { Realisation } from '../models/realisation.model';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly personne = PERSONNE;
  readonly presentation = PRESENTATION;
  readonly competences = COMPETENCES;
  readonly realisations = REALISATIONS;

  private readonly compToReal = new Map<string, Set<string>>();
  private readonly realToComp = new Map<string, Set<string>>();

  constructor() {
    this.buildRelationGraph();
  }

  competenceBySlug(slug: string): Competence | undefined {
    return this.competences.find(c => c.slug === slug);
  }

  realisationBySlug(slug: string): Realisation | undefined {
    return this.realisations.find(r => r.slug === slug);
  }

  realisationById(id: string): Realisation | undefined {
    return this.realisations.find(r => r.id === id);
  }

  competencesParDomaine(domaine: DomaineCompetence): Competence[] {
    return this.competences
      .filter(c => c.domaine === domaine)
      .sort((a, b) => b.niveau - a.niveau);
  }

  realisationsDeCompetence(competenceId: string): Realisation[] {
    return [...(this.compToReal.get(competenceId) ?? [])]
      .map(id => this.realisationById(id))
      .filter((r): r is Realisation => !!r);
  }

  competencesDeRealisation(realisationId: string): Competence[] {
    return [...(this.realToComp.get(realisationId) ?? [])]
      .map(id => this.competences.find(c => c.id === id))
      .filter((c): c is Competence => !!c);
  }

  experiencesAntiChrono(): Experience[] {
    return [...EXPERIENCES].sort((a, b) => b.debut.localeCompare(a.debut));
  }

  private buildRelationGraph(): void {
    const link = (compId: string, realId: string) => {
      if (!this.compToReal.has(compId)) this.compToReal.set(compId, new Set());
      if (!this.realToComp.has(realId)) this.realToComp.set(realId, new Set());
      this.compToReal.get(compId)!.add(realId);
      this.realToComp.get(realId)!.add(compId);
    };

    for (const c of this.competences) {
      c.realisationIds.forEach(realId => link(c.id, realId));
      c.preuves.forEach(p => p.realisationId && link(c.id, p.realisationId));
    }
    for (const r of this.realisations) {
      r.competenceIds.forEach((compId: string) => link(compId, r.id));
    }
  }
}
