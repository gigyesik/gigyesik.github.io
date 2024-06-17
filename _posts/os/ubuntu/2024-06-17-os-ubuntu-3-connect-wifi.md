---
layout: post
title: 우분투 (ubuntu) 에 wifi 연결하기
date: 2024-06-17 20:52 +0900
categories: [os, ubuntu]
tag: [os, operating system, linux, ubuntu, wifi]
---

> 포스팅의 내용
> 
> - 우분투 ip 주소를 확인하기 위해 ifconfig 설치를 시도했다.
> - 인터넷 연결이 되어 있지 않아 실패했다.

# 우분투에 wifi 연결

- 포스팅 상황의 우분투 버전은 24.04 LTS 이다.
- 네트워크 연결 설정 파일은 `/etc/netplan/50-cloud-init.yml` 이다.

## 50-cloud-init.yml

```bash
cd etc/netplan
sudo vi 50-cloud-init.yml
```

- 진입하면 기본 설정을 만날 수 있다.

```yaml
network:
  ethernets:
    enp2s0:
      dhcp4: true
  version: 2
  wifis: {}
```

## 수정 모드

- wifis 부분을 아래와 같이 수정한다.
- 수정 모드 단축키는 `i` 이다.

```yaml
  wifis:
    wlp1s0:
      optional: true
      access-points:
        "와이파이 호스트 이름":
          password: "패스워드"
      dhcp4: true
```

- 수정을 완료한 후 ESC, `:wq!` 를 통해 저장 후 파일을 닫는다.

## 네트워크 변경 사항 업데이트

```bash
sudo netplan apply
```

# 결과 확인

- ifconfig 를 설치하고 ip 주소를 받아본다.

```bash
sudo apt install net-tools
ifconfig
```
