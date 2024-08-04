---
layout: post
title: (AWS 교과서) 2장. AWS 컴퓨팅 서비스
date: 2024-08-05 02:44 +0900
categories: [book, AWS 교과서]
tag: [book, AWS 교과서, computing]
---

# 2장. AWS 컴퓨팅 서비스 (37p~)

## 2.1. AWS 컴퓨팅 서비스 (38p~)

### 2.1.1. 컴퓨팅 정의

- 컴퓨팅(computing) : 계산하고 답을 구하고 추정하는 행위
- 서버(server) : 컴퓨팅을 목적으로 특화된 장비(device)
- 워크로드(workload) : 컴퓨팅 리소스의 처리 작업

### 2.1.2. AWS 컴퓨팅 서비스

- AWS 컴퓨팅 서비스 : 퍼블릭 클라우드에서 컴퓨팅 자원을 활용하여 워크로드를 수행하는 서비스
- EC2(Elastic Compute Cloud) : 클라우드 환경에서 인스턴스(instance) 라는 가상 머신(Virtual Machine; VM) 형태로 서버 자원을 제공
- ECS(Elastic Container Service) : EC2 기반 클러스터에서 실행되는 컨테이너의 배포, 스케줄링(scheduling), 스케일링(scaling) 서비스
- Lambda : 서버리스(serverless) 컴퓨팅 서비스
  - 서버리스 : 서버 설정 없이 환경만 제공. 코드만 실행
- Lightsail : 독립적 환경 제공 컴퓨팅 서비스

## 2.2. Amazon EC2 소개 (39p~)

### Amazon EC2(Amazon Elastic Compute Cloud) : AWS 에서 제공하는 가상 서버

- Elastic : '탄력적인'. 컴퓨팅 자원을 온디맨드로 사용 가능
- AMI(Amazon Machine Image) : EC2 에서 필요한 소프트웨어 정보 정의

### 2.2.1. Amazon EC2 인스턴스

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

### 2.2.2. AMI

- AMI : 인스턴스 시작시 운영 체제와 소프트웨어 구성을 제공하는 템플릿

### 2.2.3. Amazon EC2 스토리지

- 스토리지(storage) : 데이터 저장 공간
  - 인스턴스 스토어(instance store)
    - 인스턴스에 바로 붙어 있는 저장소(기본 생성. 임시 저장소)
    - 빠른 I/O(Input/Output)
    - 인스턴스 중지 또는 종료시 저장된 데이터 모두 손실
  - Amazon EBS(Elastic Block Store)
    - 네트워킹을 통해 인스턴스와 EBS 연결된 구조

### 2.2.4. Amazon EC2 네트워킹

- Amazon VPC(Virtual Private Cloud) : 가상의 클라우드 네트워크
  - EC2 인스턴스는 VPC 내부에 생성되어 네트워킹
- ENI(Elastic Network Interface) : 네트워크 인터페이스
  - VPC 내 생성되는 가상의 네트워크 어댑터
- IP(Internet Protocol) 주소
  - 공인 IP(public IP) : 외부 구간의 통신을 위한 IP
  - 사설 IP(private IP) : 내부 구간의 통신을 위한 IP

### 2.2.5. Amazon EC2 보안

- 보안 그룹(security group) : 가상의 방화벽
  - 인바운드(inbound) : 인스턴스 기준으로 수신 트래픽 규칙
  - 아웃바운드(outbound) : 인스턴스 기준으로 송신 트래픽 규칙
- 키 페어(key pair) : 인스턴스에 연결할 때 자격을 증명하는 보안 키
  - 퍼블릭 키(public key) : 인스턴스에 저장
  - 프라이빗 키(private) : 사용자 컴퓨터에 저장

### 2.2.6. Amazon EC2 모니터링

- 수동 모니터링 도구
  - Amazon EC2 대시보드
  - Amazon CloudWatch
- 자동 모니터링 도구
  - Amazon CloudWatch
  - Amazon SNS(Simple Notification Service)

### 2.2.7. Amazon EC2 구입 옵션

- 온디맨드 인스턴스 : 시작하는 인스턴스 비용을 초 단위로 지불
- Saving Plans : 1년 또는 3년 동안 시간당 비용 약정(일관된 컴퓨팅 사용량)
- 예약 인스턴스 : 1년 또는 3년 동안 인스턴스 유형과 리전 약정(일관된 인스턴스)
- 스팟 인스턴스 : 미사용 중인 인스턴스에 대해 경매 방식으로 할당
