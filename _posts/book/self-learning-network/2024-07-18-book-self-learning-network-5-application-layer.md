---
layout: post
title: (혼자 공부하는 네트워크) 05. 응용 계층
date: 2024-07-18 00:44 +0900
categories: [book, 혼자 공부하는 네트워크]
tag: [book, 혼자 공부하는 네트워크, 응용 계층]
---

# 05. 응용 계층 (250p~)

## 05-1. DNS 와 자원 (252p~)

### 도메인 네임과 네임 서버

- 도메인 네임(domain name) : 호스트의 IP 주소와 대응되는 문자열 호스트 정보 (example.com)
- 네임 서버(name server) : IP 주소와 도메인 네임을 관리하는 서버 (공용 전화번호부)
  - DNS(Domain Name Server) : 도메인 네임을 관리하는 서버
  - DNS(Domain Name System) : 분산된 도메인 네임의 관리 체계
- host 파일 : 도메인 네임과 IP 주소의 대응 관계를 담은 파일 (개인 전화번호부)
  - mac, linux : /etc/hosts
  - windows : \SystemRoot\System32\drivers\etc\hosts
- 전체 주소 도메인 네임(FDQN; Fully-Qualified Domain name) ex. www.example.com.
  - 루트 도메인(root domain) : 마지막 .
  - 최상위 도메인(TLD; Top-Level Domain) : com
  - 2단계 도메인(second-level domain) : example
  - 3단계 도메인(호스트 네임. host name) : www
  - 서브 도메인 : 자기 앞. example.com 은 com 의 서브 도메인

### 계층적 네임 서버

- 리졸빙(resolving) : IP 주소를 모르는 상태에서 도메인 네임에 해당하는 IP 를 알아내는 과정(IP 주소 풀이)
- 로컬 네임 서버(local name server) : ISP 가 할당해주는 클라이언트와 닿아 있는 네임 서버
- 공개 DNS 서버(public DNS server) : 로컬 네임 서버 대신 구글의 8.8.8.8 등 이용 가능
- 루트 네임 서버(root name server) : 루트 도메인을 관리하는 네임 서버
- TLD 네임 서버(TLD name server) : TLD 를 관리하는 네임 서버
- 책임 네임 서버(authoritative name server) : 특정 도메인 영역을 관리하는 네임 서버
  - 로컷 네임 서버가 마지막으로 질의하는 네임 서버. 곧바로 IP 주소 응답 가능
- 재귀적 질의(recursive query)
  - 클라이언트 -> 로컬(공개) -> 루트 -> TLD -> 책임(IP) -> TLD -> 루트 -> 로컬(공개) -> 클라이언트
- 반복적 질의(iterative query)
  - 클라이언트 -> 로컬(공개)
  - 로컬(공개) -> 루트 -> 로컬(공개)
  - 로컬(공개) -> TLD -> 로컬(공개)
  - 로컬(공개) -> 책임(IP) -> 로컬(공개)
  - 로컬(공개) -> 클라이언트
- DNS 캐시(DNS cache) : 네임 서버들이 응답 결과를 임시 저장했다가 같은 질의에 활용하는 것
  - TTL(Time To Live) : 캐시(임시저장)될 수 있는 시간

### URI(Uniform Resource Identifier) : 네트워크상에서 자원을 식별하는 방식
 
- 자원(Resource) : 네트워크상 메시지를 통해 주고받는 대상(내용)
- URL(Uniform Resource Locator) : 위치를 이용해 자원 식별
  - ex. foo://www.example.com:8042/over/there?name=gigyesik#eyes
  - scheme : `foo://`
    - 자원에 접근하는 방법(프로토콜)
    - HTTP, HTTPS 등
  - authority : `www.example.com:8042`
    - IP 주소 또는 도메인 네임
    - 포트 포함
  - path : `/over/there`
    - 자원이 위치하는 경로
  - query(query string, query parameter) : `?name=gigyesik`
    - 서버에 요청을 보낼 때 사용하는 값
  - fragment : `#eyes`
    - 자원의 특정 부분 지칭
