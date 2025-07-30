import React, { useEffect, useState } from "react";
import { createFarmer, updateFarmer } from "../services/api";

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

const FarmerForm: React.FC<FarmerFormProps> = ({
  selectedFarmer,
  setSelectedFarmer,
}) => {
  const [formData, setFormData] = useState<Farmer>({
    fullName: "",
    cpf: "",
    birthDate: "",
    phone: "",
    active: true,
  });

  useEffect(() => {
    if (selectedFarmer) setFormData(selectedFarmer);
  }, [selectedFarmer]);

  // Função para formatar o CPF enquanto digita
  function formatCPF(value: string) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Aplica a máscara de CPF
    if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    if (value.length > 6)
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 9)
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    return value;
  }

  // Função para formatar o número enquanto digita
  function formatPhone(value: string) {
    // Remove tudo que não é número
    value = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)/, "($1");
    }

    return value;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    if (name === "cpf") {
      const formattedCPF = formatCPF(value);
      setFormData((prev) => ({ ...prev, cpf: formattedCPF }));
    } else if (name === "phone") {
      const formattedPhone = formatPhone(value);
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // Função para validar CPF (apenas números, verifica dígitos verificadores)
  function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, ""); // remove tudo que não for número

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false; // CPF com todos os números iguais é inválido

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validarCPF(formData.cpf)) {
      alert("CPF inválido! Por favor, digite um CPF válido.");
      return;
    }

    if (selectedFarmer && selectedFarmer._id) {
      await updateFarmer(selectedFarmer._id, formData);
      alert("Agricultor atualizado com sucesso!");
    } else {
      await createFarmer(formData);
      alert("Agricultor cadastrado com sucesso!");
    }

    setFormData({
      fullName: "",
      cpf: "",
      birthDate: "",
      phone: "",
      active: true,
    });
    setSelectedFarmer(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Nome completo"
      />
      <input
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        placeholder="CPF"
        maxLength={14}
        readOnly={!!selectedFarmer}
        className={selectedFarmer ? "input-bloqueado" : ""}
      />
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate ? formData.birthDate.split("T")[0] : ""}
        onChange={handleChange}
        placeholder="Data de nascimento"
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Telefone"
      />

      <label>
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
        Ativo
      </label>

      <button type="submit">
        {selectedFarmer ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default FarmerForm;
