import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  address: string;
}

const AddressPage: React.FC<Props> = ({ address }) => {
  return (
    <div>
      <h1>Address: {address}</h1>
      {/* Render your data here */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Fetch data based on the address
  // const response = await fetch(`https://api.example.com/data/${id}`); // Replace with your API endpoint
  // const data = await response.json();

  return {
    props: {
      address: id,
      // data,
    },
  };
};

export default AddressPage;
