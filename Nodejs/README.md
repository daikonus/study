# プロジェクトの準備
## プロジェクト用のディレクトリを作成
$ mkdir <ProjectName> ; cd <ProjectName>

## Nodejsプロジェクトの初期化
$ npm init

nodemonによる起動設定を追加
===========================================================================
{
  "name": "mongoose_project",
  "version": "1.0.0",
  "description": "mongoose practice",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon main.js"
  },
  "author": "daikonus",
  "license": "ISC"
}
===========================================================================

## moduleの追加
Expressフレームワーク
EJSレイアウト
HTTPステータスコード
MongoDBのODM（ObjectDocumentMapper）
$ npm install express --save
$ npm install ejs express-ejs-layouts --save
$ npm install http-status-codes --save
$ npm install body-parser mongodb mongoose --save
