---
title: 과최적화
aliases: [오버피팅, 과적합]
summary: 백테스트에서 규칙의 숫자를 과거 데이터에 계속 맞춰 보며 가장 잘 나온 것을 고르다가, 그 기간의 우연까지 외운 규칙이 되는 것. 과거 결과는 좋지만 처음 보는 기간에서는 잘 안 맞는다. 고른 숫자를 조금 바꾼 이웃 값의 결과가 크게 다르면 의심한다. 치킨집 2025년 일봉에서 "6% 떨어지면 사고 15% 오르면 판다"는 +30%였지만 5%는 +1%, 7%는 -2%였고, 고를 때 안 본 2026년 1-6월에는 -5%였다. 그래서 숫자는 한 기간에서 고르고, 고르는 데 쓰지 않은 다른 기간으로 한 번만 확인한다.
related: [chicken-shop, backtest, survivorship-bias, daily-candle, return-rate]
parent: backtest
order: 1340
status: published
updated: 2026-11-15
---