- URN(Uniform Resource Name) : 이름을 이용해 자원 식별
  - 도서 코드 `urn:isbn:045140523`
  - rfc 문서 번호 `urn:ietf:rfc:2648`

### DNS 레코드 타입

- DNS 자원 레코드(DNS resource record) : 도메인 네임과 IP 주소의 대응 관계를 저장하는 값
  - 타입
    - A : IPv4
    - AAAA : IPv6
    - CNAME : 호스트 네임의 별칭
    - NS : 네임 서버 지정
    - MX : 메일 서버
  - 이름
  - 값
  - TTL
  - 예시 (타입 / 이름 / 값 / TTL)
    - A, example.com, 1.2.3.4, 300 : IPv4 주소 1.2.3.4 와 example.com 대응
    - CNAME, www.example.com, example.com, 300 : www.example.com 을 질의해도 1.2.3.4 를 응답받을 수 있음

## 05-3. HTTP (272p~)

### HTTP(Hypertext Transfer Protocol) : 응용 계층 프로토콜

- 요청, 응답 기반 (Request, Response Header)
- 미디어 독립적 : 자원의 특성과 무관
  - 자원(resource) : HTTP 가 요청하는 대상
  - 미디어 타입(media type), MIME 타입(Multipurpose Internet Mail Extensions Type) : 메시지로 주고받는 자원의 종류
    - `type/subtype;parameter=value` ex. application/json, text/html;charset=UTF-8, \*/\*
    - 타입(type) : 데이터의 유형
    - 서브타입(subtype) : 타입의 세부 유형
    - parameter, value : 부사적인 설명
- 상태를 유지하지 않음(스테이트리스; stateless) : 서버는 HTTP 요청을 보낸 클라이언트의 상태를 기억하지 않음
  - 확장성(scalability) : 언제든 요철할 서버를 추가할 수 있음
  - 견고성(robustness) : 서버 중 하나에 문제가 생겨도 다른 서버로 대체 가능
- 지속 연결(persistent connection)
  - HTTP 1.1 이상에서 지원
  - keep-alive. 즉 하나의 TCP 연결로 여러 개의 요청, 응답을 주고받을 수 있음

### HTTP 메시지 구조

- 시작 라인(start-line)
  - 요청 라인(request-line) : HTTP 요청 메시지인 경우
    - `메서드 (공백) 요청 대상 (공백) HTTP 버전 (줄바꿈)`
    - 메서드(method) : 작업의 종류. GET, POST, PUT, DELETE 등
    - 요청 대상(request-target) : 요청을 보낼 서버의 자원. 쿼리가 포함된 URI 경로
    - HTTP 버전(HTTP-version) : 사용된 HTTP 버전. HTTP/<버전> 형식
  - 상태 라인 : HTTP 응답 메시지인 경우
    - `HTTP 버전 (공백) 상태 코드 (공백) 이유 구문(선택적) (줄바꿈)`
    - 상태 코드(status code) : 요청 결과를 나타내는 세 자리 정수
    - 이유 구문(reason phrase) : 상태 코드에 대한 문자열 형태의 설명
- 필드 라인, 헤더 라인
  - HTTP 헤더(HTTP header) : `헤더 이름(header-name):헤더 값(header-value)`
  - HTTP 통신에 필요한 부가 정보
- 메시지 본문(message-body)

### HTTP 메서드

- GET : 특정 자원 조회
  - 요청 : 요청 대상 + Host 헤더
  - 응답 : 요청한 자원
  - 요청에 메시지 본문(message-body) 미포함
- HEAD : GET 메서드와 동일하나, 응답에 메시지 본문 없음
- POST : 서버에 작업 요청
  - 서버에 새로운 자원을 생성하는 경우
  - 응답에 Location 헤더 포함(생성된 자원의 위치)
