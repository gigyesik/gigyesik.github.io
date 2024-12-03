---
layout: post
title: 원격 우분투 서버(PC)에 ssh 연결하기
date: 2024-08-11 18:01 +0900
categories: [network, ssh]
tag: [network, ssh, ubuntu, port forwarding]
---

> 포스팅의 내용
> 
> - 이 포스팅에서는 [설치한 우분투][post-ubuntu-install-ubuntu] PC 에 외부에서 접속하는 방법을 다룬다.
> - 지식이 없어 애를 많이 먹었다. 처음 해보겠다고 생각한지 한참만에 성공했다.
> - 결론만 확인하고 싶다면 시행착오 부분은 건너뛰면 된다.

# 원격 우분투 서버(PC) 에 SSH 연결하기

## SSH 란 무엇인가

- SSH 는 Secure SHell 의 약자로, 네트워크상의 다른 컴퓨터에 연결해 명령을 실행할 수 있게 해주는 프로토콜이다.
- 내 컴퓨터로 서버 컴퓨터 내부를 직접 조작하기 위해 사용한다.

## 원격 PC 의 인터넷 연결 정보 확인하기

- [연결해둔 WIFI][post-ubuntu-connect-wifi] 설정을 확인하고, [IP 정보][post-ubuntu-get-ip-addr]도 확인한다. 

### 시행착오 1 (private IP 에 SSH 시도)

- `ifconfig` 로 판단한 '원격 PC' 의 IP 는 `192.168.0.2` 라고 생각했다.
  - 이 경우 '내 PC' 가 같은 WIFI 로 연결되어 있다면 SSH 연결을 성공할 수 있다. 
    - `ssh gigyesik@192.168.0.2` -> 성공
  - 하지만 '내 PC' 가 다른 WIFI 로 연결되어 있다면 SSH 연결이 되지 않는다.
    - '내 PC' 를 휴대폰 핫스팟에 연결 후 SSH 연결 -> 실패 (Operation timed out)
    - 여기서 SSH 연결을 디버깅하고 싶으면 `-v` 옵션을 붙여주면 된다. `ssh -v {username}@{ip}`
      ```Shell
        OpenSSH_9.6p1, LibreSSL 3.3.6
        debug1: Reading configuration data /Users/gigyesik/.ssh/config
        ...
        debug1: Connecting to 192.168.0.2 [192.168.0.2] port 22.
        debug1: connect to address 192.168.0.2 port 22: Operation timed out
        ssh: connect to host 192.168.0.2 port 22: Operation timed out
      ```
- 아무것도 모르고 있다. 이대로는 원격에서는 연결이 불가능하다.
- 기초적인 학습이 선행되어야 한다고 생각해 [혼자 공부하는 네트워크][post-book-self-learning-network-init] 를 읽었다.

## 공유기 포트 포워딩 설정하기

- 위의 네트워크 공부 결과 내가 알아낸 IP 는 [private IP][post-book-self-learning-network-network-layer] 로, '공유기'가 할당한 내부 IP 임을 알았다.
- 그렇다면 '공유기'의 public IP 를 알아내서, 그 공유기의 주소로 SSH 연결을 시도해야 한다.
  - 여기서 포트 포워딩이 필요하다. '공유기'의 IP 주소를 안다고 해서 공유기에 연결된 모든 네트워크 장치의 private IP 를 알 수 없기 때문이다.
  - 즉 `public IP` 에 위치한 내 '원격 PC' 로 연결해달라 -> '원격 PC' 를 '공유기'의 어느 포트에 물려놓았는지? -> ??? .. 이런 상황이다.
  - 특정 포트로 접근했을 때 바로 내 '원격 PC' 로 연결되도록 포트 포워딩(port forwarding)을 설정해야 한다,

### 공유기의 public IP 알아내기

- GUI 환경이라면 인터넷에 연결된 채로 구글에 `what is my ip` 라고 검색한다.
  ![](/assets/img/2024-08-11/2024-08-11-network-ssh-1-connect-origin-1-what-is-my-ip.png)
- CLI 환경이라면 `curl ipinfo.io/ip` 를 입력한다.
  - '원격 PC' 는 우분투 CLI 환경이므로 curl 을 사용한다.

### 시행착오 2 (iptime 공유기 포트포워딩 설정)

