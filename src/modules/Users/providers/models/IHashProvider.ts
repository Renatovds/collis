/* eslint-disable semi */
export default interface IhashProvider {

    hashGenerate(payload:string): Promise<string>;
    hashCompare(payload:string, hashed:string):Promise<boolean>;

}
