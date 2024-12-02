---
layout: post
title: linux crontab 을 활용한 스케줄러 구현하기 (feat. 1일 1커밋)
date: 2024-08-21 22:27 +0900
categories: [os, ubuntu]
tag: [ubuntu, crontab, scheduler]
---

> 포스팅의 내용
>
> - 갑자기 어느 바람(?)이 불어 1일 1커밋을 약 2달째 실천하고 있다.
> - 지금도 재미있게 하고 있긴 한데, '커밋을 위한 커밋'을 하게 되는 것 같다.
> - 그럴 것 같으면 그냥 자동으로 구현해두고, 내 작업을 자유롭게 만들어주고 싶었다.

# linux crontab 을 활용한 스케줄러 구현하기 (feat. 1일 1커밋)

## 서버 자원 선정하기

- 개인 PC, AWS 등 클라우드 리소스, 서버 PC 등 여러 선택지가 있다.
- AWS 의 가장 작은 EC2 로 가능하겠지만, 나는 개인 서버로 사용할 [우분투][post-ubuntu-install] 를 하나 구성해 두었기 때문에 이것을 활용하려 한다.

## 스크립트 작성하기

### 변경 사항 스크립트 (python)

- 매일매일 실행할 스크립트 main.py 를 간단한 파이썬으로 구현하였다.
- day.txt 라는 텍스트 파일을 하나 생성하고 오늘 날짜를 추가한다.

```Python
# main.py

from datetime import datetime

f = open("day.txt", 'a')

f.write(f'{str(datetime.today())}\n')

f.close()
```

### 커밋 스크립트 작성하기 (shell)

- 수정된 day.txt 를 자동으로 커밋해줄 쉘 스크립트 commit.sh 이다.
- main.py 를 실행하고, 변경 내용을 모두 커밋한다.

```Shell
# commit.sh
python3 main.py

git add .
git commit -m "Today Commit"
git push origin
```

## 레포지토리 설정하기

- main.py 와 commit.sh 를 하나의 레포에 올려두고, 리눅스에서 그 레포를 clone 한다.

## 리눅스 설정하기

### crontab

- 현재 crontab 설정 보기
  - `crontab -l`
- crontab 설정 수정하기
  - `crontab -e`
  - `5 0 * * * /{pwd}/commit.sh >> /{pwd}/commit.sh.log 2>&1`
    - 매일 0시 5분에 commit.sh 를 실행한다.
    - 실행 결과를 commit.sh.log 에 기록한다.

### 결과 확인

- `cat commit.sh.log`

[post-ubuntu-install]: https://gigyesik.github.io/posts/os-ubuntu-1-install-ubuntu/