- 실패했지만 다른 곳의 네트워크 구성 환경이었다면 가능했을 수 있어 기록으로 남겨둔다.
- iptime 공유기(A1004NS)의 관리 페이지인 `192.168.0.1` 에 브라우저를 통해 접속한다. (이하 펌웨어 12.16.2 기준)
- `고급 설정 -> 네트워크 관리 -> DHCP 서버 설정` 에서 내 '원격 PC' 의 private IP 를 고정한다.
  - 이는 와이파이 연결을 끊었다가 재시도 하더라도 공유기가 MAC 주소를 인식해 동일한 포트 포워딩 설정을 가져가게 하기 위함이다.
  ![](/assets/img/2024-08-11/2024-08-11-network-ssh-1-connect-origin-2-iptime-dhcp.png)
- `고급 설정 -> NAT/라우터 관리 -> 포트포워드 설정` 에서 포트포워딩을 규칙을 추가한다.
  - 규칙의 내용은 `공유기 IP:외부 포트 -> private IP:내부 포트` 이다.
  - 외부 포트에 well-known port 를 사용하면 공격의 위험이 있으므로, 임의의 숫자를 사용해보았다.
  ![](/assets/img/2024-08-11/2024-08-11-network-ssh-1-connect-origin-3-iptime-port-forwarding.png)
- 위에서 알아낸 public ip 와 포트 옵션을 사용해서 SSH 연결 시도 -> 실패 (Operation timed out)
  - 특정 포트로 연결하려면 `-p` 옵션을 사용한다. `ssh {username}@{ip} -p {port number}`
- 원래는 여기서 성공했어야 했다.
  - 원인은 내 iptime 공유기가 사실 public ip를 갖고 있는 것이 아닌 윗단계 공유기로부터 private ip 를 할당받아 분배중인 네트워크 구성이었기 때문이다.
  - 공유기 관리자 페이지에는 연결되어 있는 동적 IP 주소가 나와있는데, 거기에 private IP 대역인 `192.168.0.0` 이 나와있었다.
  ![](/assets/img/2024-08-11/2024-08-11-network-ssh-1-connect-origin-4-iptime-problem.png)

### 포트 포워딩 설정하기 (유플러스 공유기 포트포워딩 설정)

- 먼저 '원격 PC' 에 공유기 와이파이를 연결한다.
- 모체 공유기 관리자 페이지 접속 (필자는 유플러스 사용. 관리자 페이지 `192.168.219.1`)
  - 초기 로그인 비밀번호는 공유기 바닥에 적혀있는 `관리자 웹 접속 암호` 를 입력한다.
- `네트워크 설정 -> NAT 설정 -> 포트 포워딩 -> 포트포워딩 추가` 규칙 생성
  ![](/assets/img/2024-08-11/2024-08-11-network-ssh-1-connect-origin-6-uplus-port-forwarding.png)
  - 서비스 포트 : 임의의 포트
  - 프로토콜 : TCP/IP
  - 내부 IP 주소 : '원격 PC' 의 ifconfig 결과
  - 내부 포트 : 22 (SSH well known port)

## 원격 PC ssh 설정 확인하기

- [SSH 연결을 위한 우분투 설정하기][post-os-ubuntu-ssh-setting]

## 연결 확인하기

### 내부 네트워크

- '내 PC' 와 '원격 PC' 동일 와이파이 연결
- `ssh {username}@{public ip} -p {forwaring port}` : 성공
- `ssh {username}@{private ip}` : 성공

### 외부 네트워크

- '내 PC' 와 '원격 PC' 다른 와이파이 연결
- `ssh {username}@{public ip} -p {forwaring port}` : 성공
- `ssh {username}@{private ip}` : 실패


[post-ubuntu-install-ubuntu]: https://gigyesik.github.io/posts/os-ubuntu-1-install-ubuntu/
[post-ubuntu-connect-wifi]: https://gigyesik.github.io/posts/os-ubuntu-3-connect-wifi/
[post-ubuntu-get-ip-addr]: https://gigyesik.github.io/posts/os-ubuntu-2-get-ip-addr/
[post-book-self-learning-network-init]: https://gigyesik.github.io/posts/book-self-learning-network-1-init/
[post-book-self-learning-network-network-layer]: https://gigyesik.github.io/posts/book-self-learning-network-3-network-layer/
[post-os-ubuntu-ssh-setting]: https://gigyesik.github.io/posts/os-ubuntu-4-ssh-setting/
