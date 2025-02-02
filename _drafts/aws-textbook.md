# AWS 교과서

## 1.3. (실습) AWS 가입하기 - 프리 티어 (27p~)

### 1.3.1. AWS 계정 생성
### 1.3.2. AWS 관리 콘솔

- AWS 관리 콘솔(management console) : 웹 기반
- cf. AWS CLI(Command Line Interface) : 셸 프로그램 명령어 기반
- cf. AWS IaC(Infrastructure as Code) : 코드 기반

## 2.3. (실습) Amazon EC2 인스턴스 배포 및 접근하기 (50p~)

### 준비 : SSH(Secure SHell)
### EC2 키 페어 내려받기 : EC2 -> 네트워크 및 보안 -> 키 페어 -> 키 페어 생성
### 2.3.1. AMI 를 이용한 EC2 인스턴스 배포하기

- EC2 대시보드 -> 인스턴스 시작
- AMI : Amazon Linux 2 AMI (HVM)
- 인스턴스 유형 : t2.micro
- 키 페어 : 위에서 생성한 키 페어
- 네트워크 설정 : 기본 보안 그룹(default)
- 스토리지 구성 : 8GiB gp2

### 2.3.2. SSH 로 EC2 인스턴스에 접속하여 웹 서비스 설정하기

- SSH 접속
  - 터미널 -> 키 페어 파일 폴더로 이동
  - `ssh -i [키 이름] ec2-user@[public IP]`
  - 주의 : 보안 그룹 인바운드 규칙에 ssh 내 IP 추가
- 샘플 웹서비스 배포
  - 관리자 권한으로 변경 : `sudo su -`
  - http 데몬 설치 : `yum install httpd -y`
  - http 데몬 실행 : `systemctl start httpd`
  - 웹 서비스 내려받기

### 2.3.3. EC2 인스턴스에 생성된 웹 서비스 접속하기

- 주의 : 보안 그룹 인바운드 규칙에 http 내 IP 추가
- 브라우저에서 public ip 주소로 접속

### 2.3.4. EC2 인스턴스의 모니터링 설정하기

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

### 2.3.5. (번외) 리눅스 명령어를 사용하여 EC2 인스턴스 정보 확인하기

- CPU 정보 확인 : `cat /proc/cpuinfo | grep name`
- 메모리 용량 확인 : `cat /proc/meminfo | grep MemTotal`
- 프라이빗 IP 주소 확인 : `ip -br -c addr show eth0`
- 퍼블릭 IP 주소 확인 : `curl ipinfo.ip/ip`
- 스토리지 확인(EBS 볼륨) : `lsblk`, `df -hT -t xfs`

### 2.3.6 실습을 위해 생성된 모든 자원 삭제하기

- EC2 -> 인스턴스 -> 인스턴스 종료
- CloudWatch -> 모든 경보 -> 작업 -> 삭제

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

- 서브넷 생성하기
  - VPC : CH3-VPC
  - 서브넷 설정
    - 이름 : CH3-Private-Subnet
    - 가용 영역 : 아시아 태평양(서울) / ap-northeast-2c
    - IPv4 서브넷 CIDR 블록 : 10.3.2.0/24
- 라우팅 테이블 생성하기
  - 이름 : CH3-Private-RT
  - VPC : CH3-VPC
  - 서브넷 연결 편집 -> CH3-Private-Subnet
- NAT 게이트웨이 생성하기
  - NAT 게이트웨이 설정
    - 이름 : CH3-NAT-GW
    - 서브넷 : CH3-Public-Subnet
    - 연결 유형 : 퍼블릭 (NAT 게이트웨이는 퍼블릭 서브넷 구간에 위치)
    - 탄력적 IP 할당 (공인 IP 고정)
- 라우팅 테이블 편집하기
  - 라우팅 편집 -> 라우팅 추가
    - 대상 : 0.0.0.0/0
    - 대상 : NAT 게이트웨이 (CH3-NAT-GW)
- 현재 네트워크 구성
  - VPC (10.3.0.0/16)
  - 퍼블릭 서브넷 (10.3.1.0/24)
  - 퍼블릭 라우팅 테이블
    - 10.3.0.0/16 local
    - 0.0.0.0/0 CH3-IGW
  - 퍼블릭 EC2, 보안 그룹
  - NAT 게이트웨이
  - 프라이빗 서브넷 (10.3.2.0/24)
  - 프라이빗 라우팅 테이블
    - 10.3.0.0/16 local
    - 0.0.0.0/0 CH3-NAT-GW
  - 가상 라우터
  - 인터넷 게이트웨이

### 3.4.5. 프라이빗 서브넷 통신 확인하기 (124p~)

- EC2 인스턴스 생성
  - 이름 : CH3-Private-EC2
  - 키 페어(로그인) : 키 페어 없이 진행(책에는 설정하라고 되어있지만 connection refused)
  - 네트워크 설정 -> 편집
    - VPC : CH3-VPC
    - 서브넷 : CH3-Private-Subnet
    - 퍼블릭 IP 자동 할당 : 비활성화
    - 방화벽(보안 그룹) : 보안 그룹 생성
  - 고급 세부 정보 -> 사용자 데이터
    ```Bash
    #!/bin/bash
    (
    echo "qwe123"
    echo "qwe123"
    ) | passwd --stdin ec2-user
    sed -i "s/^PasswordAuthentication no/PasswordAuthentication yes/g" /etc/ssh/sshd_config
    systemctl restart sshd
    ```
- 현재 네트워크 구성
  - VPC (10.3.0.0/16)
  - 퍼블릭 서브넷 (10.3.1.0/24)
  - 퍼블릭 라우팅 테이블
    - 10.3.0.0/16 local
    - 0.0.0.0/0 CH3-IGW
  - 퍼블릭 EC2, 보안 그룹
  - NAT 게이트웨이
  - 프라이빗 서브넷 (10.3.2.0/24)
  - 프라이빗 라우팅 테이블
    - 10.3.0.0/16 local
    - 0.0.0.0/0 CH3-NAT-GW
  - 프라이빗 EC2, 보안 그룹
  - 가상 라우터
  - 인터넷 게이트웨이
- EC2 인스턴스에서 외부 인터넷 통신 확인하기
  - 먼저 퍼블릭 EC2 인스턴스로 ssh 접근
    - `ssh -i (키 파일 이름) ec2-user@(퍼블릭 IP)`
  - 퍼블릭 EC2 에서 프라이빗 EC2 프라이빗 IP 로 접근
    - `ssh ec2-user@(프라이빗 IP)`
  - `ping google.com` -> 성공
  - `curl ipinfo.io/ip` -> 성공
- 정리
  - 퍼블릭 서브넷 -> 외부 인터넷 : 가능
  - 외부 인터넷 -> 퍼블릭 서브넷 : 가능
  - 프라이빗 서브넷 -> 외부 인터넷 : 가능
  - 외부 인터넷 -> 프라이빗 서브넷 : 불가능

### 3.4.6. 실습을 위해 생성된 모든 자원 삭제하기 (128p~)

- EC2 종료
- NAT 게이트웨이 삭제
- 탄력적 IP 릴리스
- VPC 삭제 (하위 구성 자동 삭제됨)

## 4장. AWS 부하분산 서비스 (131p~)

### 4.1. Amazon ELB 기능 소개 (132p~)

- 4.1.1. 부하분산이란
  - 부하분산(로드 밸런싱; load balancing) : 클라이언트 요청에 대한 연산을 다수의 서버에 분산 처리하는 기능
  - 고가용성 : 시스템이나 서비스가 지속적으로 작동 가능하도록 하는 기능
  - 내결함성 : 시스템의 일부 구성 요소가 작동하지 않더라도 계속 작동할 수 있도록 하는 기능
- 4.1.2. Amazon ELB 기능
  - ELB(Elastic Load Balancing) : EC2 인스턴스에 들어오는 트래픽을 분산 처리하는 기술
- 4.1.3. Amazon ELB 구성 요소
  - 로드 밸런서 : 트래픽을 대상 그룹의 인스턴스로 분산시켜 어플리케이션의 가용성 유지
  - 대상 그룹 : 로드 밸런서에서 분산할 대상의 집합을 정의
  - 리스너 : 로드 밸런서에게 사용할 포트와 프로토콜 설정
- 4.1.4. Amazon ELB 동작 방식
  - 클라이언트 요청 수신, 리스너 등록
  - 대상 그룹 선택
  - 트래픽 분산
    - 각 대상의 가용성 상태 모니터링, 가용하지 않은 대상 제외
  - 대상 -> 로드 밸런서 -> 클라이언트 응답 반환
  - 로드 밸런서 통신 방식
    - 인터넷 경계 로드 밸런서 : 외부에서 직접 로드 밸런서에 접근
    - 내부 로드 밸런서 : 격리된 네트워크에서 로드 밸런서 사용
- 4.1.5. Amazon ELB 교차 영역 로드 밸런싱
  - 교차 영역 로드 밸런싱(cross-zone load balancing) : 각 대상 그룹의 인스턴스 수량이 불균형한 경우 트래픽을 보정하는 기술
  - 가용 영역과 무관하게 대상 자원의 비율을 고려하여 로드 밸런싱 수행 가능
  - 가용 영역간 통신 비용이 발생할 수 있음
- 4.1.7. Amazon ELB 종류
  - CLB(Classic Load Balancer)
    - 레거시
    - L4, L7 로드 밸런서
    - 지원 프로토콜 : TCP, SSL/TLS, HTTP, HTTPS
    - 대상 유형 : EC2-Classic
    - 고정 IP 미제공
    - 보안 그룹 사용
  - ALB(Application Load Balancer)
    - HTTP 헤더 기반 라우팅 -> 웹 어플리케이션에 적합
    - L7 로드 밸런서
    - 지원 프로토콜 : HTTP, HTTPS, gRPC
    - 대상 유형 : IP, 인스턴스, AWS Lambda, 컨테이너
    - 고정 IP 미제공
    - 보안 그룹 사용
  - NLB(Network Load Balancer)
    - 4계층 프로토콜 사용하여 대규모 트래픽 처리 가능 -> 게임 서버, 미디어 스트리밍 등에 적합
    - L4 로드 밸런서
    - 지원 프로토콜 : TCP, UDP, TLS
    - 대상 유형 : IP, 인스턴스, ALB, 컨테이너
    - 고정 IP 제공
    - 보안 그룹 미사용
  - GWLB(GateWay Load Balancer)
    - VPC 내부 라우팅 -> 서드 파티 방화벽, 어플라이언스 대상 트래픽 로드 밸런싱
    - L3 게이트웨이, L4 로드 밸런서
    - 지원 프로토콜 : IP
    - 대상 유형 : IP, 인스턴스
    - 고정 IP 미제공
    - 보안 그룹 사용

### 4.2. (실습) ALB 와 NLB 를 이용한 로드 밸런싱 구성하기 (141p~)

- 4.2.1. CloudFormation 소개
  - CloudFormation : 코드 기반으로 환경을 생성하는 기술
  - 특징
    - IaC(Infrastructure as Code)
      - 수동으로 자원을 만들지 않고 선언된 코드로 자원을 생성
      - 템플릿 기반으로 재사용 가능
      - 변경 사항 추적, 롤백 용이
    - AWS 리소스 간 종속성 관리
      - 템플릿에 종속성을 정의하여 관리 가능
    - 인프라 관리의 자동화
      - CI/CD 파이프라인과 통합 가능
  - 구성 요소
    - 템플릿 : AWS 인프라를 JSON 또는 YAML 형식의 코드로 정의하는 파일
    - 스택 : CloudFormation 을 이용하여 생성하는 AWS 인프라 집합
    - 리소스 : AWS 리소스. EC2 인스턴스, RDS 데이터베이스, S3 버킷 등
    - 파라미터 : 스택 생성 시 전달 가능한 매개변수
    - 이벤트 : 스택에서 발생하는 이벤트 기록
  - 동작
    - CloudFormation 템플릿 작성
    - 템플릿 업로드
    - 스택 생성 또는 업데이트
    - 스택 모니터링
    - 스택 삭제
- 4.2.2. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - 사전 조건-템플릿 준비 : 기존 템플릿 선택
    - 템플릿 지정
      - 템플릿 소스 : Amazon S3 URL
      - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter4/elblab.yaml
    - 스택 세부 정보 지정
      - 스택 이름 : elblab
      - KeyName : test-gigyesik
    - 스택 옵션 구성, 검토 : 기본값
  - 생성 결과 확인 (CREATED_COMPLETE)
    - VPC
      - MyVPC : 20.40.0.0/16
      - ELB-VPC : 10.40.0.0/16
    - 인터넷 게이트웨이 : My-IGW, ELB-IGW
    - 퍼블릭 라우팅 테이블
      - MyPublicRT : My-IGW
      - ELBPublicRT : ELB-IGW
    - 서브넷
      - My-Public-SN : MyVPC; 20.40.1.10/24
      - ELBPublicSN1 : ELB-VPC; 10.40.1.0/24
      - ELBPublicSN2 : ELB-VPA; 10.40.2.0/24
    - 보안 그룹
      - MySG : TCP 22, ICMP 허용
      - ELBSG : TCP 22/80, ICMP, UDP 161 허용
    - EC2 인스턴스
      - MyEC2 : My-Public-SN
      - SERVER-1 : ELB-Public-SN1
      - SERVER-2, SERVER-3 : ELB-Public-SN2
