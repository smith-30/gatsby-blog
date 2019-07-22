---
title: 逆元を理解する
date: "2019-07-20T02:00:00.000Z"
template: "post"
draft: false
slug: "/posts/gyakugen/"
category: "tech"
tags:
  - "competitive programming"
  - "atcoder"
description: "逆元についてのメモ"
---

### 合同式

a と b を n で割った余りが等しいとき，合同式では  

$a ≡ b~mod~n$

と書ける  
ex.)  
$7 ≡ 4~mod~3$

**性質**

a ≡ b (mod m), c ≡ d (mod m) のとき、次のことが成り立つ

$a + c ≡ b + d (mod~m)$  
$a - c ≡ b - d (mod~m)$  
$ac ≡ bd (mod~m)$  
$a^n ≡ b^n (mod~m)$  

### 逆元

以下掛け算の話

b が a の逆元であるとはその元で計算したときに単位元になることを指す
単位元とはその元で演算しても元の値を変えない元のこと。つまり、掛け算で言うと `1`

$a*e = e*a = a$  

が成り立つとき、eは単位元であると言える

逆元の話に戻ると例えば、3の逆元は1/3になる

乗法の逆元を簡単に求めるにはフェルマーの小定理が使える

$a^{-1} ≡ a^{p-2} (mod~p)$


### 参考

- http://tsujimotter.hatenablog.com/entry/100th-power-of-three-modulo-19
- https://mathtrain.jp/mod
- https://gbb60166.jp/cipher/mathemat.htm
- http://www.tbasic.org/reference/old/Cong.html