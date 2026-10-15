# gigyesik.github.io

개발자의 투자 공부 기록을 담는 블로그입니다.

- Next.js (App Router, 정적 export), TypeScript
- 글은 `content/posts/*.mdx`에 쓰고 Velite로 frontmatter를 검증합니다.
- GitHub Actions가 `main`에 푸시될 때 빌드해서 GitHub Pages에 배포합니다.

## 글 쓰기

```
---
title: "글 제목"
date: 2026-10-15
status: draft        # published로 바꿔야 사이트에 나갑니다
tags: [투자공부, KIS]
stage: 0             # 선택: 로드맵 단계
code: https://...    # 선택: invest-lab 코드 링크
---
```

## 로컬 실행

```
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # out/ 에 정적 사이트 생성
```