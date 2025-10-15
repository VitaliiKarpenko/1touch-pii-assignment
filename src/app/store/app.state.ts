import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state.model";
import { personsReducer } from "./persons/persons.reducer";
import { filterReducer } from "./filter/filter.reducer";

export const reducers: ActionReducerMap<AppState> = {
  persons: personsReducer,
  filter: filterReducer,
};
