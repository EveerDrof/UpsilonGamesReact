import {  shallow, ShallowWrapper } from 'enzyme';
import { Header } from './Header';
describe('Header test', () => {
  let header: ShallowWrapper;
  beforeAll(() => {
    header = shallow(<Header />);
  });
  test('h2 texts are at the element', () => {
    expect(header.children().length).toBe(7);
  });
});
