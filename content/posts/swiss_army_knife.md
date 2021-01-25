---
title: swiss-army-knife
date: "2021-01-25T11:00:00.000Z"
template: "post"
draft: false
slug: "/posts/swiss-army-knife/"
category: "daily"
description: "よく調べることをまとめとくページ"

---

### git で remote に強制的に合わせたいとき

```
$ git fetch --prune
$ git reset --hard origin/<branch>
```

### git add 取り消し

```
$ git reset HEAD
```

### file 探したいとき

正規表現も使える

```
$ find . -name <name> -type f

# ディレクトリ含む
$ find . -name <name>
```

### merge commit を cherry-pick したい

```
$ git cherry-pick -m 1 <merge commit hash>
```

### postgres login

```
$ psql -h myhost -d mydb -U myuser
```