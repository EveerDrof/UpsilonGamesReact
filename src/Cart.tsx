import { darkColor } from './Colors/colors';
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
  return (
    <div>
      {cartGameRecords && cartGameRecords?.length !== 0 ? (
        <>
          <h1 style={{ color: darkColor }}>Cart </h1>
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
            Buy items in cart
          </button>
        </>
      ) : (
        <h1 style={{ color: darkColor }}> Cart is empty</h1>
      )}
    </div>
  );
}
