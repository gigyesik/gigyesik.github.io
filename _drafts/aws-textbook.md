# AWS 교과서

## 1장. AWS 란 (17p~)

### 1.1 클라우드 컴퓨팅 (18p~)

- 1.1.1. 클라우드 컴퓨팅이란
  - 온프레미스(on-premises) : 사용자가 공간, 자원 등을 자체적으로 구축, 운영하는 방식
  - 온디맨드(on-demand) : 인터넷을 통해 요구가 있을 때 IT 자원이 제공되는 방식
  - 클라우드(cloud) : 인터넷 구간 어딘가에 구성된 IT 자원 집합
  - 클라우드 컴퓨팅(cloud computing) : 클라우드 환경에서 온디맨드로 제공하는 서비스
- 1.1.2. 클라우드 컴퓨팅의 이점
  - 민첩성 : 필요한 자원을 빠르게 구동 가능
  - 탄력성 : 필요한 만큼의 자원만 할당받아 사용 가능
  - 비용 절감 : IT 자원을 사용한 만큼 비용 지불
- 1.1.3. 클라우드 컴퓨팅 서비스 유형(as-a service)
  - IaaS
    - Infrastructure as a Service
    - 클라우드 공급자는 인프라 영역 관리
      - 서버/스토리지/네트워킹 + 가상화
    - 클라우드 사용자는 나머지 영역 관리
      - 운영체제 + 미들웨어 + 런타임 + 데이터 + 어플리케이션
  - PaaS
    - Platform as a Service
    - 클라우드 사용자가 어플리케이션 영역만 관리
      - 데이터 + 어플리케이션
    - 클라우드 공급자는 나머지 영역 관리
      - 서버/스토리지/네트워킹 + 가상화 + 운영체제 + 미들웨어 + 런타임
  - SaaS
    - Software as a Service
    - 클라우드 공급자가 모든 것을 제공
      - 서버/스토리지/네트워킹 + 가상화 + 운영체제 + 미들웨어 + 런타임 + 데이터 + 어플리케이션
    - 클라우드 사용자는 서비스만 받음
- 1.1.4. 클라우드 구축 모델
  - 퍼블릭 클라우드(public cloud) 구축 모델
    - 클라우드 공급자가 클라우드 자원 공급
    - AWS(Amazon Web Service), GCP(Google Cloud Platform), Microsoft Azure 등
  - 프라이빗 클라우드(private cloud) 구축 모델
    - 사용자 환경에 온프레미스 환경으로 클라우드 자원 구축
  - 하이브리드 클라우드(hybrid cloud) 구축 모델
    - 퍼블릭 클라우드와 프라이빗 클라우드 혼합

### 1.2. AWS 서비스 (24p~)

- 1.2.1. AWS 소개
  - 리전(region) : 클라우드 서비스를 위해 자원이 모여 있는 물리적 데이터 센터의 지리적 위치(지역)
  - 가용 영역(availability zone) : 리전 내 구성되는 개별 데이터 센터
- 1.2.2. AWS 서비스 라인업
  - AWS 컴퓨팅
    - 서버 자원에 대한 가상 머신 생성, 비용 및 용량 관리
    - Amazon Elastic Compute Cloud(Amazon EC2)
  - AWS 네트워킹 및 콘텐츠 전송
    - 내, 외부 통신 네트워크 서비스
    - Amazon Virtual Private Cloud(VPC)
    - Amazon CloudFront
    - Amazon Route53
  - AWS 스토리지
    - 클라우드에 데이터 저장
    - Amazon Simple Storage Service(S3)
    - Amazon Elastic File System(EFS)
    - Amazon Elastic Block Store(EBS)
  - AWS 데이터베이스
    - 데이터베이스 엔진
    - Amazon Relational Database Service(RDS)
    - Amazon Aurora
    - Amazon DynamoDB
  - AWS 보안 자격 증명 및 규격 준수
    - 사용자 자격 증명 및 관리
    - 데이터, 네트워크, 어플리케이션 보호
    - 위협 탐지 및 모니터링
    - AWS Identity & Access Management(IAM)
- 1.2.3. AWS 과금 체계
  - Pay Per Use : IT 자원을 사용한 만큼 비용 지불
  - 처음 가입시 프리 티어(free-tier) 정책

