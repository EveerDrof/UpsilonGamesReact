import { AdminView } from './AdminElements/AdminView';

export function CabinetView() {
  if (localStorage.getItem('name') == 'admin') {
    return <AdminView />;
  }
  return <h1>User cabinet view</h1>;
}
