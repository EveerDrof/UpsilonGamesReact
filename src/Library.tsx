import { useEffect, useState } from 'react';
import { authGetHeader, libraryUrl } from './constants';
import { GamesList } from './GamesList';
import { loadGamewRecords } from './utils';

export function Library({ setCurrentView,libraryGameRecords }: 
    { setCurrentView: Function,libraryGameRecords:any }) {
    return (
        <>
            {libraryGameRecords && libraryGameRecords?.length !== 0 ?
                <>
                    <h1>Library </h1>
                    <GamesList gamesRecords={libraryGameRecords.data} setCurrentView={setCurrentView} />
                </>
                :
                <h1>Library is empty</h1>
            }
        </>
    );
}