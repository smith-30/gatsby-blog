---
title: isucon に向けた準備記録
date: "2020-09-13T09:00:00.000Z"
template: "post"
draft: false
slug: "/posts/isucon-ready/"
category: "daily"
tags:
  - "develop"
description: "Preparation record for isucon"
---

## このページについて

isucon 参加にあたって、middleware の設定、パフォーマンス計測方法など準備しといたことをまとめています。
OS は、ubuntu を想定しています。今回は NewRelic が使えたのでその項目もあります。

## 内容

## 各種コマンド

**登録サービスの起動・停止など**

```
$ systemctl -a # 一覧
$ systemctl status hoge.service
$ systemctl start hoge.service
$ systemctl stop hoge.service
$ systemctl restart hoge.service
```

**version 確認**

```
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.3 LTS
Release:    18.04
Codename:   bionic
```

**プロセス確認**

```
$ ps aux
```

**プロセスのログを拾う**

```
$ sudo journalctl -u sshd -f
$ journalctl -n 100 # 末尾から拾う
```

**設定値確認**

```
sysctl -a
```

**コード落としてくる**

```
$ scp -P 22 -r admin@domain.com:/home/admin/htdocs/index.html ./
```

## middleware install

### alp

```
$ sudo apt-get install wget
$ wget https://github.com/tkuchiki/alp/releases/download/v1.0.3/alp_linux_amd64.zip
$ unzip alp_linux_amd64.zip
$ sudo mv alp /usr/bin/
$ alp --version
```

```
$ sudo rm /var/log/nginx/access.log && sudo systemctl reload nginx
$ ./alp ltsv --file /var/log/nginx/access.log -m “/icons/.+”
```

### nginx

