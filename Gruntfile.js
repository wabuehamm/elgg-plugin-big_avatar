module.exports = function (grunt) {

	var package = grunt.file.readJSON('package.json');

	// Project configuration.
	grunt.initConfig({
		pkg: package,
		// Bump version numbers
		version: {
			pkg: {
				src: ['package.json'],
			},
			manifest: {
				options: {
					pkg: grunt.file.readJSON('package.json'),
					prefix: '\<version type=\"dist\"\>'
				},
				src: ['manifest.xml'],
			}
		},
		clean: {
			release: {
				src: ['releases/']
			}
		},
		copy: {
			release: {
				src: [
					'**',
					'!**/.git*',
					'!releases/**',
					'!node_modules/**',
					'!package.json',
					'!package.json',
					'!Gruntfile.js',
				],
				dest: 'build/',
				expand: true
			},
		},
		compress: {
			release: {
				options: {
					archive: 'releases/<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				cwd: 'build/',
				src: ['**/*'],
				dest: '<%= pkg.name %>/',
				expand: true
			}
		},
		gitcommit: {
			release: {
				options: {
					message: 'chore(build): release <%= pkg.version %>',
				},
				files: {
					src: [ "manifest.xml", "package.json", "CHANGELOG.md"],
				}
			},
		},
		gitfetch: {
			release: {
				all: true
			}
		},
		gittag: {
			release: {
				options: {
					tag: '<%= pkg.version %>',
					message: 'Release <%= pkg.version %>'
				}
			}
		},
		gitpush: {
			release: {
			},
			release_tags: {
				options: {
					tags: true
				}
			}
		},
		gh_release: {
			options: {
				token: process.env.GITHUB_TOKEN,
				repo: package.repository.repo,
				owner: package.repository.owner
			},
			release: {
				tag_name: '<%= pkg.version %>',
				name: 'Release <%= pkg.version %>',
				body: grunt.file.read('release.md'),
				draft: false,
				prerelease: false,
				asset: {
					name: '<%= pkg.name %>-<%= pkg.version %>.zip',
					file: 'releases/<%= pkg.name %>-<%= pkg.version %>.zip',
					'Content-Type': 'application/zip'
				}
			}
		},
		conventionalChangelog: {
			options: {
				changelogOpts: {
					// conventional-changelog options go here
					preset: 'angular'
				}
			},
			release: {
				src: 'CHANGELOG.md'
			}

		}
	});
	// Load all grunt plugins here
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-gh-release');

	grunt.registerTask('readpkg', 'Read in the package.json file', function () {
		grunt.config.set('pkg', grunt.file.readJSON('package.json'));
	});

	// Release task
	grunt.registerTask('release', function (n) {
		var n = n || 'patch';
		grunt.task.run([
			'version::' + n,
			'readpkg',
			'conventionalChangelog:release',
			'gitfetch:release',
			'gitcommit:release',
			'gittag:release',
			'gitpush:release',
			'gitpush:release_tags',
			'clean:release',
			'copy:release',
			'compress:release',
			'gh_release',
		]);
	});
};