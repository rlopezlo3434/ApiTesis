//const Pago = require("../models/Pagos");

const FacturaDetalle = require("../models/FacturaDetalle");
const Factura = require("../models/Factura");
const Comida = require("../models/Comida")

exports.getPago = async (req, res) => {
  try {
    const facturas = await Factura.findAll();

    const detallesPromises = facturas.map(async (factura) => {
      const facturaDetalles = await FacturaDetalle.findAll({
        where: { factura_id: factura.factura_id },
      });

      factura.dataValues.detalles = facturaDetalles;
    });


    await Promise.all(detallesPromises);

    res.json(facturas);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


exports.instertFactura = async (req, res) => {
  try {
    const { user_email, comidas } = req.body

    let total = 0

    for (const comida of comidas) {
      const resultComida = await Comida.findOne({ where: { id: comida.id } })
      const precio = resultComida ? resultComida.precio : 0

      const cantidad = comida.cantidad
      total += precio * cantidad
    }

    const factura = await Factura.create({
      user_email: user_email,
      total: total,
    })

    for (const comida of comidas) {
      const resultComida = await Comida.findOne({ where: { id: comida.id } })
      const price = resultComida ? resultComida.precio : 0

      await FacturaDetalle.create({
        factura_id: factura.factura_id,
        comidaId: comida.id,
        cantidad: comida.cantidad,
        total: comida.cantidad * price,
      })
    }

    res.json("AGREGADO CORRECTAMENTE")
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

exports.getOneFactura = async (req, res) =>{
  try {

    const { factura_id } = req.body

    const facturas = await Factura.findAll({where: { factura_id:factura_id }});

    const detallesPromises = facturas.map(async (factura) => {
      const facturaDetalles = await FacturaDetalle.findAll({
        where: { factura_id: factura.factura_id },
      });

      factura.dataValues.detalles = facturaDetalles;
    });


    await Promise.all(detallesPromises);

    res.json(facturas);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// exports.postPago = async (req, res) => {
//   try {
//     const { nombre_usuario, correo_usuario, monto, comida } = req.body;

//     const pago = Pago.create({
//       nombre_usuario: nombre_usuario,
//       correo_usuario: correo_usuario,
//       monto: monto,
//       comida: comida
//     })
//       .then((result) => {
//         console.log("Registro creado exitosamente:", result.toJSON());
//         res.json("Pago registrado exitosamente");
//       })
//       .catch((error) => {
//         console.error("Error al realizar el pago:", error);
//         res.status(500).send("Hubo un error al realizar el pago");
//       });
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// };
