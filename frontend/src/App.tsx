import { useState } from 'react';
import FarmerForm from './components/farmerForm';
import  FarmerList  from './components/farmerList.tsx';
import './styles/global.css';
import './App.css';

function App() {
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  return (
    <div>
      <h1>Cadastro de Agricultores</h1>
      <FarmerForm selectedFarmer={selectedFarmer} setSelectedFarmer={setSelectedFarmer} />
      <FarmerList setSelectedFarmer={setSelectedFarmer} />
    </div>
  );
}

export default App;