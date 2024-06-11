---
layout: post
title: (GitHub 블로그) 6. _config.yml 로 블로그 설정 관리하기
date: 2024-06-11 04:15 +0900
categories: [blog, jekyll]
tag: [블로그, blog, jekyll, config, yml]
---

> 포스팅의 내용
>
> - jekyll _config.yml 을 통한 설정 관리

# _config.yml

```yaml
# 테마 Import
theme: jekyll-theme-chirpy

# 페이지 언어
lang: en

# 블로그 제목
title: 경계의 경계

# 블로그 부제목
tagline: gigyesik의 블로그

# 호스트 정보
url: https://gigyesik.github.io

# github 계정
github:
  username: gigyesik

# twitter 계정
twitter:
  username: gigyesik

# 소셜 정보
social:
  # 글의 기본 작성자, 저작권자 (Footer 노출)
  name: gigyesik
  email: gigyesik@gmail.com
  links:
    # 첫 번째 링크로 저작권자 연결
    - https://github.com/gigyesik
    - https://twitter.com/gigyesik

# 테마
# light | dark 중 선택 가능
# 공란으로 둘 경우 사이드바에 토글이 생성되고 변경 가능. 기본값은 시스템 설정
theme_mode: dark

# 사이드바의 아바타 이미지. 로컬 또는 CORS 경로 지원
avatar: assets/img/profile.jpeg

# 게시글 목차 (Table of Contents) 사용 여부
toc: true
```

# Next

comments 옵션 (댓글 기능) 구현
