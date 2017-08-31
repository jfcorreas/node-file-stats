var fs = require('fs');
var dive = require('dive');
var moment = require('moment');

//var PATH = "c:/filestats/";
var PATH = process.argv[2] || process.cwd();
var periods = [0,0,0,0,0];
var nfiles = 0;
var ndirs = 0;

var start = new Date();

dive(PATH, { all: true, recursive: true, directories: true,  }, function(err, file) {
  if (err) throw err;
  fs.stat(file, function(err, stats) {
  	if (err) throw err;
  	if (stats.isDirectory()){
  		ndirs++;
  	} else {
	  	nfiles++;
		//console.log(' Analizando: '+ file);
	  	var lapso = moment(stats.atime).diff(stats.mtime, 'days');
	  	if ((lapso / 90) < 1) {
	  		periods[0]++;
	  	} else if ((lapso / 180) < 1) {
	  		periods[1]++;
	  	} else if ((lapso / 240) < 1) {
	  		periods[2]++;
	  	} else if ((lapso / 360) < 1) {
	  		periods[3]++;
	  	} else {
	  		periods[4]++;
	  	}
  	}
  });
}, function() {
  console.log('');
  console.log('Analisis de ' + PATH + ' Completado (' + nfiles + ' ficheros / ' + ndirs + ' directorios): ');
  console.log('');
  console.log(' - Menos de 3 Meses:\t ' + Math.floor((periods[0]*100)/nfiles) + '% (' + periods[0] + ' ficheros)');
  console.log(' - Entre 3 y 6 Meses:\t ' + Math.floor((periods[1]*100)/nfiles) + '% (' + periods[1] + ' ficheros)');
  console.log(' - Entre 6 y 9 Meses:\t ' + Math.floor((periods[2]*100)/nfiles) + '% (' + periods[2] + ' ficheros)');
  console.log(' - Entre 9 y 12 Meses:\t ' + Math.floor((periods[3]*100)/nfiles) + '% (' + periods[3] + ' ficheros)');
  console.log(' - Mas de 1 año:\t ' + Math.floor((periods[4]*100)/nfiles) + '% (' + periods[4] + ' ficheros)');

  var end = new Date();
  moment.locale('es_ES');
  console.log('');
  console.log('Inicio: ' + moment(start).format('dddd, DD [de] MMMM [del] YYYY, HH:mm:ss'));
  console.log('Fin: ' + moment(end).format('dddd, DD [de] MMMM [del] YYYY, HH:mm:ss'));
  console.log('');
  console.log('Tiempo de análisis: ' + moment(end).diff(start, 'seconds') + ' segundos.');
});
