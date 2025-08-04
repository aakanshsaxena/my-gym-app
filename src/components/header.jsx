// src/components/Header.jsx
import React from 'react';

const Header = ({ username }) => {
  return (
    <header className="flex justify-end p-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-gray-200">{username}</span>
      </div>
    </header>
  );
};

export default Header;