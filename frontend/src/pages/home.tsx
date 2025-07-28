import React, { useState } from 'react';
import FarmerForm from '../components/farmerForm';
import FarmerList from '../components/farmerList';

interface Farmer {
  _id?: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  active: boolean;
}

const Home = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  return (
    <div>
      <h1>Cadastro de Agricultores</h1>
      <FarmerForm selectedFarmer={selectedFarmer} setSelectedFarmer={setSelectedFarmer} />
      <hr />
      <FarmerList setSelectedFarmer={setSelectedFarmer} />
    </div>
  );
};

export default Home;