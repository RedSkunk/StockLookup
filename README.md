<img src="./screenshots/2.png" width="70%">

# Introduction

### What

This project is intended to provide stock symbol autosuggest feature for my other projects. There are pratical reasons why I decided to build a seperate service just to search stock symbol. Please read below.

### Why

There are a few reasons for this project:

1. Turns out, most free stock api that currently available have some form of **rate limiting** on stock symbol search or have other problem

| API  | Rate Limit | Note |
| ------------- | ------------- | ------------- |
| AlphaVantage  | 5 calls/min | Weird API response, paid is 30 calls/min only
| Questrade  | 20 calls/sec | BUT need to manually (non-api) refresh token every 7 days
| Yahoo Finance | Infinite | Breaks term of service
| IEX  | - | Paid only for symbol search, no realtime data
| TD thinkorswim | - | No symbol search
| Google Finance | - | No symbol search
| Finnhub | - | No symbol search
| World trading data | - | No symbol search
| Many others... | - | Either **low rate limit**, or is paid only with disadvantages (e.g. no realtime data)

2. Static frontend search is also not feasible, because stocks are listed and delisted **every day**

In the end, the best way to implement stock symbol autosuggest is to create a simple service

### How

Every day, the list of stocks are fetch directly from nasdaq into our database. This list is then searchable through API calls

This application attempts to compile the list of most dropped course by tracking daily enrolment through the official website.

<img src="./screenshots/1.png" width="70%">
<img src="./screenshots/2.png" width="70%">

# Technology

### Frontend

- React
- JavaScript

### Backend 

- NodeJs 
- Express
- PostgresSQL
- Python (hosted on AWS Lambda)
