# 01. 開発環境セットアップ

## 概要
プロジェクトの開発環境を構築し、必要な依存関係をインストールする。

## 作業内容

### Phase 1: 基本環境構築
- [ ] Supabaseプロジェクトの作成
- [ ] 環境変数の設定（.env.local）
- [ ] 必要なパッケージのインストール

### Phase 2: データベース設定
- [ ] Prismaの初期化
- [ ] データベーススキーマの作成
- [ ] Supabaseとの接続確認
- [ ] 初期マイグレーションの実行

### Phase 3: 開発ツール設定
- [ ] Jestテスト環境の構築
- [ ] ESLint/Prettierの設定
- [ ] VSCode設定ファイルの作成

## 成果物
- [ ] Supabaseプロジェクト
- [ ] `prisma/schema.prisma`
- [ ] `.env.local` (テンプレート)
- [ ] `jest.config.js`
- [ ] 更新された `package.json`

## 受け入れ条件
- [ ] `npm run dev` でアプリケーションが起動する
- [ ] Supabaseへの接続が確認できる
- [ ] `npm run lint` が正常に実行できる
- [ ] `npm test` でテストが実行できる

## 優先度
🔴 High

## 見積もり
2-3時間

## 依存関係
なし