// src/components/ClaimButton.js
import React from 'react';

const ClaimButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    🎯 Claim Points
  </button>
);

export default ClaimButton;
