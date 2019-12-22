---
title: beyond-prod を要約してみた
date: "2019-12-22T11:00:00.000Z"
template: "post"
draft: false
slug: "/posts/beyond-prod/"
category: "daily"
tags:
  - "study"
  - "survey"
description: "BeyondProd 読んだメモ"
---

## このページについて

これは、[BeyondProd](https://cloud.google.com/security/beyondprod/) を読んだ内容をまとめたメモになります[^1] (2019-12)

## どんなもの?

cloud-native アーキテクチャを google が利用する中で、インフラがどのように連携してサービスを保護しているかが書かれている(2019/12)

### マイクロサービス

アプリケーションが実行する `タスク` を個別のサービスとして切り離したもの。各サービスは

- 独自のAPI
- ロールアウト
- スケーリング
- クォータ管理

を使用して、個別に開発・管理ができる
マイクロサービスは `サービスID` を使って他のサービスに自身を認証させる。
 
### ワークロード

アプリケーションが完了する一意なタスク。ワークロードは1つまたは複数のマイクロサービスで構成される

### ジョブ

アプリケーションの一部を実行するマイクロサービスの単一インスタンス

### サービスメッシュ

サービス間通信のインフラストラクチャレイヤー。

- トラフィック制御
- ポリシー適用
- サービスコールの集中監視

↑を提供する

### BeyondProd

マイクロサービスを保護するためのコードの変更方法、ユーザデータへのアクセス方法が定義されている。
**モチベーション**
google はインフラストラクチャと開発プロセスを変更した。コンテナとコンテナオーケストレーションに移行していくなかで、境界モデルのセキュリティでは攻撃者が突破できてしまったらネットワーク内を自由に行動できてしまうことを危惧した。インフラ全体でセキュリティ制御が必要になるのだが、開発者がセキュリティ機能を実装せずに安全にアプリケーションを開発できるようにしていった。サービスの信頼は実際のネットワークの場所に依存しないようにする。つまり、ネットワーク関係なしにサービス間でのデータのやりとりに様々な制御をかけられる。

### コンテナ化されたマイクロサービス

そもそもコンテナ・マイクロサービス・コンテナオーケストレーションに移行していったのは、単一障害点を減らしつつ、可用性を上げていくため。google で使われているコンテナオーケストレーションは `Borg`。小さく区切られているためメンテナンスもしやすい。マイクロサービスアーキテクチャを備えたコンテナライズされたインフラストラクチャへの移行をクラウドネイティブという。

### BeyondCorp

ユーザの信頼はプライベートなネットワークへの接続可否ではなく、利用されるデバイスのコンテキスト認識状態の特性に依存する必要があるとしている

### クラウドネイティブでのセキュリティ原則


ホストとコンテナ間のセキュリティには `gVisor` を使っている。ホストとコンテナの間に抽象層をおき、セキュリティを強化している。コンテナからのシステムコールをスティールし、ホスト側のシステムコールを行う。ワークロードの分離に一役買っている。google で上述のBorgで管理しているjobの内側にgVisorがあり、その内部にコンテナイメージがある。

参考
- https://www.slideshare.net/uzy_exe/201805gvisorintroduciton


### google の移行プロセス

まずはインフラの認証基盤から作った。その後、ptraceが使える信頼できないコードを実行する環境を作り始めた。

**ptraceはプロセスをラップしてトレースできるようにしてくれるシステムコール**

参考
- https://blog.ishikawa.tech/entry/2017/08/30/025320


## 次に読むべき論文は?

[google の infrastructure の設計](https://cloud.google.com/security/infrastructure/design/)

[Borgのバイナリ認証ホワイトペーパー](https://cloud.google.com/security/binary-authorization-for-borg/)

[Borgの教訓](https://queue.acm.org/detail.cfm?id=2898444)

[Borg whitepaper](https://research.google.com/pubs/pub43438.html?hl=es)

[ATLS](https://cloud.google.com/security/encryption-in-transit/application-layer-transport-security/)

[GFEのルーティング](https://cloud.google.com/security/encryption-in-transit/#how_traffic_gets_routed)
