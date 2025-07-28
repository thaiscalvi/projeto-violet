import React, { useEffect, useState } from 'react';
import { createFarmer, updateFarmer } from '../services/api';

interface Farmer {
  _id?: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  active: boolean;
}

interface FarmerFormProps {
  selectedFarmer: Farmer | null;
  setSelectedFarmer: (farmer: Farmer | null) => void;
}

const FarmerForm: React.FC<FarmerFormProps> = ({ selectedFarmer, setSelectedFarmer }) => {
  const [formData, setFormData] = useState<Farmer>({
    fullName: '',
    cpf: '',
    birthDate: '',
    phone: '',
    active: true,
  });

  useEffect(() => {
    if (selectedFarmer) setFormData(selectedFarmer);
  }, [selectedFarmer]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedFarmer && selectedFarmer._id) {
      await updateFarmer(selectedFarmer._id, formData);
    } else {
      await createFarmer(formData);
    }

    setFormData({ fullName: '', cpf: '', birthDate: '', phone: '', active: true });
    setSelectedFarmer(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nome completo" />
      <input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" />
      <input type="date" name="birthDate" value={formData.birthDate ? formData.birthDate.split('T')[0] : ''}
        onChange={handleChange} placeholder="Data de nascimento" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" />
      <button type="submit">{selectedFarmer ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
};

export default FarmerForm;