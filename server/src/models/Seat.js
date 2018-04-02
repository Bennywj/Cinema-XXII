module.exports = (sequelize, DataTypes) => 
  sequelize.define('Seat', {
    seat_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
})