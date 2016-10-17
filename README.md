# Visualizador de projetos Autocad em PDF

Maneira simples de visualizar arquivos PDF de um projeto em Autocad.

## Começando

Aplicação desktop desenvolvida em JavaScript. Utilizando o framework [Electron](https://github.com/electron/electron). Electron é um framework que permite que você escreve uma aplicação multiplataforma usando JavaScript, HTML e CSS. É baseada em [Node.js](https://nodejs.org) e [Chromium](http://www.chromium.org/). 

Baixe todas as dependências do projeto
``` js
$ npm install
```

Executar aplicação
``` js
$ npm start 
```

## Criando executavel da aplicação

Diretório
    * Diretório da aplicação
    
Plataforma
    * all
    * darwin 
    * linux
    * win32
     
Arquitetura
    * all
    * ia32
    * x64

``` js
$ electron-packager <diretorio> <nomeDaAplicação> --platform=<plataforma> --arch=<arquitetura> [optional flags...]
```

Exemplos
``` js
$ //Aplicação Windows
$ electron-packager ~/home/emikael/appExemplo  Visualizador-autocad --platform=win32 --arch=all
```
``` js
$ //Aplicação MacOS
$ electron-packager ~/home/emikael/appExemplo Visualizador-autocad --platform=darwin --arch=all
```
``` js
$ //Aplicação Linux
$ electron-packager ~/home/emikael/appExemplo Visualizador-autocad --platform=linux --arch=all
```

## Requisitos

* AngularJS (http://angularjs.org/)
* Electron (https://github.com/electron/electron)
* ng-flow (https://github.com/flowjs/ng-flow)
* angular-pdfview (https://github.com/Emikael/angular-pdfviewer)
* NodeJS (https://nodejs.org)

## Licença

MIT License

Copyright (c) 2016 Emikael Silveira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author
Emikael Silveira <emikael.silveira@gmail.com>