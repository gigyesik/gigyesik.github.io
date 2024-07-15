---
layout: post
title: (혼자 공부하는 네트워크) 04. 전송 계층
date: 2024-07-16 14:18 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, 전송 계층]
---

# 04. 전송 계층 (188p~)

## 04-1. 전송 계층 개요. IP의 한계와 포트 (190p~)

### IP 의 한계

- 신뢰할 수 없는(비신뢰성) 프로토콜(unreliable protocol) : 패킷의 수신지까지 전달을 보장하지 않음
- 비연결형 프로토콜(connectionless protocol) : 송수신 호스트간 연결 작업을 하지 않음

### 전송 계층의 IP 한계 보완
  
- TCP 연결 수립
- TCP 를 통해 재전송을 통한 오류 제어, 흐름 제어, 혼잡 제어

### 포트(port) : 특정 어플리케이션을 식별할 수 있는 정보

- 패킷의 최종 수신 대상은 특정 어플리케이션 프로세스
- 프로세스 : 실행 중인 프로그램. PID(Process ID)로 구별
- 포트의 분류
  - 잘 알려진 포트(well known port) : 0~1023
    - FTP(20, 21), SSH(22), TELNET(23), 53(DNS), DHCP(67, 68), HTTP(80), HTTPS(443) 등
  - 등록된 포트(registered port) : 1024~49151
    - MySQL(3306), Redis(6379), HTTP 대체(8080) 등
  - 동적 포트(dynamic port) : 사설 포트(private port), 임시 포트(ephemeral port). 49152~65535 (2^16 -1)
- 특정 호스트에서 실행 중인 특정 어플리케이션 프로세스 : {IP 주소}:{포트 번호}

### 포트 기반 NAT
  
- NAT 변환 테이블 : 사설 IP 공인 IP 주소를 변환
- NAPT(Network Address Port Translation) : APT(Address Port Translation)
  - 포트를 활용해 하나의 공인 IP 주소를 여러 사설 IP 주소가 공유할 수 있도록 하는 NAT

### 포트 포워딩(port forwarding) : 네트워크 내 특정 호스트에 IP 주소와 포트 번호를 미리 할당하여 패킷 전달하는 기능

### ICMP(Internet Control Message Protocol) : 네트워크 계층 프로토콜
 
- IP 한계 보완 목적. ICMP 메시지 수신(하지만 보조적인 역할일 뿐 전송 계층 필요. RFC-792)
- traceroute, tracert, ping
- 타입(type), 코드(code)
  - 3 : 패킷 수신지 도달 불가
    - 0 : 네트워크 도달 불가
    - 1 : 호스트 도달 불가
    - 2 : 프로토콜 도달 불가(수신지에서 프로토콜 사용 불가)
    - 3 : 포트 도달 불가
    - 4 : 단편화가 필요하지만 DF 가 1로 설정되어 있음
  - 11 : 시간 초과
    - 0 : TTL 만료
  - 8 : 에코 요청
    - 0 : 에코 요청
  - 0 : 에코 응답
    - 0 : 에코 요청에 대한 응답
  - 9 : 라우터 광고
    - 0 : 라우터가 호스트에게 자신을 알림

## 04-2. TCP 와 UDP (208p~)

### TCP(Transmission Control Protocol) : stateful, 연결형, 신뢰할 수 있는
   
- 세그먼트(segment) : 전송 계층의 페이로드(데이터)
  - 송신지 포트와 수신지 포트(source, destination port) : 포트 번호 명시
  - 순서 번호(sequence number) : 세그먼트의 올바른 순서를 보장하기 위해 첫 바이트에 부여
    - 첫 세그먼트의 순서 번호는 무작위로 부여(초기 순서 번호. ISN; Initial Sequence Number)
    - 다음 세그먼트의 순서 번호는 'ISN + 송신한 바이트 수' (ISN + 초기 순서 번호로부터의 거리)
    - 순서 번호는 4바이트(32비트). 최대값을 넘어서면 0부터 다시 증가
  - 확인 응답 번호(acknowledgment number) : 다음으로 수신하기를 기대하는 순서 번호
    - 수신 번호에 대한 응답
    - 수신한 순서 번호 + 1
  - 제어 비트(control bits) : 플래그 비트(flag bits). 세그먼트의 부가 정보
    - ACK(1) : 세그먼트 승인
    - SYN(1) : 연결 수립
    - FIN(1) : 연결 종료
  - 윈도우(window) : 한 번에 수신하고자 하는 데이터의 양(윈도우)