- 4.2.3. 기본 인프라 환경 검증하기
  - 환경 구성
    - VPC
      - MyVPC
      - ELB-VPC (각 인스턴스에 HTTP, SNMP 설치)
        - Subnet1
          - Server1
        - Subnet2
          - Server2, Server3
    - 전부 퍼블릭 서브넷
    - User-data 설치됨 (인스턴스 부팅 시 자동으로 수행하는 명령어 집합)
    - HTTP(HyperText Transfer Protocol) : 데이터 전송 프로토콜. 80번 포트(TCP) 사용
    - SNMP(Simple Network Management Protocol) : 네트워크 장비 모니터링, 관리 프로토콜. 161번 포트(UDP) 사용
  - SERVER-1, 2, 3
    - `tree /var/www/html`
    - `cat /var/www/html/xff.php`
  - MyEC2
    - SERVER-1~3 의 퍼블릭 IP 를 변수로 지정
      - `EC21 = ..`
      - `echo $EC21`
    - 웹 서비스 확인
      - `curl $EC21`
      - `curl $EC21/dev/`
      - `curl $EC21/mgt`
      - `curl $EC21/xff.php`
    - SNMP 서비스 확인
      - `snmpget -v2c -c public $EC21 1.3.6.1.2.1.1.5.0`
      - `snmpget -v2c -c public $EC21 1.3.6.1.2.1.1.3.0`
      - OID(Object ID) 정보
        - 1.3.6.1.2.1.1.1.0; sysDescr : 장비 설명
        - 1.3.6.1.2.1.1.2.0; sysObjectID : 장비 고유 ID
        - 1.3.6.1.2.1.1.3.0; sysUpTime : 장비 부팅 ~ 현재 시간(milli-second)
        - 1.3.6.1.2.1.1.5.0; sysName : 사용자가 설정한 장비 이름
- 4.2.4. ALB 를 생성하고 동작 과정 확인하기
  - ALB 생성하기
    - EC2 -> 대상 그룹 -> 대상 그룹 생성
      - 기본 구성
        - 대상 유형 : 인스턴스
        - 대상 그룹 이름 : ALB-TG
        - VPC : ELB-VPC
      - SERVER-1~3 선택 후 '아래에 보류 중인 것으로 포함'
    - EC2 -> 로드 밸런서 -> 로드 밸런서 생성
      - 로드 밸런서 유형 : Application Load Balancer
      - 기본 구성
        - 이름 : ALB
      - 네트워크 매핑
        - VPC : ELB-VPC
        - 매핑 : apne-2a, apne-2c
      - 보안 그룹 : elblab-..
      - 리스너 및 라우팅 : HTTP 80 -> ALB-TG
  - ALB 동작 확인하기
    - MyEC2
      - ALB DNS 이름 변수 지정
        - `ALB=ALB-1540650224.ap-northeast-2.elb.amazonaws.com`
        - `echo $ALB`
      - 도메인에 질의 수행
        - `dig $ALB +short`
        - 두 개의 가용 영역에 생성된 ENI 유동 IP 번갈아가며 출력
      - curl 테스트
        - `curl $ALB`
          - SERVER-1~3 번갈아가며 출력
        - `for i in {1..20}; do curl $ALB --silent ; done | sort | uniq -c | sort -nr`
          - 기본 라운드 로빈 방식으로 1/3 씩 분산되어 출력
      - ALB 는 교차 영역 로드 밸런싱이 기본적으로 활성화되어 있음
- 4.2.5. ALB 경로 기반 라우팅 기능을 구성하고 확인하기
  - MyEC2
    - `curl $ALB/dev/index.html --silent` -> SERVER-1 만 200
    - `curl $ALB/mgt/index.html --silent` -> SERVER-2,3 만 200
  - DEV-TG 대상 그룹 생성
    - EC2 -> 대상 그룹 -> 대상 그룹 생성
      - 이름 : DEV-TG
      - VPC : ELB-VPC
    - SERVER-1 선택 후 '아래에 보류 중인 것으로 포함'
  - MGT-TG 대상 그룹 생성
    - EC2 -> 대상 그룹 -> 대상 그룹 생성
      - 이름 : MGT-TG
      - VPC : ELB-VPC
    - SERVER-2~3 선택 후 '아래에 보류 중인 것으로 포함'
  - 경로 기반 라우팅 설정 규칙 추가
    - EC2 -> 로드 밸런서 -> 리스너 및 규칙 -> 규칙 추가
      - dev
        - 이름 : dev
        - 조건
          - 조건 규칙 유형 : 경로
          - 경로 : `/dev/*`
        - 작업
          - 라우팅 액션 : 대상 그룹으로 전달
          - 대상 그룹 : DEV-TG
        - 규칙 우선 순위 : 임의값
      - mgt
        - 이름 : mgt
        - 조건
          - 조건 규칙 유형 : 경로
          - 경로 : `/mgt/*`
        - 작업
          - 라우팅 액션 : 대상 그룹으로 전달
          - 대상 그룹 : MGT-TG
        - 규칙 우선 순위 : 임의값
  - 결과 확인
    - `curl $ALB/dev/index.html --silent` -> 성공
    - `for i in {1..3}; do curl $ALB/dev/ --silent ; done | sort | uniq -c | sort -nr` -> SERVER-1 만 응답
    - `curl $ALB/mgt/index.html --silent` -> 성공
    - `for i in {1..6}; do curl $ALB/mgt/ --silent ; done | sort | uniq -c | sort -nr` -> SERVER-2, 3 만 응답
    - `for i in {1..9}; do curl $ALB --silent ; done | sort | uniq -c | sort -nr` -> 모두 균일하게 응답
- 4.2.6. ALB 의 User-Agent 를 활용한 로드 밸런싱을 구성하고 확인하기
  - 유동 IP 확인 -> `dig $ALB +short`
  - 스마트폰 브라우저에서 HTTP 접근 확인
  - EC2 -> 로드 밸런서 -> 리스너 및 규칙 -> 규칙 추가
    - 이름 : User-Agent
    - 조건
      - 조건 규칙 유형 : HTTP 헤더
      - HTTP 헤더 이름 : User-Agent
      - HTTP 헤더 값 : `*iPhone*` 또는 `*Android*`
    - 작업
      - 라우팅 액션 : 고정 값 반환
      - 응답 본문 : iPhone or Android Access Deny
  - 결과 확인
    - 스마트폰 접속 : iPhone or Android Access Deny
    - MyEC2 접속 : 성공
    - L7 로드밸런서 이므로 헤더 기반 부하분산 가능
- 4.2.7. NLB 를 생성하고 교차 영역 로드 밸런싱 동작 확인하기
  - EC2 -> 대상 그룹 -> 대상 그룹 생성
    - 대상 그룹 이름 : NLB-TG
    - 프로토콜, 포트 : UDP, 161
    - VPC : ELB-VPC
    - 상태 검사 프로토콜 : HTTP
    - 고급 상태 검사 설정 : 재정의, 80
    - SERVER-1~3 선택 후 '아래에 보류 중인 것으로 포함'
  - EC2 -> 로드 밸런서 -> 로드 밸런서 생성
    - 로드 밸런서 유형 : Network Load Balancer
    - 로드 밸런서 이름 : NLB
    - 네트워크 매핑
      - VPC : ELB-VPC
      - 매핑 : apne2-az1, apne2-az3
      - 보안 그룹 : elblab-..
      - 리스너 및 라우팅
        - 프로토콜 : UDP
        - 포트 : 161
        - 대상 : NLB-TG
  - NLB 동작 확인하기
    - MyEC2
      - NLB DNS 이름을 변수로 지정
        - `NLB=NLB-ccb2792c7526f0ff.elb.ap-northeast-2.amazonaws.com`
        - `echo $NLB`
      - 공인 IP 주소 확인
        - `dig $NLB +short`
      - 공인 IP 주소 변수 저장
        - `NLB1=..`
      - SNMP 서비스 확인
        - `for i in {1..60}; do snmpget -v2c -c public $NLB 1.3.6.1.2.1.1.5.0 ; done | sort | uniq -c | sort -nr`
          - SERVER-1~3
        - `for i in {1..60}; do snmpget -v2c -c public $NLB1 1.3.6.1.2.1.1.5.0 ; done | sort | uniq -c | sort -nr`
          - SERVER-1
        - `for i in {1..60}; do snmpget -v2c -c public $NLB2 1.3.6.1.2.1.1.5.0 ; done | sort | uniq -c | sort -nr`
          - SERVER-2~3
        - NLB 는 교차 영역 로드 밸런싱 기본값 비활성화 되어있음 (라운드 로빈으로 동작)
    - NLB 교차 영역 로드 밸런싱 활성화
      - EC2 -> 로드 밸런서 -> 속성 편집 -> 교차 영역 로드 밸런싱 활성화
      - 결과 확인 -> 교차 영역 로드 밸런싱으로 동작 (NLB1, NLB2 에 요청해도 SERVER-1~3 모두 응답)
- 4.2.8. ALB 와 NLB 의 출발지 IP 보존 확인하기
  - ALB 는 클라이언트 출발지 IP 주소를 자신의 프라이빗 IP 주소로 변경해서 전달
    - SERVER-1 실시간 로그
      - `tail -f /var/log/httpd/access_log | grep -v "ELB-HealthChecker/2.0"`
    - MyEC2 에서 SERVER-1 접속
      - IP 주소 확인 : `curl ipinfo.io/ip`
      - 접속 : `curl $ALB`
    - SERVER-1 접속 패킷 덤프
      - `tcpdump tcp port 80 -nn`
    - 결과 : MyEC2 의 공인 IP 를 ALB 의 사설 IP 로 변환하여 기록
    - 해결하기 : `X-Forwoarded-For` 헤더 추적
      - SERVER-1 로그 설정 정보 확인
        - `grep -n LogFormat /etc/httpd/conf/httpd.conf`
      - 로그 설정 파일 수정
        - `vi /etc/httpd/conf/httpd.conf`
        - 196번째 줄 `%{X-Forwarded-For}i` 추가
          - `LogFormat "%{X-Forwarded-For}i %h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined`
        - `:wq!`
      - HTTP reload
        - `systemctl reload httpd` 
        - reload 와 restart 차이점
          - restart : 해당 서비스를 종료하고 다시 시작
          - reload : conf 설정 파일들만 새로 갱신
      - 실시간 로그 확인시 공인 IP 확인
  - NLB 는 클라이언트 출발지 IP 주소를 보존한 채 전달
    - SERVER-1 패킷 덤프
      - `tcpdump udp port 161 -nn`
    - MyEC2 에서 SERVER-1 접속
      - 내 IP 확인 : `curl ipinfo.io/ip`
      - SERVER-1 접속 : `snmpget -v2c -c public $NLB 1.3.6.1.2.1.1.5.0`
    - 결과 : MyEC2 의 공인 IP 를 보존하여 기록 (NLB 는 4L 로드 밸런서라 XFF 활용 불가)
- 4.2.9. 실습을 위해 생성된 모든 자원 삭제하기
  - EC2 -> 로드 밸런서 삭제
  - EC2 -> 대상 그룹 삭제
  - CloudFormation -> 스택 삭제

## 5장. AWS 스토리지 서비스 (195p~)

### 5.1. 스토리지 개요 (196p~)

- 스토리지(storage) : 데이터를 보관하는 장소

### 5.2. 스토리지 서비스 및 주요 기능 (196p~)

- 5.2.1. 블록 스토리지
  - 단일 스토리지 볼륨(volume)을 블록 단위로 분할해서 저장
  - 블록은 가상 머신 인스턴스에 위치
  - 컴퓨터에 하드디스크 추가, 드라이브 분할해서 사용하는 것과 같은 원리
  - SAN 또는 가상 머신 디스크로 사용
    - SAN(Storage Area Network) : 서로 다른 데이터 저장 장치를 한 데이터 서버에 연결하여 관리하는 네트워크
- 5.2.2. 파일 스토리지
  - 파일 수준, 디렉토리(directory) 구조로 파일 저장 -> 계층 구조
  - 파일이 늘어나면 분류 또는 정리(file system indexing)에 시간이 많이 소요됨
  - NAS 에 사용
    - NAS(Network Attached Storage) : 컴퓨터 네트워크에 연결된 파일 수준의 기억 장치
- 5.2.3. 객체 스토리지
  - 데이터 조각을 객체로 지정하고, 개별 단위로 저장
  - HTTP 프로토콜 기반의 REST API(REpresentational State Transfer Application Programming Interface) 사용
  - 대부분의 스토리지 서비스에 사용
- 5.2.4. 스토리지 선택 기준
  - 내구성 : 데이터 손실 가능성
  - 가용성 : 서비스 지속 시간
  - 보안 : 저장 및 전송 중 데이터 보안
  - 비용 : 스토리지 단위 가격
  - 확장성, 성능 : 스토리지 크기 및 사용자 수 변경
  - 통합: 다른 서비스와 호환성

### 5.3. Amazon EBS (199p~)

