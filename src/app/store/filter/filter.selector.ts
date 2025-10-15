import { createFeatureSelector } from "@ngrx/store";
import { PersonFilter } from "../../models/person-filter.model";

export const selectFilter = createFeatureSelector<PersonFilter>('filter');
