interface ChainLogos {
  [key: string]: string;
}

export const chainLogos: ChainLogos = {
  // Mainnets and their testnets
  "1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CpeE1_-s5xhQiZ0lgMIjP3CHh8BioFbYuQ&s", // Ethereum
  "5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CpeE1_-s5xhQiZ0lgMIjP3CHh8BioFbYuQ&s", // Goerli
  "11155111": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CpeE1_-s5xhQiZ0lgMIjP3CHh8BioFbYuQ&s", // Sepolia
  
  "10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s", // Optimism
  "420": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s", // Optimism Goerli
  
  "8453": "https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png", // Base
  "84531": "https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png", // Base Goerli
  
  "42161": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoHS4xKb5BIffwM58SvLRpOU99pznRZVtiA&s", // Arbitrum
  "421613": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoHS4xKb5BIffwM58SvLRpOU99pznRZVtiA&s", // Arbitrum Goerli
  
  "137": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyudckJZOkhk-RxzyKWJGdewhdzGU6bdSp8w&s", // Polygon
  "80001": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyudckJZOkhk-RxzyKWJGdewhdzGU6bdSp8w&s", // Mumbai
  
  "324": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpBJgnamIn8aDovKHxVIzpWKVRL8ri_jgnQ&s", // zkSync Era
  "280": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpBJgnamIn8aDovKHxVIzpWKVRL8ri_jgnQ&s", // zkSync Era Testnet
  
  "7777777": "https://avatars.githubusercontent.com/u/108458858?s=200&v=4", // Lens Network
  
  "81457": "https://cdn.prod.website-files.com/65a6baa1a3f8ed336f415cb4/65a6cc95aae1066cf96d497d_Logo%20Black%20on%20Yellow%20Background%402x.png", // Blast
  "168587773": "https://cdn.prod.website-files.com/65a6baa1a3f8ed336f415cb4/65a6cc95aae1066cf96d497d_Logo%20Black%20on%20Yellow%20Background%402x.png", // Blast Sepolia
  
  "9001": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1374UNxncmKYtzRTYoXJsskV3IVzCVmPEw&s", // Starknet
  
  "7777": "https://avatars.githubusercontent.com/u/129421375?s=280&v=4", // Hyperliquid
};

export function getChainLogo(chainId: string | number): string {
  const id = chainId?.toString();
  return chainLogos[id] || "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/27352611367183.562fb2319bbe5.jpg";
}
