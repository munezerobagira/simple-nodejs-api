"use strict";
const { Model } = require("sequelize");
const { hashSync } = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        async set(value) {
          this.setDataValue("password", hashSync(value, 10));
        },
      },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
