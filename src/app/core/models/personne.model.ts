export interface Personne {
  prenom: string;
  nom: string;
  titre: string;
  photoUrl: string;
  accroche: string;
  email: string;
  telephone?: string;
  localisation?: string;
  reseaux: LienReseau[];
}

export interface LienReseau {
  label: string;
  url: string;
  icone?: string;
}

export interface PresentationGenerale {
  valeurs: string;
  projet: string;
  qualitesHumaines: string;
  centresInteret: string;
  langues?: string[];
}
