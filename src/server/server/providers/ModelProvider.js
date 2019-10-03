import container from 'simple-di';

const UserModel = require('../models/UserModel');

container.register('userModel', () => {
  return new UserModel({ dbConnection: container.get('SQLConnection') });
});


