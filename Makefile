all: build

build: script style
	7z a out.zip ./dist/*

script:
	tsc

style:
	lessc src/style/overlay.less dist/overlay.css
	lessc src/style/popup.less dist/popup.css