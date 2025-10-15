import { DisplayedProperty } from '../../models/property-list.model';
import { NormalizePropsPipe } from './normalize-props.pipe';

describe('NormalizePropsPipe', () => {
  const properties = {
    a: [1, 2],
    b: 'test',
    c: 42,
    d: null,
    e: undefined,
  };

  const propsList = [
    { property: 'c', label: 'C' },
    { property: 'a', label: 'A' },
    { property: 'b', label: 'B' },
    { property: 'd', label: 'D' },
    { property: 'e', label: 'E' },
    { property: 'f', label: 'F' },
  ];

  let pipe: NormalizePropsPipe;
  const compareFn = (a: DisplayedProperty, b: DisplayedProperty) => a.label.localeCompare(b.label);

  beforeEach(() => {
    pipe = new NormalizePropsPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if propsList is empty', () => {
    const result = pipe.transform({ a: 1 }, [], false, compareFn);
    expect(result).toEqual([]);
  });

  it('should return empty array if properties is empty', () => {
    const result = pipe.transform({}, [{ property: 'a', label: 'A' }], false, compareFn);
    expect(result).toEqual([]);
  });

  it('should normalize property values', () => {
    const result = pipe.transform(properties, propsList, false, compareFn);
    expect(result).toEqual([
      { label: 'C', value: ['42'] },
      { label: 'A', value: ['1', '2'] },
      { label: 'B', value: ['test'] },
    ]);
  });

  it('should sort propsList if isSorting is true', () => {
    const result = pipe.transform(properties, [...propsList], true, compareFn);
    expect(result[0].label).toBe('A');
    expect(result[1].label).toBe('B');
    expect(result[2].label).toBe('C');
  });
});
