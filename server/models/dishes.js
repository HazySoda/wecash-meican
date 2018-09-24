module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'dishes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shop_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, { tableName: 'dishes' }
  )
}
