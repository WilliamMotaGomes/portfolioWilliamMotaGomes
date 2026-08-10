export interface Realisation {
  id: string;
  slug: string;
  nom: string;
  descriptifCourt: string;
  imageUrl?: string;
  technologies: string[];
  liens: LienRealisation[];

  presentation: string;
  cadre: CadreProjet;
  etapes: string[];
  acteurs: string;
  resultats: string;
  lendemains: string;
  regardCritique: string;

  competenceIds: string[];
}

export interface CadreProjet {
  objectifs: string;
  contexte: string;
  enjeu: string;
  risques: string;
}

export interface LienRealisation {
  label: string;
  url: string;
}
