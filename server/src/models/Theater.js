module.exports = (sequelize, DataTypes) => 
  sequelize.define('Theater', {
    theater_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
})