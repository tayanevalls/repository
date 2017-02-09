
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Agrupar os arquivos JS
	concat: {
	    dist: {
	      src: ['src/js/bootstrap.js'],
	      dest: 'dist/js/main.min.js',
	    },
	  },


    //Minificar os arquivos JS
    uglify: {
        my_target: {
          options: {
              sourcemap: 'none',
          },
          files: {
            'dist/js/main.min.js': ['src/js/main.js']
          }
        }
      },

    //Minificar as imagens.
    imagemin: {
        public: {
         options: { //Opções de minificação
           optimizationLevel: 5,
           progressive: true
         },
        files: [{
         expand: true, //Adiciona os arquivos dinamicamente
         cwd: 'src/img',//Origem
         src: '**/*.{png,jpg,jpeg,gif}',//O que será minificado
         dest: 'dist/img'//Destino
         }]
        }
    },

    // Compilar o Sass para CSS
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/css/main.min.css': 'src/sass/main.scss'
        }
      }
    },

    //Monitorar os arquivos  SCSS e JS
    watch: {
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'src/js/main.js'
      }
    },

    //Apaga a pasta dist
    clean: {
      dist: {
        src: 'dist/' //pasta que será deletada
      }
    },

    //Copia os arquivos do projeto para a pasta dist.
    copy: {
     files: {
       cwd: 'src/', //Origem
       src: [
        'src/**/*.css', //O que será copiados   
        'src/**/*.scss', //Será ignorado
        'src/**/*.js',  //Será ignorado
        'src/**/*.min.js' //O que será copiados
       ],
       dest: 'dist/', //Destino
       expand: true
      }
    }

  });
		
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('default', ['dist', 'concat', 'uglify', 'imagemin', 'sass']);

};