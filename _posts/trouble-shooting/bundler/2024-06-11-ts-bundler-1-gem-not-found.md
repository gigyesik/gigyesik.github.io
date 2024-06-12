---
layout: post
title: (bundler) Bundler::GemNotFound
date: 2024-06-11 15:36 +0900
categories: [trouble-shooting, bundler]
tag: [trouble shooting, bundler, rubygems]
---

# 발생 상황

- Jekyll 블로그를 로컬 빌드해보려고 실행 명령어 입력
- Ruby, RubyGems, GCC 설치는 확인한 상태
- Bundler::GemNotFound 오류 발생

```bash
$ exec jekyll serve  

Could not find minima-2.5.1, jekyll-feed-0.17.0, jekyll-seo-tag-2.8.0, rexml-3.2.8, strscan-3.1.0, bigdecimal-3.1.8, rake-13.2.1 in locally installed gems (Bundler::GemNotFound)
```

# 해결 성공 - Dependency

Node의 npm, Spring의 gradle 처럼 필요한 dependency 가 설치되지 않아 발생한 오류라고 판단하였다.

```bash
// 프로젝트 경로로 이동
cd gigyesik.github.io

// dependency 설치 -> 성공
bundle install

// 로컬 빌드
exec jekyll serve
```

localhost:4000 에 접속해서 빌드 결과물 확인.
