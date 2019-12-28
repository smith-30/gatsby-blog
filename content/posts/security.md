---
title: security 設定メモ
date: "2019-12-20T11:00:00.000Z"
template: "post"
draft: false
slug: "/posts/security-settings/"
category: "daily"
tags:
  - "study"
description: "security でやっとくことをまた調べないで済むようにしとく"
---

### サーバアプリケーション

- http header の最低限設定
  - https://qiita.com/sooogle/items/c066b0d69a81370653f7

### インフラ

- aws
  - cloudtrail
    - リソース操作の監査ログ
  - vpc flow logs
    - vpc 間の通信ログを有効化
  - ecr
    - コンテナ使うならそのスキャン。ゼロデイ対策に毎日やる
  - guard duty
    - ネットワークや不正ユーザなどの検知
  - WAF
    - アプリケーションエンドポイントの前段に設定
  - S3 は適切な公開範囲か
  - RDS などDBの中身は暗号化しているか