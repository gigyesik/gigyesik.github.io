---
layout: post
title: (GitHub 블로그) 3. Jekyll 로 페이지 생성하기
date: 2024-06-11 03:22 +0900
categories: [blog, github-pages]
tag: [블로그, blog, github pages, jekyll, ruby, rubygems]
---

> 포스팅의 내용
> - jekyll 의 이해
> - jekyll 을 사용하여 블로그 페이지 생성

# 지킬 (Jekyll) 이란 무엇인가

[Jekyll][jekyll] 이란 HTML, Markdown 문서를 통해 정적 페이지를 만들어주는 웹 사이트 생성기이다.

Windows 에서는 공식 지원하지 않는다고 하나, 비공식적으로는 가능하다는 이야기이니 적용해본다.

(필자는 Windows 와 Mac 을 둘다 가지고 있다)

[GitHub Pages 의 Jekyll 가이드][github pages jekyll guide]는 이해가 잘 가지 않는다. [Jekyll 공식 사이트][jekyll]를 따라가보자.

# jekyll 로 페이지 생성하기

## 필요한 전제조건들 설치

[Jekyll QuickStart 가이드][jekyll docs] 문서를 확인해보면 Jekyll 을 사용하기 전 필요한 항목들이 있다.

- Ruby
- RubyGems
- GCC

### Ruby

Jekyll 을 개발하는데 사용된 프로그래밍 언어이다.

- windows

```shell
// 윈도우 패키지 관리 프로그램 설치
winget install wingetcreate
// Ruby 최신 버전 확인
winget search RubyInstallerTeam.Ruby
// Ruby 설치
winget install RubyInstallerTeam.Ruby.[버전]
// Ruby DevKit 수동 설치
winget install RubyInstallerTeam.RubyWithDevKit.[버전]
// 설치 확인
ruby -v
```

- Mac

```shell
// Ruby 설치
brew install ruby
// 설치 확인
ruby -v
```

### RubyGems

Ruby 의 패키지 매니저. Ruby 설치시 함께 설치된다.

```shell
// 설치 확인
gem -v
```

### GCC

GNU Compiler Collection. 컴파일러. 필자의 컴퓨터에는 설치되어 있었다.

```shell
// 설치 확인
gcc -v
```

## Jekyll 설치

```shell
gem install jekyll bundler
```

## Jekyll 페이지 레포에 init

```shell
// 로컬 레포지토리 경로로 이동
cd [경로]
// Jekyll 페이지 생성
jekyll new gigyesik.github.io
```

레포지토리 안에 아래와 같은 파일들이 생성된다.

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-3-jekyll-quickstart-1-files.png)

# 페이지 확인하기

## Local 에서 빌드 후 결과 확인

### 로컬 실행

```shell
exec jekyll serve
```

### 기본 포트인 [localhost:4000] 에 접속

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-3-jekyll-quickstart-2-local.png)

## [gigyesik.github.io][blog] 에 배포

- 커밋, 푸시 (앞서 설정한 github actions 가 빌드, 배포해준다)
- {username}.github.io 에 접속해 결과 확인 (몇 분 기다려야 할 수 있다)

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-3-jekyll-quickstart-3-prod.png)

# Next

jekyll 페이지에 [테마][jekyll theme] 적용

# Resources

- [GitHub Pages Guide][github pages jekyll guide]
- [Jekyll][jekyll]

[blog]: https://gigyesik.github.io
[jekyll]: https://jekyllrb.com
[jekyll docs]: https://jekyllrb.com/docs
[jekyll theme]: https://jekyllrb.com/resources
[github pages jekyll guide]: https://docs.github.com/ko/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