- MSS(Maximum Segment Size) : TCP 로 전송할 수 있는 최대 페이로드 크기 (TCP 헤더 제외)
- 연결 수립 : three-way handshake
  - 클라이언트 -> 서버 : SYN 세그먼트, 초기 순서번호 전송 (액티브 오픈. active open)
  - 서버 -> 클라이언트 : SYN 세그먼트, ACK 세그먼트, 초기 순서번호, 확인 응답 번호 (패시브 오픈. passive open)
  - 클라이언트 -> 서버 : ACK 세그먼트, 다음 순서번호, 확인 응답 번호
- 연결 종료 : four-way handshake
  - 클라이언트 -> 서버 : FIN 세그먼트 (액티브 클로즈. active close)
  - 서버 -> 클라이언트 : ACK 세그먼트, 확인 응답 번호
  - 서버 -> 클라이언트 : FIN 세그먼트 (패시브 클로즈. passive close)
  - 클라이언트 -> 서버 : ACK 세그먼트, 확인 응답 번호
- TCP 상태(stateful protocol)
  - 연결이 수립되지 않은 상태
    - CLOSED : 아무 연결도 없는 상태
    - LISTEN : SYN 세그먼트를 기다리고 있는 상태
  - 연결 수립 상태
    - SYN-SENT : 액티스 오픈 호스트가 SYN 세그먼트를 보내고 SYN + ACK 세그먼트를 기다리는 상태
    - SYN-RECEIVED : 패시브 오픈 호스트가 SYN + ACK 세그먼트를 보내고 ACK 세그먼트를 기다리는 상태
    - ESTABLISHED : 마지막 ACK 세그먼트를 주고받고 연결이 확립된 상태
  - 연결 종료 상태
    - FIN-WAIT-1 : 액티브 클로즈 호스트가 FIN 세그먼트를 보내고 ACK 세그먼트를 기다리는 상태
    - CLOSE-WAIT : 패시브 클로즈 호스트가 ACK 세그먼트를 보내고 대기중인 상태
    - FIN-WAIT-2 : 액티브 클로즈 호스트가 ACK 세그먼트를 받고 FIN 세그먼트를 기다리는 상태
    - LAST-ACK : 패시브 클로즈 호스트가 FIN 세그먼트를 보내고 ACK 세그먼트를 기다리는 상태
    - TIME-WAIT : 액티브 클로즈 호스트가 ACK 세그먼트를 보내고 대기중인 상태
      - ACK 세그먼트를 수신받지 못한 경우 재전송해야 하므로 일정 시간 대기
    - CLOSED
      - 액티브 클로즈 호스트 : TIME-WAIT 상태에서 일정 시간 경과 후 전이
      - 패시브 클로즈 호스트 : LAST-ACK 상태에서 ACK 세그먼트를 수신하면 전이
    - CLOSING : 동시에 FIN 세그먼트를 보낸 경우의 상태
      - 서로에게 ACK 세그먼트를 보내고, 수신한 호스트는 TIME-WAIT 상태가 되어 일정 시간 경과 후 CLOSED 된다.

### UDP(User Datagram Protocol) : stateless, 비연결형, 신뢰할 수 없는
  
- 송신지 포트와 수신지 포트
- 길이 : UDP 데이터그램의 바이트 (헤더 포함)
- 체크섬 : 오류 발생 검사 필드
  - 훼손 여부를 판단하는 것이지 수신지 도달 여부를 판단하지는 않음(비신뢰성)

## 04-3. TCP 의 오류, 흐름, 혼잡 제어 (226p~)

### 오류 제어 : 오류 검출과 재전송
  
- 중복된 ACK 세그먼트 수신
  - 수신 호스트 측에서 세그먼트 번호가 누락된 경우 중복 ACK 전송
  - RTT(Round Trip Time) : 메시지를 전송한 뒤 답변을 받는 데 걸리는 시간
- 타임아웃 발생
  - 타임아웃(timeout) : 송신 호스트의 재전송 타이머(retransmission timer) 카운트 만료 상황
  - ARO(Automatic Repeat Request) : 자동 재전송 기법
    - Stop-and-Wait ARQ
      - 제대로 전발받음을 확인하기 전까지는 새로운 메시지를 보내지 않는 방식
      - 네트워크 이용 효율이 낮음 (응답 받기 전까지 다음 메시지를 보내지 않으므로)
    - Go-Back-N ARQ
      - 파이프라이닝(pipelining) : 연속해서 메시지를 전송하는 기술
      - 한 번에 여러 세그먼트를 전송하고 수신 실패한 세그먼트부터 재전송하는 방식
      - 누적 확인 응답(CACK; Cumulative Acknowledgement) : 특정 세트먼트의 확인 ACK 는 특정 세그먼트까지는 모두 성공했다는 의미
      - 빠른 재전송(fast transmit) : 세 번의 동인한 ACK 세그먼트가 수신되면 타임아웃에 관계없이 세그먼트 재전송하는 기능
    - Selective Repeat ARQ
      - 개별 확인 응답(SACK; Selective Acknowledgement) : 수신 호스트가 수신 성공한 패킷에 대해서만 ACK 세그먼트를 보내는 방식
      - 현재 대부분의 TCP 통신에서 지원하며, 미지원하는 경우 Go-Back-N 으로 동작 (TCP 헤더 SACK 필드로 확인)

