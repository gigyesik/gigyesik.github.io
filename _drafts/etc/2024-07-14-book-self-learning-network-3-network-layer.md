---
layout: post
title: (혼자 공부하는 네트워크) 03. 네트워크 계층
date: 2024-07-14 14:12 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, 네트워크 계층]
---

# 03. 네트워크 계층 (126p~)

## 03-1. LAN 을 넘어서는 네트워크 계층 (128p~)

### 1계층(물리 계층), 2계층(데이터 링크 계층) 만으로 모든 전송을 하지 못하는 이유

- 다른 네트워크까지의 도달 경로를 알 수 없다. -> 라우터(router)
- 모든 네트워크에 속한 호스트의 위치를 알 수 없다. -> IP + MAC 함께 사용

### 라우팅(routing) : 패킷이 이동할 최적의 경로를 결정하는 것. 라우터가 수행

### IP 주소 : 논리 주소. '호스트' 에 할당
  
- DHCP(Dynamic Host Configuration Protocol) 로 자동 할당하거나, 직접 할당 가능.
- 한 호스트가 복수의 주소를 갖는 것도 가능

### IP(Internet Protocol)
  
- IP 주소 지정(IP addressing) : IP 주소를 바탕으로 송수신 대상을 지정하는 것
- IP 단편화(IP fragmentation) : 패킷이 MTU 보다 크기가 클 경우 복수의 패킷으로 나누는 것
  - MTU(Maximum Transmission Unit) : 한 번에 전송 가능한 IP 패킷의 헤더 포함한 최대 크기. 일반적으로 1500바이트
  - 경로 MTU(Path MTU) : 단편화 없이 전송할 수 있는 최대 크기
- IPv4 : RFC-791
  - 주소 형태 : 옥텟(octet. 0~2^8 사이의 10진수) 4개. ex) 255.255.255.255
    - 4바이트(32비트). 옥텟 하나당 8비트(1바이트)
  - IPv4 패킷 : 프레임의 페이로드 (데이터 필드). 아래는 IPv4 의 헤더들
    - 식별자(identifier) : 패킷에 할당된 변호. 패킷이 단편화된 경우의 일련번호
    - 플래그(flag) : 3비트
      - 예약 비트. 항상 0으로 현재 사용하지 않음
      - DF(Don't Fragment) : 1이면 단편화 off, 0이면 단편화 on. 1인데 크기 초과한 경우 폐기
      - MF(More Fragment) : 0이면 마지막 패킷, 1이면 다른 단편화 패킷 더 있음
    - 단편화 오프셋(fragment offset) : 패킷 초기 데이터로부터 떨어진 위치 (순서 보장되지 않으므로)
    - TTL(Time To Live) : 한 홉마다(hop) 1씩 감소하여 0이 되면 패킷 폐기하고 호스트에게 Time Exceed 메시지 전송(ICMP)
      - 홉 : 패킷이 호스트 또는 라우터에 1번 전달되는 것
    - 프로토콜 : 상위 계층 프로토콜 정보. TCP 6번, UDP 17번
    - 송신지 IP 주소(source IP address)
    - 수신지 IP 주소(destination IP address)
- IPv6 : IPv4 의 고갈을 막기 위해 등장한 IP 주소
  - IPv6 패킷 : IPv4 에 비해 간소화되어있음(기본 헤더).
    - 다음 헤더(next header) : 간소화된 기본 헤더 이외의 확장 헤더
      - 기본 헤더와 페이로드 사이에 위치
      - 홉 간 옵션, 수신지 옵션, 라우팅, 단편화 등
      - 단편화 확장 헤더 : IPv6 의 단편화를 담당하는 확장 헤더
        - 예약됨(reserved), 예약(res) : 0으로 현재 사용하지 않음
        - 단편화 오프셋, M flag(IPv4의 MF), 식별자
    - 홉 제한(hot limit) : TTL
    - 송신지 IP 주소
    - 수신지 IP 주소

### ARP(Address Resolution Protocol) : IP 주소를 통해 MAC 주소를 알아내는 프로토콜
   
- ARP 요청(ARP request) : 네트워크 내 모든 호스트에게 ARP 패킷 브로드캐스트 메시지
  - 프레임 페이로드(데이터) 내 포함
    - 오퍼레이션 코드(Opcode) : 1이면 ARP 요청, 2이면 ARP 응답
    - 송신지, 수신지 하드웨어 주소(Sender, Target Hardware Address) : MAC 주소. ff:~:ff, 00:~:00
    - 송신지, 수신지 프로토콜 주소(Sender, Target Protocol Address) : IP 주소
- ARP 응답(ARP reply) : 해당하는 MAC 주소의 호스트가 송신자에게 응답 패킷 전송
- ARP 테이블(ARP table) 갱신 : IP 주소와 MAC 주소 대응 표

## 03-2. IP 주소 (148p~)

### IP 주소(IP address) : 네트워크 주소(network identifier) + 호스트 주소(host identifier)
  
- 클래스풀 주소 체계(classful addressing)
  - A 클래스 : 8/24
    - 초기 비트 0 (10진수 0)
    - 할당 범위 0.0.0.0 ~ 127.255.255.255
  - B 클래스 : 16/16
    - 초기 비트 10 (10진수 128)
    - 할당 범위 128.0.0.0 ~ 191.255.255.255
  - C 클래스 : 24/8
    - 초기 비트 110 (10진수 192)
    - 할당 범위 192.0.0.0 ~ 223.255.255.255
  - 호스트 주소 전부 0 : 해당 네트워크 자체
  - 호스트 주소 전수 1 : 브로드캐스트 전용
- 클래스리스 주소 체계(classless addressing) : 서브네팅(subnetting)
  - 서브넷 마스크(subnet mask) : 네트워크 주소는 1, 호스트 주소는 0으로 표기한 비트열
    - IP 주소와 서브넷 마스크를 비트 AND 연산(bitwise AND operation) 하면 네트워크 주소를 알 수 있다.
    - ex) 172.29.208.1, 255.255.240.0 -> 172.29.208.0
    - CIDR 표기법(Classless Inter-Domain Routing notation) : IP 주소 / 서브넷 마스크상 1의 갯수
    - ex) 172.29.208.1/20
