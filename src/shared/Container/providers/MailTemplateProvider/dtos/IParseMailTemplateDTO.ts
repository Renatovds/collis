interface IVarialblesTemplate {
  [key: string]: string | number;
}
 interface IParseMailTemplateDTO {
  file: string;
  variables: IVarialblesTemplate;
}
export default IParseMailTemplateDTO;
