import ICompany from '@modules/Company/models/ICompany';

export default {
  nome: process.env.COMPANY_NAME,
  cnpj: process.env.COMPANY_CNPJ,
  endereco: process.env.COMPANY_ADDRESS,
  bairro: process.env.COMPANY_DISTRICT,
  cidade: process.env.COMPANY_CITY,
  estado: process.env.COMPANY_STATE,
  cep: process.env.COMPANY_ZIPCODE,
  telefones:
   { telefone1: process.env.COMPANY_PHONE_1, telefone2: process.env.COMPANY_PHONE_2 },
  whatsapp: process.env.COMPANY_WHATSAPP,
  facebook: process.env.COMPANY_FACEBOOK,
  instagram: process.env.COMPANY_INSTAGRAM,
  emails: { email1: process.env.COMPANY_EMAIL_1, email2: process.env.COMPANY_EMAIL_2 },
  site: process.env.COMPANY_SITE,

} as ICompany;
