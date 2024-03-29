const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')


// Configurar la conexión a MongoDB
// mongoose.connect('mongodb+srv://sissi:Jf18769212..@sissi.kyoemnz.mongodb.net/');
mongoose.connect('mongodb+srv://sissi:Jf18769212..@sissi.kyoemnz.mongodb.net/')
.then(() => {
  console.log('Conexión exitosa a la base de datos');
})
.catch((error) => {
  console.log('Error al conectar a la base de datos:', error);
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// Importar las rutas
const routes = require('./routes/mainRoutes');

// Usar las rutas en la aplicación
app.use(cors());
app.use('/', routes);
const PORT=process.env.PORT ?? 4000
// Iniciar el servidor
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});