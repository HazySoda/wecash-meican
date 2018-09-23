module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'comments',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, { tableName: 'comments' }
  )
}
