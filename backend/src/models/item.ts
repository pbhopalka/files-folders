import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connection";

class Item extends Model {
  public id!: number;
  public name!: string;
  public icon!: string;
  public folderId!: number | null;
  public order!: number;
}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Item",
  }
);

export default Item;
