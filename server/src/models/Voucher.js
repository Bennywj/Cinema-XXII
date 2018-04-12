module.exports = (sequelize, DataTypes) => 
  sequelize.define('Voucher', {
    voucher_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
})