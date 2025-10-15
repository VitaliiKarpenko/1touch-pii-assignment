import { createAction, createReducer, on, props } from "@ngrx/store";
import { PersonFilter } from "../../models/person-filter.model";

export const updateFilter = createAction(
  '[Filter] Update Filter',
  props<{ filter: PersonFilter }>(),
);

export const initialFilterState: PersonFilter = {
  name: null,
  piiTypes: null,
};

export const filterReducer = createReducer(
  initialFilterState,
  on(updateFilter, (curState, { filter }) => filter),
);
