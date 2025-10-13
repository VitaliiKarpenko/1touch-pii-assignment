export type Person = {
  id: number;
  name: string;
  pii: Record<string, string[]>;
  dataSources: PersonDataSources;
};

export type PersonDataSources = {
  documents: string[];
  databases: string[];
  emails: string[];
  chats: string[];
};

export type PersonStatistic = {
  totalPersons: number;
  totalPiiItems: number;
  averageDataSources: number;
};
