---
layout: post
title: (GitHub 블로그) 2. GitHub Pages 로 블로그 호스팅하기
date: 2024-06-09 21:22 +0900
categories: [blog, github-pages]
tag: [블로그, blog, github pages]
---

> 포스팅의 내용
> - [Github Pages 빠른 시작][GitHub Pages Quickstart] 문서 파악
> - 블로그 호스팅

이 글의 끝에서 첫 번째 블로그 페이지를 얻을 수 있다.

# GitHub Pages 란?

GitHub 이 호스팅해주는 웹 페이지. 개인 개발 블로그 용도로 사용할 예정이다.

# GitHub 블로그 호스팅하기

먼저 개인 [github][github] 계정이 있어야 한다.

## 1. Repository 생성

username.github.io 라는 이름의 레포를 생성한다.

내 username 은 gigyesik 이니까, [gigyesik.github.io][gigyesik.github.io] 라고 명명한다.

![](/assets/img/2024-06-09/github-pages-quickstart-1-create-new-repository.png)

레포를 public 으로 설정할 것인지 private 로 설정할 것인지를 묻고 있다.

혹자가 ‘개발의 ㄱ자도 모르는 놈이 무슨 블로그냐’라고 할까봐 private 으로 설정할까 고민되더라도, 
[개인 free 계정에게는 public 레포지토리만 제공][github plans]하므로 포기하고 public 으로 설정한다.

## 2. GitHub Pages 배포

만들어진 레포의 Settings > Pages 메뉴로 들어간다.

![](/assets/img/2024-06-09/github-pages-quickstart-2-settings-page.png)

그대로 Save 버튼을 누르면 Github Pages 문서가 저장되었다는 메시지를 받을 수 있다.

![](/assets/img/2024-06-09/github-pages-quickstart-3-source-saved.png)

## 3. 블로그 접속 시도해보기

Github Pages 가 저장되었다고 하니 [gigyesik.github.io][gigyesik.github.io] 로 접속해보면 당연스럽게도 404 Page를 만날 수 있다.

당연할 것이, 아무 것도 한게 없는데 페이지가 나올 수는 없지..

![](/assets/img/2024-06-09/github-pages-quickstart-4-404.png)

## 4. 블로그 소스 생성

페이지 만들기를 시작해보자. IDE 를 선택해야 하는데, 프론트 개발은 보통 [VSCode][VSCode]를 많이 쓴다.

필자는 Java 개발을 하다 보니 JetBrains UI가 익숙해서 [WebStorm][Webstorm] 도 사용해 보고 VSCode 도 사용해본다.

### Project Clone

레포지토리를 local로 클론한다.

![](/assets/img/2024-06-09/github-pages-quickstart-5-clone.png)

```shell
// git clone {레포 git 경로}
git clone https://github.com/gigyesik/gigyesik.github.io.git
```

### Write File

- README.md 파일을 생성하고 아무 내용이나 입력한다.
- 레포에 커밋, 푸시한다.

### 결과 확인

다시 [gigyesik.github.io][gigyesik.github.io] 에 접속해보면, 입력한 내용을 확인할 수 있다.

첫 블로그 페이지 생성에 성공한 것이다.

![](/assets/img/2024-06-09/github-pages-quickstart-6-main.png)

Github Pages 설정 메뉴도 활성화되어 있음을 확인할 수 있다.

![](/assets/img/2024-06-09/github-pages-quickstart-7-setting.png)

## 5. 사이트 제목 설정

가이드에 나와있는 문서를 따라하면 사이트 제목이 바뀐다고 해서 시도해본다.

초기에는 username으로 설정되어 있다.

![](/assets/img/2024-06-09/github-pages-quickstart-8-default-title.png)

_config.yml 파일을 생성하고, 제목을 입력한다

```yaml
title: gigyesik github pages
```

ruby 배포(여기서는 커밋, 푸시)하고 나면 입력한 내용으로 변경됨을 확인할 수 있다.

![](/assets/img/2024-06-09/github-pages-quickstart-9-title.png)

# Next

Jekyll 을 사용해 블로그에 테마를 적용한다

# Resources

- [GitHub Pages Guide - QuickStart][GitHub Pages Quickstart]

[gigyesik.github.io]: http://gigyesik.github.io
[GitHub Pages Quickstart]: https://docs.github.com/ko/pages/quickstart
[github]: https://github.com/
[github plans]: https://docs.github.com/en/get-started/learning-about-github/githubs-plans#github-free-for-personal-accounts
[VSCode]: https://code.visualstudio.com/
[Webstorm]: https://www.jetbrains.com/ko-kr/webstorm/
