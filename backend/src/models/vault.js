const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const user = require('./user');

const Vault = sequelize.define('Vault', {
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
});

user.hasMany(Vault);
Vault.belongsTo(user);

module.exports = Vault;
