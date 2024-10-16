---
layout: post
title: (GitHub 블로그) 4. Jekyll 에 테마 적용하기 (Chirpy)
date: 2024-06-11 03:23 +0900
categories: [blog, github-pages]
tag: [블로그, blog, github pages, jekyll, theme, 테마, chirpy]
---
> 포스팅의 내용
> - 현재 Jekyll 을 사용한 기본 테마로 블로그 빌드에 성공한 상태이다.
> - 테마를 사용하여 좀 더 내가 선호하는 UI를 가진 페이지로 변경해보려 한다.
> - 테마는 [Jekyll 의 테마 추천 페이지][jekyll-theme] 에서 검색할 수 있다.
> - 나는 [Chirpy Theme][chirpy] 를 선택했다. 지나가다 보여서.

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-4-jekyll-theme-1-current.png)

# 적용 방법

## Chirpy Starter 코드 적용

- Chirpy 테마는 테마 적용을 위한 [Starter][chirpy-starter] 를 제공한다.
- 위 레포를 Clone 해서 실행하면 원하는 결과를 얻을 수 있지만, 이미 실행중인 블로그가 있어서 레포를 지우지 않고 소스를 반영해야 한다. 즉, 수동으로.

### 파일 다운로드

- Starter 의 소스 파일을 ZIP 으로 다운받는다.

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-4-jekyll-theme-2-download-repo.png)

### 프로젝트 경로에 파일 덮어쓰기

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-4-jekyll-theme-3-paste.png)

## Local 빌드 후 결과 확인

```shell
exec jekyll serve
```

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-4-jekyll-theme-4-local.png)

# [gigyesik.github.io][blog] 에 배포 후  결과 확인

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-4-jekyll-theme-5-prod.png)

# Next

화면 기본 포맷을 형성했다.

이제 지금까지 작성한 포스팅들을 하나씩 올려봐야겠다.

# Resources

- [jekyll-theme-chirpy][chirpy]

[blog]: https://gigyesik.github.io
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy
[chirpy-starter]: https://github.com/cotes2020/chirpy-starter
[jekyll-theme]: https://jekyllrb.com/docs/themes

