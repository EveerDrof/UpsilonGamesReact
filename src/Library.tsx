import { darkColor } from './Colors/colors';
import { GamesList } from './GamesList';

export function Library({
  setCurrentView,
  libraryGameRecords,
  type,
  updateRootElement,
}: {
  setCurrentView: Function;
  libraryGameRecords: any;
  type?: string;
  updateRootElement?: Function;
}) {
  return (
    <>
      {libraryGameRecords && libraryGameRecords?.length !== 0 ? (
        <>
          <h1 style={{ color: darkColor }}>Library </h1>
          <GamesList
            gamesRecords={libraryGameRecords}
            setCurrentView={setCurrentView}
            type='library'
            updateRootElement={updateRootElement}
          />
        </>
      ) : (
        <h1 style={{ color: darkColor }}>Library is empty</h1>
      )}
    </>
  );
}
