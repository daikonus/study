# MongoDB
## Version
- Windows(コマンドプロンプト)
C:\Users\d-noguchi>mongod --version
db version v4.2.1
git version: edf6d45851c0b9ee15548f0f847df141764a317e
allocator: tcmalloc
modules: none
build environment:
    distmod: 2012plus
    distarch: x86_64
    target_arch: x86_64

## 起動方法(Windows)
参考：MongoDB 3.0.6（Windows版）をインストールして起動するまでの手順
https://qiita.com/moto_pipedo/items/c3bb40370ba2792143ad#%E5%A4%96%E9%83%A8%E3%82%B5%E3%82%A4%E3%83%88%E6%A6%82%E8%A6%81%E3%81%A8%E9%81%8B%E7%94%A8%E6%96%B9%E6%B3%95%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

[通常の起動]
mongod --config <設定ファイルパス>

[サービスとして起動]
mongod --install --config <設定ファイルパス>

## 起動方法(Mac)
参考：Install MongoDB Community Edition on macOS
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
https://www.codexpedia.com/database/mongodb-mongod-start-and-stop/

デフォルト設定ファイル
/usr/local/etc/mongod.conf

[brewで起動]
brew services start mongodb-community
brew services stop mongodb-community

[mongodで起動]
mongod --config <設定ファイルパス> --fork
kill -9 <PID>

## DB操作Tips
### 頻出
`show <dbs/collections>` dbやcollectionsの一覧を表示
`db.<collections>.findOne` ランダムに1件抽出
`db.<collections>.update({name: "~~"}, {name: "--"})` 第一引数にヒットしたDocを第二引数に更新する
`db.<collections>.remove({name: "--"})` ヒットしたDocを削除する
`db.<collections>.deleteMany({})` collections内の全てのDocを削除する


### データ登録
`db.<collections>.insert()`

db.contacts.insert({
  name: "Jon Wexler",
  email: "jon@jonwexler.com" ,
  note: "Doecent guy."
})

db.contacts.insert({
  name: "Jon",
  favoriteSeason: "spring" ,
  countries_visited: 42
})


### データ取得
`db.<collections>.find()`
`db.<collections>.find({_id: ObjectId("#####")})`
