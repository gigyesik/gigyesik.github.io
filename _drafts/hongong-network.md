# 혼자 공부하는 네크워크

## 1. 컴퓨터 네트워크 시작하기 (27p~)

### 01-1. 컴퓨터 네트워크를 알아야 하는 이유 (28p~)

- 네트워크(network) : 정보를 주고받을 수 있는 통신망
- 인터넷 (internet) : 네트워크의 네크워크

### 01-2. 네크워크 거시적으로 살펴보기 (36p~)

- 네트워크의 구조
  - 네트워크는 그래프(graph) 형태
    - 그래프 : 자료구조(data structure). 노드(node) + 간선(edge)
      - 노드는 장치, 간선은 통신매체(케이블)
  - 호스트(host) : 가장자리 노드. 최초 송신, 최종 수신
    - 서버(server) : 서비스 제공 호스트
    - 클라이언트(client) : 서비스를 요청하고 응답받는 호스트
    - 고정된 개념은 아님. 서버 역할인 동시에 클라이언트 역할일 수 있다.
  - 네트워크 장비 : 중간 노드
  - 통신 매체 : 간선. 유선 또는 무선
  - 메시지(message) : 노드끼리 주고받는 정보
- 범위에 따른 네트워크 분류
  - LAN(Local Area Network) : 근거리 통신망
  - WAN(Wide Area Network) : 광역 통신망
    - ISP(Internet Service Provider. 이동통신사) 가 관리
- 메시지 교환 방식에 따른 네트워크 분류
  - 회선 교환 방식(circuit switching) : 전화통화
  - 패킷 교환 방식(packet switching)
    - 패킷 : 송수신 메시지 단위
      - 페이로드(payload) : 전송하고자 하는 데이터
      - 헤더(header)
      - 트레일러(trailer)
    - 패킷 스위치 : 패킷 송수신자 식별. 라우터, 스위치
- 송수신지 유형에 따른 네트워크 분류
  - 주소(address): 송수신지 식별자 
  - 유니캐스트(unicast): 하나의 수신지에 메시지 전송
  - 브로드캐스트(broadcast): 자신을 제외한 네트워크상의 모든 호스트에게 메시지 전송

### 01-3. 네크워크 미시적으로 살펴보기 (50p~)

- 프로토콜(protocol) : 노드 간 통신 방법 규약
- 네트워크 참조 모델(네트워크 계층 모델) : 통신 구조를 계층화한 것
  - OSI 7계층
    - 물리 계층(physical layer) : 비트 신호
    - 데이터 링크 계층(data link layer) : MAC 주소 특정
    - 네트워크 계층(network layer) : IP 주소 특정
    - 전송 계층(transport layer) : 패킷 흐름 제어, 포트(응용 프로그램) 특정
    - 세션 계층(session layer) : 호스트의 응용 프로그램 간 연결 상태(세션) 제어
    - 표현 계층(presentation layer) : 통신 데이터 변환, 압축, 암호화
    - 응용 계층(application layer) : 응용 프로그램에 네트워크 서비스 제공
  - TCP/IP 프로토콜
    - 프로토콜 스위트(suite) 또는 스택(stack). 프로토콜의 집합
    - 네트워크 엑세스 계층(network access layer) : OSI 데이터 링크 계층과 유사
    - 인터넷 계층(internet layer) : OSI 네트워크 계층과 유사
    - 전송 계층(transport layer) : OSI 전송 계층과 유사
    - 응용 계층(application layer) : OSI 세션 계층 + 표현 계층 + 응용 계층솨 유사
- 캡슐화(encapsulation), 역캡슐화(decapsulation)
  - 송신 과정에서 헤더 및 트레일러 추가, 제거
- PDU(Protocol Data Unit) : 각 계층에서 송수신되는 메시지의 단위
  - 응용, 표현, 세션, 전송 계층 : 데이터(Data)
  - 전송 계층 : 세그먼트(segment), 데이터그램(datagram)
  - 네트워크 계층 : ip 패킷(ip packet)
  - 데이터 링크 계층 : 프레임(frame)
  - 물리 계층 : 비트(bit)
- 트래픽과 네트워크 성능 지표
  - 트래픽(traffic) : 네트워크 내의 정보량
  - 처리율(throughput) : 단위 시간당 전송량. bps, Mbps, Gbps, pps
  - 대역폭(bandwidth) : 단위 시간당 송수신 가능한 최대 정보량. bps, Mbps, Gbps
  - 패킷 손실(packet loss) : 전체 패킷 중 유실된 패킷의 비율