### 1.3. (실습) AWS 가입하기 - 프리 티어 (27p~)

- 1.3.1. AWS 계정 생성
- 1.3.2. AWS 관리 콘솔
  - AWS 관리 콘솔(management console) : 웹 기반
  - cf. AWS CLI(Command Line Interface) : 셸 프로그램 명령어 기반
  - cf. AWS IaC(Infrastructure as Code) : 코드 기반

## 2장. AWS 컴퓨팅 서비스 (37p~)

### 2.1. AWS 컴퓨팅 서비스 (38p~)

- 2.1.1. 컴퓨팅 정의
  - 컴퓨팅(computing) : 계산하고 답을 구하고 추정하는 행위
  - 서버(server) : 컴퓨팅을 목적으로 특화된 장비(device)
  - 워크로드(workload) : 컴퓨팅 리소스의 처리 작업
- 2.1.2. AWS 컴퓨팅 서비스
  - AWS 컴퓨팅 서비스 : 퍼블릭 클라우드에서 컴퓨팅 자원을 활용하여 워크로드를 수행하는 서비스
  - EC2(Elastic Compute Cloud) : 클라우드 환경에서 인스턴스(instance) 라는 가상 머신(Virtual Machine; VM) 형태로 서버 자원을 제공
  - ECS(Elastic Container Service) : EC2 기반 클러스터에서 실행되는 컨테이너의 배포, 스케줄링(scheduling), 스케일링(scaling) 서비스
  - Lambda : 서버리스(serverless) 컴퓨팅 서비스
    - 서버리스 : 서버 설정 없이 환경만 제공. 코드만 실행
  - Lightsail : 독립적 환경 제공 컴퓨팅 서비스

### 2.2. Amazon EC2 소개 (39p~)

- Amazon EC2(Amazon Elastic Compute Cloud) : AWS 에서 제공하는 가상 서버
  - Elastic : '탄력적인'. 컴퓨팅 자원을 온디맨드로 사용 가능
  - AMI(Amazon Machine Image) : EC2 에서 필요한 소프트웨어 정보 정의
- 2.2.1. Amazon EC2 인스턴스
  - 인스턴스 유형 (t2.micro)
    - t : 인스턴스 패밀리. 용도별 분류
    - 2 : 인스턴스 세대. 높을수록 최신 세대(성능 우수)
    - micro : 인스턴스 크기. 클수록 용량과 가격 증가
  - 인스턴스 상태
    - 인스턴스 시작 : 대기 중(pending) -> 실행 중(running)
    - 실행 중인 인스턴스 중지 : 실행 중 -> 중지 중(stopping) -> 중지됨(stopped)
    - 중지된 인스턴스 시작 : 중지됨 -> 대기 중 -> 실행 중(running)
    - 중지된 인스턴스 종료 : 중지됨 -> 종료 중(shutting-down) -> 종료됨(terminated)
    - 실행 중인 인스턴스 종료 : 실행 중 -> 종료 중 -> 종료됨
- 2.2.2. AMI
  - AMI : 인스턴스 시작시 운영 체제와 소프트웨어 구성을 제공하는 템플릿
- 2.2.3. Amazon EC2 스토리지
  - 스토리지(storage) : 데이터 저장 공간
    - 인스턴스 스토어(instance store)
      - 인스턴스에 바로 붙어 있는 저장소(기본 생성. 임시 저장소)
      - 빠른 I/O(Input/Output)
      - 인스턴스 중지 또는 종료시 저장된 데이터 모두 손실
    - Amazon EBS(Elastic Block Store)
      - 네트워킹을 통해 인스턴스와 EBS 연결된 구조
- 2.2.4. Amazon EC2 네트워킹
  - Amazon VPC(Virtual Private Cloud) : 가상의 클라우드 네트워크 
    - EC2 인스턴스는 VPC 내부에 생성되어 네트워킹
  - ENI(Elastic Network Interface) : 네트워크 인터페이스
    - VPC 내 생성되는 가상의 네트워크 어댑터
  - IP(Internet Protocol) 주소
    - 공인 IP(public IP) : 외부 구간의 통신을 위한 IP
    - 사설 IP(private IP) : 내부 구간의 통신을 위한 IP
