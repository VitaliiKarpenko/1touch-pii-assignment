import { createAction, createReducer, on, props } from "@ngrx/store";
import { PersonFilter } from "../../components/person/models/person-filter.model";

export const updateFilter = createAction(
  '[Filter] Update Filter',
  props<{ filter: PersonFilter }>(),
);

export const initialFilterState: PersonFilter = {
  name: null,
  pii: null,
};

export const filterReducer = createReducer(
  initialFilterState,
  on(updateFilter, (curState, { filter }) => filter),
);
