---
layout: post
title: (혼자 공부하는 네트워크) 02. 물리 계층과 데이터 링크 계층
date: 2024-07-13 17:33 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, 물리 계층, 데이터 링크 계층]
---


# 02. 물리 계층과 데이터 링크 계층 (74p~)

## 02-1. 이더넷 (76p~)

### 이더넷(ethernet) : 통신 매체 규격, 송수신 프레임 형태, 방법 등을 정의하는 네트워크 기술

### 이더넷 표준 : IEEE 802.3

### 통신 매체(간선) 표기 형태 : {전송속도}BASE-{추가특성}

- 전송 속도 : 10, 100, 1000, 2.5G, 5G, 10G, 40G, 100G (Mbps, Gbps)
- BASE(BASEband) : 변조 타입(modulation type). 비트 신호를 통신 매체로 전송하는 방법
- 추가 특성 : 통신 매체 종류, 전송 가능 최대 거리, 물리 계층 인코딩(X), 전송로(레인. R) 수 등
- 통신 매체 종류
  - C : 동축 케이블
  - T : 트위스티드 페어 케이블
  - S : 단파장 광섬유 케이블
  - L : 장파장 광섬유 케이블
- 1000BASE-SX : 1000Mbps 속도를 지원하는 단파장 광섬유 케이블

### 이더넷 프레임(ethernet frame) : 데이터 링크 계층 전송 데이터의 형태

- 헤더
  - 프리앰블(preamble) : 이더넷 init 신호. 8바이트(64비트). 시작 10101010, 끝 10101011
  - 송수신지 MAC 주소 : 인터페이스(장치. LAN 카드) 주소
    - 8바이트(64비트). ex) AB-CD-EF-AB-CD-01 (16진수 12자. 1자당 4비트)
  - 타입, 길이 : 1500(05DC) 이하면 길이, 1536(0600) 이상이면 타입
    - 0800(IPv4), 86DD(IPv6), 0806(ARP)
- 페이로드
  - 데이터 : 최대 1500바이트. 46 바이트 미만이면 0으로 패딩(padding)
- 트레일러
  - FCS(Frame Check Sequence) : 오류 확인 필드. CRC(Cyclic Redundancy Check) 값 비교
  - MAC 주소 ~ 페이로드 까지 CRC 값 비교하여 일치하지 않으면 프레임 폐기

## 02-2. NIC 와 케이블 (88p~)

### NIC(Network Interface Controller) : 호스트와 유무선 통신 매체 연결과 변환, MAC 주소를 부여하는 네트워크 장비. LAN 카드

### 케이블(Cable) : NIC 에 연결되는 물리 계층 유선 통신 매체

- 트위스티드 페어 케이블(twisted pair cable) : 랜선. 구리선
  - 표기 형태 : XX/YTP
    - U : 실드 없음, S : 브레이브 실드, F : 포일 실드
    - SF/FTP : 케이블 외부 브레이브, 포일 실드 / 케이블 내부 구리선쌍 포일 실드
  - 전송 속도에 따른 분류 : Cat5(100Mbps) ~ Cat8(40Gbps)
- 광섬유 케이블(fiber optic cable) : 장거리 전송용 광통신 케이블
  - 싱글 모드 : 빛의 전반사 경로가 하나. 손실 적으므로 장거리 전송 가능. 가격 비쌈
    - 장파장 사용. 1000BASE-LX
  - 멀티 모드 : 경로 여러개. 장거리 전송 부적합
    - 단파장 사용. 1000BASE-SX

## 02-3. 허브 (102p~)

### 주소(address) 는 MAC 주소부터 있는 개념이므로 1계층(물리) 에서는 사용되지 않고, 2계층(데이터 링크) 부터 사용된다.

### 허브(hub) : 여러 대의 호스트를 연결하는 장치
- 신호를 전달받으면 송신지를 제외한 모든 포트로 내보낸다.
- 반이중 모드로 통신한다. (무전기처럼 송수신을 교대로. 동시에 송신시 충돌)
  - 콜리전 도메인(collision domain) : 같은 허브에 연경되어 있는 호스트 집합. 충돌 발생 가능 영역
- cf. 전이중 모드 : 송수신을 동시에 할 수 있음
- CSMA/CD 프로토콜 (Carrier Sense Multiple Access with Collision Detection)
  - CS : 캐리어 감지. 네트워크상 전송 중인 신호가 있는지 확인
  - MA : 다중 접근. 다른 호스트가 전송중이지 않을 때 전송
  - CD : 충돌 검출. 충돌이 발생한 경우 각 호스트에게 잼 신호(jam signal) 을 보내고, 일정 시간 대기 후 재전송

### 리피터(repeater) : 전기 신호 증폭 장치

### 이더넷 허브 : 이더넷 네트워크의 허브

## 02-4. 스위치 (112p~)

### 스위치(layer 2 switch, L2 switch) : 전이중 통신, MAC 주소 학습을 지원하는 2계층 네트워크 장비

- MAC 주소 학습(MAC address learning) : 원하는 호스트에만 프레임 전달 가능
  - 플러딩(flooding) : 허브처럼 송신지 제외 모든 포트에 프레임 전송
  - 필터링(filtering) : 플러딩 이후 어떤 포트에 프레임을 보낼지 결정하는 것
  - 포워딩(forwarding) : 프레임이 전송될 포트에 프레임을 보내는 것
- MAC 주소 테이블(MAC address table) : 스위치 포트와 호스트 MAC 주고 연관 관계 테이블. 스위치 메모리에 보관
  - 송신 호스트가 프레임을 송신하면, 플러딩 발생하며 MAC 주소 테이블에 송신지 MAC 주소 기록
  - 응답 호스트가 응답 프레임을 전송하면, 수신지 MAC 주소 기록
  - 나머지 호스트는 응답 폐기
  - 에이징(aging) : 특정 포트에서 일정 시간 동안 프레임을 전송받지 못한 경우 테이블에서 폐기하는 것

### VLAN(Virtual LAN) : 호스트의 물리적 위치와 관계없이 논리적으로 LAN 구성

- 포트 기반 VLAN(port based VLAN) : VLAN 트렁킹(VLAN Trunking)
  - VLAN 트렁킹 : 트렁크 포트(trunk port. 두 스위치의 공통 포트)에 VLAN 스위치 연결
  - 프레임의 VLAN 식별 : 802.1Q 프레임. 이더넷 프레임의 헤어네 VLAN 태그(32비트) 부착
- MAC 기반 VLAN(MAC based VLAN) : 포트와 관계없이 MAC 주소 기반으로 VLAN 설정
