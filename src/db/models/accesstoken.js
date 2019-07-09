'use strict';

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    token: DataTypes.STRING
  }, {});
  AccessToken.associate = function(models) {
    AccessToken.hasOne(models.user);
  };
  return AccessToken;
};