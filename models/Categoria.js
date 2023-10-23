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

    },

    idUsuario: {
      type: DT.INTEGER(),
      foreingKey: true,
      allowNull:true,
    }
  },
  {
    sequelize: connection,
    modelName: "Categoria",
    timestamps: false,
    validate: {
      async uniqueCategoryForSport() {
        console.log("Validación llamada con nombreCategoria:", this.nombreCategoria, "idDeporte:", this.idDeporte);
        const existingCategory = await Categoria.findOne({
          where: {
            nombreCategoria: this.nombreCategoria,
            idDeporte: this.idDeporte,
          },
        });
    
        if (existingCategory && existingCategory.idCategoria !== this.idCategoria) {
          throw new Error("Esta categoría ya existe para este deporte.");
        }
      },
    }
  }
    
);

export default Categoria;
