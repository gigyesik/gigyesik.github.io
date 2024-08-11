---
layout: post
title: ubuntu timezone 변경하기
date: 2024-08-12 03:26 +0900
categories: [os, ubuntu]
tag: [ubuntu, timezone, utc, kst]
---

> 포스팅의 내용
> 
> - 우분투 PC 의 시간을 utc 에서 kst (utd + 9) 로 변경한다.
> 

# Ubuntu timezone 변경하기

## 현재 타임존 정보 확인

- `timedatectl`
  ```Shell
                   Local time: Sun 2024-08-11 18:24:29 UTC
               Universal time: Sun 2024-08-11 18:24:29 UTC
                     RTC time: Sun 2024-08-11 18:24:29
                    Time zone: Etc/UTC (UTC, +0000)
    System clock synchronized: yes
                  NTP service: active
              RTC in local TZ: no
  ```
- 현재 UTC 로 설정되어 있음

## 원하는 시간대의 timezone 이름 확인

- `timedatectl list-timezones | grep Seoul`
  - `Asia/Seoul`

## 시간대 변경

- `sudo timedatectl set-timezone Asia/Seoul`

## 결과 확인

- `timedatectl`
  ```Shell
                   Local time: Mon 2024-08-12 03:34:41 KST
               Universal time: Sun 2024-08-11 18:34:41 UTC
                     RTC time: Sun 2024-08-11 18:34:41
                    Time zone: Asia/Seoul (KST, +0900)
    System clock synchronized: yes
                  NTP service: active
              RTC in local TZ: no
  ```
- KST 로 변경 완료