- PUT : 요청 자원이 없다면 메시지 본문으로 새롭게 생성, 있으면 메시지 본문으로 대체
- PATCH : 부분적 수정
- DELETE : 특정 자원 삭제
- API 문서 : URL 요청에 대한 서버의 응답 문서

### HTTP 상태 코드 (응답 메시지)

- 200번대 : 성공 상태 코드
  - 200 OK : 요청 성공
  - 201 Created : 요청 성공, 새로운 자원 생성
  - 202 Accepted : 요청 수신 완료, 요청 작업 미완료 (요청 결과 곧바로 응답하지 못하는 상황)
  - 204 No Content : 요청 성공, 메시지 본문으로 표시할 데이터 없음
- 300번대 : 리다이렉션(redirection)
  - 리다이렉션 : 클라이언트의 요청을 다른 곳(URL 또는 캐시)으로 이동시키는 것
    - 영구적 리다이렉션(permanent redirection) : 자원 완전 이동, 경로 재지정
    - 일시적 리다이렉션(temporary redirection) : 자원 위치 임시 변경 또는 임시 사용 URL 이 필요한 경우
  - 301 Moved Permanently : 영구적 리다이렉션. 메서드 변경될 수 있음
  - 308 Permanent Redirect : 영구적 리다이렉션. 메서드 변경되지 않음(301보다 명시적)
  - 302 Found : 일시적 리다이렉션. 메서드 변경될 수 있음
  - 303 See Other : 일시적 리다이렉션. 메서드 GET 으로 변경
  - 307 Temporary Redirect : 일시적 리다이렉션. 메서드 변경되지 않음(302보다 명시적)
- 400번대 : 클라이언트 에러
  - 400 Bad Request : 클라이언트의 요청이 잘못된 경우
  - 401 Unauthorized : 요청한 자원에 대한 유효한 인증이 없음
  - 403 Forbidden : 요청이 서버에 의해 거부됨(접근 권한이 없는 경우. 인가)
    - 인증(authentication) : 자신이 누구인지 증명하는 것
    - 인가(authorization) : 인증된 주체에 작업을 허용하는 것(권한 부여)
  - 404 Not Found : 요청 자원을 찾을 수 없음
  - 405 Method Not Allowed : 요청 메서드를 지원하지 않음
- 500번대 : 서버 에러
  - 500 Internal Server Error : 요청을 처리할 수 없음
  - 502 Bad Gateway : 중간 서버의 통신 오류
  - 503 Service Unavailable : 현재 요청 처리 불가능. 추후 사용 가능할 수도 있음

### HTTP 의 역사

- HTTP/0.9
  - GET 만 사용 가능
  - 요청 메시지 한 줄
- HTTP/1.0
  - HEAD, POST 도입
  - 헤더 지원 시작
  - 지속 연결(persistent connection) 미지원 : 요청 때마다 연결 새로 생성
- HTTP/1.1
  - 지속 연결 공식 지원
  - 파이프라이닝 지원(응답 수신 전 다음 요청 보내기 가능)
  - 콘텐츠 협상 기능
- HTTP/2.0
  - 헤더 압축 전송
  - 바이너리 데이터 기반(이전 버전은 텍스트 기반)
  - 서버 푸시(server push) : 클라이언트가 요청하지 않더라도 자원을 미리 전송
  - HOL 블로킹(Head-Of-Line blocking) 완화
    - HOL 블로킹 : 같은 큐에서 첫 번째 패킷의 처리 지연으로 나머지 패킷도 모두 지연되는 문제
    - 멀티플렉싱(multiplexing) : 스트림(stream)을 이용해 데이터 병렬 전송
- HTTP/3.0
  - UDP 기반 구현된 QUIC(Quick UDP Internet Connection) 프르토콜 기반으로 동작(빠름)

## 05-3. HTTP 헤더와 HTTP 기반 기술 (308p~)

### HTTP 헤더

