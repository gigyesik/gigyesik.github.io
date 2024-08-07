---
layout: post
title: (혼자 공부하는 네트워크) 07. 안정성을 위한 기술
date: 2024-07-24 20:15 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, 안정성을 위한 기술]
---

# 07. 네트워크 심화 (380p~)

## 07-1. 안정성을 위한 기술 (382p~)

### 가용성(availability)

- 안정성 : 특정 기능을 언제든 균일한 성능으로 수행할 수 있는 특성
- 가용성 : 시스템이 특정 기능을 수행할 수 있는 시간의 비율(안정성의 정도)
  - 업타임(uptime) : 정상 사용 시간
  - 다운타임(downtime) : 정상 사용 불가능 시간
  - 가용성 = (업타임) / (업타임 + 다운타임)
- 고가용성(High Availability; HA)
  - 99.999% (five nines) : 1년간 다운타임 5.26분
- 결함 감내(fault tolerance) : 문제가 발생하더라도 기능할 수 있는 능력

### 이중화

- 이중화 : 이중으로 두는 기술 -> 백업 마련
- 백업 대상 : SPoF
- 단일 장애점(SPoF; Single Point of Failure) : 문제가 발생할 경우 시스템 전체가 중단될 수 있는 대상
- 이중화 구성
  - 액티브/스탠바이(active-standby) : 한 시스템 가동, 다른 시스템 대기
    - 페일오버(failover) : 액티브 시스템에 문제가 생기는 경우 스탠바이 시스템으로 자동 전환되는 기술
  - 액티브/액티브(active-active) : 두 시스템 모두 가동
- 다중화 : 여러 개 두는 기술 (이중화 확장)
  - 티밍(teaming, Windows), 본딩(bonding, Linux) : 여러 NIC 를 다중화하여 하나의 인터페이스처럼 보이게 하는 기술
    - 1Gbps NIC 3개를 액티브/액티브로 티밍하면 3Gbps 성능의 인터페이스 하나로 사용 가능

### 로드 밸런싱

- 트래픽
  - 주어진 시점에 네트워크를 경유한 데이터의 양
  - 더 일반적 표현 : 주어진 시점에 특정 노드를 경유한 패킷의 양
- 로드 밸런싱(load balancing) : 트래픽의 고른 분배를 위해 사용하는 기술
  - L4, L7 스위치
  - 소프트웨어(HAProxy, Envoy, Nginx 등)
- 헬스 체크(health check) : 현재 요청에 대해 올바른 응답을 할 수 있는 상태인지 검사(로드 밸런서가 수행)
  - cf. 하트비트(heartbeat) : 서버 간에 상태 체크
- 로드 밸런싱 알고리즘
  - 라운드 로빈(round robin) : 순차적으로 부하 전달
    - 가중치 라운드 로빈(weighted round robin) : 가중치 n인 곳에 n배의 부하 전달
  - 최소 연결(least connection) : 연결이 적은 서버부터 우선적으로 부하 전달
    - 가중치 최소 연결(weighted least connection) : 가중치 n인 곳에 n배의 부하 전달

### 프록시(proxy)

- 오리진 서버(origin server) : 흔히 알고 있는 서버
  - 자원을 생성하고 클라이언트에게 권한 있는 응답을 보낼 수 있는 HTTP 서버
  - 인바운드(inbound) 메시지 : 오리진 서버를 향하는 메시지
  - 아웃바운드(outbound) 메시지 : 클라이언트를 향하는 메시지
- 중간 서버(프록시, 게이트웨이)
  - 프록시(proxy) : 포워드 프록시(forward proxy)
    - 클라이언트가 '선택한' 메시지 대리자 (클라이언트 쪽에 가까움)
    - 캐시 저장, 클라이언트 암호화 및 접근 제한 기능
  - 게이트웨이(gateway) : 리버스 프록시(reverse proxy)
    - 아웃바운드에 대해 오리진 서버 역할, 수신 요청을 변환하여 인바운드 서버에 전달 (서버 쪽에 가까움)
    - 캐시 저장, 로드 밸런서로 동작 가능

## 07-2. 안전성을 위한 기술 (394p~)

### 암호와 인증서

- 암호화(encryption) : 원문 데이터를 알아볼 수 없는 형태로 변경하는 것
- 복호화(decryption) : 암호화된 데이터를 원문 데이터로 되돌리는 과정
- 대칭 키 암호화(symmetric key cryptography)
  - 암호화와 복호화에 동일한 키 사용
  - 키 유출시 보안 상실
- 공개 키 암호화(public key cryptography), 비대칭 키 암호화(asymmetric key cryptography)
  - 공개 키(public key) : 암호화를 위한 키. 유출 가능
  - 개인 키(private key) : 복호화를 위한 키. 유출 안됨
  - 과정 (호스트 A -> B)
    - A -> B : 공개 키 요청
    - B -> A : 공개 키 응답
    - A -> B : 공개 키로 암호화한 데이터 전달
    - B : 개인 키로 복호화한 데이터 확인
  - 대칭 키 암호화에 비해 부하가 큼
