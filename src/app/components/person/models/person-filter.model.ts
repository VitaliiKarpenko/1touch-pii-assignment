export type PersonFilterName = string | null;
export type PersonFilterPiiTypes = string[] | null;

export type PersonFilter = {
  name: PersonFilterName;
  piiTypes: PersonFilterPiiTypes;
};