- 요청 시 활용되는 HTTP 헤더
  - Host : 요청을 보낼 호스트
    - 도메인 이름 (+ 포트)
    - ex. Host: example.com:1234
  - User-Agent : HTTP 요청을 시작하는 클라이언트 측 프로그램
    - (브라우저 Mozilla 호환 여부)(운영체제 및 아키텍처 정보)(렌더링 엔진 관련 전보)(브라우저와 버전 정보)
    - ex. User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0
  - Referer : 클라이언트가 요청을 보낼 때 머무르고 있던 URL
    - 원래 Referrer 가 맞지만, 초기 개발 당시 오타 그대로 사용
    - ex. Referer: https://example.com
  - Authorization : 클라이언트의 인증 정보
    - Authorization : <type>(인증 타입) <credentials>(인증을 위한 정보)
    - 인코딩(encoding) : 문자를 코드로 변환하는 방법. ex. Base64 (Basic 인증에서 사용)
    - ex. Authorization: Basic bWluY2h1bDoxMjM0
- 응답 시 활용되는 HTTP 헤더
  - Server : 서버 측의 소프트웨어 관련 정보
    - ex. Server: Apache/2.4.1 (Unix)
  - Allow : 허용된 HTTP 메서드 목록
    - HTTP 상태 코드 405(Method Not Allowed)를 응답하는 경우 사용
    - ex. Allow: POST, OPTIONS
  - Retry-After : 자원을 사용할 수 있는 날짜 또는 시각
    - HTTP 상태 코드 503(Service Unavailable)을 응답하는 경우 사용
    - ex. Retry-After: Fri, 23 Aug 2024 09:00:00 GMT
    - ex. Retry-After: 120
  - Location : 클라이언트에게 자원의 위치를 알려주기 위해 사용
    - 리다이렉션 또는 새로운 자원 생성시
  - WWW-Authenticate : 자원에 접근하기 위한 인증 방식
    - HTTP 상태 코드 401(Unauthorized)을 응답하는 경우 사용
    - ex. WWW-Authenticate: Basic
    - ex. WWW-Authenticate: Basic realm="Access to personal info", charset="UTF-8"
    - 영역(realm) : 보안이 적용된 영역. 영역에 따라 요구되는 권한이 다를 수 있음
- 요청과 응답 모두에서 활용되는 HTTP 헤더
  - Date : 메시지가 생성된 날짜와 시각
    - ex. Date: Tue, 15 Nov 1994 08:12:31 GMT
  - Connection : 클라이언트의 요청과 응답 간의 연결 방식
    - HTTP 는 지속 연결 프로토콜(keep alive)
    - ex. Connection: keep-alive
    - ex. Connection: close
  - Content-Length : 본문의 바이트 단위 크기(길이)
    - ex. Content-Length: 100
  - 표현 헤더(representation header)
    - Content-Type : 메시지 본문에서 사용될 미디어 타입
      - ex. Content-Type: text/html; charset=UTF-8
    - Content-Language : 메시지 본문에 사용될 자연어
      - `Content-Language: (서브 태그)-(서브 태그)-..`
      - ex. Content-Language: ko
      - ex. Content-Language: en-US
    - Content-Encoding : 메시지 본문을 압축하거나 변환한 방식
      - ex. Content-Encoding: gzip
      - ex. Content-Encoding: deflate, gzip

### 캐시(cache) : 불필요한 대역폭 낭비와 응답 지연을 방지하기 위해 정보의 사본을 임시로 저장하는 기술

