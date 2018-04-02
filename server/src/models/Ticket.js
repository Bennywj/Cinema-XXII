module.exports = (sequelize, DataTypes) => 
  sequelize.define('Ticket', {
    schedule_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seat_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
})