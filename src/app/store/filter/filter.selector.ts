import { createFeatureSelector } from "@ngrx/store";
import { PersonFilter } from "../../components/person/models/person-filter.model";

export const selectFilter = createFeatureSelector<PersonFilter>('filter');
