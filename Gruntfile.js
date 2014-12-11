module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        //verifico errores con JShint
        /*jshint: {
            miAppPreConcat: ['dev/js/src/**//*app*.js'],
            miAppPostConcat: ['dist/js/**//*app.js']
        },*/
        //concatenar mis archivos de javascrit en uno solo
        concat: {
            options: {
                separator: '\n\n'
            },
            myApp: {
                src: ['dev/js/src/**/app*.js'], //origen
                dest: 'dist/js/app.js' //destino
            }
        },
        //minificar el codigo javascript
        uglify: {
          myApp: {
              //opciones para la configuracion de uglify
              options: {
                  
                  sourceMap: 'dist/js/app.min.js.map', //genera el mapa javascript para el min
                  banner: '/* <%= pkg.name%> creada por jh7a */' //mensaje que aparecera en el tope de del rchivo minificado
              },
              files:{
                  'dist/js/app.min.js': 'dist/js/app.js',   //nombre de archivo que se creara y cual es su fuente
                  'dist/js/controllers/respuestaController.js':'dev/js/controllers/respuestaController.js',        
                  
              }
          }  
        },
        //Compilador de stylus a css
        stylus:{
            compile: {
                files:{
                    'dist/css/style.css':'dev/stylus/general.styl', //archivo de destino -- archivo origne
                    
                }
            }
            
        },
        
        /*jade: {
          compile: {
            options: {
              data: {
                debug: false
              }
            },
            files: {
              "dev/html/index2.html": [ "dev/jade/index.jade"]
            }
          }
        },*/
        
        //minificacion de html 
        htmlmin:{
            myApp: {
                options: {                                 // Target options
                    removeComments: true, //elimino los comentarios
                    collapseWhitespace: true 
                },
                files: {
                    'index.html':'dev/html/index.html' //destino: origen
                }
            }
        },
        
        //Est observando siempre, analizndo la causa
        watch:{
            scripts:{
                files:['dev/js/src/**/app*.js','dev/stylus/**/*.styl','dev/jade/*.jade','dev/html/*.html','dev/js/controllers/**/*.js'], //estos son los archivos bajo observacion
        	    tasks:['jshint','concat','uglify','stylus','htmlmin'/*,'jade'*/] //estas son las tareas que sigue
            } ,
            options: {
                livereload: true
            }
        }
    });
    //tareas a correr con ordern
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-jade');
    
    //grunt.loadNpmTasks('grunt-contrib-less');
    
    //creo la tarea por defecto para que escuche
    grunt.registerTask('default', ['watch']);
    //creo mi propia tarea llamada myApp
    grunt.registerTask('myApp',['jshint:miAppPreConcat','concat:myApp','jshint:miAppPostConcat','uglify:myApp']);
    
};