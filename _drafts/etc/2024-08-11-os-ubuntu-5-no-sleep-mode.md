---
layout: post
title: ubuntu 노트북 덮개를 닫아도 대기 모드에 들어가지 않게 설정하기
date: 2024-08-11 21:39 +0900
categories: [os, ubuntu]
tag: [ubuntu, 대기 모드, 노트북 덮개]
---

> 포스팅의 내용
> 
> - 우분투 서버 노트북에 ssh 연결을 시도하려고 했는데, 노트북 덮개를 닫으니 대기 모드로 진입해서 connection 이 이루어지지 않았다.
>

# ubuntu 노트북 덮개를 닫아도 대기 모드에 들어가지 않게 설정하기

## 노트북 덮개를 닫은 상태에서 연결 시도

- `ssh {username}@{public ip}` : Connection timed out

## 설정 파일

- `sudo vi etc/systemd/logind.conf`

### 설정 변경 옵션

- `HandleLidSwitch=ignore`

## 설정 파일 재시작

- `sudo systemctl restart systemd-logind`

## SSH 연결 재시도

- `ssh {username}@{public ip}` : 성공
