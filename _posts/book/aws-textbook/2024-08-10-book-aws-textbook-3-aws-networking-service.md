---
layout: post
title: (AWS 교과서) 3장. AWS 네크워킹 서비스
date: 2024-08-10 01:23 +0900
categories: [book, AWS 교과서]
tag: [book, AWS 교과서, networking]
---

# 3장. AWS 네트워킹 서비스 (71p~)

## 3.1. 네트워킹이란 (72p~)

### 3.1.1. 네트워킹 정의

- 네트워킹(networking) : IT 자원간 연결하여 통신하는 환경

### 3.2.2. 네트워킹 요소

- OSI 7계층
  - 1계층
    - 물리 계층(physical layer)
    - ex. 1000BASE-TX
  - 2계층
    - 데이터링크 계층(data link layer)
    - ex. Ethernet, MAC
  - 3계층
    - 네트워크 계층(network layer)
    - ex. IP, ICMP
  - 4계층
    - 전송 계층(transport layer)
    - ex. TCP, UDP
  - 5계층
    - 세션 계층(session layer)
    - ex. SSL, TLS
  - 6계층
    - 표현 계층(presentation layer)
    - ex. ASCII, JPG
  - 7계층
    - 응용 계층(application layer)
    - ex. HTTP, SSH, DNT, FTP
- IP 주소와 서브넷
  - IP(Internet Protocol) 주소 : 인터넷상에서 IP 자원을 식별하는 고유한 주소
    - 퍼블릭 IP 주소 : 인터넷 서비스 공급자(ISP) 에서 제공하는 공인 IP 주소
    - 프라이빗 IP 주소 : 독립된 네트워크 내부에서만 사용하는 네트워크 관리자가 제공하는 사설 IP 주소
      - 클래스 A : 10.0.0.0 ~ 10.255.255.255
      - 클래스 B : 172.16.0.0 ~  172.31.255.255
      - 클래스 C : 192.168.0.0 ~ 192.168.255.255
    - 고정 IP 주소 : 네트워크 관리자가 수동으로 할당
    - 유동 IP 주소 : IP 주소 범위에 따라 동적으로 할당
      - DHCP(Dynamic Host Configuration Protocol) 를 통해 임대하는 방식으로 할당
  - 서브넷(subnet) : 부분 네트워크
    - 서브넷 마스크(subnet mask) : 서브넷 식별값
      - 1은 네트워크 영역, 0은 호스트 영역 (255.255.255.0)
    - IP CIDR(Classless Inter Domain Routing) : IP 주소 + 네트워크 ID 비트 수
      - ex. 10.1.0.0/16
- 라우팅과 라우터
  - 라우팅(routing) : 네트워킹 시 목적지 경로를 선택하는 작업
  - 라우터(router) : 라우팅을 수행하는 장비
- TCP 와 UDP
  - TCP(Transmission Control Protocol)
    - 연결형 프로토콜
    - 신뢰성 높음, 속도 낮음
    - 혼잡 제어, 흐름 제어
    - HTTP, SSH
  - UDP(User Diagram Protocol)
    - 비연결형 프로토콜
    - 신뢰성 낮음, 속도 빠름
    - 제어 없음
    - DNS, DHCP
  - 포트 번호
    - IANA(Internet Assigned Numbers Authority) 에서 관리
    - well-known port : 0~1023
    - registered port : 1024~49151
    - dynamic port : 49152~65535

## 3.2. AWS 네트워킹 소개 (78p~)

### 3.2.1. AWS 리전 네트워킹 디자인

- 리전
  - 군집화된(clustering) 데이터 센터의 물리적인 위치
  - 트랜짓 센터(transit center) + 가용 영역(available zone)
- Intra-AZ 연결 : 데이터 센터 간 연결
- Inter-AZ 연결 : 가용 영역 간 연결
- 트랜짓 센터 연결 : 가용 영역과 외부 인터넷 구간 연결

