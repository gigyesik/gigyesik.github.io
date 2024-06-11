---
layout: post
title: (bundler) The process '/opt/hostedtoolcache/Ruby/3.3.1/x64/bin/bundle' failed with exit code 16
date: 2024-06-11 16:05 +0900
categories: [trouble-shooting, bundler]
tag: [trouble shooting, bundler, github actions, gemfile]
---

# 발생 상황

- github actions를 사용하여 deploy.yaml 설정 후 배포를 진행하였다.
- 빌드에 실패하였고, process failed 메시지를 받았다.

```bash
> bundle install
/opt/hostedtoolcache/Ruby/3.3.1/x64/bin/bundle config --local path /home/runner/work/gigyesik.github.io/gigyesik.github.io/vendor/bundle
/opt/hostedtoolcache/Ruby/3.3.1/x64/bin/bundle config --local deployment true
Cache key: setup-ruby-bundler-cache-v6-ubuntu-22.04-x64-ruby-3.3.1-wd-/home/runner/work/gigyesik.github.io/gigyesik.github.io-with--without--only--Gemfile.
...
/opt/hostedtoolcache/Ruby/3.3.1/x64/bin/bundle install --jobs 4
Your bundle only supports platforms ["x64-mingw-ucrt", "x86_64-darwin-23"] but
your local platform is x86_64-linux. Add the current platform to the lockfile
with
`bundle lock --add-platform x86_64-linux` and try again.
Error: The process '/opt/hostedtoolcache/Ruby/3.3.1/x64/bin/bundle' failed with exit code 16
```

- 빌드 과정 중 패키지를 관리하는 bundle 에 이상이 생겼다고 판단하였다.

# 해결 시도 - bundle 캐시 제거

에러 메시지를 자세히 읽지 않고 bundle의 버전이나 캐시 문제라고 생각했다.

재빌드를 시도해보고 (실패)

deploy.yml 파일에서 bundler 관련 설정을 찾아 수정해보았다.

```bash
jobs:
  build:
    ...
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.3
          bundler-cache: false # true에서 수정
          
>>>
bundler: command not found: jekyll
Install missing gem executables with `bundle install`
Error: Process completed with exit code 127.
```

아예 bundler 설치를 하지 않아 커맨드를 찾을 수 없다는 메시지를 받았다.

# 해결 - Platforms 에 운영체제 추가

> 에러가 나면 우선 메시지를 잘 보자

메시지를 다시 읽어보면, 해결방법을 제시해주고 있다.

```bash
Your bundle only supports platforms ["x64-mingw-ucrt", "x86_64-darwin-23"] but
your local platform is x86_64-linux. Add the current platform to the lockfile
with `bundle lock --add-platform x86_64-linux` and try again.

>>>
너의 bundle에 명시된 운영체제와 다른 환경에서 빌드를 시도하고 있다.
원하는 platform 을 lockfile에 추가한 후 다시 시도하라.
```

Gemfile.lock 에 빌드 환경인 리눅스를 추가하고, 빌드와 배포 성공.

```gemfile
PLATFORMS
  x64-mingw-ucrt
  x86_64-darwin-23
  x86_64-linux
```