[https://サーバー構築と設定.com/?p=3100](https://xn--o9j8h1c9hb5756dt0ua226amc1a.com/?p=3100)

ロードバランス
[https://www.nedia.ne.jp/blog/tech/2016/08/04/7938](https://www.nedia.ne.jp/blog/tech/2016/08/04/7938)

### Redis

使い方とか

[http://redisgate.jp/redis/command/zincrby.php](http://redisgate.jp/redis/command/zincrby.php)

**4系**

```
$ sudo apt install redis
$ redis-server -v
Redis server v=4.0.9 sha=00000000:0 malloc=jemalloc-3.6.0 bits=64 build=9435c3c2879311f3
```

**5系**

```
$ sudo add-apt-repository ppa:chris-lea/redis-server
$ sudo apt update
$ sudo apt install redis
$ redis-server -v
Redis server v=5.0.6 sha=00000000:0 malloc=jemalloc-5.1.0 bits=64 build=9260170b247e88b
```

操作

```
# start は行っておく必要あり
$ sudo systemctl start redis-server
$ sudo systemctl stop redis-server
$ sudo systemctl restart redis-server
```

設定情報

```
$ sudo grep -v '^#' /etc/redis/redis.conf | grep -v '^$'
```

sorted set は zadd で使う

使い方は **zadd key score member**

**score**は 必ず**数字**

```
コマンド>	zadd myzip 60 "大阪"
結果>	1
コマンド>	zadd myzip 20 "東京"
結果>	1
コマンド>	zadd myzip 40 "横浜"
結果>	1
コマンド>	zrange myzip 0 -1   score順に表示される
1) 東京
2) 横浜
3) 大阪

削除
コマンド>	zremrangebyscore channel 1 10000
```

go-redis

[https://github.com/go-redis/redis](https://github.com/go-redis/redis)

### htop

```
sudo apt -y install htop
```

Shift+Mキーでメモリの使用率順

Sfhit+TキーでCPU使用時間の合計順

Shift+Iキーで昇順と降順を切り替えることができます

### mackerel

[https://mackerel.io/ja/docs/entry/howto/install-agent/deb](https://mackerel.io/ja/docs/entry/howto/install-agent/deb)

### NewRelic

[https://github.com/newrelic/go-agent](https://github.com/newrelic/go-agent)

## チューニング

アプリケーション終わって時間があったらやるくらいでよい

この辺はやっといてよいかも

```
# Too many open files 対策
fs.file-max = 600000
```

**OS設定**

参考

[https://note.com/ujisakura/n/n443807235887](https://note.com/ujisakura/n/n443807235887)

[http://netbuffalo.doorblog.jp/archives/4048147.html](http://netbuffalo.doorblog.jp/archives/4048147.html)

```
$ vi /etc/sysctl.conf

# TCPソケットの受信バッファの最大サイズ
net.core.rmem_max = 16777216
# TCPソケットの送信バッファの最大サイズ
net.core.wmem_max=16777216

# TCPソケットのバッファサイズ(最小値/初期値/最大値)
## 受信
net.ipv4.tcp_rmem = 4096 12582912 16777216
## 送信
net.ipv4.tcp_wmem = 4096 12582912 16777216

# SYN受信後のACK待ちキュー保持数( SYN flood 発生に影響あり)
net.ipv4.tcp_max_syn_backlog = 8192

# 同時に受け入れるTCP接続のソケット上限
net.core.somaxconn = 8192

# LISTENポート受信前のNICからOSへ渡すバッファリング領域
net.core.netdev_max_backlog = 5000

# FIN状態のコネクションの切断時間を短縮
net.ipv4.tcp_fin_timeout = 60→30

# ポート枯渇させないために IPv6 の無効化
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1

# TIME_WAIT状態のポート再利用を許可
net.ipv4.tcp_tw_reuse = 1

# Too many open files 対策
fs.file-max = 600000

# 同時に使用可能なスレッド上限 600000 でもよいかも
kernel.threads-max = 100000
# PID番号の上限値 ↑と同値にすること
kernel.pid_max = 100000
# メモリマップ領域の上限 kernel.threads-max の 2 倍にすること
vm.max_map_count = 200000

# 適用
$ sysctl -p
```

**mysql**

```
# 設定ファイル
$ mysql --help | grep my.cnf
```

```
ALTER TABLE t1 ADD INDEX (col1);
SHOW {INDEX | INDEXES | KEYS} {FROM | IN} *tbl_name*
```

order by のとき

```
SELECT ...略... FROM t1 WHERE col2 = 'ABC' ORDER BY col1 LIMIT 10;
ALTER TABLE t1 ADD INDEX (col2, col1);
```

### Go

### GOGC

この値をセットすると初期[ガベージコレクション](http://d.hatena.ne.jp/keyword/%A5%AC%A5%D9%A1%BC%A5%B8%A5%B3%A5%EC%A5%AF%A5%B7%A5%E7%A5%F3)の目標パーセンテージを設定出来る

デフォルトはGOGC=100

GOGC=offにすると[GC](http://d.hatena.ne.jp/keyword/GC)を切ることが出来る

swap 対策などにこまめにGCできる。スループットは落ちそう。

**profile**
[https://golang.org/pkg/net/http/pprof/](https://golang.org/pkg/net/http/pprof/)

```
# リモート接続できないとき
$ curl -s http://localhost:6060/debug/pprof/profile > cpu.pprof
$ scp -P 22 admin@domain.com:/home/admin/cpu.pprof ./
$ go tool pprof main cpu.pprof
> pdf

# できるとき
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### コード管理

**Makefile**

```
REVISION=$(shell git rev-parse --short HEAD)

build:
	GOARCH="amd64" GOOS="linux" go build -v -trimpath -ldflags "-X main.revision=$(REVISION)"

mac-build:
	go build -v -trimpath -ldflags "-X main.revision=$(REVISION)"

deploy: build
	ssh root@163.44.164.59 systemctl stop torb.go
	scp -P 22 torb root@163.44.164.59:/home/isucon/torb/webapp/go
	ssh root@163.44.164.59 systemctl start torb.go
	ssh root@163.44.164.59 systemctl enable torb.go
```

**go mod じゃなかったとき**

main.go の場所で 

```
$ go mod init
$ go mod tidy
$ make build
```
