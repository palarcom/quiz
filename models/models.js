var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var BD_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABSE_STORAGE;
// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(BD_name, user, pwd,
  {dialect: protocol, 
   protocol: protocol, 
   port: port,
   host: host,
   storage: storage,  // solo SQLite (.env)
   omitNull: true     // solo Postgres
  }
);

// Importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definicion de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function(count) {
    if(count === 0) { // La tabla se inicializa solo si esta vacia
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'        
                  })
      .success(function(){console.log('Base de datos inicializada')});
    };
  });
});

