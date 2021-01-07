import { compare, hash } from 'bcrypt';
import IhashProvider from '../models/IHashProvider';

class BcryptHashProvider implements IhashProvider {
  public async hashGenerate(payload:string):Promise<string> {
    return hash(payload, 8);
  }

  public async hashCompare(payload:string, hashedPayload:string):Promise<boolean> {
    return compare(payload, hashedPayload);
  }
}

export default BcryptHashProvider;
