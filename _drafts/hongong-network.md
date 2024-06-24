# 혼자 공부하는 네크워크

## 01. 컴퓨터 네트워크 시작하기 (27p~)

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

## 02. 물리 계층과 데이터 링크 계층 (74p~)

### 02-1. 이더넷 (76p~)

- 이더넷(ethernet) : 통신 매체 규격, 송수신 프레임 형태, 방법 등을 정의하는 네트워크 기술
- 이더넷 표준 : IEEE 802.3
- 통신 매체(간선) 표기 형태 : {전송속도}BASE-{추가특성}
  - 전송 속도 : 10, 100, 1000, 2.5G, 5G, 10G, 40G, 100G (Mbps, Gbps)
  - BASE(BASEband) : 변조 타입(modulation type). 비트 신호를 통신 매체로 전송하는 방법
  - 추가 특성 : 통신 매체 종류, 전송 가능 최대 거리, 물리 계층 인코딩(X), 전송로(레인. R) 수 등
  - 통신 매체 종류
    - C : 동축 케이블
    - T : 트위스티드 페어 케이블
    - S : 단파장 광섬유 케이블
    - L : 장파장 광섬유 케이블
  - 1000BASE-SX : 1000Mbps 속도를 지원하는 단파장 광섬유 케이블
- 이더넷 프레임(ethernet frame) : 데이터 링크 계층 전송 데이터의 형태
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

### 02-2. NIC 와 케이블 (88p~)

- NIC(Network Interface Controller) : 호스트와 유무선 통신 매체 연결과 변환, MAC 주소를 부여하는 네트워크 장비. LAN 카드
- 케이블(Cable) : NIC 에 연결되는 물리 계층 유선 통신 매체
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

### 02-3. 허브 (102p~)

- 주소(address) 는 MAC 주소부터 있는 개념이므로 1계층(물리) 에서는 사용되지 않고, 2계층(데이터 링크) 부터 사용된다.
- 허브(hub) : 여러 대의 호스트를 연결하는 장치
  - 신호를 전달받으면 송신지를 제외한 모든 포트로 내보낸다.
  - 반이중 모드로 통신한다. (무전기처럼 송수신을 교대로. 동시에 송신시 충돌)
    - 콜리전 도메인(collision domain) : 같은 허브에 연경되어 있는 호스트 집합. 충돌 발생 가능 영역
  - cf. 전이중 모드 : 송수신을 동시에 할 수 있음
  - CSMA/CD 프로토콜 (Carrier Sense Multiple Access with Collision Detection)
    - CS : 캐리어 감지. 네트워크상 전송 중인 신호가 있는지 확인
    - MA : 다중 접근. 다른 호스트가 전송중이지 않을 때 전송
    - CD : 충돌 검출. 충돌이 발생한 경우 각 호스트에게 잼 신호(jam signal) 을 보내고, 일정 시간 대기 후 재전송
- 리피터(repeater) : 전기 신호 증폭 장치
- 이더넷 허브 : 이더넷 네트워크의 허브

### 02-4. 스위치 (112p~)

- 스위치(layer 2 switch, L2 switch) : 전이중 통신, MAC 주소 학습을 지원하는 2계층 네트워크 장비
  - MAC 주소 학습(MAC address learning) : 원하는 호스트에만 프레임 전달 가능 
    - 플러딩(flooding) : 허브처럼 송신지 제외 모든 포트에 프레임 전송
    - 필터링(filtering) : 플러딩 이후 어떤 포트에 프레임을 보낼지 결정하는 것
    - 포워딩(forwarding) : 프레임이 전송될 포트에 프레임을 보내는 것
  - MAC 주소 테이블(MAC address table) : 스위치 포트와 호스트 MAC 주고 연관 관계 테이블. 스위치 메모리에 보관
    - 송신 호스트가 프레임을 송신하면, 플러딩 발생하며 MAC 주소 테이블에 송신지 MAC 주소 기록
    - 응답 호스트가 응답 프레임을 전송하면, 수신지 MAC 주소 기록
    - 나머지 호스트는 응답 폐기
    - 에이징(aging) : 특정 포트에서 일정 시간 동안 프레임을 전송받지 못한 경우 테이블에서 폐기하는 것
- VLAN(Virtual LAN) : 호스트의 물리적 위치와 관계없이 논리적으로 LAN 구성
  - 포트 기반 VLAN(port based VLAN) : VLAN 트렁킹(VLAN Trunking)
    - VLAN 트렁킹 : 트렁크 포트(trunk port. 두 스위치의 공통 포트)에 VLAN 스위치 연결
    - 프레임의 VLAN 식별 : 802.1Q 프레임. 이더넷 프레임의 헤어네 VLAN 태그(32비트) 부착
  - MAC 기반 VLAN(MAC based VLAN) : 포트와 관계없이 MAC 주소 기반으로 VLAN 설정

## 03. 네트워크 계층 (126p~)

### 03-1. LAN 을 넘어서는 네트워크 계층 (128p~)

- 1계층(물리 계층), 2계층(데이터 링크 계층) 만으로 모든 전송을 하지 못하는 이유
  - 다른 네트워크까지의 도달 경로를 알 수 없다. -> 라우터(router)
  - 모든 네트워크에 속한 호스트의 위치를 알 수 없다. -> IP + MAC 함께 사용
- 라우팅(routing) : 패킷이 이동할 최적의 경로를 결정하는 것. 라우터가 수행
- IP 주소 : 논리 주소. '호스트' 에 할당
  - DHCP(Dynamic Host Configuration Protocol) 로 자동 할당하거나, 직접 할당 가능.
  - 한 호스트가 복수의 주소를 갖는 것도 가능
