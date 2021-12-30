import { useEffect, useState } from 'react';
import { authGetHeader, buyCartUrl, cartUrl } from './constants';
import { GamesList } from './GamesList';
import { GameRecord, loadGamewRecords } from './utils';
export function Cart({ setCurrentView,cartGameRecords,sendBuyRequest }
    : { setCurrentView: Function,cartGameRecords:any, sendBuyRequest:Function}) {
    return (
        <div>
            {cartGameRecords && cartGameRecords?.length !== 0 ?
                <>
                    <h1>Cart </h1>
                    <GamesList gamesRecords={cartGameRecords.data} setCurrentView={setCurrentView} />
                    <button onClick={() => { sendBuyRequest(); }}>Buy</button>
                </>
                :
                <h1> Cart is empty</h1>
            }
        </div>
    );
}