- 공인 IP 주소와 사설 IP 주소
  - 공인 IP 주소(public IP address) : 고유 IP. ISP 나 할당기관을 통해 할당 가능
  - 사설 IP 주소(private IP address) : 사설 네트워크 IP. 라우터가 할당
    - 10.0.0.0/8(10.0.0.0 ~ 10.255.255.255.255)
    - 172.16.0.0/12(172.16.0.0 ~ 172.31.255.255)
    - 192.168.0.0/16(192.168.0.0 ~ 192.168.255.255)
- NAT(Network Address Translation) : 공인 IP 와 사설 IP 변환 기술. 라우터 또는 공유기
- 정적 IP 주소와 동적 IP 주소
  - 정적 IP 주소(static IP address) : 호스트에 수동으로 IP 주소 할당
    - 기본 게이트웨이(default gateway) : 호스트가 속한 네크워크 외부로 나가기 위한 첫 경로(첫 번째 홉). 공유기 주소
  - 동적 IP 주소(dynamic IP address) : 호스트에 자동으로 IP 주소 할당
    - DHCP(Dynamic Host Configuration Protocol) : IP 동적 할당 프로토콜. 호스트와 DHCP 서버간 통신
      - DHCP Discover(Client -> DHCP) : 송신지 주소 0.0.0.0 으로 DHCP 서버 검색(브로드캐스트)
      - DHCP Offer(DHCP -> Client) : 할당해 줄 IP 주소 제안
      - DHCP Request(Client -> DHCP) : 브로드캐스트로 IP 주소 사용 요청
      - DHCP ACK(Acknowledge)(DHCP -> Client) : 클라이언트에게 IP 주소 할당(임대)
      - 임대 기간이 끝나면 재할당하거나 임대 갱신(lease renewal)

### 예약 주소
   
- 루프백(loopback address) : 127.0.0.0/8(127.0.0.0 ~ 127.255.255.255)
  - 로컬호스트(localhost)
  - 자기 자신을 호스트인 양 사용하여 패킷 전송 가능
