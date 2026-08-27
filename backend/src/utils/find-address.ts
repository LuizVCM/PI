import { BadRequestError } from "../errors/BadRequestError";

export interface AddressData {
  cep: string;
  cidade: string;
  estado: string;
  bairro: string | null;
  logradouro: string | null;
  erro?: boolean;
}
export async function fetchAddress(cep: string): Promise<AddressData> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  const data = await response.json();

  if (data.erro) {
    throw new BadRequestError("CEP não encontrado");
  }

  return {
    cep: data.cep,
    cidade: data.localidade,
    estado: data.estado,
    bairro: data.bairro,
    logradouro: data.logradouro,
  };
}
