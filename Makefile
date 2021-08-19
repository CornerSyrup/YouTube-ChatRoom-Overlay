all: build

build:
	7z a build/ytco.zip manifest.json image/ *.js *.css *.html