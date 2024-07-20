---
layout: post
title: (혼자 공부하는 네트워크) 06. 실습으로 복습하는 네트워크
date: 2024-07-20 16:58 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, wireshark]
---

# 06. 실습으로 복습하는 네트워크 (332p~)

## 06-1. 와이어샤크 설치 및 사용법 (334p~)

### 와이어샤크(WireShark) : 패킷 캡처 프로그램

### 와이어샤크 설치

- 윈도우
- 맥 OS

### 와이어샤크 사용
   
- HTTP 패킷 (아래에서부터) 캡슐화
  - HTTP(Hypertext Transfer Protocol)
    - 메서드, Host, Connection 등
  - TCP(Transmission Control Protocol)
    - Source Port, Destination Port, Sequence Number, Acknowledge Number 등
  - IPv4(Internet Protocol Version 4)
  - 이더넷 프레임(Ethernet II)
    - MAC 주소(Destination, Source), 타입/길이(Type)

### 패킷 필터

- eth : Ethernet
- ip : Internet Protocol Version 4(IPv4)
- ipv6 : Internet Protocol Version 6(IPv6)
- tcp : Transmission Control Protocol(TCP)
- udp : User Datagram Protocol(UDP)
- http : Hypertext Transfer Protocol(HTTP)
- tls : Transport Layer Security(TLS)
- 등등

## 06-2. 와이어샤크를 통한 프로토콜 분석 (360p~)

### IP 분석

- IPv4 단편화 + ICMP (ipv4-fragmentation)
  - 1~7
    - Internet Protocol Version 4(IPv4)
      - Source Address(송신지 IP 주소) : 10.0.0.1
      - Destination Address(수신지 IP 주소) : 10.0.0.2
      - Identification(식별자) : 0x2c2e(11310)
      - 1~6
        - Length(이더넷 프레임 헤더(14) + IP 헤더(20) + 데이터) : 1500
        - Flags(플래그)
          - MF(more fragment) : 1
          - Fragment Offset(단편화 오프셋) : 0, 1480, 2960, 4440, 5920, 7400
      - 7
        - Length(이더넷 프레임 헤더(14) + IP 헤더(20) + 데이터) : 120
        - Flags(플래그)
          - MF(more fragment) : 0
          - Fragment Offset(단편화 오프셋) : 8880
    - Internet Control Message Protocol(ICMP)
      - 7
        - Type, Code : 8, 0 -> 에코 요청 메시지
  - 8~14
    - Internet Protocol Version 4(IPv4)
      - Source Address(송신지 IP 주소) : 10.0.0.2
      - Destination Address(수신지 IP 주소) : 10.0.0.1
      - Identification(식별자) : 0x2aad(10925)
      - 14
        - Flags(플래그)
          - MF(more fragment) : 0
    - Internet Control Message Protocol(ICMP)
      - 14
        - Type, Code : 0, 0 -> 에코 응답 메시지
- IPv6 단편화 + ICMP (ipv6-fragmentation)
  - 1~2
    - Internet Protocol Version 6(IPv6)
      - Source Address : 20f4:c750:2f42:53df::11:0
        - 20f4:c750:2f42:53df:0000:0000:0011:0000
      - Destination Address : 26f7:f750:2ffb:53df::1001
        - 26f7:f750:2ffb:53df:0000:0000:0000:1001
      - Next Header : UDP(17) -> 캡슐화(단편화되지 않음)
    - User Datagram Protocol(UDP)
      - Source Port : 58677
      - Destination Port : 58677
      - Length : 126, 39
  - 3~6
    - Internet Protocol Version 6(IPv6)
      - Source Address : 26f7:f750:2ffb:53df::1001
      - Destination Address : 20f4:c750:2f42:53df::11:0
      - Next Header : Fragment Header for IPv6(44) -> 단편화됨
        - Fragment Header For IPv6
          - Next Header : UDP(17) -> 캡슐화
          - Identification : 0xf88eb466
          - Offset : 0, 181, 362, 543
    - User Datagram Protocol(UDP)
      - 6
        - Source Port : 58677
        - Destination Port : 58677
        - Length : 1456

