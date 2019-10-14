---
title: データ指向アプリケーションデザインメモ3
date: "2019-10-14T11:00:00.000Z"
template: "post"
draft: false
slug: "/posts/mysql/"
category: "daily"
tags:
  - "study"
description: "mysqlに関して勉強した雑多なメモ"
---

## このページについて

mysql のロック周りをメインに勉強したことを書いておく。

## 内容

### インデックス周り

> インデックスのはたらきによって、テーブルアクセスしなくても良かった場合のことを、 カバリングインデックスと言います。

### ロック周り

どれもトランザクション中のロック

a -> b -> c の並びがあったときにbをfor updateでとったとき
bよりも前にある疑似レコードにかかるロックをinfimum、後ろにかかるロックをsupremumという
例えば、b 以降のデータのinsertを防ぎたいときはsupermumに対してロックがかかる

#### レコードロック

その名の通り対象レコードに変更がないようにロック

#### ギャップロック

インデックス <-> インデックスの区間内にかかるロック
insert 時に行が被らなければトランザクションが効いていてもブロックはされない
参考 インテンションロック


#### ネクストキーロック

対象インデックスの範囲のレコードとレコード間を埋める区間に対してロックがかかる


### 参考

https://blog.kamipo.net/entry/2013/12/03/235900
https://qiita.com/west-hiroaki/items/ea6ee53765282a9c86cb
https://qiita.com/nkriskeeic/items/24b7714b749d38bba87b
https://dev.mysql.com/doc/refman/5.6/ja/innodb-record-level-locks.html