export type TypeExperience = 'entreprise' | 'formation' | 'certification';

interface ExperienceBase {
  id: string;
  type: TypeExperience;
  debut: string;
  fin?: string;
  logoUrl?: string;
}

export interface ExperienceEntreprise extends ExperienceBase {
  type: 'entreprise';
  poste: string;
  societe: string;
  responsabilite?: string;
  statut?: string;
  missions: string;
  realisationIds: string[];
  competenceIds: string[];
}

export interface ExperienceFormation extends ExperienceBase {
  type: 'formation';
  titre: string;
  etablissement: string;
  urlEtablissement?: string;
  presentation?: string;
}

export interface ExperienceCertification extends ExperienceBase {
  type: 'certification';
  intitule: string;
}

export type Experience =
  | ExperienceEntreprise
  | ExperienceFormation
  | ExperienceCertification;
