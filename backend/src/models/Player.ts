import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Player extends Model {
  public id!: number;
  public username!: string;
  public score!: number;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Player',
  }
);

export default Player;
