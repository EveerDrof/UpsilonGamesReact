import { useEffect, useState } from 'react';
import { AdminView } from './AdminElements/AdminView';
import { Cart } from './Cart';
import { darkColor } from './Colors/colors';
import {
  authGetHeader,
  buyCartUrl,
  cartUrl,
  getTextData,
  libraryUrl,
} from './constants';
import { Library } from './Library';
import { loadGamewRecords } from './utils';

export function CabinetView({ setCurrentView }: { setCurrentView: Function }) {
  const [cartGameRecords, setCartGameRecords]: [any, Function] = useState([]);
  const [libraryGameRecords, setLibraryGameRecords]: [any, Function] = useState(
    []
  );
  function loadAllRecords() {
    setCartGameRecords([]);
    setLibraryGameRecords([]);
    loadGamewRecords(cartUrl, setCartGameRecords, authGetHeader());
    loadGamewRecords(libraryUrl, setLibraryGameRecords, authGetHeader());
  }
  useEffect(() => {
    loadAllRecords();
  }, []);
  function sendBuyRequest() {
    fetch(buyCartUrl, { method: 'POST', headers: authGetHeader() }).then(() => {
      loadAllRecords();
      setCartGameRecords([]);
    });
  }
  if (localStorage.getItem('name') == 'admin') {
    return <AdminView />;
  }
  const textData = getTextData().cabinet;
  return (
    <div>
      <h1 style={{ color: darkColor }}>
        {textData.greeting} {localStorage.getItem('name')}
      </h1>{' '}
      <div>
        <Cart
          setCurrentView={setCurrentView}
          cartGameRecords={cartGameRecords}
          sendBuyRequest={sendBuyRequest}
          updateRootElement={loadAllRecords}
        />
        <Library
          setCurrentView={setCurrentView}
          libraryGameRecords={libraryGameRecords}
        />
      </div>
    </div>
  );
}
