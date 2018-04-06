module.exports = (sequelize, DataTypes) => 
  sequelize.define('Theater', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
})