import { createSelector } from "@ngrx/store";
import { selectAllPersons } from "../persons/persons.selectors";
import { PersonDataSources } from "../../components/person/models/person.model";

export const selectPersonStatistic = createSelector(
  selectAllPersons,
  (persons) => {
    const { totalPiiItems, totalDataSources } = persons.reduce((acc, person) => {
      acc.totalPiiItems = Object.keys(person.pii).reduce((acc, piiType) => {
        acc += person.pii[piiType].length;
        return acc;
      }, acc.totalPiiItems);

      acc.totalDataSources = Object.keys(person.dataSources).reduce((acc, dataSource) => {
        acc += person.dataSources[<keyof PersonDataSources>dataSource].length;
        return acc;
      }, acc.totalDataSources);

    return acc;
    }, { totalPiiItems: 0, totalDataSources: 0 });

    return {
      totalPiiItems,
      totalPersons: persons.length,
      averageDataSources: +(totalDataSources / persons.length).toFixed(2),
    };
  },
);
