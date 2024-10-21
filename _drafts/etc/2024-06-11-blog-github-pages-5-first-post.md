---
layout: post
title: (GitHub 블로그) 5. 글 작성하기
date: 2024-06-11 04:03 +0900
categories: [blog, github-pages]
tag: [블로그, blog, github pages, posting]
---

> 포스팅의 내용
>
> - 블로그 첫 글 작성

# 글 작성 방법

## _post/**YYYY-MM-DD-TITLE.EXTENSION**

생성되어 있는 _post 폴더에 문서를 추가한다.

- 확장자는 .md 또는 .markdown 이어야 한다.
- 파일 이름 명명 규칙이 있다.
  - YYYY-MM-DD-TITLE.EXTENSION
  - ex. 2024-05-01-first-post.markdown
- 파일을 작성 후 배포하면 포스팅을 확인할 수 있다.

![](/assets/img/2024-06-11/2024-06-11-blog-github-pages-5-first-post-1-result.png)

## Jekyll Compose

- jekyll-compose 는 Jekyll을 사용해 커맨드 명령어를 사용할 수 있게 해주는 라이브러리이다.
- 블로그에 jekyll 포스팅을 올릴 때는 아래의 메타 정보들을 입력해야 하는 귀찮음이 있는데, jekyll-compose를 사용하면 기본적인 메타 정보를 자동으로 입력해준다.

```markdown
---
layout: post
title:  "Welcome to Jekyll!"
date:   2024-05-28 14:42:09 +0900
categories: jekyll update
---
```

### 설치

- Gemfile 에 아래 코드를 추가한다

```gemfile
group :jekyll_plugins do
  gem "jekyll-compose"
end
```

### 실행

```shell
// jekyll-compose 패키지 인스톨
bundle

// 새 포스팅 생성
bundle exec jekyll post "제목"
```

### 결과 확인

- 아래와 같은 메타데이터들이 추가된다.

```markdown
---
layout: post
title: meta test
date: 2024-06-03 13:41 +0900
---

```

# Next

- 기존 환경설정하면서 미리 작성한 글들을 이관한다.
- 블로그의 기본 설정 (아이콘 연결 등) 등을 살펴본다.

# Resources

- [Writing a New Post][new-post]

[new-post]: https://chirpy.cotes.page/posts/write-a-new-post
