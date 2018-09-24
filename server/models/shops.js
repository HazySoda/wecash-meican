module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'shops',
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
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dishes_count: {
        type: DataTypes.INTEGER,
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
    }, { tableName: 'shops' }
  )
}