- 5.3.1. EBS 란
  - Amazon EBS(Elastic Block Store) : EC2 인스턴스에 사용할 수 있는 블록 스토리지
  - 한 인스턴스에 여러 개 볼륨 연결 가능
  - 한 볼륨은 하나의 인스턴스에만 연결 가능
  - 인스턴스에 종속되어 있지 않아 인스턴스를 삭제해도 볼륨은 재활용 가능
- 5.3.2. EBS 특징
  - 데이터 가용성 : 가용 영역 내에서 자동으로 데이터 복제
  - 데이터 지속성 : 인스턴스 수명과 관계없이 유지되는 비관계형 스토리지
  - 데이터 안정성 : Amazon EBS 암호화(encryption) 기술. 표준 알고리즘(AES-256) 사용
  - 데이터 백업 : 볼륨의 스냅샷(snapshot; 백업)을 Amazon S3 에 백업 가능
  - 데이터 확장성 : 서비스를 중단하지 않고 볼륨 유형, 볼륨 크기, IOPS(Input/Output operations Per Second) 설정 가능
- 5.3.3. EBS 볼륨 유형
  - SSD : 빠른 처리. 주로 OS 영역이나 데이터베이스 보관용 스토리지
  - HDD : 큰 용량. 주로 데이터 분석
- 5.3.4. EBS 스냅샷
  - 특정 시점으로 되돌아갈 수 있는 지점을 만드는 기능
  - Amazon S3 에 저장되어 여러 가용 영역에 자동으로 복제
- 5.3.5. EFS 란
  - Amazon EFS(Elastic File System) : 완전 관리형 네트워크 파일 시스템
  - 완전 관리형 : 하드웨어/소트프웨어 구성, 모니터링, 성능 조절 등 관리
- 5.3.6. EFS 특징
  - 여러 대의 컴퓨터가 네트워크상의 동일한 데이터에 접근해야 할 때 사용
  - NFS 표준 프로토콜 기반
    - NFS(Network File System) : 원격 호스트 파일을 다른 시스템이 로컬에서 가용할 수 있도록 구현
  - NAS 보다 뛰어난 성능(EBS 는 가용 영역 기반이지만 EFS 는 가용 영역 전반에 걸쳐 사용 가능)

### 5.4. Amazon S3 (205p~)

- 5.4.1. S3 소개
  - Amazon S3(Simple Storage Service) : AWS 서비스 중 가장 기본이 되는 객체 스토리지 서비스
    - 객체 : S3 에 저장되는 데이터
    - 버킷(bucket) : 객체 저장소
  - HTTP 프로토콜 입출력 사용
  - REST API 를 이용한 명령 전달
- 5.4.2. S3 구성 요소
  - 버킷 : 데이터 스토리지를 위한 S3 기본 컨테이너(container)
  - 객체 : S3 에 저장되는 기본 매체
    - 객체 데이터 + 메타데이터
  - 키 : 객체 고유 식별자
  - S3 데이터 일관성 : 여러 서버로 데이터 복제하여 고가용성, 내구성 구현
- 5.4.3. S3 특징
  - 물리적으로 분리된 가용 영역에 데이터를 복제해서 저장
  - 동일 버킷 내 여러 객체의 변형을 보유하여 데이터 복구에 특화
  - 다른 서비스와 유기적으로 연동하여 사용 가능
- 5.4.4. S3 스토리지 클래스
  - S3 standard : 자주 엑세스하는 데이터
  - S3 - IA : 엑세스 빈도가 낮은 데이터
  - glacier : 거의 엑세스하지 않는 데이터
- 5.4.5. S3 보안
  - 식별자 기반으로 어디서나 접근 가능 -> 보안 필수
  - AWS IAM 으로 관리 가능 : 특정 S3 버킷 접근
  - S3 내 버킷 정책으로 관리 가능 : 특정 객체 접근

### 5.5. (실습) 다양한 AWS 스토리지 서비스 구성하기 (211p~)

- 5.5.1. 실습에 필요한 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : `https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter5/storagelab.yaml`
    - 스택 이름 : storagelab
    - KeyName : test-gigyesik
    - 검토
      - `AWS CloudFormation 에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` 체크
  - 현재 인프라 정보
    - 서울 리전
    - CH5-VPC (10.4.0.0/16)
    - 가용 영역
      - AZ1
        - Public Subnet 1 (10.4.1.0/24)
          - EC2 - STG1
          - EBS Root Volume
      - AZ1
        - Public Subnet 2 (10.4.2.0/24)
          - EC2 - STG 2
          - EBS Rook Volume
    - 퍼블릭 라우팅 테이블 (CH5-Public-RT)
    - IAM Role : STGLabRoleForInstances (S3 Full 정책 연동)
    - 보안 그룹 : TCP 22/80/249, ICMP 허용
    - 인터넷 게이트웨이(IGW)
  - EBS 스토리지 기본 경로 확인
    - STG1 SSH 접속
      - 디스크 여유 공간 확인 (disk free)
        - `df -hT /dev/xvda1`
      - 사용 가능한 디스크 디바이스와 마운트 포인트 확인
        - `lsblk`
      - 디바이스 UUID 확인
        - `blkid`
      - 디바이스 탑재 지점 확인
        - `cat /etc/fstab`
- 5.5.2. EBS 스토리지를 추가로 생성한 후 사용하기
  - EC2 -> EBS -> 볼륨 -> 볼륨 생성
    - 볼륨 유형 : 범용 SSD(gp3)
    - 크기 : 20 GiB
    - 가용 영역 : ap-northeast-2a
    - 태그 추가
      - 키 : Name
      - 값 : Data1
  - EBS -> 작업 -> 볼륨 연결
    - 인스턴스 : EC2-STG1
    - 디바이스 : /dev/sdf
  - 연결된 EBS 볼륨 사용 설정
    - 디바이스 추가 확인
      - `lsblk`
    - 볼륨을 포맷하여 파일 시스템 생성
      - `mkfs -t xfs /dev/xvdf`
    - 디렉토리를 생성한 후 마운트
      - `mkdir /data`
      - `mount /dev/xvdf /data`
    - 파일을 생성한 후 확인
      - `echo "EBS Test" > /data/memo.txt`
      - `cat /data/memo.txt`
    - 디바이스 확인
      - `lsblk`
      - `df -hT /dev/xvdf`
  - 재부팅 이후에도 볼륨 자동 탑재 설정
    - 파일 시스템 정보 확인
      - `cat /etc/fstab`
    - 장작할 볼륨 정보 확인
      - `blkid`
    - fstab 에 마운트 정보 입력
      - `echo "UUID=(device UUID) /data xfs defaults,nofail 0 2" >> /etc/fstab`
      - 자동 마운트 설정 (/etc/fstab)
        - `(장치명) (마운트 위치) (파일 시스템) (속성) (덤프 사용 여부) (파일 시스템 체크 여부)`
    - 다시 정보 확인
      - `cat /etc/fstab`
- 5.5.3. EBS 스토리지의 볼륨 크기를 변경하고 스냅샷 기능 확인하기
  - EBS 볼륨 크기 변경하기
    - EC2 -> EBS -> 볼륨 -> 수정
      - 볼륨 유형 : 범용 SSD(gp3)
      - 크기 : 20 GiB
      - IOPS : 3000
      - 처리량 : 125
    - 파일 시스템 확장(파티션 조정, 파일 시스템 조정)
      - 볼륨 상태 확인
        - `lsblk`
        - `df -hT /dev/xvda1`
      - 파티션 확장(파티션 조정)
        - `growpart /dev/xvda 1`
      - 볼륨 상태 확인
        - `lsblk`
      - 파일 시스템 확장(파일 시스템 조정)
        - `xfs_growfs -d /`
      - 변경된 파일 시스템 확인
        - `df -hT /dev/xvda1`
  - EBS 스냅샷 기능 확인하기
    - 가상 파일 생성 후 확인
      - `fallocate -l 10G /home/10G.dummy`
      - `df -hT /dev/xvda1`
    - EC2 -> EBS -> 볼륨 -> 작업 -> 스냅샷 생성
      - 설명 : FirstSnapshot
    - EC2 -> EBS -> 스냅샷 에서 결과 확인
    - 가상 파일 생성 후 확인
      - `fallocate -l 5G /home/5G.dummy`
      - `df -hT /dev/xvda1`
    - EC2 -> EBS -> 볼륨 -> 작업 -> 스냅샷 생성
      - 설명 : SecondSnapshot
    - EC2 -> EBS -> 스냅샷 에서 결과 확인
- 5.5.4. EFS 스토리지 생성하고 사용하기
  - EFS -> 파일 시스템 -> 파일 시스템 생성 -> 사용자 지정
    - 일반
      - 이름 : cloudneta
      - 자동 백업 활성화 : 체크 해제
      - Infrequent Access(IA) 로 전환 : 없음
      - 유휴 시 데이터 암호화 활성화 : 체크 해제
    - 네트워크
      - VPC : CH5-VPC
      - 보안 그룹 : storagelab-MySG-.. (TCP 2049 인바운드 허용)
  - EFS 사용 설정 (EC2-1, 2)
    - 리전별 웹 서버 동작 확인
      - `curl localhost`
    - efs 디렉토리 생성
      - `mkdir /var/www/html/efs`
    - EFS 파일 시스템 ID 변수 지정
      - `EFS=(파일 시스템 ID)`
    - 마운트
      - `mount -t efs -o tls $EFS:/ /var/www/html/efs`
    - 마운트한 곳에 파일 생성 후 확인
      - `echo "<html><h1>Hello from Amazon EFS</h1></html>" > /var/www/html/efs/index.html`
      - `curl localhost/efs/`
    - EFS Size 확인
      - `df -hT | grep efs`
    - EFS DNS 주소 확인 (각 AZ 에 속한 인터페이스 ID)
      - `dig +short $EFS.efs.ap-northeast-2.amazonaws.com`
  - EFS 를 이용하여 파일 공유
    - EC2-1 에서 파일 생성
      - `for i in {1..100}; do touch /var/www/html/efs/deleteme.$i; done;`
    - EC2-2 에서 확인
      - `ls /var/www/html/efs`
    - EC2-2 에서 파일 삭제
      - `rm -rf /var/www/html/efs/deleteme*.*`
    - EC2-1 에서 확인
      - `ls /var/www/html/efs`
  - 현재 인프라 정보
    - 서울 리전
    - CH5-VPC (10.4.0.0/16)
    - 가용 영역
      - AZ1
        - Public Subnet 1 (10.4.1.0/24)
          - EC2 - STG1
          - EBS Root Volume
          - EBS Data Volume
      - AZ1
        - Public Subnet 2 (10.4.2.0/24)
          - EC2 - STG 2
          - EBS Rook Volume
    - 퍼블릭 라우팅 테이블 (CH5-Public-RT)
    - 스냅샷
    - Amazon EFS
    - IAM Role : STGLabRoleForInstances (S3 Full 정책 연동)
    - 보안 그룹 : TCP 22/80/249, ICMP 허용
    - 인터넷 게이트웨이(IGW)
- 5.5.5. Public S3 스토리지로 외부 접근 확인하기
  - S3 -> 버킷 -> 버킷 만들기
    - 버킷 이름 : cloudneta1
    - 리전 : apne-2
    - 객체 소유권 : ACL 활성화됨
    - 이 버킷의 퍼블릭 엑세스 차단 설정 : 체크 해제
      - 현재 설정으로 인해 이 버킷과 그 안에 포함된 객체가 퍼블릭 상태가 될 수 있음을 알고 있습니다 : 체크
  - 버킷 -> 업로드 -> 파일 추가 -> 이미지 파일 하나 업로드
    - 객체 URL 로 접근시 Access Denied
  - 외부에서 접근 허용 : 파일 -> 객체 작업 -> ACL 을 사용해 퍼블릭으로 설정 -> 퍼블릭으로 설정
  - EC2-1 이미지 링크 추가 (/var/www/html/index.html)
  ```html
    <html>
          <body>
  
          <h1>Cloudneta S3 Storage</h1>
          <img src="https://cloudneta1.s3.ap-northeast-2.amazonaws.com/2024-06-09-blog-github-pages-2-quickstart-3-source-saved.png">
          </body>
    </html>
  ```
  - EC2-1 퍼블릭 IP 로 접속해서 이미지 확인
  - 버킷 권한 자동 설정
    - 버킷 -> 권한 탭 -> 버킷 정책 편집
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
            "s3:GetObject"
          ],
          "Resource": [
            "arn:aws:s3:::cloudneta1/*"
          ]      
        } 
      ]
    }
    ```
    - 현재 인프라 정보
    - 서울 리전
    - CH5-VPC (10.4.0.0/16)
    - 가용 영역
      - AZ1
        - Public Subnet 1 (10.4.1.0/24)
          - EC2 - STG1
          - EBS Root Volume
          - EBS Data Volume
      - AZ1
        - Public Subnet 2 (10.4.2.0/24)
          - EC2 - STG 2
          - EBS Rook Volume
    - 퍼블릭 라우팅 테이블 (CH5-Public-RT)
    - 스냅샷
    - Amazon EFS
    - IAM Role : STGLabRoleForInstances (S3 Full 정책 연동)
    - 보안 그룹 : TCP 22/80/249, ICMP 허용
    - Amazon S3 Public
    - 인터넷 게이트웨이(IGW)
- 5.5.6. Private S3 스토리지의 제한된 접근 및 데이터 백업하기
  - Private 버킷 생성 (AWS CLI)
    - EC2-1
      - 기존 s3 조회
        - `aws s3 ls`
      - s3 버킷 생성 (make bucket)
        - `aws s3 mb s3://(s3 버킷 이름)`
      - 버킷 이름을 변수에 지정
        - `MyS3=(버킷 이름)`
      - 파일 생성 후 S3 에 업로드
        - `echo "111" > /var/www/html/111.txt`
        - `aws s3 cp /var/www/html/111.txt s3://$MyS3`
        - `aws s3 ls s3://$MyS3`
      - 웹 디렉토리(하위 포함)을 S3 버킷에 업로드(수동 백업) 후 확인
        - `aws s3 sync --delete /var/www/html s3://$MyS3`
        - `aws s3 ls s3://$MyS3 --recursive`
      - crontab 내용 추가 (/etc/crontab)
        - `*/1 * * * * root aws s3 sync --delete /var/www/html s3://cloudneta1-s3-private`
      - 적용 및 추가 파일 생성
        - `systemctl restart crond`
        - `echo "222" > /var/www/html/222.txt`
        - `echo "333" > /var/www/html/333.txt`
      - 실시간 버킷 조회 후 로그 확인
        - `while true; do aws s3 ls s3://$MyS3; date; echo "---[S3 ls]---"; sleep 3; done` 
        - `tail -f /var/log/cron`
      - 테스트 파일 생성 후 S3 에 업로드
        - `echo "presigned test" > /var/www/html/presigned.txt`
        - `aws s3 cp /var/www/html/presigned.txt s3://$MyS3`
      - 객체 URL 로 직접 접근은 불가하나 Pre-Sign URL 생성
        - `aws s3 presign s3://$MyS3/presigned.txt --expires-in 120`
        - 생성된 URL 로 웹 접근 가능 확인
