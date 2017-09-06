var fs = require('fs');
var diveSync = require('diveSync');
var moment = require('moment');

var PATH = process.argv[2] || process.cwd();

var nfiles = 0;
var ndirs = 0;

var start = new Date();

diveSync(PATH, { all: true, recursive: true, directories: true, files: false  }, function(err, dir) {
  if (err) throw err;
  let stats = fs.statSync(dir);

	if (stats.isDirectory()){
		ndirs++;
    var files = fs.readdirSync(dir);
    if (files){
        nfiles += files.length;
        console.log('Directorio "' + dir + '": ' + files.length + ' objetos.');
    }
	}
});

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
