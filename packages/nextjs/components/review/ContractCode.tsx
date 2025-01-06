'use client';

import React from 'react';
import CodeBlock from './CodeBlock';

interface Props {
  address: string;
  chainId: number;
  name: string
}

const ContractCode: React.FC<Props> = ({ address, name }) => {
  const contractName = `${address.slice(0, 6)}...${address.slice(-4)}.sol`;
  
  // Example contract code - you can replace this with actual contract code fetching
  const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${contractName.split('.')[0]} is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`;

  return (
    <div className="w-full">
      <CodeBlock
        code={code}
        language="solidity"
        fileName={`${name}.sol`}
      />
    </div>
  );
};

export default ContractCode;
