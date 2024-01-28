const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
    };
    // Firma el JWT usando la clave secreta
    const token = await jwt.sign(carga, 'Una vaina loca', {
      expiresIn: '1h', // Establece el tiempo de expiración en 1 hora
    });
    // Devuelve el JWT
    resolve( token)
  })
};
exports.verifyToken = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization');

  // Check if the token is valid
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'Una vaina loca', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // If the token is valid, add the decoded user ID to the request object
    req.userId = decoded.id;

    // Call the next middleware or route handler
    next();
  });
};
exports.comparePasswords= async(password, hash)=> {
  return await bcrypt.compare(password, hash);
}