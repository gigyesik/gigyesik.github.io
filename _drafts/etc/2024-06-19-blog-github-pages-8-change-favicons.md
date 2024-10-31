---
layout: post
title: (GitHub 블로그) 8. favicon 변경하기
date: 2024-06-19 14:39 +0900
categories: [blog, github-pages]
tag: [블로그, blog, github pages, jekyll, favicon]
---

> 포스팅의 내용
> 
> - 이미지 파일로 favicon 생성
> - 블로그 favicon 변경

# Favicon 은 무엇인가

![](/assets/img/2024-06-19/2024-06-19-blog-github-pages-8-change-favicons-1-def.png)

사이트 탭 제목 옆에 뜨는 작은 이미지 아이콘을 의미한다.

원래 사용중인 테마인 chirpy 의 기본값으로 설정되어 있어서, 내가 원하는 이미지로 변경하였다.

# Favicon 변경하기

## Favicon 파일 생성

- [Real Favicon Generator][real-favicon-generator] 에 접속해서 원하는 이미지를 선택한다.

![](/assets/img/2024-06-19/2024-06-19-blog-github-pages-8-change-favicons-2-select-image.png)

- Favicon 가공 처리가 완료되면 하단의 `Generate your Favicons and HTML code` 버튼을 선택한다.

![](/assets/img/2024-06-19/2024-06-19-blog-github-pages-8-change-favicons-3-generate-favicons.png)

- Favicon Package 를 다운로드한다.

![](/assets/img/2024-06-19/2024-06-19-blog-github-pages-8-change-favicons-4-download-package.png)

# Favicon 적용하기

- 다운로드한 패키지의 파일 목록을 확인한다.

![](/assets/img/2024-06-19/2024-06-19-blog-github-pages-8-change-favicons-5-file-list.png)

- 이 중에서 `brwouserconfig.xml` 과 `site.webmanifest` 는 필요 없다.
- 나머지 파일들을 프로젝트 폴더의 `assets/favicons` 폴더에 넣는다. (favicons 폴더가 없으면 새로 생성)
- 변경 사항을 배포한다.

# Resources

- [Customize the Favicon][customize-the-favicon]

[real-favicon-generator]: https://realfavicongenerator.net
[customize-the-favicon]: https://chirpy.cotes.page/posts/customize-the-favicon
