'use client';

import { logout } from '@/actions/logout';

export function LogoutButton() {
  return (
    <button
      className="btn btn-error w-20"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
}
