'use client';

import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Play0 from "../components/Instruction/play_0";

const Game: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <Play0 />
      </div>
    </ProtectedRoute>
  );
};

export default Game;