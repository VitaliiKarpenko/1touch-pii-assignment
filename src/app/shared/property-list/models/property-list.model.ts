export type Properties = Record<string, any>;

export type DisplayedProperty = { property: keyof Properties, label: string };

export type NormalizedProperty = { label: string, value: string[] };
