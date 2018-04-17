module.exports = (sequelize, DataTypes) => 
  sequelize.define('Order', {
    order_id: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
})