- 2.2.5. Amazon EC2 보안
  - 보안 그룹(security group) : 가상의 방화벽
    - 인바운드(inbound) : 인스턴스 기준으로 수신 트래픽 규칙
    - 아웃바운드(outbound) : 인스턴스 기준으로 송신 트래픽 규칙
  - 키 페어(key pair) : 인스턴스에 연결할 때 자격을 증명하는 보안 키
    - 퍼블릭 키(public key) : 인스턴스에 저장
    - 프라이빗 키(private) : 사용자 컴퓨터에 저장
- 2.2.6. Amazon EC2 모니터링
  - 수동 모니터링 도구
    - Amazon EC2 대시보드
    - Amazon CloudWatch
  - 자동 모니터링 도구
    - Amazon CloudWatch
    - Amazon SNS(Simple Notification Service)
- 2.2.7. Amazon EC2 구입 옵션
  - 온디맨드 인스턴스 : 시작하는 인스턴스 비용을 초 단위로 지불
  - Saving Plans : 1년 또는 3년 동안 시간당 비용 약정(일관된 컴퓨팅 사용량)
  - 예약 인스턴스 : 1년 또는 3년 동안 인스턴스 유형과 리전 약정(일관된 인스턴스)
  - 스팟 인스턴스 : 미사용 중인 인스턴스에 대해 경매 방식으로 할당

### 2.3. (실습) Amazon EC2 인스턴스 배포 및 접근하기 (50p~)

- 준비 : SSH(Secure SHell)
- EC2 키 페어 내려받기 : EC2 -> 네트워크 및 보안 -> 키 페어 -> 키 페어 생성
- 2.3.1. AMI 를 이용한 EC2 인스턴스 배포하기
  - EC2 대시보드 -> 인스턴스 시작
  - AMI : Amazon Linux 2 AMI (HVM)
  - 인스턴스 유형 : t2.micro
  - 키 페어 : 위에서 생성한 키 페어
  - 네트워크 설정 : 기본 보안 그룹(default)
  - 스토리지 구성 : 8GiB gp2
- 2.3.2. SSH 로 EC2 인스턴스에 접속하여 웹 서비스 설정하기
  - SSH 접속
    - 터미널 -> 키 페어 파일 폴더로 이동
    - `ssh -i [키 이름] ec2-user@[public IP]`
    - 주의 : 보안 그룹 인바운드 규칙에 ssh 내 IP 추가
  - 샘플 웹서비스 배포
    - 관리자 권한으로 변경 : `sudo su -`
    - http 데몬 설치 : `yum install httpd -y`
    - http 데몬 실행 : `systemctl start httpd`
    - 웹 서비스 내려받기
- 2.3.3. EC2 인스턴스에 생성된 웹 서비스 접속하기
  - 주의 : 보안 그룹 인바운드 규칙에 http 내 IP 추가
  - 브라우저에서 public ip 주소로 접속
- 2.3.4. EC2 인스턴스의 모니터링 설정하기
  - 수동 모니터링
    - EC2 -> 모니터링 탭
    - EC2 -> 모니터링 -> 대시보드에 추가 -> 새 대시보드 생성 -> CloudWatch 대시보드 생성
  - 자동 모니터링
    - EC2 -> 모니터링 탭 -> 세부 모니터링 관리 -> 활성화 체크 -> 저장
    - CloudWatch -> 경보 생성 -> 지표 선택 -> 그래프로 표시된 지표
      - ec2 이름 / 'CPUUtilization' 지표 선택
      - 그래프로 표시된 옵션 탭 -> 기간 '1분'
      - 옵션 탭 -> 위젯 유형 '누적 면적' -> 지표 선택
      - 조건
        - 임계값 유형 : 정적
        - 경보 조건 : 보다 큼
        - ...보다 : 50
        - 추가 구성 -> 누락된 데이터 처리 : 누락된 데이터를 양호(임계값 위반 안 함)(으)로 처리
      - 작업 구성
        - 경보 상태 트리거 : 경보 상태
        - SNS 주제 선택 : 새 주제 생성
          - 새 주제 생성 : EC2_CPU_High_Alarm
        - 알림을 수신할 이메일 엔드포인트 : gigyesik@gmail.com
        - EC2 작업
          - 경보 상태 트리거 : 경보 상태
          - 다음 작업 수행 : 이 인스턴스 재부팅
      - 이름 및 설명 추가 -> 경보 이름 : ec2_test_CPU_High_Alarm
    - EC2 에 부하 발생시키기
      - 부하 설정 툴 설치
        - `amazon-linux-extras install -y epel`
        - `yum install -y stress-ng`
      - 부하 70% 발생
        - `stress-ng --cpu 1 --cpu-load 70% --timeout 10m --metrics --times --verify`
    - 메일 전송 후 재부팅됨
