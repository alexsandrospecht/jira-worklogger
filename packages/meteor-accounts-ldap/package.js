Package.describe({
  name: 'alexsandrospecht:accounts-ldap',
  version: '1.2.0',
  summary: 'Accounts login for LDAP using ldapjs. Supports anonymous DN search & LDAPS.',
  git: 'https://github.com/typ90/meteor-accounts-ldap',
  documentation: 'README.md'
});


Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');

  api.use(['templating'], 'client');
  Npm.depends({
    ldapjs: '1.0.1'
  });

  api.use('accounts-base', 'server');
  api.imply('accounts-base', ['client', 'server']);
  api.imply('accounts-password', ['client', 'server']);

  api.use('check');

  api.addFiles(['ldap_client.js'], 'client');
  api.addFiles(['ldap_server.js'], 'server');

  api.export('LDAP', 'server');
  api.export('LDAP_DEFAULTS', 'server');
});
