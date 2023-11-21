import { RecoverPasswordToken, Usuario } from "../models/index.js";
import { generateRecoverToken } from "../utils/tokens.js";

import { transporter } from "../config/mailer.js";

class RecoverPasswordController {
  constructor() { }

  sendEmailForRecoverPassword = async (req, res, next) => {
    try {
      const { email, force } = req.body;

      if (!email) {
        const error = new Error("Email no Ingresado");
        error.status = 400;
        error.additionalData = { errorEmail: true };
        throw error;
      }

      const result = await Usuario.findOne({
        where: {
          email,
        },
      });

      if (!result) {
        const error = new Error("El email no esta Registrado");
        error.status = 400;
        error.additionalData = { errorEmail: true };
        throw error;
      }

      if (!result.activo) {
        const error = new Error("Error. El usuario se encuentra inactivo. Por favor comunicate con administración.");
        error.status = 400;
        throw error;
      }

      if (!force) {
        const tokenExistente = await RecoverPasswordToken.findOne({
          where: {
            idUsuario: result.idUsuario,
            isUsed: false,
            email: result.email,
          }
        });

        if (tokenExistente) {
          res.status(200).send({ success: true, message: "Ya Existe un Token creado para este usuario que aun no se a utilizado", tokenExistente: true });
        }
      }


      const token = generateRecoverToken(16);

      const resultToken = await RecoverPasswordToken.create({
        idUsuario: result.idUsuario,
        token,
        email: result.email,
      });

      if (!resultToken) {
        const error = new Error("Error. no se puedo generar el token de recuperacion");
        error.status = 400;
        throw error;
      }

      await transporter.sendMail({
        from: '"recover Password " <ignaciovarela7765@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Recuperar Contraseña Macabi", // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperación de Contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
      
          <table width="100%" cellspacing="0" cellpadding="0" style="margin: auto; max-width: 600px; padding: 20px; border-collapse: collapse;">
            <tr>
              <td align="center" style="background-color: #007BFF; padding: 20px;">
                <h2 style="color: #fff; margin: 0;">Recuperar Contraseña Macabi App</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p>Hola ${result.nombre},</p>
                <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has hecho esta solicitud, puedes ignorar este correo.</p>
                <p>En caso contrario, este es tu <b> Token </b> de recuperación</p>
                <p> <b> ${token} </b> </p>
                <p>¡Gracias!</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f4f4f4; padding: 10px;">
                <p style="margin: 0; color: #333;">&copy; 2023 Ort Dev Team. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
      
        </body>
        </html>
      `

      });

      res
        .status(200)
        .send({ success: true, message: "Email Enviado Exitosamente", tokenExistente: false });

    } catch (error) {
      next(error);
    }
  }

  recoverPassword = async (req, res, next) => {
    try {
      const { token, email, nuevaClave, confirmNuevaClave } = req.body;

      if (!token, !nuevaClave, !confirmNuevaClave) {
        const error = new Error("Error, no se han Ingresado todos los datos");
        error.status = 400;
        throw error;
      }

      if (!email) {
        const error = new Error("Error con el Email");
        error.status = 400;
        throw error;
      }

      if (nuevaClave == null || nuevaClave != confirmNuevaClave || nuevaClave.length < 8) {
        const error = new Error("Error, las claves ingresadas no son validas");
        error.status = 400;
        error.additionalData = { errorClaves: true };
        throw error;
      }

      const tokenExistente = await RecoverPasswordToken.findOne({
        where: { token, email }
      });

      if (!tokenExistente) {
        const error = new Error(`El token no es valido para el Email '${email}'`);
        error.additionalData = { errorToken: true };
        error.status = 400;
        throw error;
      }

      if (tokenExistente.isUsed) {
        const error = new Error(`El token ya fue utilizado`);
        error.additionalData = { errorToken: true };
        error.status = 400;
        throw error;
      }

      //ESTA TODO PELOTA, PODEMOS CAMBIAR LA CLAVE

      tokenExistente.isUsed = true
      tokenExistente.save()

      await Usuario.update(
        {
          clave: nuevaClave
        },
        {
          where: {
            idUsuario: tokenExistente.idUsuario
          },
          individualHooks: true, //esto hace que se pueda usar el hook beforeUpdate
        }
      );

      await RecoverPasswordToken.destroy({
        where: {
          idUsuario: tokenExistente.idUsuario,
          isUsed: false,
        }
      })

      res
        .status(200)
        .send({ success: true, message: "Clave Actualizada", tokenExistente: false });

    } catch (error) {
      next(error);
    }
  }

}

export default RecoverPasswordController;

