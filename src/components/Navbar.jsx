import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">HYPER LIQUID</h1>
      <ConnectButton />
    </div>
  );
}

export default Navbar;
