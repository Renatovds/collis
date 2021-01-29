interface IMailConfig {
  driver: 'ethereal' | 'locaweb';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Renato',
      email: 'renato@example.com',
    },
  },
} as IMailConfig;
