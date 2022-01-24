import './styles/Jumper.css';
export function Jumper() {
  return (
    <div
      className='jumper'
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      /\
    </div>
  );
}