### TCP 분석

- TCP 연결 수립 (3-way-handshake)
  - SYN (1)
    - Source : 192.168.0.1:49859 (dynamic port)
    - Destination : 10.10.10.1:80 (well-known port)
    - Sequence Number : 3588415412
    - Flags
      - SYN : 1
    - Options
      - MSS(Maximum Segment Size) : 1460 bytes
      - SACK(Selective ACK) : permitted
  - SYN, ACK (2)
    - Source : 10.10.10.1:80 (well-known port)
    - Destination : 192.168.0.1:49859 (dynamic port)
    - Sequence Number : 697411256
    - Acknowledgement Number : 3588415413
    - Flags
      - SYN : 1
      - Acknowledgement : 1
  - ACK (3)
    - Source : 192.168.0.1:49859 (dynamic port)
    - Destination : 10.10.10.1:80 (well-known port)
    - Sequence Number : 3588415413
    - Acknowledgement Number : 697411257
- TCP 연결 종료 (connection-close)
  - FIN (1)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:3372
    - Flags
      - Fin : 1
  - ACK (2)
    - Source : 192.168.0.1:3372
    - Destination : 10.10.10.1:80
    - Flags
      - Acknowledgement : 1
  - FIN (3)
    - Source : 192.168.0.1:3372
    - Destination : 10.10.10.1:80
    - Flags
      - Fin : 1
  - ACK (4)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:3372
    - Flags
      - Acknowledgement : 1
- TCP 재전송 (tcp-retransmission)
  - 1 (성공)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:54436
    - Sequence Number : 2530489553
    - Acknowledgement Number : `3714426508`
  - 2 (유실)
    - Source : 192.168.0.1:54436
    - Destination : 10.10.10.1:80
    - Sequence Number : `3714426508`
    - Acknowledgement Number : `2530491013`
  - 3 (중복 ACK. 유실되지 않았다면 2번 패킷의 Acknowledgement Number 를 알고 있어야 함)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:54436
    - Sequence Number : 2530504153
    - Acknowledgement Number = `3714426508`
  - 4 (중복 1)
    - Source : 192.168.0.1:54436
    - Destination : 10.10.10.1:80
    - Sequence Number : 3714426508
    - Acknowledgement Number : `2530491013`
  - 5 (중복 ACK)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:54436
    - Sequence Number : 2530505613
    - Acknowledgement Number : `3714426508`
  - 6 (중복 2)
    - Source : 192.168.0.1:54436
    - Destination : 10.10.10.1:80
    - Sequence Number : 3714426508
    - Acknowledgement Number : `2530491013`
  - 7 (중복 ACK)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:54436
    - Sequence Number : 2530507073
    - Acknowledgement Number : `3714426508`
  - 8 (중복 3)
    - Source : 192.168.0.1:54436
    - Destination : 10.10.10.1:80
    - Sequence Number : 3714426508
    - Acknowledgement Number : `2530491013`
  - 9 (중복 3번 일어났으므로 빠른 재전송, 빠른 회복)
    - Source : 10.10.10.1:80
    - Destination : 192.168.0.1:54436
    - Sequence Number : `2530491013`
    - Acknowledgement Number : 3714426508

### HTTP 분석 (http-request-response)

- Hypertext Transfer Protocol
  - 1 (요청)
    - Request Method : GET
    - Request URI : /
    - Host : info.cern.ch\r\n
      - \r\n : 캐리지 리턴(Carriage Return. 오른쪽 이동 -> \r) + 라인 피드(Line Feed. 줄바꿈 -> \n)
  - 2 (응답)
    - Status Code : 200
    - Content-Type : text/html\r\n
    - Line-based text data : html 문서의 내용
  - 3 (요청)
    - Request Method : GET
    - Request URI : /hypertext/WWW/TheProject.html
      - Referer : http://info.cern.ch/\r\n
  - 5 (응답)
    - Status Code : 200
    - Content-Type : text/html\r\n
