import { darkColor } from './Colors/colors';
import { getTextData } from './constants';
import { GamesList } from './GamesList';
import './styles/Cart.css';
export function Cart({
  setCurrentView,
  cartGameRecords,
  sendBuyRequest,
  updateRootElement,
}: {
  setCurrentView: Function;
  cartGameRecords: any;
  sendBuyRequest: Function;
  updateRootElement?: Function;
}) {
  const textData = getTextData().cabinet;
  return (
    <div>
      {cartGameRecords && cartGameRecords?.length !== 0 ? (
        <>
          <h1 style={{ color: darkColor }}>{textData.cart}</h1>
          <GamesList
            gamesRecords={cartGameRecords}
            setCurrentView={setCurrentView}
            type='cart'
            updateRootElement={updateRootElement}
          />
          <button
            id='buy-cart-btn'
            onClick={() => {
              sendBuyRequest();
            }}
          >
            {textData.buyItems}
          </button>
        </>
      ) : (
        <h1 style={{ color: darkColor }}> {textData.cartIsEmpty}</h1>
      )}
    </div>
  );
}
