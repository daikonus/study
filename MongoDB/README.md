# MongoDB起動方法（Windows）
参考：MongoDB 3.0.6（Windows版）をインストールして起動するまでの手順
https://qiita.com/moto_pipedo/items/c3bb40370ba2792143ad#%E5%A4%96%E9%83%A8%E3%82%B5%E3%82%A4%E3%83%88%E6%A6%82%E8%A6%81%E3%81%A8%E9%81%8B%E7%94%A8%E6%96%B9%E6%B3%95%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

[通常の起動]
mongod --config C:\Users\d-noguchi\git\study\MongoDB\mongodb_win.conf

[サービスとして起動]
mongod --install --config C:\Users\d-noguchi\git\study\MongoDB\mongodb_win.conf