- 5.5.7. 실습을 위해 생성된 모든 자원 삭제하기
  - EC2 -> EBS -> 스냅샷 -> 스냅샷 삭제
  - EC2 -> EBS -> 볼륨 -> Data1 볼륨 분리, 볼륨 삭제
  - EFS -> 파일 시스템 -> 파일 시스템 삭제
  - S3 -> 버킷 -> 비어 있음 (포맷), 삭제
  - CloudFormation -> 스택 -> 삭제

## 6장. AWS 데이터베이스 서비스 (243p~)

### 6.1. 데이터베이스와 DBMS (244p~)

- 6.1.1. 데이터와 데이터베이스
  - 데이터(Data) : 측정하고 수집한 값
  - 정보 : 데이터를 특정 목적에 따라 가공하여 의미를 부여한 결과
  - 데이터베이스 : 데이터의 집합
  - DBMS(DataBase Management System) : 데이터베이스 관리 시스템
- 6.1.2. 데이터베이스 모델 유형
  - 계층형(hierarchical)
    - 트리(tree) 구조 기반
    - 1:N
    - 데이터에 빠른 접근 가능
    - 구조 변경 유연성 떨어짐
  - 네트워크형
    - 1:N, 1:1, N:N
    - 형태가 계층형에 비해 자유로움
    - 개체간 연결에 따라 복잡성 증가
  - 관계형(relational)
    - column(열), row(행), 테이블
    - 데이터 구조 변화에 쉽게 적응, 가장 보편적
    - 시스템 자원을 많이 차지하여 속도 느림 -> 하드웨어 발전으로 해소중
    - SQL(Structured Query Language) 사용
  - 객체 지향형(object-oriented)
    - object(객체)
    - 복잡한 객체 구조, 비정형 데이터도 지원
    - 관계형 데이터베이스와 호환성, 복잡성 문제
- 6.1.3. 관계형 DBMS 의 SQL 언어
  - SQL 데이터 정의
    - CREATE : 데이블 구성, 속성 제약 정의
    - ALTER : 생성된 테이블 속성 정의, 변경
    - DROP : 생성된 테이블 삭제
  - SQL 데이터 조작
    - SELECT : 정보 조회
    - INSERT : 데이터 삽입
    - UPDATE : 데이터 수정
    - DELETE : 데이터 삭제
  - SQL 데이터 제어
    - GRANT : 테이블 권한 허용
    - DENY : 테이블 권한 차단
    - REVOKE : 테이블 권한 회수
- 6.1.4. DBMS 종류
  - https://db-engines.com/en/ranking

### 6.2. AWS 데이터베이스 서비스 (249p~)

- 6.2.1. Amazon RDS
  - Amazon RDS(Relational Database Service) : 클라우드 환경의 관계형 데이터베이스 서비스
  - 다양한 관계형 데이터베이스 엔진 지원, SQL 사용 
- 6.2.2. Amazon RDS 데이터 복제
  - Multi-AZ 복제 방식
    - 액티브-스탠바이(active-standby) 방식
    - 스탠바이(Standby Replica)가 액티브(Primary DB)를 동기식 복제(synchronous replica)
  - Read Replica 복제 방식
    - 읽기 전용 데이터를 Read Replica 에 복제
    - 비동기식 복제 사용
    - 다른 리전에도 복제 가능
- 6.2.3. Amazon Aurora
  - Amazon Aurora : Amazon RDS 상에서 동작하는 AWS 자체 클라우드 데이터베이스 엔진
  - Amazon Aurora 복제 방식 : 공유 스토리지를 통해 비동기식 복제
- 6.2.4. Amazon DynamoDB
  - 비관계형 데이터베이스. 키-값(key-value) 사용
  - NoSQL 데이터베이스 (비관계형 이므로 SQL 사용하지 않음)
- 6.2.5. Amazon ElastiCache
  - 인-메모리(in-memory) 데이터에이스
  - Amazon ElastiCache for Memcached : 보편적인 메모리 객체 캐싱 시스템
  - Amazon ElastiCache for Redis : 오픈소스인 Redis 기반 구축

### 6.3. (실습) 웹 서버와 Amazon RDS 연동하기 (255p~)

- 6.3.1. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter6/dblab.yaml
    - 스택 이름 : dblab
    - KeyName : test-gigyesik
  - 현재 인프라 구성
    - CH6-VPC (10.6.0.0/16)
      - CH6-Subnet1 (10.6.1.0/24) : public
        - CH6-WebSrv (10.6.1.10)
        - 보안 그룹 1 (TCP 22, 88, ICMP 허용)
      - CH6-PublicRT
      - CH6-Subnet2 (10.6.2.0/24) : private
      - CH6-Subnet3 (10.6.3.0/24) : private
      - CH6-PrivateRT
      - 보안 그룹 2 (TCP 3306 허용)
      - DB 서브넷 그룹 (DBLab-Subnet2, 3)
      - DB 파라미터 그룹
- 6.3.2. Amazon RDS 를 생성하고 웹 서버와 연동하기
  - RDS1 (RDS -> 데이터베이스 생성)
    - 엔진 옵션 : MySQL
    - 템플릿 : 개발/테스트
    - 배포 옵션 : 다중 AZ DB 인스턴스
    - DB 인스턴스 식별자 : rds1
    - 마스터 사용자 이름 : root
    - 자격 증명 관리 : 자체 관리
      - 마스터 암호, 암호 확인 : qwer12345
    - DB 인스턴스 클래스 
      - 이전 세대 클래스 포함 : 활성화
      - 버스터블 클래스, db.t2.micro
    - 연결 VPC : CH6-VPC
    - 기존 VPC 보안 그룹(방화벽) : default 제거 후 dblab-CH6SG2-..
    - 향상된 모니터링 활성화 : 체크 해제
    - 추가 구성
      - 초기 데이터베이스 이름 : sample
      - DB 파라미터 그룹 : dblab-mydbparametergroup-..
      - 백업 보존 기간 : 35일
  - RDS2 (RDS -> 데이터베이스 생성)
    - 엔진 옵션 : MySQL
    - 템플릿 : 프리 티어
    - DB 인스턴스 식별자 : rds2
    - 마스터 사용자 이름 : root
    - 자격 증명 관리 : 자체 관리
      - 마스터 암호, 암호 확인 : qwer12345
    - DB 인스턴스 클래스
      - 이전 세대 클래스 포함 : 활성화
      - 버스터블 클래스, db.t2.micro
    - 연결 VPC : CH6-VPC
    - 기존 VPC 보안 그룹(방화벽) : default 제거 후 dblab-CH6SG2-..
    - 가용 영역 : ap-northeast-2a
    - 추가 구성
      - 초기 데이터베이스 이름 : sample
      - DB 파라미터 그룹 : dblab-mydbparametergroup-..
      - 백업 보존 기간 : 0일
      - 백업 기간 : 기간 선택
        - 01:00 UTC, 0.5시간
  - EC2 SSH
    - RDS1, RDS2 엔드포인트 주소를 변수로 선언
      - `RDS1=..`
    - 데이터베이스 접속
      - `mysql -h $RDS1 -uroot -pqwer12345`
    - 상태 정보와 데이터베이스 확인
      - `status;`
      - `show databases;`
    - index.php 파일 RDS2와 연동 (/var/www/html/index.php)
      - `define('DB_SERVER', '(RDS2 엔드포인트 주소)');`
    - EC2 퍼블릭 IP 로 브라우저 접근 후 데이터 추가
    - RDS2 에 접근하여 데이터 확인
      - `mysql -h $RDS2 -uroot -pqwer12345`
      - `use sample;`
      - `select * from EMPLOYEES;`
      - `while true; do mysql -h $RDS2 --connect-timeout=2 -uroot -pqwer12345 -e "use sample; select * from EMPLOYEES;"; host $RDS2; date; sleep 1; done`
  - RDS2 가 중지될 경우 동작 확인하기
    - 현재 단일 데이터베이스
    - EC2 SSH 에서 테이블 확인 스크립트 실행
      - `. /db_sh/SELECT_TABLE_RDS2.sh`
    - RDS2 -> 작업 -> 일시적으로 중지
      - 7일 후 자동으로 재시작 동의에 체크
      - 스크립트 확인 후 RDS2 다시 시작
- 6.3.3. Amazon RDS 고가용성을 위한 Multi-AZ 동작 확인하기
  - 데이터베이스 연결을 RDS1 으로 변경 (/var/www/html/index.php)
    - `define('DB_SERVER', '(RDS1 엔드포인트 주소)');`
  - RDS1 에 테이블 생성
    - `mysql -h $RDS1 -uroot -pqwer12345 -e "use sample; create table EMPLOYEES(ID int, NAME CHAR(20), ADDRESS CHAR(20));"`
  - 테이블에 데이터 추가
    - `mysql -h $RDS1 -uroot -pqwer12345 -e "use sample; insert into EMPLOYEES values(1, "son", "UK");"`
  - 스크립트로 확인
    - `. /db_sh/SELECT_TABLE_RDS1.sh`
  - RDS1 -> 작업 -> 재부팅
    - 장애 조치로 재부팅하시겠습니까? : 체크
  - 페일오버 동작 확인
- 6.3.4. Amazon RDS 의 성능을 확장하는 Read Replica 동작 확인하기
  - RDS2 -> 작업 -> 읽기 전용 복제본 생성 : 불가
    - 백업 보존 기간 설정이 0일이므로 자동 백업 비활성화 상태
  - RDS1 -> 작업 -> 읽기 전용 복제본 생성
    - DB 인스턴스 식별자 : rds1-rr
  - EC2 SSH
    - 복제본 엔드포인트 주소 변수 선언
      - `RDS1RR=(엔드포인트 주소)`
    - RDS1 과 RDS1RR 의 데이터 일치 확인
      - `mysql -h $RDS1 -uroot -pqwer12345 -e "use sample; select * from EMPLOYEES;"`
      - `mysql -h $RDS1RR -uroot -pqwer12345 -e "use sample; select * from EMPLOYEES;"`
    - RDS1 에 데이터 추가
      - `mysql -h $RDS1 -uroot -pqwer12345 -e "use sample; insert into EMPLOYEES values('2', 'Park', 'Suwon');"`
      - RDS1RR 에 추가하려 하면 read-only 에러 노출
      - 동기화 확인 (읽기 처리 분산해서 성능 향상 가능)
- 6.3.5. 실습을 통해 생성된 모든 자원 삭제하기
  - RDS -> 데이터베이스 -> 삭제
  - CloudFormation -> 스택 -> 삭제

## 7장. AWS 고급 네트워킹 서비스 (287p~)

### 7.1. DNS 란 (288p~)

- 7.1.1. DNS 서비스
  - DNS(Domain Name System) : IP 주소와 문자열 주소 매핑 서비스
  - 과정
    - 도메인 구매 : DNS 서버에서 IP 주소 기록
    - 사용자는 도메인 네임으로 DNS 서버에 요청, 응답받음
      - 이때 UDP 53번 포트 사용
    - 알아낸 IP 주소로 통신
- 7.1.2. 도메인 구조
  - `(서브 도메인).(Second Level Domain).(Top Level Domain).`
  - 마지막 . 은 Root Domain
- 7.1.3. DNS 서버 종류
  - 루트 네임 서버 : TLD 응답
  - TLD 네임 서버 : SLD 응답
  - SLD 네임 서버 : IP 응답
  - DNS 서버(DNS 해석기) : 각 네임 서버와 통신
