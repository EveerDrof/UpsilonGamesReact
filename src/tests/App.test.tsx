import App from '../App';
import { ReactWrapper,mount, shallow, ShallowWrapper } from 'enzyme';
describe('Home page top view test', () => {
  let app: ShallowWrapper;
  let carousel: ShallowWrapper;
  beforeAll(() => {
    app = shallow(<App />);
    carousel = app.find('Carousel');
  });
  test('Carousel is in the document', () => {
    expect(carousel.exists()).toBeTruthy();
  });
  test('Carousel has prop \naxis=horizontal',()=>{
    expect(carousel.prop('axis')).toBe('horizontal');
  });
  test('Header is at page',()=>{
    expect(app.find('Header').exists()).toBeTruthy();
  });
  test('Games list is set',()=>{
    expect(app.find('GamesList').exists()).toBeTruthy();
  });
});