### 3.2.2. AWS 글로벌 네트워크와 엣지 POP

- 엣지 POP(edge Point Of Presence) : AWS 글로벌 전용망
  - 일반 서비스 : 트랜짓 센터에서 인터넷 구간으로 확산
  - 엣지 POP 서비스 : 트랜짓 센터에서 AWS 백본 네트워크를 통해 POP 경유하여 AWS 글로벌 네트워크로 확산
    - Amazon CloudFront, Amazon Route 53, AWS Shield, AWS Global Accelerator

### 3.2.3. AWS 네트워킹 서비스 소개

- VPC : 가상 프라이빗 클라우드 네트워크
- Transit Gateway : VPC 와 온프레미스 네트워크 연결 게이트웨이
- Route 53 : 관리형 DNS 서비스
- Global Accelerator : 가용성 및 성능 증대
- Direct Connect : 온프레미스 환경의 AWS 전용 네트워크와 연결
- Site-to-Site VPN : 암호화 네트워크(VPN)

## 3.3. Amazon VPC 소개 (82p~)

### Amazon VPC : Virtual Private Cloud

### 3.3.1. Amazon VPC 기본 구성 요소

- VPC 는 리전당 한 개 이상 존재할 수 있고, 리전에 종속적
- 서브넷은 VPC 내 일부 네트워크로, 가용 영역에 종속적
  - 퍼블릭 서브넷 : 외부 인터넷 통신 가능
  - 프라이빗 서브넷 : 폐쇄적인 네트워크 영역
- IP CIDR : 네트워크에 할당할 IP 주소 표현
  - VPC IP CIDR 내에 서브넷 IP CIDR 이 분할되어 할당됨
- 가상 라우터와 라우팅 테이블
  - VPC 생성시 기본 라우팅 테이블 존재
  - 별도로 라우팅 테이블 생성하여 서브넷과 연결(attach) 가능
- 보안 그룹(security group)과 네트워크 ACL(Access Control List)
  - 방화벽(firewall). 서브넷의 트래픽 자원 보호
  - 트래픽 접근 제어 대상
    - 보안 그룹 : 인스턴스와 같은 자원 접근 제어
    - 네트워크 ACL : 서브넷 접근 제어
  - stateful, stateless
    - 보안 그룹 : 이전 상태 정보 기억(stateful)
      - 인바운드 트래픽을 허용한 경우 아웃바운드 규칙에 관계없이 접근 허용
    - 네트워크 ACL : 상태 정보 기억하지 않음(stateless)
      - 인바운드 트래픽을 허용했어도 아웃바운드 규칙 판단
  - 허용 및 거부 정책
    - 보안 그룹 : 허용 규칙에 해당하지 않으면 자동 거부
    - 네트워크 ACL : 허용 규칙과 거부 규칙 모두 판단

### 3.3.2. Amazon VPC 와 다른 네트워크 연결

- 인터넷 게이트웨이 : 외부 인터넷과 통신
  - 인터넷 게이트웨이 생성 후 VPC 와 연결
  - 서브넷 라우팅 테이블의 타깃 대상을 인터넷 게이트웨이로 지정
- NAT 게이트웨이(Network Address Translation gateway)
  - 프라이빗 서브넷과 외부 인터넷 통신
  - 프라이빗 IP 주소를 퍼블릭 IP 주소로 변환
  - 퍼블릭 서브넷에 위치
- VPC 피어링
  - 서로 다른 VPC 연결
  - IP CIDR 중복되면 연결 불가능
- 전송 게이트웨이(transit gateway)
  - 다수의 VPC 나 온프레미스를 단일 지점으로 연결
- 가상 프라이빗 게이트웨이(virtual private gateway)
  - AWS Site-to-Site VPN 또는 AWS Direct Connect 연결

### 3.3.3. Amazon VPC 요금
  - 2024년 2월부터 모든 퍼블릭 IP 할당시 유료
