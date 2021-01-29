import { container } from 'tsyringe';
import mailConfig from '@config/mailConfig';
import RedisCacheProvider from './providers/implementations/RedisCacheProvider';
import ICacheProvider from './providers/models/ICacheProvider';
import '@modules/Users/providers/index';
import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';
import IMailProvider from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import LocaWebMailProvider from './providers/MailProvider/implementations/LocaWebMailProvider';

container.registerSingleton<ICacheProvider>('CacheProvider', RedisCacheProvider);
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider,
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(LocaWebMailProvider),
);
