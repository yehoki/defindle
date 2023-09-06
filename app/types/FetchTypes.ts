export type DictionaryModel = {
  meta: DictionaryMeta;
  hom: DictionaryHomograph;
  hwi: DictionaryHeadwordInformation[];
  shortdef: DictionaryShortDefinition[];
};

type DictionaryMeta = {
  id: string;
  uuid: string;
  sort: string;
  src: string;
  section: string;
  stems: string[];
  offensive: string;
};

type DictionaryHomograph = number;

type DictionaryHeadwordInformation = {
  hw: string;
  // Optional pronounciation -> will not be utilised
};

// type DictionaryVariant = {
//   va: string;
//   vl: string;
// }

// // fl
// type DictionaryFunctionalLabel = string;

// // lbs
// type DictionaryGeneralLabel = string;

type DictionaryShortDefinition = string;
