import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connection";

class Folder extends Model {
  public id!: number;
  public name!: string;
  public isOpen!: boolean;
  public order!: number;
}

Folder.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Folder",
  }
);

export default Folder;
