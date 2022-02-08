import { darkColor } from './Colors/colors';
import { getTextData } from './constants';
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
  const textData = getTextData().cabinet;
  return (
    <>
      {libraryGameRecords && libraryGameRecords?.length !== 0 ? (
        <>
          <h1 style={{ color: darkColor }}>{textData.library} </h1>
          <GamesList
            gamesRecords={libraryGameRecords}
            setCurrentView={setCurrentView}
            type='library'
            updateRootElement={updateRootElement}
          />
        </>
      ) : (
        <h1 style={{ color: darkColor }}>{textData.libraryIsEmpty}</h1>
      )}
    </>
  );
}
