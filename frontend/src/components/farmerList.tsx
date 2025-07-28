import React from 'react';

interface Farmer {
  _id: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  active: boolean;
}

interface FarmerListProps {
  setSelectedFarmer: (farmer: Farmer) => void;
}

const FarmerList: React.FC<FarmerListProps> = ({ setSelectedFarmer }) => {
  const [farmers, setFarmers] = React.useState<Farmer[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/farmers')
      .then((response) => response.json())
      .then((data) => setFarmers(data))
      .catch((error) => console.error('Erro ao buscar agricultores', error));
  }, []);

  function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <div>
      <h2>Lista de Agricultores</h2>
      <ul>
        {farmers.map((farmer) => (
          <li key={farmer._id} className="farmer-card">
             <span className="farmer-info">
            <strong>{farmer.fullName}</strong> - CPF: {farmer.cpf} -
                {formatDate(farmer.birthDate)} - 
            Tel: {farmer.phone} - 
            Status: {farmer.active ? 'Ativo' : 'Inativo'}
            </span>
            <button onClick={() => setSelectedFarmer(farmer)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerList;