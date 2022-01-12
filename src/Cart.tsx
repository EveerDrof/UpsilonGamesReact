import { useEffect, useState } from 'react';
import { authGetHeader, buyCartUrl, cartUrl } from './constants';
import { GamesList } from './GamesList';
import { GameRecord, loadGamewRecords } from './utils';
export function Cart({ setCurrentView, cartGameRecords, sendBuyRequest, updateRootElement }
    : {
        setCurrentView: Function, cartGameRecords: any, sendBuyRequest: Function,
        updateRootElement?: Function
    }) {
    return (
        <div>
            {cartGameRecords && cartGameRecords?.length !== 0 ?
                <>
                    <h1>Cart </h1>
                    <GamesList gamesRecords={cartGameRecords} setCurrentView={setCurrentView}
                    type='cart' updateRootElement={updateRootElement} />
                    <button onClick={() => { sendBuyRequest(); }}>Buy</button>
                </>
                :
                <h1> Cart is empty</h1>
            }
        </div>
    );
}