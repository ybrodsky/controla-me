{
  "restartable": "rs",
  "ignore": [
    "public/*",
    ".git",
    "node_modules/*"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": [
    "bin/www",
    "app.js",
    "models",
    "routes",
    "middlewares"
    "config"
  ],
  "env": {
    "NODE_ENV": "development",
    "BLUEBIRD_WARNINGS": 0
  },
  "ext": "js json"
}
