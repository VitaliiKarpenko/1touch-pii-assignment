import { createAction, createReducer, on, props } from "@ngrx/store";
import { Person } from "../../models/person.model";

export const initialPersonsState: Person[] = [];

export const updatePersons = createAction(
  '[Persons] Update Persons',
  props<{ persons: Person[] }>(),
);

export const personsReducer = createReducer(
  initialPersonsState,
  on(updatePersons, (curState, { persons }) => persons),
);
