import { shallow, ShallowWrapper } from 'enzyme';
import { GamesList } from '../GamesList';
describe('Header test', () => {
  const gamesRecords = [
    {
      name: 'aaa',
      key: 1,
      avgMark: 8.5,
      price: 700,
      imageBlob: 'aaaa',
    },
    {
      name: 'bb',
      key: 2,
      avgMark: 9,
      price: 1400,
      imageBlob: 'bbbb',
    },
  ];
  let gamesList: ShallowWrapper;
  beforeAll(() => {
    gamesList = shallow(<GamesList gamesRecords={gamesRecords} />);
  });
  test('games list creates games shortcuts', () => {
    expect(gamesList.find('GameShortcut').length).toBe(2);
  });
});
