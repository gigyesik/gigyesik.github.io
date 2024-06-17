---
layout: post
title: 우분투 (ubuntu) 에 연결된 ip 주소 찾기
date: 2024-06-17 20:21 +0900
categories: [os, ubuntu]
tag: [os, operating system, linux, ubuntu, ip]
---

> 포스팅의 내용
> 
> - 우분투 IP 확인하는 방법

# ifconfig

- lo: 로컬
- enp: 유선
- wlp: 무선

```bash
ifconfig
```

ifconfig 가 설치되어 있지 않은 경우, net-tools 를 설치하면 된다.

```bash
sudo apt install net-tools
```

# ip addr

```bash
ip addr
```

# hostname -I

```bash
hostname -I
```