- 이 네트워크의 이 호스트 : 0.0.0.0/8(0.0.0.0 ~ 0.255.255.255.255)
- 모든 임의의 IP 주소 : 0.0.0.0/0. 디폴트 라우트(default route) 결정

## 03-3. 라우팅 (170p~)

### 라우팅 : 라우터의 핵심 기능. 패킷이 이동할 경로를 설정하고 이동시키는 것

### 라우터 : 3계층의 핵심 장비
   
- 공유기 : 홈 라우터(home router). 라우터 + NAT + DHCP + 방화벽
- 홉(hop) : 라우터와 라우터 간 이동하는 하나의 과정
  - 라우팅 테이블(routing table) : 수신지까지 도달 정보를 명시한 표
    - 수신지 IP 주소, 서브넷 마스크 : 최종 패킷 전달 대상
    - 다읍 홉(next hop) : 게이트웨에. 다음으로 거쳐야 할 호스트의 IP 주소 또는 인터페이스
    - 네트워크 인터페이스 : 패킷을 내보낼 통로. NIC 또는 인터페이스에 대응하는 IP
    - 메트릭(metric) : 해당 경로로 이동하는 데 드는 비용
  - 디폴트 라우트(default route) : 기본 게이트웨이로 패킷을 내보낼 경로. 0.0.0.0/0

### 정적 라우팅과 동적 라우팅 : 라우팅 테이블을 만드는 방법
   
- 정적 라우팅(static routing) : 수동으로 채운 라우팅 테이블을 기반으로 라우팅하는 방식
- 동적 라우팅(dynamic routing) : 자동으로 라우팅 테이블을 만들고 이를 이용하여 라우팅하는 방식
  - AS(Autonomous System) : 한 회사나 집단에서 관리하는 라우터 집단 네크워크
    - AS 밖과 통신할 때는 AS 경계 라우터(ASBR; Autonomous System Boundary Router) 사용

### 라우팅 프로토콜(routing protocol) : 패킷 이동 최적 경로 찾는 프로토콜
   
- IGP(Interior Gateway Protocol) : AS 내부 수행 라우팅 프로토콜
  - RIP(Routing Information Protocol) : 거리 벡터(distance vector) 사용
    - 경로 정보를 주기적으로 교환하여 라우팅 테이블 갱신
    - 홉 수가 가장 적은 경로를 최적 경로로 판단
  - OSPF(Open Shortest Path First) : 링크 상태(link state) 사용
    - 네트워크의 그래프를 링크 상태 데이터베이스에 저장(LSDB; Link State DataBase)
    - LSDB 를 기반으로 최적 경로 선택
    - 네트워크 구성이 변경되었을 때 갱신
      - 에어리어(area)로 구획화하고 내부에서만 링크 상태 공유. 경계 라우터 ABR(Area Border Router)
- EGP(Exterior Gateway Protocol) : AS 외부 수행 라우팅 프로토콜
  - BGP(Border Gateway Protocol) : AS 간 통신 프로토콜(eBGP; external) (AS 내부 통신도 가능. iBGP; internal)
    - 피어(peer) : BGP 메시지를 주고받을 수 있도록 연결된 ASBR
    - 속성(attribute) : 경로 결정에 대한 부가 정보
      - AS-PATH : 수신지에 이르는 과정에서 통과하는 AS 들의 목록
        - 라우팅 시 라우터 수가 아님 'AS 수' 가 최단경로 기준이므로, AS-PATH 가 짧아도 통과해야 하는 라우터 수가 많을 수 있음
        - '거리'가 아닌 '경로' 를 고려(경로 벡터. path vector). 자신의 AS 가 PATH 상에 포함되면 순환으로 간주해 폐기
      - NEXT-HOP : 다음으로 거칠 라우터의 주소
      - LOCAL-PREF(preference) : 정책으로 설정한 선호도값. AS-PATH 나 NEXT-HOP 보다 우선 적용
    - 정책(policy) : 경로 결정을 의도를 가지고 수동으로 제어
