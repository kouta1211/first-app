<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

## 学習記録アプリ

タイトルと学習時間から成る学習記録を確認、新規登録、削除できるアプリケーション

<!-- プロジェクトについて -->

## プロジェクトについて

//////

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 16.17.0    |
| React                | 18.2.0     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
.
├── .devcontainer
│ └── devcontainer.json
├── .env
├── .github
│ ├── action
│ ├── release-drafter.yml
│ └── workflows
├── .gitignore
├── Makefile
├── README.md
├── backend
│ ├── .vscode
│ ├── application
│ ├── docs
│ ├── manage.py
│ ├── output
│ ├── poetry.lock
│ ├── project
│ └── pyproject.toml
├── containers
│ ├── django
│ ├── front
│ ├── mysql
│ └── nginx
├── docker-compose.yml
├── frontend
│ ├── .gitignore
│ ├── README.md
│ ├── **test**
│ ├── components
│ ├── features
│ ├── next-env.d.ts
│ ├── package-lock.json
│ ├── package.json
│ ├── pages
│ ├── postcss.config.js
│ ├── public
│ ├── styles
│ ├── tailwind.config.js
│ └── tsconfig.json
└── infra
├── .gitignore
├── docker-compose.yml
├── main.tf
├── network.tf
└── variables.tf

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

自身のQiita記事を参考に構築

### 動作確認

https://first-app-ten-smoky.vercel.app/ にアクセスできるか確認
アクセスできたら成功

<p align="right">(<a href="#top">トップへ</a>)</p>