- 세션 키(session key) 암호화 : 대칭 키 + 공개 키
  - 공개 키로 대칭 키를 암호화
  - 개인 키로 암호화된 대칭 키 복호화
  - 대칭 키 안전하게 공유 + 대칭 키를 빠르게 암호화/복호화
- 인증서와 디지털 서명
  - 공개 키 인증서(public key certificate) : 공개 키와 공개 키의 유효성을 입증하기 위한 문서
    - 서명 값(signature) : 인증 기관의 공개 키에 대한 인증
      - 인증서 내용의 해시 값(지문. fingerprint)을 CA의 개인 키로 암호화
      - 해시 값 : 해시 함수(MD5, SHA-1, SHA-256 등)를 적용시킨 값
  - 인증 기관(CA; Certification Authority) : 인증서 발급 기관
    - IdenTrust, DigiCert, GlobalSign 등
  - 디지털 서명(digital signature) 과정
    - 서버로부터 인증서 + 서명 값 수신
    - 인증서와 서명 값 분리 -> 인증서 + 서명 값
    - 서명 값은 '개인 키'로 암호화 했으므로 CA의 '공개 키'로 복호화 가능 -> 인증서 내용 해시 값
    - 인증서에 해시 함수 적용 -> 인증서 내용 해시 값
    - 두 값 비교 -> 일치한다면 공개 키 유효성 입증

### HTTPS: SSL 과 TLS

- SSL : Secure Socket Layer. 인증서 암호화 수행
- TLS : Transport Layer Security. SSL 계승
- HTTPS(HTTP over TLS) : SSL/TLS 사용 프로토콜. HTTP 메시지에 보안 적용
  - TCP three-way handshake
    - SYN, SYN + ACK, ACK
  - TLS handshake
    - 클라이언트 -> 서버
      - ClientHello
        - 지원되는 TLS 버전
        - 암호 스위트(cipher suite) : 사용 가능한 암호화 방식과 해시 함수
          - ex. TLS_AES(알고리즘)_128_GCM_SHA256(해시 함수)
        - 키를 만들기 위해 사용할 클라이언트의 난수
    - 서버 -> 클라이언트
      - ServerHello
        - 선택된 TLS 버전
        - 암호 스위트
        - 키를 만들기 위해 사용할 서버의 난수
      - Certificate : 인증서
      - CertificateVerify : 디지털 서명
      - Finished
      - Application Data (TLS 1.3)
    - 클라이언트 -> 서버
      - Finished
      - Application Data (TLS 1.3)
  - 암호화된 메시지 송수신 (Application Data)

## 07-3. 무선 네트워크 (408p~)

### 전파와 주파수

- 전파(radio wave) : 3kHz ~ 3THz 사이의 진동수를 갖는 전자기파
- 통신에 사용되는 전파에는 주파수 대역이 정해져 있음(국가마다 다름)

### 와이파이와 802.11

- IEEE 802.11 : LAN 환경에서의 무선 통신 표준
  - 주파수 대역
    - 2.4GHz : 더 느리고 간섭 덜함
    - 5GHz : 더 빠르고 간섭 더함
    - 채널(channel) : 하위 주파수 대역(간섭 방지)
  - 변조(modulation) : 정보를 원하는 형태의 신호로 변환하는 것
  - 복조(demodulation) : 변조된 신호를 원래의 정보로 다시 변환하는 것
- 와이파이(Wi-Fi)
  - Wi-Fi Alliance 라는 비영리 단체의 브랜드 이름
  - IEEE 802.11 표준을 준수하는 무선 LAN 기술

### AP 와 서비스 셋

- AP(Access Point) : 무선 통신 기기들을 연결하여 무선 네트워크를 구성하는 장치
- 인프라스트럭처 모드(infrastructure mode) : AP 를 경유하여 통신이 이루어지는 무선 네트워크 통신 방식
  - cf. 애드 혹 모드(Ad Hoc mode) : AP 간섭 없이 호스트 간 일대일로 무선 통신하는 모드
- 서비스 셋(Service Set) : 무선 네트워크를 이루는 AP 와 여러 장치들의 집합
  - 서비스 셋 식별자(SSID; Service Set Identifier) : 서비스 셋 구분자. 와이파이 무선 네트워크(AP) 이름
  - BSS(Basic Service Set) : 하나의 AP 로 구성된 무선 LAN
  - ESS(Extended Service Set) : 여러 AP 로 구성된 무선 LAN
  - 비컨 프레임(beacon frame) : AP 가 자신을 주기적으로 알리는 브로트캐스트 메시지
