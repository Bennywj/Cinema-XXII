module.exports = (sequelize, DataTypes) => 
  sequelize.define('Ticket', {
    schedule_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seat_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
})