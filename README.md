# Bōken App

Bōken is an iPad application for primary school pupils designed to help improve their written expression skills in French and at the same time develop their imaginations.

It uses
- [Brindille](https://github.com/brindille/brindille-es6) workflow
- [Phonegap](http://phonegap.com/)

## Install

Clone this repository and install the dependencies

```bash
rm -rf .git/
npm install
```

## File structure

Files are organised in a component structure: JavaScript, template and styles of a component are in the same folder. (ex: `/app/components/component-test`.)
Then, they will be build in the `/static/build` folder.

Images, fonts and other assets are in the `/static/{images,fonts}` folders.

## Tasks
Gulp tasks inspired by [firestarter](https://github.com/NorthKingdom/firestarter/)

### Dev

Builds CSS & JS files and watches for changes.

```bash
npm run dev
```

### Server

Executes dev task and run a local server.

```bash
npm start
```

### Production

Build the files and minify them.

```bash
npm run prod
phonegap run ios
```

## License

MIT
