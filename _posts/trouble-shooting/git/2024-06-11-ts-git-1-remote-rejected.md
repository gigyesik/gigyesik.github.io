---
layout: post
title: (git) [remote rejected] (refusing to allow a Personal Access Token to create or update workflow .github/workflows/pages-deploy.yml without workflow scope)
date: 2024-06-11 15:47 +0900
categories: [trouble-shooting, git]
tag: [trouble shooting, git, github, access token]
---

# 발생 상황

- .github 폴더 내 수정사항 발생 후 git push를 시도하였다.

```bash
$ git push origin

[remote rejected] (refusing to allow a Personal Access Token to create or update workflow .github/workflows/pages-deploy.yml without workflow scope)
```

# 발생 원인

- .github 폴더 내 파일들은 github 레포지토리 설정과 연관되어 있다.
- 푸시하려는 레포에는 github actions 관련 이벤트가 걸려있는데, github personal access token 에 workflow 권한이 없다.

# 해결 - 토큰 재발급

![](/assets/img/2024-06-11/2024-06-11-ts-git-1-remote-rejected-token.png)

Github Account → Settings → Developer Settings 메뉴에서 토큰 생성시 ‘workflow’ 항목을 포함하여 발급된 토큰으로 푸시하면 성공.
