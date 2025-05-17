import React from 'react';

function AuthStatus() {
  const token = localStorage.getItem('accessToken');
  return (
    <div style={{ padding: "10px", fontWeight: "bold" }}>
      {token ? "You are logged in." : "You are not logged in."}
    </div>
  );
}

export default AuthStatus;
