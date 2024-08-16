# NOTE
pemisahan directori didalam project

package.json

```js
{
  "name": "wibu-event",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "license": "MIT",
  "scripts": {
    "build": "rm -rf dist && tsc",
    "dev": "tsc --watch"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./client": {
      "import": "./dist/client/index.js",
      "require": "./dist/client/index.js",
      "types": "./dist/types/client/index.d.ts"
    },
    "./server": {
      "import": "./dist/server/index.js",
      "require": "./dist/server/index.js",
      "types": "./dist/types/server/index.d.ts"
    }
  },
  "dependencies": {
    "@hookstate/core": "^4.0.1",
    "dotenv": "^16.4.5",
    "firebase": "^10.12.5",
    "firebase-admin": "^12.3.1",
    "fs": "^0.0.1-security",
    "js-base64": "^3.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/bipproduction/wibu-event.git"
  },
  "keywords": [
    "template",
    "package",
    "package-template",
    "event",
    "realtime",
    "firebase"
  ],
  "author": "Makuro"
}
```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "declaration": true, 
    "declarationMap": true,  
    "emitDeclarationOnly": false,
    "outDir": "./dist",
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "declarationDir": "./dist/types",
  },
  "include": ["src/**/*", "bin/**/*"],
  "exclude": ["node_modules"]
}
```
