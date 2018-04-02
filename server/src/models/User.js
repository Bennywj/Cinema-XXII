module.exports = (sequelize, DataTypes) => 
  sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
})