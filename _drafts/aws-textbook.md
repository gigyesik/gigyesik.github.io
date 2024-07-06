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