- 7.1.4. DNS 통신 흐름
  - 사용자 PC -> DNS 서버
  - DNS 서버 <-> 루트 네임 서버
  - DNS 서버 <-> TLD 네임 서버
  - DNS 서버 <-> SLD 네임 서버
  - DNS 서버 -> 사용자 PC
- 7.1.5. DNS 레코드 유형
  - DNS 레코드 : 도메인 요청 처리 방법
    - A : 도메인 이름을 IPv4 주소에 매핑
    - AAAA : 도메인 이름을 IPv6 주소에 매핑
    - NS : 도메인 이름의 네임 서버 주소를 매핑
    - CNAME : 도메인 이름의 별칭 지정

### 7.2. Amazon Route 53 서비스 (295p~)

- 7.2.1. Amazon Route 53의 주요 기능
  - Amazon Route 53 : AWS 의 관리형 DNS 서비스
    - 53은 UDP 53번 포트를 의미하는 것으로 추정 
  - 도메인 이름 등록 : Amazon Route 53 이 등록대행소 역할 수행
  - 호스팅 영역 생성 : 도메인 네임 서버 역할 수행
  - 레코드 작성 : 도메인에 대한 요청 처리 방법을 정의
- 7.2.2. Amazon Route 53의 라우팅 정책
  - 단순 라우팅 정책 : DNS 요청에 대해 여러 레코드 중 랜덤하게 응답
  - 가중치 기반 라우팅 정책 : 전체 가중치 중 비율로 응답
  - 지연 시간 기반 라우팅 정책 : 사용자와 대상 자원 리전의 지연 시간을 파악하여 낮은 지연 시간 대상으로 응답
  - 장애 조치 라우팅 정책 : 주기적으로 상태를 확인하여 액티브/패시브 분리하고 액티브 대상을 선택하고 응답
    - 액티브 대상 통신 불가시 패시브 대상을 액티브로 승격하여 라우팅
- 7.2.3. 도메인 이름 생성하기
  - `freenom` 이라는 무료 도메인 이름 생성 사이트가 있음
    - 현재 사용 불가이므로 사용하지 않음
  - `Amazon Route 53` 의 `click` TLD 가 가장 저렴하므로 유료 사용
    - Route 53 -> 등록된 도메인 -> 도메인 등록
      - `gigyesik.click` 검색 -> 결제 진행
      - 도메인 자동 갱신 : 비활성화
      - 결제 정보 입력
    - Route 53 -> 호스팅 영역 -> 레코드 생성
      - 레코드 이름 : test
      - 레코드 유형 : A
      - 값 : 8.8.8.8
      - 라우팅 정책 : 단순 라우팅
    - 터미널에서 라우팅 확인
      - `nslookup test.gigyesik.click`
      - `ping test.gigyesik.click`
    - 레코드 삭제

### 7.3. CDN 이란 (307p~)

- CDN(Content Delivery Network) : 컨텐츠를 캐싱을 이용해 빠르게 전송하는 기술
- 7.3.1. CDN 환경
  - 캐시 서버를 지역적으로 분산, 컨텐츠를 동기화하여 분산 처리
- 7.3.2. CDN 캐싱 방식
  - 캐싱 : 오리진 서버가 컨텐츠를 분산된 캐시 서버로 전달하여 저장하는 것
  - 캐싱 상태
    - Cache Miss(캐시 미스) : 캐시 서버에 컨텐츠를 가지고 있지 않음
      - 사용자가 캐시 서버에 컨텐츠 요청
      - 캐시 서버에 컨텐츠가 없으므로 Cache Miss 판정
      - 캐시 서버가 오리진 서버에 컨텐츠 요청
      - 오리진 서버는 원본 컨텐츠를 복제하여 캐시 서버에 전달
      - 캐시 서버 캐싱(저장). 정적 캐싱
      - 사용자에게 컨텐츠 전달
    - Cache Hit(캐시 히트) : 캐시 서버에 컨텐츠를 가지고 있음
      - 사용자가 캐시 서버에 컨텐츠 요청
      - 캐시 서버에 컨텐츠가 있으므로 Cache Hit 판정
      - 사용자에게 컨텐츠 전달
    - TTL(Time To Live) : 컨텐츠 캐싱 시간(유지 시간)
  - 정적 캐싱 : 오리진 서버에서 캐시 서버로 미리 컨텐츠 복사
    - 이미지, 자바스크립트, CSS 등 정적 컨텐츠
    - 사용자가 요청시 Cache Hit 상태로 동작
  - 동적 캐싱 : 사용자 요청이나 정보에 따라 즉석에서 생성되는 동적 컨텐츠
    - 사용자가 요청시 캐싱은 하지 않고, Cache Miss 상태로 동작
      - TTL 0 으로 설정되어 있음

### 7.4. Amazon CloudFront 란 (311p~)

- Amazon CloudFront : AWS 에서 제공하는 CDN 서비스
- 7.4.1. Amazon CloudFront 구성
  - 오리진 : 원본 컨텐츠를 가지고 있는 대상
    - 온프레미스 일반 서버, EC2, ELB, S3 등
  - Distribution : 오리진과 엣지 사이에서 컨텐츠 배포를 수행하는 CloudFront 의 독립적인 단위
  - 리전 엣지 캐시 : 빈번하게 사용되는 컨텐츠를 캐싱하는 큰 단위의 엣지 영역
  - 엣지 로케이션 : 사용자에게 컨텐츠를 전달하는 작은 단위의 엣지 영역
- 7.4.2. Amazon CloudFront 기능
  - 정적 및 동적 컨텐츠 처리
  - HTTPS 기능
    - 사용자와 CloudFront 는 HTTPS 로 통신, CloudFront 와 오리진은 HTTP 로 통신 가능
  - 다수의 오리진 선택 가능
    - 단일 Distribution 에서 다수 오리진을 지정하여 분산 처리 가능
  - 접근 제어
    - 서명 URL, 쿠키(cookie)로 사용자 인증 지원

### 7.5. (실습) Amazon CloudFront 로 CDN 서비스 구성하기 (314p~)

- 7.5.1. CloudFormation 으로 기본 인프라 배포하기
  - 서버의 지연 시간을 높이기 위해 상파울루 리전에서 진행
  - 상파울루 리전(sa-east-1) -> CloudFormation -> 스택 생성
    - url : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter7/cflab.yaml
    - 스택 이름 : CF-LAB
  - 현재 인프라 구성
    - SA-VPC (10.0.0.0/16)
      - SA-Public-SN-1 (퍼블릭 서브넷)
        - SA-EC2 (오리진 서버)
      - WEBSG (보안 그룹. TCP 22/80 허용)
      - SA-Public-RT (0.0.0.0/0 -> IGW)
    - SA-IGW
- 7.5.2. Amazon Route 53 설정과 기본 인프라 검증하기
  - Amazon Route 53 -> 호스팅 영역 -> 레코드 생성
    - 레코드 이름 : 빈칸
    - 레코드 유형 : A
    - 값 : EC2 Public IP
    - 라우팅 정책 : 단순 라우팅
  - 지연 시간 체크
    - 크롬 개발자 도구 -> Network -> 레코드 도메인 접근
      - 지연 시간 3.82~4.9s (10MB 이미지)
      - 새로고침 버튼 우클릭 -> 캐시 비우기 및 강력 새로고침
- 7.5.3. Amazon CloudFront Distribution 생성하기
  - 도메인 인증서 필수 선행
  - AWS Certificate Manager 에서 도메인 인증서 등록하기
    - 미국 동부(버지니아 북부) 리전(us-east-1) -> AWS Certificate Manager -> 인증서 요청
      - 인증서 유형 : 퍼블릭 인증서
      - 완전히 정규화된 도메인 이름 : *.gigyesik.click
      - 검증 방법 : DNS 검증
    - 인증서 상세 -> Route 53 에서 레코드 생성
  - Amazon CloudFront Distribution 생성하기
    - CloudFront -> 배포 생성
      - 원본
        - Origin Domain : EC2 Public DNS
        - 프로토콜 : HTTP 만 해당
      - 기본 캐시 동작
        - 자동으로 객체 압축 : No
        - 뷰어 프로콜 정책 : HTTP and HTTPS
        - 캐시 키 및 원본 요청 : Legacy cache settings
      - 웹 어플리케이션 방화벽(WAF) : 보안 보호 비활성화
      - 설정
        - 가격 분류 : 모든 엣지 로케이션에서 사용
        - 대체 도메인 이름(CNAME) 추가 : cdn.gigyesik.click
        - Custom SSL Certificate : *.gigyesik.click
        - 기본값 루트 객체 : /index.php
        - IPv6 : 끄기
- 7.5.4. Amazon Route 53 설정과 CloudFront 환경 검증하기
  - Amazon Route 53 -> 호스팅 영역 -> 레코드 생성
    - 레코드 이름 : cdn
    - 레코드 유형 : A
    - 별칭 : 활성화 (AWS 내 자원과 연결된 레코드로 만들기)
      - 트래픽 라우팅 대상 : CloudFront 배포에 대한 별칭
      - 배포 : Distribution 의 도메인 이름 
    - 라우팅 정책 : 단순 라우팅
  - 최초 접속 (크롬 개발자 도구 -> Network)
    - 도메인 : cdn.gigyesik.click
    - 최초 지연 시간 : 3.47 초
    - test.jpg 요소 헤더 확인 
      - X-Amz-Cf-Pop : ICN57-P1 (엣지 로케이션 위치)
      - X-Cache : Miss from cloudfront (캐시 미스 상태. 오리진이 응답)
  - 재접속 (새로고침 우클릭 -> 캐시 비우기 및 강력 새로고침)
    - 재접속 지연 시간 : 0.14초
    - test.jpg 요소 헤더 확인
      - X-Amz-Cf-Pop : ICN57-P1 (엣지 로케이션 위치)
      - X-Cache : Hit from cloudfront (캐시 히트 상태. 엣지 로케이션이 응답)
- 7.5.5. 실습을 통해 생성된 모든 자원 삭제하기
  - CloudFront -> 배포 -> Distribution 비활성화 -> Distribution 삭제
  - Certificate Manager -> 버지니아 북부 리전 -> 인증서 나열 -> 삭제
  - Amazon Route 53 -> 호스팅 영역 -> 레코드 삭제
  - CloudFormation -> 상파울루 리전 -> 스택 삭제

## 8장. AWS IAM 서비스 (337p~)

### 8.1. 배경 소개 (338p~)

- 8.1.1. AWS 리소스 생성하고 관리하기
  - AWS 관리 콘솔(AWS Management Console) : 웹(Web) 기반 사용자 인터페이스(GUI)
  - AWS 명령줄 인터페이스(AWS Command Line Interface; AWS CLI) : 셸(shell) 프로그램
  - AWS 소프트웨어 개발 키트(Software Development Kit, SDK) : 라이브러리
- 8.1.2. AWS API 란
  - API 란
    - API(Application Programming Interface) : 어플리케이션 상호작용 매개체
    - 명세서 : 규칙을 정리한 문서
    - 인증(authentication) : 사용자가 적법한 서명을 가졌는지 확인
    - 인가(authorization) : 인증된 사용자가 API 권한을 수행할 수 있는지 확인
  - AWS API 란
    - 사용자나 어플리케이션이 AWS 서비스를 사용하기 위해 도와주는 매개채
    - 인증, 인가를 확인한 후 AWS CloudTail 을 사용해 API 로깅

### 8.2. AWS IAM (341p~)

- 8.2.1. AWS IAM 이란
  - AWS IAM(Identity & Access Management) : AWS 서비스, 리소스 인증 인가 통제 기능
- 8.2.2. AWS IAM 구성 요소와 동작 방식
  - 구성 요소
    - 사용자
      - 루트 사용자 : 해당 계정의 모든 권한을 가짐
      - IAM 사용자(user) : 자체 자격 증명 보유
      - 보안 주체(principal) : AWS 에 요청하는 사람 또는 어플리케이션
    - 그룹
      - IAM 그룹(group) : IAM 사용자 집합
    - 역할
      - IAM 역할(role) : 특정 권한을 가진 계정에 생성할 수 있는 IAM 자격 증명
    - 정책
      - IAM 정책(policy) : 요청 허용, 거부 권한 정의
  - 인증, 인가 동작 방식
    - 인증 : 리소스 접근시 IAM 사용자 계정에 따른 암호나 접근 키 판단
    - 인가 : IAM 사용자의 권한 판단
- 8.2.3. AWS IAM 사용자
  - 루트 사용자 계정 공동 사용 -> 해킹 위험, AWS API 로깅 분석 불가
  - IAM 사용자 권한 활용 권장
- 8.2.4. AWS IAM 정책
  - Effect : 명시적 정책에 대한 허용 혹은 차단
  - principal : 접근을 허용 혹은 차단하고자 하는 대상
  - Action : 허용 혹은 차단하고자 하는 접근 타입
  - Resource : 요청의 목적지가 되는 서비스
  - Condition : 명시적 조건이 유효하다고 판단될 수 있는 조건
- 8.2.5. AWS IAM 역할
  - IAM 역할 : 정의된 권한 범위 내에서 AWS API 를 사용할 수 있는 임시 자격 증명