- IP(Internet Protocol)
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
- ARP(Address Resolution Protocol) : IP 주소를 통해 MAC 주소를 알아내는 프로토콜
  - ARP 요청(ARP request) : 네트워크 내 모든 호스트에게 ARP 패킷 브로드캐스트 메시지
    - 프레임 페이로드(데이터) 내 포함
      - 오퍼레이션 코드(Opcode) : 1이면 ARP 요청, 2이면 ARP 응답
      - 송신지, 수신지 하드웨어 주소(Sender, Target Hardware Address) : MAC 주소. ff:~:ff, 00:~:00
      - 송신지, 수신지 프로토콜 주소(Sender, Target Protocol Address) : IP 주소
  - ARP 응답(ARP reply) : 해당하는 MAC 주소의 호스트가 송신자에게 응답 패킷 전송
  - ARP 테이블(ARP table) 갱신 : IP 주소와 MAC 주소 대응 표

### 03-2. IP 주소 (148p~)

- IP 주소(IP address) : 네트워크 주소(network identifier) + 호스트 주소(host identifier)
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
- 예약 주소
  - 루프백(loopback address) : 127.0.0.0/8(127.0.0.0 ~ 127.255.255.255)
    - 로컬호스트(localhost)
    - 자기 자신을 호스트인 양 사용하여 패킷 전송 가능
  - 이 네트워크의 이 호스트 : 0.0.0.0/8(0.0.0.0 ~ 0.255.255.255.255)
  - 모든 임의의 IP 주소 : 0.0.0.0/0. 디폴트 라우트(default route) 결정

### 03-3. 라우팅 (170p~)

- 라우팅 : 라우터의 핵심 기능. 패킷이 이동할 경로를 설정하고 이동시키는 것
- 라우터 : 3계층의 핵심 장비
  - 공유기 : 홈 라우터(home router). 라우터 + NAT + DHCP + 방화벽
  - 홉(hop) : 라우터와 라우터 간 이동하는 하나의 과정
    - 라우팅 테이블(routing table) : 수신지까지 도달 정보를 명시한 표
      - 수신지 IP 주소, 서브넷 마스크 : 최종 패킷 전달 대상
      - 다읍 홉(next hop) : 게이트웨에. 다음으로 거쳐야 할 호스트의 IP 주소 또는 인터페이스
      - 네트워크 인터페이스 : 패킷을 내보낼 통로. NIC 또는 인터페이스에 대응하는 IP
      - 메트릭(metric) : 해당 경로로 이동하는 데 드는 비용
    - 디폴트 라우트(default route) : 기본 게이트웨이로 패킷을 내보낼 경로. 0.0.0.0/0
- 정적 라우팅과 동적 라우팅 : 라우팅 테이블을 만드는 방법
  - 정적 라우팅(static routing) : 수동으로 채운 라우팅 테이블을 기반으로 라우팅하는 방식
  - 동적 라우팅(dynamic routing) : 자동으로 라우팅 테이블을 만들고 이를 이용하여 라우팅하는 방식
    - AS(Autonomous System) : 한 회사나 집단에서 관리하는 라우터 집단 네크워크
      - AS 밖과 통신할 때는 AS 경계 라우터(ASBR; Autonomous System Boundary Router) 사용
- 라우팅 프로토콜(routing protocol) : 패킷 이동 최적 경로 찾는 프로토콜
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

## 04. 전송 계층 (188p~)

### 04-1. 전송 계층 개요. IP의 한계와 포 (190p~)

- IP 의 한계
  - 신뢰할 수 없는(비신뢰성) 프로토콜(unreliable protocol) : 패킷의 수신지까지 전달을 보장하지 않음
  - 비연결형 프로토콜(connectionless protocol) : 송수신 호스트간 연결 작업을 하지 않음
- 전송 계층의 IP 한계 보완
  - TCP 연결 수립
  - TCP 를 통해 재전송을 통한 오류 제어, 흐름 제어, 혼잡 제어
- 포트(port) : 특정 어플리케이션을 식별할 수 있는 정보
  - 패킷의 최종 수신 대상은 특정 어플리케이션 프로세스
  - 프로세스 : 실행 중인 프로그램. PID(Process ID)로 구별
  - 포트의 분류
    - 잘 알려진 포트(well known port) : 0~1023
      - FTP(20, 21), SSH(22), TELNET(23), 53(DNS), DHCP(67, 68), HTTP(80), HTTPS(443) 등
    - 등록된 포트(registered port) : 1024~49151
      - MySQL(3306), Redis(6379), HTTP 대체(8080) 등
    - 동적 포트(dynamic port) : 사설 포트(private port), 임시 포트(ephemeral port). 49152~65535 (2^16 -1)
  - 특정 호스트에서 실행 중인 특정 어플리케이션 프로세스 : {IP 주소}:{포트 번호}
- 포트 기반 NAT
  - NAT 변환 테이블 : 사설 IP 공인 IP 주소를 변환
  - NAPT(Network Address Port Translation) : APT(Address Port Translation)
    - 포트를 활용해 하나의 공인 IP 주소를 여러 사설 IP 주소가 공유할 수 있도록 하는 NAT
- 포트 포워딩(port forwarding) : 네트워크 내 특정 호스트에 IP 주소와 포트 번호를 미리 할당하여 패킷 전달하는 기능
- ICMP(Internet Control Message Protocol) : 네트워크 계층 프로토콜
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