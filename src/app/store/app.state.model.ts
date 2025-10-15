import { Person } from "../models/person.model";
import { PersonFilter } from "../models/person-filter.model";

export type AppState = {
  persons: Person[];
  filter: PersonFilter;
};