### 흐름 제어 (flow control) : 수신 윈도우가 한 번에 처리 가능한 세그먼트의 양 특정
   
- 수신 윈도우(RWND; Receiver WiNDow), 슬라이딩 윈도우 (sliding window) : 송수신 윈도우 영역이 한 칸씩 이동하면서 전송 데이터를 특정하는 것
  - TCP 헤더에 포함(수신 호스트가 송신 호스트에게 알려줘야 하므로)
  - 윈도우(window) : 송신 호스트가 파이프라이닝 할 수 있는 최대량
  - 수신 버퍼 : 수신 세그먼트의 임시 저장 공간
  - 송신 버퍼 : 송신 세그먼트의 임시 저장 공간
  - 버퍼 오버플로(buffer overflow) : 버퍼의 크기보다 많은 데이터를 전송하려는 경우 넘치는 현상

### 혼잡 제어 (congestion control) : 송신 호스트가 혼잡 없이 전송 가능한 전송량 조절
  
- 혼잡 붕괴(congestion collapse) : 혼잡으로 인해 전송률이 떨어지는 현상
- 혼잡 윈도우(CWND; congestion window) : 혼잡 없이 전송할 수 있을 것으로 예상되는 데이터양
  - TCP 헤더에 미포함(송신 호스트가 자체적으로 계산하는 값이므로)
  - 혼잡 윈도우의 크기 : 혼잡 제어 알고리즘(congestion control algorithm)
    - AIMD(Addictive Increase/Multiplicative Decrease)
      - 혼잡이 감지되지 않으면 RTT 마다 혼잡 윈도우 1 증가
      - 혼잡이 감지되면 혼잡 윈도우 절반으로 감소
      - 초기 전송속도가 느림 (혼잡 윈도우 선형증가)
    - 느린 시작 알고리즘(slow start)
      - 혼잡 윈도우 1부터 시작
      - 수신 ACK 세그먼트 하나당 혼잡 윈도우 1 증가 (즉 총 혼잡 윈도우는 지수증가)
      - AIMD 에 비해 초기 전송속도 빠름 (혼잡 윈도우 지수증가)
      - 느린 시작 임계치(SSTHRESH; slow start threshold) : 혼잡 윈도우 임계치
        - 타임아웃 발생 : 혼잡 윈도우 1, 느린 시작 임계치를 절반으로 초기화하고 느린 시작 알고리즘 재개
        - 혼잡 윈도우 >= 느린 시작 임계치 : 혼잡 윈도우를 절반으로 초기화하고 혼잡 회피 알고리즘 수행
        - 세 번의 중복 ACK 발생 : 빠른 재전송 후 빠른 회복 알고리즘 수행
    - 혼잡 회피 알고리즘(congestion avoidance)
      - RTT 마다 혼잡 윈도우 1MSS(Maximum Segment Size) 증가 (선형증가)
      - 혼잡 회피 도중 타임아웃 : 혼잡 윈도우 1, 느린 시작 임계치 절반으로 초기화하고 느린 시작 알고리즘 재개
      - 혼잡 회피 도중 세 번의 중복 ACK 발생 : 혼잡 윈도우, 느린 시작 임계치 절반으로 초기화하고 빠른 회복 알고리즘 수행
    - 빠른 회복 알고리즘(fast recovery)
      - 세 번의 중복 ACK 를 수신한 경우 느린 시작 알고리즘을 건너뛰고 혼잡 회피 알고리즘을 수행
      - 빠른 회복 도중 타임아웃 : 혼잡 윈도우 1, 느린 시작 임계치 절반으로 초기화하고 느린 시작 알고리즘 수행
  - 명시적 혼잡 알림(ECN; Explicit Congestion Notification)
    - 네트워크 장치(주로 라우터)가 수행
    - IP, TCP 헤더에 ECN 필드 추가(서비스 유형 필드 내 오른쪽 두개 비트. TCP: CWR + ECE)
    - 송신 호스트가 라우터에 메시지 전송
    - 라우터가 혼잡을 판단한 경우 ECN 비트를 11로(혼잡 감지. congestion experienced) 수신 호스트에게 전송
    - 수신 호스트는 ECE 비트를 세팅해서 송신 호스트에게 ACK 메시지 전송
    - 송신 호스트는 CWR 비트 세팅 후 혼잡 윈도후 절반으로 감소
