---
layout: post
title: 안쓰는 노트북에 우분투 (ubuntu) 설치하기
date: 2024-06-17 03:51π +0900
categories: [os, ubuntu]
tag: [os, operating system, linux, ubuntu]
---

> 포스팅의 내용
> 
> - 안쓰는 노트북을 우분투 서버로 만들기

# 갑자기 우분투는 왜

- 개인 프로젝트를 하나씩 시작해보려고 하는데, 로컬에서만 작업하기보다는 배포를 하면서 만들어가고 싶다.
- AWS 를 쓰기에는 트래픽이 많지도 않고, 서버 비용이 부담된다.
- 집에 굴러다니는 학생때 쓰던 노트북에 우분투를 깔아서 서버로 사용해보려 한다.

# 준비물

- 안쓰는 노트북
- Ubuntu 부팅 디스크용 USB
- 인내심

# 우분투 부팅 디스크 만들기

## 우분투 설치 파일 다운로드

- 포스팅 작성 시점의 우분투 최신 버전은 24.04 LTS 이다.
- [Ubuntu 서버 다운로드][ubuntu-server-download] 페이지에서 파일을 다운로드한다.

![](/assets/img/2024-06-17/2024-06-17-os-ubuntu-1-install-ubuntu-1-get-ubuntu.png)

## USB 포맷 후 설치 디스크로 만들기

- 설치 파일을 부팅 설정으로 사용하기 위해 별도 프로그램을 사용해야 한다.
- windows 라면 [rufus][rufus], macOS 라면 [etcher][etcher] 를 통해 진행할 수 있다.
- 필자는 rufus 로 진행했다.

![](/assets/img/2024-06-17/2024-06-17-os-ubuntu-1-install-ubuntu-2-rufus.png)

# 우분투 설치하기

1. 노트북에 우분투 부팅 디스크 USB 를 연결한다.
2. 자동으로 설치로 넘어가지 않는다면, 노트북 전원을 켜고 BIOS 진입을 연타한다. (F2, F4, F8 등 노트북 마다 세팅이 다름)
3. GNU GRUB -> Try or Install Ubuntu Server 를 선택한다.
4. 설치 언어로 English 를 선택한다.
5. 키보드 세팅 옵션은 Done 으로 건너뛴다.
6. 설치 타입 옵션에서 'Ubuntu Server' 를 선택한다.
7. 네트워크 설정도 Continue without network 로 건너뛴다.
8. 프록시 설정도 공백으로 건너뛴다.
9. Profile configuration 에서 username, password, server name 을 입력한다.
10. SSH configuration -> Install OpenSSH server 를 활성화한다.
11. 설치가 완료된다.

이후 reboot 하면 각종 작업을 완료한 후 ubuntu 가 설치된 컴퓨터가 된다.
위 설치 과정에서 여러 가지를 건너뛰긴 했는데.. 하나씩 작업하면서 알아가면 된다.

[ubuntu-server-download]: https://ubuntu.com/download/server
[etcher]: https://etcher.balena.io 
[rufus]: https://rufus.ie/ko
