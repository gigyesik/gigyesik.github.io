---
layout: post
title: (ruby) There are no versions of google-protobuf (>= 3.25, < 5.0) compatible with your Ruby & RubyGems.
date: 2024-06-11 15:00 +0900
categories: [trouble-shooting, ruby]
tag: [trouble shooting, ruby, rubygems, rbenv]
---

# 발생 상황

- Windows PC로 빌드해본 Jekyll 소스를 Mac으로 로컬 빌드 시도
- [Ruby 가이드 문서][ruby-guide] 를 참고하여 Ruby, RubyGems, GCC 설치 상태 확인 완료
- Jekyll 설치를 위해 커맨드 입력 → 버전 오류 발생

```bash
$ sudo gem install jekyll bundler

ERROR:  Error installing jekyll:
  There are no versions of google-protobuf (>= 3.25, < 5.0) compatible with your Ruby & RubyGems. Maybe try installing an older version of the gem you're looking for?
  google-protobuf requires Ruby version >= 3.0, < 3.4.dev. The current ruby version is 2.6.10.210.

```

# 에러 해석

- 현재 사용중인 Ruby 버전은 v2.6.1이다.
- Ruby 최신 버전에는 google-protobuf 라는 하위 패키지가 포함된다.
- 하위 패키지 설치를 위해서는 Ruby v3.0 이상이 필요하다.

# 해결 시도

## Ruby update - 실패

```bash
// 최신 Ruby 설치 -> 완료
$ brew install ruby

// 업그레이드 시도
$ brew upgrade ruby

Warning: ruby 3.3.1 already installed

// 버전 확인
$ ruby -v

ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.x86_64-darwin23]
```

Ruby 최신버전이 설치되었지만, 사용중인 버전을 대체하지 못했다.

## Ruby 삭제 후 재설치 - 실패

```bash
// Ruby 제거 시도
$ brew uninstall ruby

Error: Refusing to uninstall /usr/local/Cellar/ruby/3.3.1
because it is required by cocoapods, which is currently installed.

// cocoapods 가 사용중. cocoapods 제거 -> 완료
$ brew uninstall cocoapods

// 다시 Ruby 제거 시도 -> 완료
$ brew uninstall ruby

// 버전 확인
$ ruby -v

ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.x86_64-darwin23]
```

설치되었던 v3.3.1 이 제거되었고, v2.6.10 버전은 여전히 남아있다.

## rbenv 를 통해 버전 변경 - 실패

rbenv는 Ruby 사용환경을 관리해주는 패키지이다. (Ruby Environment)

```bash
// rbenv 설치 -> 완료
$ brew install rbenv

// 설치 가능한 Ruby 버전 리스트 확인
$ rbenv install -l

// 최신 LTS 버전 (3.3.1) 설치 -> 완료
$ rbenv install 3.3.1

// Ruby 사용 버전 변경
$ rbenv global 3.3.1

// 버전 확인
$ ruby -v

ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.x86_64-darwin23]
```

v2.6.10 은 사라지지 않는다.

# 해결 - 환경변수 변경

설치된 Ruby의 환경변수 경로를 강제로 변경해준다.

```bash
// rbenv 에 설치된 버전 확인
$ rbenv versions

* 3.3.1

// ruby 설치 경로 확인
$ which ruby

/usr/bin/ruby

// rbenv 설치 버전 init
$ rbenv init

# Load rbenv automatically by appending
# the following to ~/.zshrc:

eval "$(rbenv init - zsh)"

// 환경변수 파일에 붙여넣기 -> 성공
$ sudo vim ~/.zshrc

// 터미널 재실행 후 버전 확인
$ ruby -v

ruby 3.3.1 (2024-04-23 revision c56cd86388) [x86_64-darwin23]

// 설치 경로 확인
$ which ruby

/Users/gigyesik/.rbenv/shims/ruby
```

최신 버전의 Ruby로 변경 성공.

[ruby-guide]: https://www.ruby-lang.org/en/documentation/installation/#homebrew
