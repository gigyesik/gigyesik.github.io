---
layout: post
title: (AWS 교과서) 1장. AWS 란
date: 2024-08-03 01:53 +0900
categories: [book, AWS 교과서]
tag: [book, AWS 교과서, AWS]
---

# 1장. AWS 란 (17p~)

## 1.1 클라우드 컴퓨팅 (18p~)

### 1.1.1. 클라우드 컴퓨팅이란

- 온프레미스(on-premises) : 사용자가 공간, 자원 등을 자체적으로 구축, 운영하는 방식
- 온디맨드(on-demand) : 인터넷을 통해 요구가 있을 때 IT 자원이 제공되는 방식
- 클라우드(cloud) : 인터넷 구간 어딘가에 구성된 IT 자원 집합
- 클라우드 컴퓨팅(cloud computing) : 클라우드 환경에서 온디맨드로 제공하는 서비스

### 1.1.2. 클라우드 컴퓨팅의 이점

- 민첩성 : 필요한 자원을 빠르게 구동 가능
- 탄력성 : 필요한 만큼의 자원만 할당받아 사용 가능
- 비용 절감 : IT 자원을 사용한 만큼 비용 지불

### 1.1.3. 클라우드 컴퓨팅 서비스 유형(as-a service)

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

### 1.1.4. 클라우드 구축 모델

- 퍼블릭 클라우드(public cloud) 구축 모델
  - 클라우드 공급자가 클라우드 자원 공급
  - AWS(Amazon Web Service), GCP(Google Cloud Platform), Microsoft Azure 등
- 프라이빗 클라우드(private cloud) 구축 모델
  - 사용자 환경에 온프레미스 환경으로 클라우드 자원 구축
- 하이브리드 클라우드(hybrid cloud) 구축 모델
  - 퍼블릭 클라우드와 프라이빗 클라우드 혼합

## 1.2. AWS 서비스 (24p~)

### 1.2.1. AWS 소개

- 리전(region) : 클라우드 서비스를 위해 자원이 모여 있는 물리적 데이터 센터의 지리적 위치(지역)
- 가용 영역(availability zone) : 리전 내 구성되는 개별 데이터 센터

### 1.2.2. AWS 서비스 라인업

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

### 1.2.3. AWS 과금 체계

- Pay Per Use : IT 자원을 사용한 만큼 비용 지불
- 처음 가입시 프리 티어(free-tier) 정책
