import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Categoria extends Model { }

Categoria.init(
  {

    idCategoria: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombreCategoria: {
      type: DT.STRING,
      allowNull: false,
  
    },

    idDeporte: {
      type: DT.INTEGER,
      foreingKey: true,
      allowNull:false,
       msg: "Error. Este deporte ya existe"
    },

    idUsuario: {
      type: DT.INTEGER(),
      foreingKey: true,
      allowNull:true,
    },
    //agrego estado
    activo: {
      type: DT.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    sequelize: connection,
    modelName: "Categoria",
    timestamps: false,
    validate: {
      async uniqueCategoryForSport() {      
        const existingCategory = await Categoria.findOne({
          where: {
            nombreCategoria: this.nombreCategoria,
            idDeporte: this.idDeporte,
          },
        });
    
        if (existingCategory && existingCategory.idCategoria != this.idCategoria) {
          throw new Error(`la categoria '${this.nombreCategoria}' ya existe en el deporte con id ${this.idDeporte}`);
        }
      },
    }
  }
    
);

export default Categoria;