### 8.3. (실습) AWS IAM 사용자 생성 및 정책, 역할 동작 확인하기 (348p~)

- 8.3.1. 실습을 위한 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter8/iamlab.yaml
    - 스택 이름 : iamlab
    - KeyName : test-gigyesik
    - `AWS CloudFormation에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` 체크
  - 현재 인프라 구성
    - MyVPC (10.0.0.0/16)
    - My-Public-SN
      - BasicEC2
      - S3IAMRoleEC2
    - IAM Role : STGLabInstanceRole
    - InstanceProfile : STGLabRoleForInstance
    - SGWebSrv (TCP 22/80, ICMP 허용)
    - My-Public-RT
    - My-IGW
- 8.3.2. IAM 사용자 생성 및 동작 확인하기
  - IAM 사용자 생성하기
    - admin
      - IAM -> 사용자 -> 사용자 생성
        - 사용자 이름 : admin
        - 권한 옵션 : 직접 정책 연결
        - 권한 정책 : AdministratorAccess
      - 보안 자격 증명 -> 엑세스 키 만들기
        - 사용 사례 : Command Line Interface(CLI)
        - `위의 권장 사항을 이해했으며 액세스 키 생성을 계속하려고 합니다.` : 체크
        - 설명 태그 값 : admin access key
      - 보안 자격 증명 -> 콘솔 엑세스 활성화
        - 콘솔 암호 : 사용자 지정 암호 
    - viewuser
      - IAM -> 사용자 -> 사용자 생성
        - 사용자 이름 : viewuser
        - 권한 옵션 : 직접 정책 연결
        - 권한 정책 : ViewOnlyAccess
      - 보안 자격 증명 -> 콘솔 엑세스 활성화
        - 콘솔 암호 : 사용자 지정 암호
  - IAM 사용자로 AWS 관리 콘솔 로그인하기
    - root 계정 ID 메모
    - 콘솔에 로그인 -> IAM 사용자로 로그인
      - 계정 ID : root 계정 ID
      - 사용자 이름 : admin
      - 비밀번호 : 사용자 지정 암호
      - EC2 -> 인스턴스
        - BasicEC2 -> 인스턴스 재부팅 -> 성공
    - 콘솔에 로그인 -> viewuser
      - EC2 -> 인스턴스
        - BasicEC2 -> 인스턴스 종료 -> 오류
  - 8.3.3. IAM 정책 설정 및 동작 확인하기
    - BasicEC2 ssh 콘솔
      - 사용자 자격 증명 설정
        - `aws configure`
        - `AWS Access Key ID [None] : (admin access key)`
        - `AWS Secret Access Key [None] : (비밀 키)`
        - `Default region name [None] : ap-northeast-2`
        - `Default output format [None] : (공란)`
      - 자격 증명 List 확인
        - `aws configure list`
      - S3 정보 조회 (자격 증명 동작 확인. s3 없으므로 출력은 없음)
        - `aws s3 list`
      - 인스턴스 상세 정보 조회 (q 나 space 눌러서 출력 종료)
        - `aws ec2 describe-instances`
      - 인스턴스 ID 와 태그 Name 조회하여 S3IAMRoleEC2 인스턴스 ID 조회
        - `aws ec2 describe-instances --query 'Reservations[*].Instances[*].{Instance:InstanceId,Name:Tags[?Key==`Name`]|[0].Value}' --output text`
      - 인스턴스 ID 와 프라이빗 IP 조회하여 S3IAMRoleEC2 프라이빗 IP 조회
        - `aws ec2 describe-instances --query 'Reservations[*].Instances[*].{Instance:PrivateIpAddress,Name:Tags[?Key==`Name`]|[0].Value}' --output text`
      - S3IAMRoleEC2 재부팅 시도하기
        - EC2 private ip 에 ping 시도
          - `ping (프라이빗 ip)`
        - S3IAMRoleEC2 인스턴스 재부팅
          - `aws ec2 reboot-instances --instance-ids (인스턴스 ID)`
        - 재부팅 중 ping 시도 -> 패킷 유실됨
    - 재부팅/중지 거부 정책 설정하기
      - IAM -> 사용자 -> admin -> 권한 탭 -> 인라인 정책 생성
        - JSON 코드 입력
        ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Deny",
              "Action": [
                "ec2:RebootInstances",
                "ec2:StopInstances"
              ],
              "Resource": "*"
            }
          ]
        }
        ```
        - 이름 : ec2denypolicy
      - 재부팅 요청 거부됨 확인
- 8.3.4. IAM 역할 설정 및 동작 확인하기
  - IAM -> 역할 -> STGLabInstanceRole
    - `AmazonS3FullAccess` 정책 확인
  - EC2 -> 인스턴스 -> S3IAMRoleEc2 -> 보안 탭
    - IAM 역할 `STGLabInstanceRole` 확인
  - S3IAMRoleEC2 SSH
    - 자격 증명 확인 (IAM 역할 정보 확인)
      - `aws configure list`
    - S3 버킷 조회 (출력 없음)
      - `aws s3 ls`
    - S3 버킷 생성
      - `aws s3 mb s3://(unique 버킷 이름) --region ap-northeast-2`
    - S3 버킷 삭제
      - `aws s3 rb s3://(버킷 이름)`
    - VPC 정보 확인 (실패)
      - `aws ec2 describe-vpcs`
    - 인스턴스 재부팅 시도 (실패)
      - `aws ec2 reboot-instances --instance-ids (인스턴스 ID)'
- 8.3.5. 실습을 위해 생성된 모든 자원 삭제하기
  - IAM -> 사용자 -> 삭제
  - CloudFormation -> 스택 -> 삭제

## 9장. AWS 오토 스케일링 서비스 (371p~)

### 9.1. 스케일링 (372p~)

- 9.1.1. 스케일링이란
  - 스케일링(scaling) : IT 자원을 확장하거나 축소하는 기능
- 9.1.2. 스케일링의 종류
  - 수직 스케일링(vertical scaling) : IT 자원의 용량을 확장하거나 축소하는 기능
    - 스케일 업(scale-up) : IT 자원 용량 확장
    - 스케일 다운(scale-down) : IT 자원 용량 축소
  - 수평 스케일링(horizontal scaling) : IT 자원의 수량을 확장하거나 축소하는 기능
    - 스케일 아웃(scale-out) : IT 자원 수량 증가
    - 스케일 인(scale-in) : IT 자원 수량 감소 

### 9.2. AWS 오토 스케일링 서비스 (374p~)

- 9.2.1. Amazon EC2 오토 스케일링이란
  - 동적으로 EC2 인스턴스 수를 확장하거나 축소하여 워크로드를 유지하는 서비스
- 9.2.2. AWS EC2 오토 스케일링 구성 요소
  - 그룹 : EC2 인스턴스를 논리적으로 구분
    - 가용 영역, 서브넷
    - 최소/최대 인스턴스 수량
    - 최초 인스턴스 수량
    - 로드 밸런서
    - 모니터링 지표
    - 헬스체크
  - 구성 템플릿 : EC2 인스턴스 구성 템플릿
    - AMI
    - 인스턴스 유형
    - 키 페어
    - 사용자 데이터
    - 보안 그룹
    - IAM 역할
  - 조정 옵션 : 오토 스케일림 그룹 조정 방법
    - 예약 작업 또는 조정 정책
- 9.2.3. Amazon EC2 오토 스케일링의 인스턴스 수명 주기
  - 수명 주기
    - 오토 스케일링 그룹 -> (스케일 아웃) -> 대기 중 -> 실행 중 -> (헬스체크 실패, 스케일 인) -> 종료 중 -> 종료됨
    - 실행 중 -> (중지) -> 중지 중 -> 중지됨 -> (시작) -> 대기 중 -> ..
    - 실행 중 -> (중지) -> 중지 중 -> 중지됨 -> 종료 -> 종료 중 ->  종료됨
  - 인스턴스 확장에 따른 이벤트
    - 그룹의 크기를 수동으로 늘리는 경우
    - 지정된 수요 증가에 따라 그룹의 크기를 늘리는 조정 정책을 사용하는 경우
    - 특정 시간에 그룹의 크기를 늘리는 예약된 작업을 수행하는 경우
    - 대기 중 -> 수명 주기 실행 -> (로드 밸런서 연결) -> 실행 중
  - 인스턴스 축소에 따른 이벤트
    - 그룹의 크기를 수동으로 줄이는 경우
    - 지정된 수요 감소에 따라 그룹의 크기를 줄이는 조정 정책을 사용하는 경우
    - 특정 시간에 그룹의 크기를 줄이는 예약된 작업을 수행하는 경우
    - 종료 중 -> (드레이닝) -> (로드 밸런서 연결 해제) -> 수명 주기 실행 -> 종료됨
      - 드레이닝(draining) : 인스턴스 종료 중 사용자 요청을 처리하기 위해 기다리는 상태
- 9.2.4. Amazon EC2 오토 스케일링 조정 옵션
  - 인스턴스를 일정한 수로 유지
    - 일정 주기로 체크 -> 비정상 상태의 인스턴스를 종료하고 새로운 인스턴스 시작하여 수 유지
  - 수동 조정
    - 기본 옵션. 오토 스케일링 그룹의 최대, 최소 용량을 수동 조정
  - 동적 조정
    - 대상 추적 조정 : 특정 지표의 목표 값을 유지하기 위해 오토 스케일링 적용
    - 단계 조정 : 오토 스케일링 그룹의 용량을 임계값에 따라 단계적으로 조정
    - 단순 조정 : 오토 스케일링 그룹의 용량을 임계값과 무관하게 단일하게 조정
  - 일정을 기반으로 예약된 조정
    - 인스턴스의 증가, 감소 수량을 정확히 아는 경우
  - 일정을 기반으로 예측 조정
    - 누적된 기록을 이용하여 트래픽을 예정하여 조정
- 9.2.5. Amazon EC2 오토 스케일링 요금
  - EC2 인스턴스, CloudWatch 경보 요금만 발생하고 오토 스케일링 자체 요금은 발생하지 않음

### 9.3. (실습) Amazon EC2 오토 스케일링 구성하기 (381p~)

- 9.3.1. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter9/aslab.yaml
    - 스택 이름 : aslab
    - KeyName : test-gigyesik
    - `AWS CloudFormation에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` : 체크
  - 현재 네트워크 구성
    - MyVPC (10.0.0.0/16)
      - My-Public-SN (10.0.0.0/24)
        - MyEC2
        - My-SG (TCP 22/88, ICMP 허용)
    - CH9-VPC (10.9.0.0/16)
      - CH9-Public-SN1 (10.9.1.0/24)
      - CH9-Public-SN2 (10.9.2.0/24)
      - CH9-ALB (SN1, SN2 대상)
      - CH9-SG (TCP 22/88, ICMP 허용)
- 9.3.2. 기본 인프라 환경 검증하기
  - MyEC2 SSH
    - AWS CLI 툴 버전 확인
      - `aws --version`
    - AWS CLI 로 생성된 인스턴스 정보 확인 (1회)
      - `aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId, State.Name, PrivateIpAddress]' --output text`
    - AWS CLI 로 생성된 인스턴스 정보 확인 (연속)
      - `while true; do aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId, State.Name, PrivateIpAddress]' --output text; date; sleep 1; done`
    - ApacheBench 툴 버전 확인
      - `ab -V`
      - ApacheBench : 웹 서비스 벤치마킹 툴
    - ALB DNS 이름 변수 지정
      - `ALB=(ALB DNS 이름)`
    - ALB DNS IP 정보 확인
      - `dig +short $ALB`
    - ALB DNS 통신 테스트 (현재 전달 타킷 없어 HTTP 503 에러)
      - `while true; do curl $ALB --silent --connect-timeout 1; date; echo "---[AutoScaling]---"; sleep 1; done`
      - `curl $ALB`
