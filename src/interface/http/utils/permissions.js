const superAdminPermissions = [
    {
      role: 'superAdmin',
      description: 'Has site wide access to all admin functionalities',
      permissions: [
        'create-admin-data',
        'read-admin-data',
        'read-user-data',
        'update-admin-data',
        'delete-admin-data',
        'delete-user-data',
        'restore-admin-account',
        'restore-community',
      ],
    },
  ];
  
  const adminPermissions = [
    {
      role: 'admin',
      description: 'can perform other admin functionalities except delete',
      permissions: [
        'create-admin-data',
        'read-admin-data',
        'read-user-data',
        'update-admin-data',
        'restore-community',
      ],
    },
  ];
  
  export {
    superAdminPermissions,
    adminPermissions,
  };
  