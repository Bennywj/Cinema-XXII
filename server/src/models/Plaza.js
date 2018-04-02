module.exports = (sequelize, DataTypes) => 
  sequelize.define('Plaza', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    }
})