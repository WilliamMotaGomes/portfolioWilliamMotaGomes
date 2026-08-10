export type DomaineCompetence = 'technique' | 'humaine';

export interface Competence {
  id: string;
  slug: string;
  nom: string;
  domaine: DomaineCompetence;
  niveau: number;
  definition: string;
  preuves: Anecdote[];
  autocritique: Autocritique;
  evolution: Evolution;
  realisationIds: string[];
}

export interface Anecdote {
  recit: string;
  resultat: string;
  valeurAjoutee: string;
  realisationId?: string;
}

export interface Autocritique {
  maitrise: string;
  importance: string;
  vitesseAcquisition?: string;
  recul: string;
}

export interface Evolution {
  niveauVise: string;
  formations: string[];
}
