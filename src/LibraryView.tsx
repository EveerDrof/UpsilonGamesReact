import { useEffect, useState } from 'react';
import { Cart } from './Cart';
import { authGetHeader, buyCartUrl, cartUrl, libraryUrl } from './constants';
import { Library } from './Library';
import { loadGamewRecords } from './utils';

export function LibraryView({ setCurrentView }: { setCurrentView: Function }) {
    const [cartGameRecords, setCartGameRecords]: [any, Function] = useState([]);
    const [libraryGameRecords, setLibraryGameRecords]: [any, Function] = useState([]);
    function loadAllRecords() {
        loadGamewRecords(cartUrl, setCartGameRecords, authGetHeader());
        loadGamewRecords(libraryUrl, setLibraryGameRecords, authGetHeader());
    }
    useEffect(() => {
        loadAllRecords();
    }, []);
    function sendBuyRequest() {
        fetch(buyCartUrl, { method: 'POST', headers: authGetHeader() }).then(
            () => { loadAllRecords(); setCartGameRecords([]); }
        );
    }
    return (
        <div>
            <Cart setCurrentView={setCurrentView} cartGameRecords={cartGameRecords}
                sendBuyRequest={sendBuyRequest} />
            <Library setCurrentView={setCurrentView} libraryGameRecords={libraryGameRecords} />
        </div>
    );
}