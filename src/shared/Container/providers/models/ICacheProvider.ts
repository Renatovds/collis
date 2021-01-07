interface ICacheProvider {

  save(key:string, data:any):Promise<void>
  recover<T>(key:string):Promise<T | null>
  invalidate(key:string):Promise<void>
  invalidatePrefix(prefix:string):Promise<void>
}

export default ICacheProvider;
