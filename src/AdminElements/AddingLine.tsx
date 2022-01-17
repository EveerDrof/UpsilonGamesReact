export function AddingLine({
  fieldName,
  setResult,
  type,
}: {
  fieldName: string;
  setResult: Function;
  type?: string;
}) {
  if (!type) {
    type = 'text';
  }
  return (
    <div>
      <h1>{fieldName}</h1>
      <input
        type={type}
        onChange={(evt) => {
          if (type == 'file') {
            setResult(evt.target.files![0]);
          } else {
            setResult(evt.target.value);
          }
        }}
      ></input>
    </div>
  );
}
