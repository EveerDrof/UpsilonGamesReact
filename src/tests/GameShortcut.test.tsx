import { shallow, ShallowWrapper } from 'enzyme';
import { GameShortcut } from '../GameShortcut';
describe('Header test', () => {
  let shortcut: ShallowWrapper;
  const name = 'name';
  const price = 999;
  const avgMark = 1;
  let picture = 'asdafsd';
  beforeAll(async () => {
    shortcut = shallow(
      <GameShortcut
        name={name}
        price={price}
        key={1}
        avgMark={avgMark}
        imageBlob={picture}
      />
    );
  });
  test('h4 texts are at the element', () => {
    expect(shortcut.find('h4').length).toBe(3);
  });
  test('name exists', () => {
    expect(shortcut.find('.gameShortcutName').text()).toBe(name);
  });
  test('price exists', () => {
    expect(shortcut.find('.gameShortcutPrice').text()).toBe(price + '');
  });
  test('mark exists', () => {
    expect(shortcut.find('.gameShortcutMark').text()).toBe(avgMark + '');
  });
  test('img exists', () => {
    expect(shortcut.find('.gameShortcutImage').exists()).toBeTruthy();
  });
  test('img src is set', () => {
    expect(shortcut.find('.gameShortcutImage').prop('src')).toBe(picture);
  });
});