- 2.3.5. (번외) 리눅스 명령어를 사용하여 EC2 인스턴스 정보 확인하기
  - CPU 정보 확인 : `cat /proc/cpuinfo | grep name`
  - 메모리 용량 확인 : `cat /proc/meminfo | grep MemTotal`
  - 프라이빗 IP 주소 확인 : `ip -br -c addr show eth0`
  - 퍼블릭 IP 주소 확인 : `curl ipinfo.ip/ip`
  - 스토리지 확인(EBS 볼륨) : `lsblk`, `df -hT -t xfs`
- 2.3.6 실습을 위해 생성된 모든 자원 삭제하기
  - EC2 -> 인스턴스 -> 인스턴스 종료
  - CloudWatch -> 모든 경보 -> 작업 -> 삭제

## 3장. AWS 네트워킹 서비스 (71p~)

### 3.1. 네트워킹이란 (72p~)

- 3.1.1. 네트워킹 정의
  - 네트워킹(networking) : IT 자원간 연결하여 통신하는 환경
- 3.2.2. 네트워킹 요소
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

### 3.2. AWS 네트워킹 소개 (78p~)

- 3.2.1. AWS 리전 네트워킹 디자인
  - 리전
    - 군집화된(clustering) 데이터 센터의 물리적인 위치
    - 트랜짓 센터(transit center) + 가용 영역(available zone)
  - Intra-AZ 연결 : 데이터 센터 간 연결
  - Inter-AZ 연결 : 가용 영역 간 연결
  - 트랜짓 센터 연결 : 가용 영역과 외부 인터넷 구간 연결
- 3.2.2. AWS 글로벌 네트워크와 엣지 POP
  - 엣지 POP(edge Point Of Presence) : AWS 글로벌 전용망
    - 일반 서비스 : 트랜짓 센터에서 인터넷 구간으로 확산
    - 엣지 POP 서비스 : 트랜짓 센터에서 AWS 백본 네트워크를 통해 POP 경유하여 AWS 글로벌 네트워크로 확산
      - Amazon CloudFront, Amazon Route 53, AWS Shield, AWS Global Accelerator
- 3.2.3. AWS 네트워킹 서비스 소개
  - VPC : 가상 프라이빗 클라우드 네트워크
  - Transit Gateway : VPC 와 온프레미스 네트워크 연결 게이트웨이
  - Route 53 : 관리형 DNS 서비스
  - Global Accelerator : 가용성 및 성능 증대
  - Direct Connect : 온프레미스 환경의 AWS 전용 네트워크와 연결
  - Site-to-Site VPN : 암호화 네트워크(VPN)

### 3.3. Amazon VPC 소개 (82p~)

- Amazon VPC : Virtual Private Cloud
- 3.3.1. Amazon VPC 기본 구성 요소
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
- 3.3.2. Amazon VPC 와 다른 네트워크 연결
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
- 3.3.3. Amazon VPC 요금
  - 2024년 2월부터 모든 퍼블릭 IP 할당시 유료

## 3.4. (실습) Amazon VPC 로 퍼블릭 및 프라이빗 서브넷 구성하기 (92p~)

### 3.4.1. 사용자 VPC 생성하기 (94p~)

- VPC 대시보드에 진입하면 기본 VPC(default VPC) 생성되어 있음
- 사용자 VPC(custom VPC) 생성
  - 생성할 리소스 : VPC 만
  - 이름 태그 : CH3-VPC
  - IPv4 CIDR 블록 : IPv4 CIDR 수동 입력
    - IPv4 CIDR : `10.3.0.0/16`
