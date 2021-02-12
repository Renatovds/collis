import { createConnection } from 'typeorm';
import { container } from 'tsyringe';
import UpdateCacheService from '@modules/Bonds/services/UpdateCacheService';
import UpdateCachePlans from '@shared/infra/services/UpdateCachePlans';
import ServerError from '@shared/errors/ServerError';

const ConnectionDatabase = ():Promise<void> => (

  createConnection('default').then(() => {
    const updateCacheService = container.resolve(UpdateCacheService);
    const updateCachePlans = container.resolve(UpdateCachePlans);

    updateCacheService.execute();
    updateCachePlans.execute();
  }).catch((err) => {
    throw new ServerError(err).sendMail();
  })

);
export default ConnectionDatabase;
