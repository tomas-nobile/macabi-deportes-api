import { Rol } from "../models/index.js";

const seedRol = async () => {
  try {
    await Rol.bulkCreate([
      {
        tipo: "A",
      },
      {
        tipo: "C",
      },
      {
        tipo: "P",
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedRol;