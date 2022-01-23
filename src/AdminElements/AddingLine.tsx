import '../styles/AdminElements/AddingLine.css';
export function AddingLine({
  fieldName,
  setResult,
  valueType,
  isVertical,
}: {
  fieldName: string;
  setResult: Function;
  valueType?: string;
  isVertical?: boolean;
}) {
  if (!valueType) {
    valueType = 'text';
  }
  if (isVertical == undefined) {
    isVertical = true;
  }
  return (
    <div
      className='adding-line'
      style={{
        flexDirection: isVertical ? 'column' : 'row',
      }}
    >
      <h1>{fieldName}</h1>
      <input
        className='adding-line-input-elment'
        type={valueType}
        onChange={(evt) => {
          if (valueType == 'file') {
            setResult(evt.target.files![0]);
          } else {
            setResult(evt.target.value);
          }
        }}
      ></input>
    </div>
  );
}