- VPC 세부 정보
  - VPC ID : 고유값. 자동 생성
  - 상태 : Available
  - 기본 라우팅 테이블 : 자동 생성
    - 10.3.0.0/16 대상 : local (라우팅 테이블 존재 위치)
  - 기본 네트워크 ACL : 자동 생성
    - 인바운드 규칙, 아웃바운드 규칙 : 모든 IP(0.0.0.0/0) 허용이 최상위 규칙(리스트 순회)
  - 기본 VPC : 아니오 (사용자 VPC)
  - IPv4 CIDR : 10.3.0.0/16
- 현재 네트워크 구성
  - VPC (10.3.0.0/16)
  - 기본 라우팅 테이블
    - 10.3.0.0/16 local
  - 가상 라우터
  - 기본 네트워크 ACL

### 3.4.2. 퍼블릭 서브넷 생성하기 (98p~)

- 서브넷 생성하기
  - VPC-ID : CH3-VPC
  - 서브넷 설정
    - 서브넷 이름 : CH3-Public-Subnet
    - 가용 영역 : 아시아 태평양(서울) / ap-northeast-2a
    - IPv4 서브넷 CIDR 블록 : 10.3.1.0/24
- 서브넷 정보
  - IPv4 CIDR : 10.3.1.0/24
  - 가용 영역 : ap-northeast-2a
  - VPC : CH3-VPC
  - 라우팅 테이블 : 기본 라우팅 테이블 (VPC 와 같음)
- 라우팅 테이블 생성하기
  - 이름 : CH3-Public-RT
  - VPC : CH3-VPC
  - 라우팅 상세 정보 -> 서브넷 연결 탭 -> 서브넷 연결 편집 -> CH3-Public-Subnet 선택
- 인터넷 게이트웨이 생성하기
  - 이름 : CH3-IGW
  - 현재 상태 : Detached
  - 작업 -> VPC 에 연결 -> CH3-VPC 에 연결 (상태 Attached 로 변경)
- 라우팅 테이블 편집하기
  - 라우팅 테이블 정보 -> 작업 -> 라우팅 편집
    - 대상 : 0.0.0.0/0 (전체 트래픽)
    - 대상 : CH3-IGW
- 현재 네트워크 구성
  - VPC (10.3.0.0/16)
  - 퍼블릭 서브넷 (10.3.1.0/24)
  - 퍼블릭 라우팅 테이블
    - 10.3.0.0/16 local
    - 0.0.0.0/0 CH3-IGW
  - 가상 라우터
  - 기본 라우팅 테이블
  - 인터넷 게이트웨이

### 3.4.3. 퍼블릭 서브넷 통신 확인하기 (109p~)

- 보안 그룹 생성하기
  - 기본 세부 정보
    - 보안 그룹 이름 : MY-WEB-SSH-SG
    - 설명 : 임의
    - VPC : CH3-VPC
  - 인바운드 규칙
    - HTTP, 내 IP
    - SSH, 내 IP
  - 아웃바운드 규칙
    - 모든 트래픽, 0.0.0.0/0
- EC2 인스턴스 생성
  - 이름 : CH3-Public-EC2
  - 키 페어(로그인) : test-gigyesik
  - 네트워크 설정 -> 편집
    - VPC : CH3-VPC
    - 서브넷 : CH3-Public-Subnet
    - 퍼블릭 IP 자동 할당 : 활성화
    - 방화벽(보안 그룹) : 기존 보안 그룹 선택 -> MY-WEB-SSH-SG
- EC2 정보 확인 (네트워킹 탭)
  - 퍼블릭 IPv4 주소
  - 프라이빗 IPv4 주소
  - VPC ID : CH3-VPC
  - 서브넷 ID : CH3-Public-Subnet
  - 가용 영역 : ap-northeast-2a
- EC2 실습 환경 설정하기 (ssh 연결)
  - `ssh -i [키 파일 이름] ec2-user@[public IP]`
- EC2 인스턴스에서 외부 인터넷으로 통신 확인하기 
  - ping : `ping google.com` -> 성공
  - http : `curl google.com` -> 성공
- 외부 인터넷에서 EC2 인스턴스 통신 확인하기
  - PC 에서 웹 접근 -> 성공
  - PC 에서 ping 시도 -> 실패 (http 만 허용)
  - 스마트폰에서 웹 접근 -> 실패 (IP 다름)
  - 스마트폰에서 PC와 같은 와이파이 접속 후 접근 -> 성공

### 3.4.4. 프라이빗 서브넷 생성하기 (116p~)
