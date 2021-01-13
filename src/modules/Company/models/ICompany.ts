 interface ICompany {
  nome: string;
  cnpj:string;
  endereco:string;
  bairro:string;
  cidade:string;
  estado:string;
  cep?:string;
  telefones:{
    telefone1?:string;
    telefone2?:string;
  };
  emails:{
    email1?:string;
    email2?:string;
  };
  site?:string;
  whatsapp?:string;
  instagram?:string;
  facebook?:string;

}

export default ICompany;