- 9.3.3. EC2 인스턴스 시작 템플릿 생성하기
  - EC2 -> 인스턴스 -> 시작 템플릿 -> 시작 템플릿 생성
    - 시작 템플릿 이름 및 설명
      - 시작 템플릿 이름 : EC2Template
      - 템플릿 버전 설명 : EC2 Auto Scaling
      - `EC2 Auto Scaling에 사용할 수 있는 템플릿을 설정하는 데 도움이 되는 지침 제공` : 체크
    - 시작 템플릿 콘텐츠
      - 애플리케이션 및 OS 이미지 : Quick Start
        - Amazon Linux
        - AMI : Amazon Linux 2 AMI (HVM)
      - 인스턴스 유형 : t2.micro
      - 키 페어 : test-gigyesik
      - 보안 그룹 : 기존 보안 그룹 선택 -> aslab-VPC1SG-..
      - 리소스 태그 : 키 Lab, 값 ASLab
      - 고급 세부 정보 
        - CloudWatch 모니터링 : 활성화
        - 메타데이터 엑세스 기능 : 활성
        - 메타데이터 버전 : V1 및 V2(토큰 선택 사항)
        - 사용자 데이터
        ```Shell
        #!/bin/bash
        RZAZ=`curl http://169.254.169.254/latest/meta-data/placement/availability-zone-id`
        IID=`curl 169.254.169.254/latest/meta-data/instance-id`
        LIP=`curl 169.254.169.254/latest/meta-data/local-ipv4`
        amazon-linux-extras install -y php8.0
        yum install httpd htop tmux -y
        systemctl start httpd && systemctl enable httpd
        echo "<h1>RegionAz($RZAZ) : Instance ID($IID) : Private IP($LIP) : Web Server</h1>" > /var/www/html/index.html
        echo "1" > /var/www/html/HealthCheck.txt
        curl -o /var/www/html/load.php https://cloudneta-book.s3.ap-northeast-2.amazonaws.com/chapter5/load.php --silent
        ```
  - 시작 템플릿 보기 (정보 확인)
- 9.3.4. Amazon EC2 오토 스케일림 그룹 생성하기
  - 오토 스케일링 그룹 생성 및 인스턴스 확대 정책 수립하기
    - EC2 -> Auto Scaling -> Auto Scaling 그룹 -> Auto Scaling 그룹 생성
      - 이름 : FirstEC2ASG
      - 시작 템플릿 : EC2Template
      - VPC : CH9-VPC
      - 가용 영역 및 서브넷 : CH9-Public-SN1, CH9-Public-SN2
      - 로드 밸런싱 : 기존 로드 밸런서에 연결
        - 로드 밸런서 대상 그룹 : ALB-TG
      - 상태 확인
        - `Elastic Load Balancer 상태 확인 켜기` 체크
        - 상태 확인 유예 기간 : 60초
      - 추가 설정
        - `CloudWatch 내에서 그룹 지표 수집 활성화` 체크
      - 그룹 크기
        - 원하는 용량 1 / 최소 용량 1 / 최대 용량 4
      - Automatic Scaling : 대상 추적 크기 조정 정책
        - 크기 조정 정책 이름 : Scale Out Policy
        - 대상 값 : 80
        - 인스턴스 워밍업 : 60
        - `확대 정책만 생성하려면 축소 비활성화` 체크
      - 태그 추가
        - 키 : Name , 값 : WebServers
  - 인스턴스 종료 정책 수립
    - FirstEC2ASG -> 고급 구성 -> 편집
      - 기본값 종료 정책 삭제
      - 정책 추가 -> 최신 인스턴스
      - 기본 휴지 기간 : 180초
  - 인스턴스 축소 정책 수립하기
    - FirstEC2ASG -> Automatic Scaling 탭 -> 동적 크기 조정 정책 생성
      - 정책 유형 : 단순 크기 조정
      - 크기 조정 정책 이름 : Scale In Policy
      - 작업 수행 : 제거 / 값 : 1
      - 그런 다음 대기 : 60초
        - CloudWatch 경보 생성 -> 생성 후 ASG-CPU
          - 지표 및 조건 지정
            - 지표 : EC2 -> Auto Scaling Group -> CPUUtilization
            - 기간 : 1분
            - 임계값 유형 : 정적
            - 경보 조건 : 보다 작음
            - 임계값 : 10
            - 추가 구성 -> 경보를 알릴 데이터 포인트 : 2 / 2
          - 작업 구성
            - 경보 상태 트리거 : 제거
          - 이름 및 설명
            - 이름 : ASG-CPU
  - CloudWatch -> 경보 -> 모든 경보 -> 대시보드에 추가
    - 새 대시보드 생성 -> 이름 : MyASG
  - CloudWatch -> 지표 -> 모든 지표 -> Auto Scaling -> 그룹 지표
    - GroupInServiceInstances 체크 -> 그래프로 표시된 지표 탭
      - 기간 : 1분
    - 옵션 탭
      - 왼쪽 Y 축 : 최소 값 0 / 최대 값 4
    - 작업 > 대시보드에 추가
      - 대시보드 선택 : MyASG
- 9.3.5. MyEC2 에 접속하여 인스턴스에 CPU 부하 발생시키기
  - MyEC2 SSH 1
    - ALB DNS 이름 변수 지정
      - `ALB=(ALB DNS 이름)`
    - ALB DNS 통신 (1회)
      - `curl $ALB`
    - ALB DNS 통신 (반복)
      - `while true; do curl $ALB --silent --connect-timeout 1; date; echo "---[AutoScaling]---"; sleep 1; done`
  - WebServers SSH
    - 서버 자원 (CPU, 메모리) 사용률 출력
      - `htop`
  - MyEC2 SSH 2
    - ALB DNS 이름 변수 지정
      - `ALB=(ALB DNS 이름)`
    - load.php 페이지로 접근하여 강제 CPU 부하 발생 (1회)
      - `curl $ALB/load.php; echo`
    - ApacheBench 명령어로 load.php 500번 호출
      - `ab -n 500 -c 1 http://$ALB/load.php`
  - EC2 -> 로드 밸런싱 -> 대상 그룹, EC2 대시보드에서 생성되는 인스턴스 확인
  - CloudWatch 대시보드에서 스케일 아웃 확인
  - CPU 사용률 저하 후 스케일 인 확인
- 9.3.6. 실습을 위해 생성된 모든 자원 삭제하기
  - CloudWatch
    - 모든 지표 -> 삭제
    - 대시보드 -> MyASG 삭제
  - EC2
    - Auto Scaling 그룹 -> FirstEC2ASG 삭제
    - 시작 템플릿 -> 삭제 
  - CloudFormation -> 스택 삭제

## 10장. 워드프레스 (417p~)

### 10.1. 워드프레스 소개 (418p~)

- 워드프레스(wordpress) : 웹 사이트 제작 오픈 소스 플랫폼
- 10.1.1. 웹 시스템 구성 요소
  - 웹 서버
  - 웹 애플리케이션 서버
  - 데이터베이스 서버
- 10.1.2. 워드프레스 구성 요소
  - 웹 서버 : apache, nginx
  - 웹 애플리케이션 서버 : php
  - 데이터베이스 서버 : MySQL, MariaDB
  - 단일 구성 : 한 대의 EC2 에 웹 서버 + 웹 애플리케이션 서버 + 데이터베이스 서버
    - 관리가 편하나, 수정시 전체가 영향을 받고 보안에 취약
  - 복합 구성 : EC2 에 웹 서버 + 웹 애플리케이션 서버, 파일 시스템 EFS, 데이터베이스 RDS

### 10.2. (실습) 워드프레스 구성하기

- 10.2.1. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter10/wplabs.yaml
    - 스택 이름 : wplab
    - KeyName : test-gigyesik
    - `AWS CloudFormation에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` : 체크
  - 현재 인프라 구성
    - WP-VPC1 (10.1.1.0/16)
      - Public Subnet 1 (10.1.1.0/24)
        - AllInOne (10.1.1.100)
      - Public Subnet 2 (10.1.2.0/24)
        - WebSev (10.1.2.200)
      - Private Subnet 3 (10.1.3.0/24)
      - Private Subnet 4 (10.1.4.0/24)
        - Amazon RDS (MySQL)
      - EFS
- 10.2.2. 기본 인프라 환경 검증하기
  - 생성된 EFS(WebSrv-EFS), RDS(wpdb) 확인
- 10.2.3. 워드프레스의 단일 구성 환경 구성하기
  - 웹 서버 + 웹 애플리케이션 서버 + 데이터베이스 서버 구성하기
    - AllInOne SSH
      - apache 웹 서버 설치
        - `yum install httpd -y`
      - 서비스 실행
        - `systemctl start httpd && systemctl enable httpd`
      - 버전 확인
        - `httpd -v`
      - 웹 서버 접속
        - `curl http://10.1.1.100`
      - 브라우저에서 AllInOne 퍼블릭 IP 로 접근하여 페이지 확인
      - php 설치
        - `amazon-linux-extras install php8.2 -y`
      - 버전 확인
        - `php -v`
      - PHP Extensions 설치 후 적용
        - `yum install -y php-xml php-mbstring ImageMagick ImageMagick-devel php-pear php-devel`
        - `printf "\n" | pecl install imagick`
        - `echo "extension = imagick.so" > /etc/php.d/40-imagick.ini`
        - `systemctl restart php-fpm && systemctl restart httpd`
      - PHP Extensions 정보 확인
        - `php --ini`
      - php 정보를 출력하는 웹 페이지 생성 및 확인
        - `echo "<?php phpinfo(); ?>" > /var/www/html/info.php`
        - `ls /var/www/html`
      - info.php 웹 접속 확인
        - `curl http://10.1.1.100/info.php`
      - 브라우저에서 http://(퍼블릭 IP)/info.php 로 접근하여 페이지 확인
      - 데이터베이스 서버 설치
        - `amazon-linux-extras install mariadb10.5 -y`
      - mariadb 서비스 시작
        - `systemctl start mariadb && systemctl enable mariadb`
      - mariadb 계정 초기화
        - `echo -e "\n n\n n\n Y\n n\n Y\n Y\n" | /usr/bin/mysql_secure_installation`
      - mariadb 계정 루트 암호 설정 : qwe123
        - `mysql -e "set password = password('qwe123');"`
      - mariadb root 계정 원격 접속 설정
        - `mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'qwe123';"`
      - 워드프레스가 사용할 데이터베이스 생성 및 확인
        - `mysql -e "CREATE DATABASE wordpressdb"`
        - `mysql -e "show databases"`
      - mariadb 서비스 재시작
        - `systemctl restart mariadb`
      - mariadb 버전 확인
        - `mysql --version`
  - 워드프레스 설치하고 초기 설정하기
    - AllInOne SSH
      - 워드프레스 다운로드
        - `wget https://wordpress.org/wordpress-6.2.zip`
      - 압축 풀기
        - `unzip wordpress-6.2.zip`
      - 워드프레스 설정 파일 복사
        - `cp wordpress/wp-config-sample.php wordpress/wp-config.php`
      - 워드프레스 설정 파일에 db 접속정보 입력
        - `sed -i "s/database_name_here/wordpressdb/g" wordpress/wp-config.php`
        - `sed -i "s/username_here/root/g" wordpress/wp-config.php`
        - `sed -i "s/password_here/qwe123/g" wordpress/wp-config.php`
      - 워드프레스 설정 파일 확인
        - `grep 'Database settings -' wordpress/wp-config.php -A15`
      - 워드프레스 파일을 apache 웹 디렉토리에 복사
        - `cp -r wordpress/* /var/www/html/`
      - 웹 사용자, 권한 설정
        - `chown -R apache /var/www`
        - `chgrp -R apache /var/www`
        - `chmod 2775 /var/www`
        - `find /var/www -type d -exec chmod 2775 {} \;`
        - `find /var/www -type f -exec chmod 0664 {} \;`
      - 웹 서비스 재시작
        - `systemctl restart httpd`
    - AllInOne 퍼블릭 IP 브라우저 접근
      - 언어 : 한국어 선택
      - 사이트 제목 : my blog
      - 사용자명 : myuser
      - 비밀번호 : qwe123
      - 약한 비밀번호 사용 확인 : 체크
      - 이메일 주소 : a@a.com
    - 관리자 로그인
  - 워드프레스에 블로그 글 작성하기
    - 글 -> 새 글 추가
      - 간단하게 제목과 내용 작성
      - 이미지 파일 업로드
      - 공개 -> 발행 글 확인
- 10.2.4. 워드프레스의 복합 구성 환경 구성하기
  - WebSrv 인스턴스의 기본 설정 정보 확인하기
    - WebSrv SSH
      - EFS 저장소 마운트 확인 (워드프레스 파일 저장 공간)
        - `df -hT --type nfs4`
      - 워드프레스 관련 파일 확인
        - `ls /var/www/wordpress`
      - EFS 파일 시스템 확인
        - `aws efs describe-file-systems --output table --region ap-northeast-2`
      - RDS 인스턴스 정보 확인
        - `aws rds describe-db-instances --region ap-northeast-2 --output table`
      - RDS 인스턴스 접속 주소 확인 (Endpoint)
        - `aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text`
  - WebSrv 인스턴스에서 워드프레스를 사용할 수 있게 설정하기
    - WebSrv SSH
      - RDS 인스턴스 접속 주소 변수 지정
        - `RDS=$(aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text)`
        - echo $RDS
      - 워드프레스 설정 파일의 mariadb 접속 정보 확인
        - `grep 'Database settings -' /var/www/wordpress/wp-config.php -A15`
      - 워드프레스 설정 파일 mariadb 접속 주소 변경
        - `sed -i "s/localhost/$RDS/g" /var/www/wordpress/wp-config.php`
        - `grep 'Database settings -' /var/www/wordpress/wp-config.php -A15`
      - 데이터베이스 생성
        - `mysql -h $RDS -uroot -pqwe12345 -e 'CREATE DATABASE wordpressdb'`
      - 데이터베이스 확인
        - `mysql -h $RDS -uroot -pqwe12345 -e 'show databases'`
    - WebSrv 퍼블릭 IP 브라우저 접근
      - 워드프레스 설정, 로그인 (단일 구성과 동일)
- 10.2.5. 실습을 위해 생성된 모든 자원 삭제하기
  - CloudFormation -> 스택 삭제

## 11장. 워드프레스 이중화 (437p~)

### 11.1. 실습 소개 (438p~)

- 구성 1
  - CloudFront -> ALB -> EC2 (워드프레스)
  - S3 (이미지 파일)
- 구성 2
  - CloudFront -> ALB
    - AZ1, AZ2
      - EC2 (오토 스케일링) -> RDS
      - EFS

