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
    fetchFarmers();
  }, []);

  async function fetchFarmers() {
    try {
      const response = await fetch('http://localhost:3000/farmers');
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error('Erro ao buscar agricultores', error);
    }
  }

  async function handleDelete(farmer: Farmer) {
    if (farmer.active) {
      alert('Não é possível excluir um agricultor ativo. Desative-o antes.');
      return;
    }

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o agricultor ${farmer.fullName}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/farmers/${farmer._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Agricultor excluído com sucesso!');
        fetchFarmers(); // atualiza a lista
      } else {
        alert('Não foi possível excluir o agricultor.');
      }
    } catch (error) {
      alert('Erro ao tentar excluir agricultor');
      console.error(error);
    }
  }

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
                <button 
                  style={{ marginLeft: '8px', backgroundColor: '#d9534f', color: 'white' }}
                  onClick={() => handleDelete(farmer)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerList;