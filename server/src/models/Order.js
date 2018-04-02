module.exports = (sequelize, DataTypes) => 
  sequelize.define('Order', {
    booking_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticket_id: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    }
})