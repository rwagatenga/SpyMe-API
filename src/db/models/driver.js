module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    'Driver',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {},
  );
  Driver.associate = function(models) {
    Driver.belongsTo(models.car);
  };
  return Driver;
};
