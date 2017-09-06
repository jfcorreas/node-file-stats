var fs = require('fs');
var dive = require('dive');
var moment = require('moment');

var PATH = process.argv[2] || process.cwd();

var ndirs = 0;
var nfiles = 0;

var start = new Date();

dive(PATH, { all: true, recursive: true, directories: true, files: false }, function(err, dir) {
  if (err) throw err;
  fs.stat(dir, function(err, stats) {
  	if (err) throw err;
  	if (stats.isDirectory()){
  		ndirs++;
      var files = fs.readdirSync(dir);
      if (files){
          nfiles += files.length;
          console.log('Directorio "' + dir + '": ' + files.length + ' ficheros.');
      }
  	}
  });
}, function() {
  nfiles -= ndirs;
  console.log('');
  console.log('Analisis de ' + PATH + ' Completado: ' + ndirs + ' directorios. ' + nfiles + ' ficheros.');
  console.log('(NOTA: a la cantidad de ficheros hay que sumarle los directorios del raíz + 1)');
  console.log('');

  var end = new Date();
  moment.locale('es_ES');
  console.log('');
  console.log('Inicio: ' + moment(start).format('dddd, DD [de] MMMM [del] YYYY, HH:mm:ss'));
  console.log('Fin: ' + moment(end).format('dddd, DD [de] MMMM [del] YYYY, HH:mm:ss'));
  console.log('');
  console.log('Tiempo de análisis: ' + moment(end).diff(start, 'seconds') + ' segundos.');
});
