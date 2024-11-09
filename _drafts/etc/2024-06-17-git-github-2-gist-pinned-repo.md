---
layout: post
title: (GitHub 프로필) 2. Gist 와 Pinned Repo 활용하기
date: 2024-06-17 02:45 +0900
categories: [git, github]
tag: [git, github, github profile, gist, pinned repository]
---

> 포스팅의 내용
> 
> - gist, pinned repo 를 활용해 프로필 부가기능 추가하기

# GitHub gist 플러그인 추가하기

- 커밋 시간 통계를 제공해주는 productive-box 를 예시로 추가해본다.

## productive-box

### gist 생성

- public 권한으로 생성한다.
- 제목과 내용은 아무렇게나 입력한다.
- 생성된 gist 의 id : gist.github.com/{username}/{id} 를 기억해둔다.

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-1-create-gist.png)

### productive-box 레포 fork

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-2-fork-repo.png)

### 레포 github actions 활성화 후 .github/workflows/schedule.yml 파일 수정

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-3-edit-schedule.png)

```yaml
GIST_ID: gist 생성시 부여된 ID
TIMEZONE: Asia/Seoul
```

### [github 토큰 설정 페이지][github-token]에서 토큰 생성

- repo 와 gist 기능에 체크

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-4-token-scope.png)

### Settings > Secrets and Variables > Actions Secrets 에서 환경변수에 토큰 주입

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-5-env-token.png)

### gist 를 pinned repository 에 고정

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-6-pin-repo.png)

### 결과 확인하기

fork 한 productive-box 의 action 가 gist 를 감지하기를 기다려야한다.

시간이 흐른 후, 결과를 확인할 수 있다.

![](/assets/img/2024-06-17/2024-06-17-git-github-2-gist-pinned-repo-7-result.png)


[github-token]: https://github.com/settings/tokens
