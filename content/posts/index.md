---
title: go の bufio Scanner の Scanで読み取れるのは65535byteまで
date: "2019-07-14T02:00:00.000Z"
template: "post"
draft: false
slug: "/posts/go-scanner/"
category: "tech"
tags:
  - "go"
description: "go の bufio Scanner でハマったこと"
---

## 3時間強ハマったので悔しいから書く  

タイトルの通りなのだが、競技プログラミングで文字列や数字を呼び出すために僕はいつもこのようにしていた

```
var sc = bufio.NewScanner(os.Stdin)

func init() {
	sc.Split(bufio.ScanWords)
}

func nextInt() int {
	sc.Scan()
	i, e := strconv.ParseInt(sc.Text(), 10, 64)
	if e != nil {
		panic(e)
	}
	return int(i)
}

func nextLine() string {
	sc.Scan()
	return sc.Text()
}


func main() {
    // 文字列読み込み
	s := nextLine()
}
```

けれど、max 2*10^5くらいの文字列を読んだときに軒並みテストが落ちる  
手元でわざわざそんな長さの文字列用意しないからロジックが違うんじゃないかとひたすらデバッグ  
他の人の答えをロジックだけ持ってきて、nextLine()を使うと落ちるということでココが悪いとわかった

内部のパッケージをみると

```
MaxScanTokenSize = 64 * 1024
```

とのこと。なので **65535**までは読み込める  


今後は下記にする。もう怖いし、コンテスト中ではペナルティつくので。

```
var n string
fmt.Scan(&n)
```

ちゃんと `sc.Err()` は用意されているから使うべきだったかな。。
