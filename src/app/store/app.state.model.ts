import { Person } from "../components/person/models/person.model";
import { PersonFilter } from "../components/person/models/person-filter.model";

export type AppState = {
  persons: Person[];
  filter: PersonFilter;
};