- 개인 전용 캐시(private cache) : 웹 브라우저에 저장된 캐시
- 공용 캐시(public cache) : 중간 서버에 저장된 캐시
- 캐시 신선도(cache freshness) : 캐시된 사본 데이터와 최신 원본 데이터의 유사도
  - 캐시 데이터에 유효 기간 부여
    - Expires 헤더
      - ex. Expires: Tue, 06 Feb 2024 12:00:00 GMT
    - Cache-Control 헤더의 Max-Age 값(초)
      - ex. Cache-Control: max-age=1200
  - 캐시의 신선도 검사
    - 날짜 기반
      - If-Modified-Since (이 날짜 이후로 자원 변경이 변경되었는지)
        - ex. If-Modified-Since: Fri, 23 Aug 2024 09:00:00 GMT
      - 서버 응답
        - 자원 변경 있음 : 200(OK) + 새로운 자원
        - 자원 변경 없음 : 304(Not Modified) -> 클라이언트는 캐시 사용
          - Last-Modified(선택) : 자원의 마지막 변경 시점
        - 자원 삭제 : 404(Not Found)
    - 엔티티 태그 기반
      - 엔티티 태그(entity tag, ETag) : 자원의 버전을 식별하기 위한 정보
      - 버전(version) : 유의미한 변경 사항
      - If-None-Match (ETag 값과 일치하는 지원이 있는지)
        - ex. If-None-Match: "abc"
      - 서버 응답
        - ETag 값 변경(자원 변경 있음) : 200(OK) + 새로운 자원
        - ETag 값 동일(자원 변경 없음) : 304(Not Modified)
        - 자원 삭제 : 404(Not Found)

### 쿠키(cookie) : 서버에서 생성되어 클라이언트 측에 저장되는 데이터

- HTTP 의 stateless 성격을 보완
- 세션 인증
  - 세션 아이디(session id) : 쿠키를 통해 전달
  - 클라이언트 -> 서버 : 인증 정보 전송
  - 서버 -> 클라이언트 : 세션 아이디 전송
  - 서버 : 세션 아이디 저장(DB 등)
  - 클라이언트 -> 서버 : 쿠키 내부의 세션 아이디 포함하여 요청
  - 서버 : 요청받은 세션 아이디와 저장된 세션 아이디를 비교하여 클라이언트 식별
- Set-Cookie : 응답 메시지 헤더. 쿠키에 저장된 값 전달
  - `Set-Cookie: 이름=값; 속성; ..`
  - ex. Set-Cookie: message=hello
  - 속성
    - domain : 쿠키가 사용될 도메인
    - path : 쿠키가 사용될 경로(하위 경로)
    - Expires, Max-Age : 쿠키의 유효 기간
- Cookie : 요청 메시지 헤더. 서버에 전달할 쿠키
  - `Cookie: 이름=값; 이름=값; ..`
  - ex. Cookie: name=gigyesik, message=hello
- 쿠키의 한계 : 쉽게 노출되거나 조작될 수 있음(보안)
  - 보완 속성
    - Secure : HTTPS 프로토콜이 사용되는 경우에만 쿠키 전송
    - HttpOnly : 자바스크립트에서 쿠키에 접근 불허용 (HTTP 헤더를 통해서만 가능)

### 웹 스토리지(web storage) : 쿠키 이외의 웹 브라우저 내 저장 공간

- 쿠키와 달리 서버로 자동 전송되지 않음
- 로컬 스토리지(local storage) : 영구 저장 가능(별도로 삭제하지 않으면)
- 세션 스토리지(session storage) : 세션이 유지되는 동안 저장(브라우저가 열려 있는 동안)

### 콘텐츠 협상과 표현

- 콘텐츠 협상(content negotiation) : 같은 URI 에 대해 가장 적합한 자원의 형태를 제공하는 메커니즘
- 표현(representation) : 송수신 가능한 자원의 형태
- GET 메서드 재정의 : 자원 습득 -> 자원의 특정 표현 습득
- 요청 메시지 헤더
  - Accept : 선호 미디어 타입
  - Accept-Language : 선호 언어
  - Accept-Charset : 선호 문자 인코딩
  - Accept-Encoding : 선호 압축 방식
  - 우선순위 : 헤더의 q값. 생략된 경우 1, 범위 0~1, 클수록 우선순위 높음
  - ex. Accept: text/html, application/xml; q=0.9, text/plain; q=0.6, \*/\*; q=0.5
  - ex. Accept-Language: ko-KR, ko; q=0.9, en-US; q= 0.8, en; q=0.7
