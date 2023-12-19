const Comida = require("../models/Comida");
const multer = require("multer");
const storage = require("../config/multer");

const Categoria = require("../models/Categoria");



const uploader = multer({
  storage,
}).single("imagen");

exports.getComidas = (req, res) => {
  try {
        Comida.findAll({
          include: {
            model: Categoria,
          },
        }).then((comidas) => {
          console.log(
            "Registros encontrados:",
            comidas.map((comida) => comida.toJSON())
          );
          res.json(comidas);
        });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.verificarComidas = async (req, res) => {
  try {
    verifyJwt(req, res, function (err) {
      if (err) {
        return res.status(500).send("Error de autenticación");
      } else {
        console.log("Correcto");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.postComidas = async (req, res) => {
  try {
    uploader(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error en la carga de archivos");
      }

      const { nombre, id_categoria, precio } = req.body;
      const fileName = req.file.originalname;
      const fileUrl = `http://localhost:4000/uploads/${req.file.originalname}`;

      Comida.create({
        nombre: nombre,
        id_categoria: id_categoria,
        precio: precio,
        fileName: fileName,
        fileUrl: fileUrl,
      })
        .then((comida) => {
          console.log("Registro creado exitosamente:", comida.toJSON());
          res.json("Registro creado exitosamente");
        })
        .catch((error) => {
          console.error("Error al crear el registro:", error);
          res.status(500).send("Hubo un error al crear el registro");
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarComida = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, id_categoria, precio } = req.body;
    Comida.update(
      {
        nombre: nombre,
        id_categoria: id_categoria,
        precio: precio,
      },
      { where: { id: id } }
    ).then((result) => {
      console.log("Registros actualizados:", result[0]);
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.verComida = async (req, res) => {
  try {
    verifyJwt(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de autenticación");
      } else {
        const id = req.params.id;
        Comida.findOne({ where: { id: id } }).then((comidas) => {

          if(comidas === null){
            console.log("Resultado vacio")
          }
          console.log("Registros encontrados:", comidas.dataValues);
          res.json(comidas.dataValues);
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error"); 
  }
};

exports.deleteComida = async (req, res) => {
  try {
    const comidaId = req.params.id;
    Comida.destroy({ where: { id: comidaId } }).then((result) => {
      console.log(result);
    });
    res.status(200).send("Comida eliminada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar la comida");
  }
};

exports.getComidaUsuario = async (req, res) => {
  try {
    Comida.findAll({
      include: {
        model: Categoria,
      },
    }).then((comidas) => {
      console.log(
        "Registros encontrados:",
        comidas.map((comida) => comida.toJSON())
      );
      res.json(comidas);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al mostrar");
  }
};

exports.getComidaPorCategoria = async (req, res) => {
  try {
    const nombreCategoria = req.params.id;

    console.log(nombreCategoria);

    const categoria = await Categoria.findOne({ where: { nombre: nombreCategoria } });

    console.log(categoria.dataValues.id_categoria);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    
    if (!categoria.dataValues.id_categoria) {
      return res.status(400).json({ mensaje: 'ID de categoría inválido' });
    }
    
    Comida.findAll({
      where: { id_categoria: categoria.dataValues.id_categoria},
      include: { model: Categoria }
    }).then((result) => {
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


exports.getComidaPorCategoriaBody = async (req, res)=>{
  try{
    
    const nombreCategoria = req.body.nombre;

    const categoria = await Categoria.findOne({ where: { nombre: nombreCategoria } });

    console.log(categoria.dataValues.id_categoria);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    
    if (!categoria.dataValues.id_categoria) {
      return res.status(400).json({ mensaje: 'ID de categoría inválido' });
    }
    
    Comida.findAll({
      where: { id_categoria: categoria.dataValues.id_categoria},
      include: { model: Categoria }
    }).then((result) => {
      console.log(result);
      res.json(result);
    });


  }catch(err){
    console.log(err)
  }
}