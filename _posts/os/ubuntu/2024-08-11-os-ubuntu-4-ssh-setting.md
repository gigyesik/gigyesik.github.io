---
layout: post
title: SSH 연결을 위한 ubuntu 설정하기
date: 2024-08-11 20:48 +0900
categories: [os, ubuntu]
tag: [os, ubuntu, ssh, netplan]
---

> 포스팅의 내용
> 
> - 이 글에서는 [원격 우분투 서버(PC)에 ssh 연결하기][post-network-ssh-connect-origin] 글에 필요한 우분투 설정을 다룬다.
> - 위 글을 작성하면서 알게 된 cli command 정리이다.
> 

# SSH 연결을 위한 ubuntu 설정하기

## 연결된 인터넷 확인하기

- `sudo vi etc/netplan/50-cloud-init.yaml` 파일 확인
- 참고 : [우분투 와이파이 연결][post-os-ubuntu-connect-wifi]

## 방화벽 설정하기

### 방화벽 켜기

- `sudo ufw enable` (끄기는 `disable`)

### ssh 허용하기

- `sudo ufw allow ssh`

### 방화벽 상태 확인하기

- `sudo ufw status`
  - ssh 기본 포트인 `22/tcp` 가 ALLOW 상태여야 한다.

## SSH 서비스 작동 확인하기

- `systemctl status sshd`
  - Active : active(running) 상태이면 실행중이다.
  - 꺼져 있는 경우에는 `systemctl start sshd`

## SSH 서비스 옵션 변경하기

- `sudo vi etc/ssh/sshd_config` 파일 확인
  - `#` 처리된 부분은 주석으로, 기본값 설정이 들어있음
  - Port : 포트 변경시 주석 해제
- 옵션 변경 후 ssh 서비스 재시작
  - `sudo systemctl restart sshd`


[post-network-ssh-connect-origin]: https://gigyesik.github.io/posts/network-ssh-1-connect-origin/
[post-os-ubuntu-connect-wifi]: https://gigyesik.github.io/posts/os-ubuntu-3-connect-wifi/
