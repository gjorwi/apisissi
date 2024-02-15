const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const datos=require('../config.js')

exports.addCeros = async (number, width) => {
  return new Promise(async resolve => {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
      if (number < 0) {
        resolve("-" + numberOutput.toString());
      } else {
        resolve(numberOutput.toString());
      }
    } else {
      if (number < 0) {
        resolve("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        resolve((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  })
};

exports.generarJWT  = (usuario) => {
  return new Promise(async resolve => {
    // Crea un objeto de carga con el ID de usuario
    const carga = {
      id: usuario._id,
      isAdmin:usuario.admin
    };
    // Firma el JWT usando la clave secreta
    const token = await jwt.sign(carga, datos.JWT_SECRET, {
      expiresIn: '1h', // Establece el tiempo de expiración en 1 hora
    });
    // Devuelve el JWT
    resolve( token)
  })
};

exports.comparePasswords= async(password, hash)=> {
  return await bcrypt.compare(password, hash);
}