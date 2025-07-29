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
      <table>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer._id}>
              <td>{farmer.fullName}</td>
              <td>{farmer.cpf}</td>
              <td>{formatDate(farmer.birthDate)}</td>
              <td>{farmer.phone}</td>
              <td>{farmer.active ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button onClick={() => setSelectedFarmer(farmer)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerList;