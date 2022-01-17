import { GameAddingForm } from './GameAddingForm';
import { ShortcutAddingForm } from './ShortcutAddingForm';

export function AdminView() {
  return (
    <div>
      <GameAddingForm />
      <ShortcutAddingForm />
    </div>
  );
}