### 11.2. (실습1) AWS 서비스를 활용한 워드프레스 구성하기 (439p~)

- 11.2.1. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter11/wplabs-ha1.yaml
    - 스택 이름 : wpha1lab
    - KeyName : test-gigyesik
    - `AWS CloudFormation에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` : 체크
  - 현재 인프라 구성
    - CloudFront
    - WP-VPC1 (10.1.1.0/16)
      - ALB
        - Public Subnet 1 (10.1.1.0/24)
          - AllInOne (10.1.1.100)
        - Public Subnet 2 (10.1.2.0/24)
- 11.2.2. 기본 인프라 환경 검증하기
  - CloudFront -> 배포 정보 확인
  - CloudFormation -> 출력 탭 -> CloudFrontDNS 값으로 웹 페이지 접속 확인 (10장 참조)
- 11.2.3. 워드프레스 초기 설정 및 블로그에 작성된 글 확인하기
  - 브라우저 -> CloudFrontDNS (http)
    - 이미지를 포함한 글 작성
    - 이미지 우클릭 -> 새 탭에서 이미지 열기 -> 이미지 URL 정보 확인
      - `CloudFront 도메인 주소 + 날짜 정보 + 이미지 이름`
  - AllInOne SSH
    - 워드프레스 업로드 디렉토리 확인 (업로드한 이미지가 있음)
      - `tree /var/www/wordpress/wp-content/uploads/`
- 11.2.4. S3 에서 정적 콘텐츠 처리 설정하기
  - 워드프레스 플러그인 WP Offload Media Lite 설치하기
    - 워드프레스 관리자 -> 플러그인 -> 새로 추가 -> WP Offload Media Lite 설치 -> 활성화
    - WP Offload Media Lite -> 설정
      - 제공자 : S3
      - 연결 방법 : `내 서버가 Amazon Web Services에 있고 IAM 역할을 사용하고 싶습니다.`
      - 새 버킷 만들기
        - 버킷 이름 : 임의
        - 지역 : Asia Pacific (Seoul)
    - 로컬 미디어 제거 : 활성화
  - 이미지를 포함한 새글 작성 -> 이미지 URL 정보 확인
    - `S3 버킷 주소 + 날짜 정보 + 이미지 이름`
  - AllInOne SSH
    - 워드프레스 업로드 디렉토리 확인 (업로드한 이미지가 없음)
      - `tree /var/www/wordpress/wp-content/uploads/`
    - s3 버킷 정보 확인
      - `aws s3 ls`
- 11.2.5. 실습을 통해 생성된 모든 자원 삭제하기
  - CloudFormation -> 스택 삭제
  - S3 -> 버킷 삭제

### 11.3. (실습2) 확장성과 안정성을 고려한 워드프레스 구성하기 (451p~)

- 11.3.1. CloudFormation 으로 기본 인프라 배포하기
  - CloudFormation -> 스택 생성
    - Amazon S3 URL : https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter11/wplabs-ha2.yaml
    - 스택 이름 : wpha2lab
    - KeyName : test-gigyesik
    - `AWS CloudFormation에서 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 승인합니다.` : 체크
  - 현재 인프라 구성
    - CloudFront
    - WP-VPC1 (10.1.1.0/16)
      - ALB
        - Public Subnet1 (10.1.1.0/24)
          - WebSrv-Leader (10.1.1.110)
        - Public Subnet2 (10.1.2.0/24)
      - Private Subnet3 (10.1.3.0/24)
        - Amazon RDS (standby)
      - Private Subnet4 (10.1.4.0/24)
        - Amazon RDS (primary)
      - EFS 
- 11.3.2. 기본 인프라 환경 검증하기
  - CloudFormation -> 출력 탭 -> WebSrvLeaderEC2IP 확인
- 11.3.3. 인스턴스 기본 설정 및 워드프레스 사용 설정 진행하기
  - WebSrv SSH
    - EFS 마운트 확인 (워드프레스 관련 파일)
      - `df -hT --type nfs4`
    - 워드프레스 관련 파일 확인
      - `ls /var/www/wordpress`
    - EFS 파일 시스템 확인
      - `aws efs describe-file-systems --output table --region ap-northeast-2`
    - EFS 파일 시스템 ID 만 출력
      - `aws efs describe-file-systems --query 'FileSystems[].FileSystemId' --output text --region ap-northeast-2`
    - RDS 인스턴스 정보 확인
      - `aws rds describe-db-instances --region ap-northeast-2 --output table`
    - RDS endpoint 확인
      - `aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text`
  - EFS, RDS 생성 확인
  - WebSrv SSH
    - RDS 인스턴스 접속 주소 변수 지정
      - `RDS=$(aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text)`
      - `echo $RDS`
    - 워드프레스 설정 파일 mariadb 접속 주소 변경
      - `sed -i "s/localhost/$RDS/g" /var/www/wordpress/wp-config.php`
    - 데이터베이스 생성
      - `mysql -h $RDS -uroot -pqwe12345 -e 'CREATE DATABASE wordpressdb'`
    - 데이터베이스 확인
      - `mysql -h $RDS -uroot -pqwe12345 -e 'show databases'`
- 11.3.4. 워드프레스 초기 설정 및 블로그 글 작성하기
  - 브라우저 -> WebSrv 퍼블릭 IP 접속 -> 워드프레스 초기 설정
  - 이미지가 포함된 글 작성
- 11.3.5. ALB 대상 그룹에서 WebSrv-Leader EC2 인스턴스 삭제하기
  - EC2 -> 로드 밸런싱 -> 대상 그룹 -> ALB-TF -> 등록 취소
- 11.3.6. 오토 스케일링 그룹으로 워드프레스 웹 서버 구성하기
  - EC2 인스턴스 시작 템플릿 구성하기
    - EC2 -> 인스턴스 -> 시작 템플릿 -> 시작 템플릿 생성
      - 시작 템플릿 이름 : WPEC2LaunchTemplate
      - 템플릿 버전 설명 : Wordpress WebServer Auto Scaling v1.0
      - `EC2 Auto Scaling에 사용할 수 있는 템플릿을 설정하는 데 도움이 되는 지침 제공` : 체크
      - AMI : Quick Start
        - Amazon Linux 2 AMI (HVM), 64비트 (x86)
      - 인스턴스 유형 : t3.medium
      - 키 페어 이름 : test-gigyesik
      - 방화벽(보안 그룹) : 기존 보안 그룹 선택 / wpha2lab-VPC1SG1-..
      - EBS 볼륨 유형 : gp3
      - 리소스 태그 : 키 Lab, 값 WPLab
      - 고급 세부 정보
        - IAM 인스턴스 프로파일 : WPLabInstanceProfile
        - 세부 CloudWatch 모니터링 : 활성화
        - 사용자 데이터
        ```Shell
        #!/bin/bash
        echo "sudo su -" >> /home/ec2-user/.bashrc
        # Apache 설치
        yum update -y && yum install jq htop tree gcc amazon-efs-utils mariadb -y
        yum install httpd -y
        systemctl start httpd && systemctl enable httpd
        # PHP 설치
        amazon-linux-extras install php8.2 -y
        yum install -y php-xml php-mbstring ImageMagick ImageMagick-devel php-pear php-devel
        printf "\n" | pecl install imagick
        echo "extension = imagick.so" > /etc/php.d/40-imagick.ini
        systemctl restart php-fpm && systemctl restart httpd
        # EFS 파일시스템 설정
        mkdir -p /var/www/wordpress/
        mount -f efs -o tls (EFS 파일시스템 ID):/ /var/www/wordpress
        # 워드프레스 설치
        echo 'ServerName 127.0.0.1:80' >> /etc/httpd/conf.d/MyBlog.conf
        echo 'DocumentRoot /var/www/wordpress' >> /etc/httpd/conf.d/MyBlog.conf
        echo '<Directory /var/www/wordpress>' >> /etc/httpd/conf.d/MyBlog.conf
        echo '  Options Indexes FollowSymLinks' >> /etc/httpd/conf.d/MyBlog.conf
        echo '  AllowOverride All' >> /etc/httpd/conf.d/MyBlog.conf
        echo '  Require all granted' >> /etc/httpd/conf.d/MyBlog.conf
        echo '</Directory>' >> /etc/httpd/conf.d/MyBlog.conf
        systemctl restart php-fpm && systemctl restart httpd
        ```
  - 오토 스케일링 그룹 구성하기
    - EC2 -> Auto Scaling 그룹 -> Auto Scaling 그룹 생성
      - Auto Scaling 그룹 이름 : WPEC2AutoScalingGroup
      - 시작 템플릿 : WPEC2LaunchTemplate
      - 네트워크
        - VPC : WP-VPC1
        - 서브넷 : WP-VPC1-Subnet1, WP-VPC1-Subnet2
      - 로드 밸런싱 : 기존 로드 밸런서에 연결
        - 대상 그룹 : ALB-TG | HTTP
      - 상태 확인
        - `Elastic Load Balancer 상태 확인 켜기` : 체크
        - 상태 확인 유예 기간 : 300초
      - 추가 설정
        - `CloudWatch 내에서 그룹 지표 수집 활성화` : 체크
        - `기본 인스턴스 워밍업 활성화` : 체크
          - 90초
      - 그룹 크기 및 크기 조정 구성
        - 원하는 용량 : 2
        - 최소 용량 : 2
        - 최대 용량 : 4
        - 크기 조정 정책 : 없음
      - 태그 추가
        - 키 Name, 값 WebServers
  - 워드프레스 동작 확인하기
    - EC2 -> 인스턴스 생성 (WebServers) 확인
    - 로드 밸런싱 -> 대상 그룹 -> EC2 인스턴스 포함 확인
    - CloudFormation -> 출력 탭 -> CloudFrontDNS 값으로 브라우저 접속 -> 이미지 포함 글 작성
  - AWS 클라우드 셸(CloudShell)에서 웹 서버 부하분산 접속 확인하기
    - AWS 클라우드 셸
      - CloudFrontDNS 도메인 주소 변수 지정
        - `WPDNS=(CloudFrontDNS 주소)`
      - 웹 서버의 xff.php 로 접속하여 출력 내용 확인
        - `curl -s $WPDNS/xff.php ; echo`
      - 웹 서버의 xff.php 로 접속하여 private 이 포함된 줄만 확인 (프라이빗 IP)
        - `curl -s $WPDNS/xff.php | grep Private`
      - 100번 반복 접속 후 ALB 부하분산 확인
        - `for i in {1..100}; do curl -s $WPDNS/xff.php | grep Private ; done | sort | uniq -c | sort -nr`
- 11.3.7. 장애 발생 및 서비스 연속성 확인하기
  - Amazon RDS Primary 장애 발생 후 서비스 동작 확인하기
    - WebSrv-Leader SSH 1
      - RDS 접속 도메인 주소 변수 지정
        - `RDS=$(aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text)`
      - RDS 인스턴스 접속 도메인 주소 질의
        - `dig +short $RDS`
      - RDS 인스턴스 접속 도메인 주소 질의(반복)
        - `while true; do date && dig +short $RDS && echo "---------" && sleep 1; done`
    - WebSrv-Leader SSH 2
      - RDS 접속 도메인 주소 변수 지정
        - `RDS=$(aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text)`
      - mysql 엔진 버전 정보 확인
        - `mysql -h $RDS -u root -pqwe12345 -e "SELECT @@version;"`
      - mysql 엔진 버전 정보 확인(반복)
        - `while true; do date && mysql -h $RDS -u root -pqwe12345 --connect-timeout=1 -e "SELECT @@version;" ; sleep 1; done`
    - RDS wpdb -> 작업 -> 재부팅
      - WebSrv-Leader SSH 1 에서 도메인 주소 IP 변경 확인
      - WebSrv-Leader SSH 2 에서 mysql 버전 쿼리 잠시 실패 후 다시 응답 확인
    - 워드프레스 접속 확인
  - AZ1 가용 영역 수준 장애를 가정해서 설정 후 서비스 동작 확인하기
    - AWS 클라우드 셸
      - CloudFrontDNS 도메인 주소 변수 지정
        - `WPDNS=(CloudFrontDNS 주소)`
      - CloudFrontDNS 도메인 주소 xff.php 로 접속 확인(반복)
        - `while true; do date ; curl -s --connect-timeout 1 $WPDNS/xff.php | grep Private ; echo "---[Webserver]---"; sleep 1; done`
    - Auto Scaling 그룹 -> 세부 정보 탭 -> 편집
      - 원하는 용량 : 1
      - 최소 용량 : 1
      - 최대 용량 : 4
    - 동작중인 EC2 확인, 동작중인 RDS 확인
    - AWS 클라우드 셸
      - CloudFrontDNS 도메인 주소 xff.php 로 접속 확인(반복)
        - `while true; do date ; curl -s --connect-timeout 1 $WPDNS/xff.php | grep Private ; echo "---[Webserver]---"; sleep 1; done`
    - 워드프레스에 글 작성 확인
- 11.3.8 실습을 위해 생성된 모든 자원 삭제하기
  - Auto Scaling 그룹 삭제
  - CloudFormation 스택 삭제
  - EC2 인스턴스 시작 템플릿 삭제
  - Amazon Route 53 호스팅 영역 삭제
