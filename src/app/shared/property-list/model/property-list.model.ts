export type Properties = Record<string, number | string | string[]>;

export type DisplayedProperty = { property: keyof Properties, label: string };
