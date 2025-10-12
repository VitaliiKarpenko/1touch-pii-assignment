import { PersonFilterPipe } from './person-filter.pipe';

describe('PersonFilterPipe', () => {
  it('create an instance', () => {
    let pipe = new PersonFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
