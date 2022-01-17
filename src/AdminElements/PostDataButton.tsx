export function PostDataButton({
  text,
  sender,
}: {
  text: string;
  sender: () => void;
}) {
  return <button onClick={sender}>{text}</button>;
}
