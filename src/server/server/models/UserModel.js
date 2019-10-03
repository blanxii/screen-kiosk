
  const Sequelize = require('sequelize');

  module.exports = class UserModel
  {
    constructor({ dbConnection }) {
      this._dbConnection = dbConnection;
      return this.init();
    }

    init() {
      const userSchema = this._dbConnection.define('tbl_user', {
        id: {
          type: Sequelize.INTEGER,
          field: 'i_id',
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          field: 's_email'
        }
      });
      userSchema.sync({ force: false });
      return userSchema;
    }
  };


