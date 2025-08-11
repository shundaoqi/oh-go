# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# おごり自販機管理アプリ 要件定義書

## 1. プロジェクト概要

### 1.1 背景・目的
- 職場内でのコミュニケーションのきっかけ作りのためのサービス「おごり自販機」の利用状況を効率的に管理する
- 従業員が朝出勤時に、誰がすでにタッチしているのかを確認する負担を軽減する
- 自分がタッチするときに、誰とタッチできるのかをその人に聞かずとも分かるようにする

### 1.2 おごり自販機の制約
- カードタッチできるのは一人一本まで（1日1回制限：全自販機共通）
- 同じ人とタッチできるのは一週間に一回のみ（自販機によって有無が異なる）

## 2. アプリケーション仕様

### 2.1 アーキテクチャ
- **SPAアプリケーション** として実装
- **feature-base構成** でディレクトリ構成を採用
- 基本的に **1画面=1feature** で分割

### 2.2 機能要件

#### 2.2.1 ユーザー管理機能
- **ユーザー登録・削除**: ユーザー自身で実行
- **認証機能**: Supabase Authを使用したメール認証（メール認証設定は不要）
- **プロフィール管理**: 本名、ニックネーム、部署、入社年度の管理

#### 2.2.2 利用記録機能
- **手動入力方式**: ユーザーが後からでも利用記録を入力可能（過去1週間前まで、未来日は禁止）
- **記録内容**: 「誰と」「どの自販機で」「いつ」の情報を記録
- **入力方法**: 
  - 1つの画面に全自販機のフォームを表示
  - ユーザーが入力するのは相手名のみ（ドロップダウン選択）
  - 日付はDatePickerで入力（デフォルト：当日、目立たないUI）
- **制約チェック**: 
  - 相手選択時点でリアルタイムチェック
  - 1日1回制限（入力者ベース）
  - 週1回のペア制限（月曜〜日曜）
  - エラーメッセージは入力エリアの下に表示
- **データ重複**: 複数人による同一記録の入力を許容（表示時にまとめる）

#### 2.2.3 利用状況確認機能
- **利用状況表示**: 別ページで利用状況確認
- **表示内容**: 誰とどの自販機でタッチしたのかを利用者一覧で表示

#### 2.2.4 履歴確認機能
- **個人履歴のみ**: 過去7日間まで表示

#### 2.2.5 管理機能
- **タッチ記録の管理**: 利用記録の削除・キャンセル機能
- **権限**: 利用記録の入力者および管理者がキャンセル可能

## 3. 技術仕様

### 3.1 技術スタック
- **フロントエンド**: React + Next.js (App Router) + TypeScript
- **UIライブラリ**: TailwindCSS + MUI
  - MUI：フォーム部品、モーダル
  - Tailwind：レイアウト、カスタムスタイル
- **状態管理**: Jotai
- **BaaS**: Supabase
- **ORM**: Prisma
- **テスト**: Jest + React Testing Library
- **デプロイ**: Vercel
- **Linter**: ESLint
- **型安全性**: Prismaによる型生成

### 3.2 開発コマンド
- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## 4. データベース設計

### 4.1 テーブル設計

#### 4.1.1 departments（部署マスタ）
```sql
- id: UUID (Primary Key)
- name: TEXT (部署名) # 例：ITプロダクト推進部
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 4.1.2 vending_machines（自販機マスタ）
```sql
- id: UUID (Primary Key)
- name: TEXT (自販機名) # 例：浜松町10階
- weekly_pair_limit: BOOLEAN (週1回制限の有無)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 4.1.3 user_profiles（ユーザープロフィール）
```sql
- id: UUID (Primary Key, Supabase auth.usersと連携)
- first_name: TEXT (名)
- last_name: TEXT (姓)
- nickname: TEXT (ニックネーム)
- department_id: UUID (Foreign Key → departments.id)
- hire_year: INTEGER (入社年度)
- is_active: BOOLEAN (退職者管理用)
- is_admin: BOOLEAN (管理者フラグ)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 4.1.4 usage_records（利用記録）
```sql
- id: UUID (Primary Key)
- input_user_id: UUID (Foreign Key → user_profiles.id) # 入力者
- partner_user_id: UUID (Foreign Key → user_profiles.id) # 相手
- vending_machine_id: UUID (Foreign Key → vending_machines.id)
- used_date: DATE # 利用日
- status: TEXT ('active', 'cancelled')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 4.2 インデックス設計
- `usage_records(input_user_id, used_date)` - 制約チェック用
- `usage_records(partner_user_id, used_date)` - 制約チェック用
- `usage_records(used_date)` - 利用状況表示用

## 5. ディレクトリ構成

```
oh-go/
├── prisma/                      # Prismaスキーマとマイグレーション
├── mocks/bff/handlers/          # API モック
├── public/static/               # 静的ファイル
└── src/
    ├── features/                # 機能別ディレクトリ
    │   ├── auth/               # 認証機能
    │   ├── dashboard/          # メイン画面（記録入力）
    │   ├── status/             # 利用状況確認
    │   ├── history/            # 個人履歴
    │   └── profile/            # プロフィール管理
    ├── pages/                  # SPAルーティング
    ├── shared/                 # 共通機能
    │   ├── api/bff/           # API設定
    │   ├── config/            # 設定
    │   ├── lib/               # ライブラリ設定
    │   ├── store/             # グローバル状態
    │   └── ui/                # 共通UIコンポーネント
    └── utils/                 # ユーティリティ関数
```

### 5.1 各featureの構成
```
features/[feature]/
├── index.ts                    # feature のエクスポート
├── api/                        # API呼び出しロジック
├── model/                      # ビジネスロジック・型定義・カスタムフック
│   ├── [model-module].ts
│   └── [model-module].test.ts
├── store/                      # 状態管理（Jotai atoms）
└── ui/                         # UI コンポーネント
    ├── organisms/              # ドメイン特化コンポーネント（ビジネスロジック連携）
    ├── [component-name].tsx
    └── [component-name].test.tsx
```

### 5.2 共通UI構成（Atomic Design）
```
shared/ui/
├── atoms/                      # 最小単位、ロジック無し、完全ステートレス
│   ├── Button/
│   ├── Input/
│   └── Label/
├── molecules/                  # UI制御ロジック有り、システム全体で再利用可能
│   ├── Dropdown/              # 開閉・検索などのUI制御
│   ├── FormField/             # バリデーション表示・フォーカス制御
│   └── Modal/                 # モーダル開閉制御
└── organisms/                  # ビジネスロジック統合、ドメイン情報を持つ
    ├── Header/
    └── Layout/
```

## 6. 画面構成

### 6.1 認証画面
- ログイン画面
- 新規登録画面

### 6.2 メイン機能
- **ダッシュボード**: 利用記録入力フォーム（ログイン後の初期画面）
- **利用状況確認**: 今日の利用状況一覧
- **個人履歴**: 過去7日間の個人利用履歴
- **プロフィール**: 個人情報管理

## 7. 制約・前提条件

### 7.1 制約事項
- Row Level Security (RLS) は設定しない
- 日付入力範囲：過去1週間前まで、未来日は禁止
- 制約違反チェック：リアルタイムで実行

### 7.2 運用前提
- 初期ユーザー登録：各自で登録
- 管理者権限：user_profiles.is_admin フラグで制御
- データバックアップ：Supabaseの標準機能を利用

## 8. Next.js ベストプラクティス

### 8.1 App Router パターン
- **Server Components優先**: デフォルトでServer Componentsを使用し、必要な場合のみ`"use client"`を使用
- **ページ構成**: SPAのため`src/app/page.tsx`をエントリーポイントとし、実際のページは`src/pages/`に配置
- **レイアウト**: 共通レイアウトは`src/shared/ui/layout/Layout.tsx`で管理
- **メタデータ**: 各ページでMetadata APIを活用してSEO対応

### 8.2 パフォーマンス最適化
- **Dynamic Import**: 重いコンポーネントは動的インポートでコード分割
- **Image最適化**: `next/image`を使用した画像最適化
- **Font最適化**: `next/font`を使用したWebフォント最適化
- **Turbopack**: 開発時は`--turbopack`フラグでビルド高速化

### 8.3 型安全性
- **TypeScript strict mode**: `tsconfig.json`でstrict: trueを設定
- **Path aliases**: `@/*`エイリアスで相対パス削減
- **API型安全性**: Prismaで自動生成された型を活用

### 8.4 状態管理
- **Jotai atoms**: featureごとにatomを分離し、共通状態のみ`src/shared/store/`で管理
- **Server State**: データフェッチには適切なキャッシング戦略を適用

## 9. Supabase ベストプラクティス

### 9.1 認証
- **Client-side認証**: `@supabase/auth-helpers-nextjs`でNext.jsとの統合
- **セッション管理**: Server ComponentsでもClient Componentsでも適切にセッション取得
- **型安全な認証**: 認証状態を型安全に管理

```typescript
// 例：認証フック
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    
    return () => authListener.subscription.unsubscribe()
  }, [])
  
  return { user, loading }
}
```

### 9.2 データベース操作
- **Prisma統合**: Supabase PostgreSQLをPrismaで管理
- **型安全なクエリ**: Prismaの型生成機能を活用
- **エラーハンドリング**: 適切なエラーハンドリングでUX向上

```typescript
// 例：型安全なデータ取得
const getUsageRecords = async (userId: string): Promise<UsageRecord[]> => {
  try {
    const records = await prisma.usageRecords.findMany({
      where: { 
        OR: [
          { inputUserId: userId },
          { partnerUserId: userId }
        ],
        status: 'active'
      },
      include: {
        inputUser: true,
        partnerUser: true,
        vendingMachine: true
      }
    })
    return records
  } catch (error) {
    console.error('Failed to fetch usage records:', error)
    throw new Error('利用記録の取得に失敗しました')
  }
}
```

### 9.3 リアルタイム機能
- **Realtime subscriptions**: 必要に応じてリアルタイム更新を実装
- **適切な購読管理**: useEffectでの適切なクリーンアップ

### 9.4 セキュリティ
- **環境変数管理**: `.env.local`でSupabase認証情報を管理
- **API Keys**: 適切にPublic/Anonキーを使い分け
- **Row Level Security**: 今回は使用しないが、将来の拡張で検討

## 10. 開発ガイドライン

### 10.1 UIとロジックの分離（Atomic Design）

#### 10.1.1 責務分担
- **Atoms（共通UI）**: ロジック無し、propsのみ依存、完全ステートレス
- **Molecules（共通UI）**: **UI制御ロジック**（開閉状態、フォーカス、検索、バリデーション表示など）
- **Organisms（feature UI）**: **ビジネスロジック連携**（API呼び出し、業務制約、状態管理統合）
- **Model層（feature）**: **ビジネスロジック**（データ変換、業務ルール、API処理）

#### 10.1.2 実装パターン
```typescript
// ❌ 悪い例：UI制御ロジックがmodel層にある
// model/use-form.ts - ここにUI制御ロジックを書かない
const useForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // NG
  const [businessData, setBusinessData] = useState([])        // OK
}

// ✅ 良い例：適切な分離
// shared/ui/molecules/Dropdown.tsx - UI制御ロジック
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)     // UI制御ロジック
  const [searchTerm, setSearchTerm] = useState('') // UI制御ロジック
}

// features/usage/model/use-usage.ts - ビジネスロジック
const useUsage = () => {
  const validateBusinessRule = () => {...}        // ビジネスロジック
  const fetchUsageData = () => {...}              // ビジネスロジック
}
```

### 10.2 コーディング規約
- **命名規則**: 
  - コンポーネント: PascalCase (`UserProfile`)
  - ファイル: kebab-case (`user-profile.tsx`)
  - 関数・変数: camelCase (`getUserProfile`)
- **インポート順序**: 外部ライブラリ → 内部モジュール → 相対インポート

### 10.3 エラーハンドリング
- **ユーザー向けエラー**: 分かりやすいエラーメッセージを表示
- **開発者向けログ**: console.errorで詳細なエラー情報をログ出力
- **エラーバウンダリ**: React Error Boundaryで予期しないエラーをキャッチ

### 10.4 テスト戦略
- **単体テスト**: 各feature内でビジネスロジックをテスト
- **コンポーネントテスト**: React Testing Libraryでユーザーインタラクションをテスト
- **API テスト**: MSWでAPIモックを作成してテスト

### 10.5 パフォーマンス考慮事項
- **レンダリング最適化**: React.memoやuseMemoを適切に使用
- **バンドルサイズ**: 不要なライブラリのインポートを避ける
- **データベースクエリ**: N+1問題を避けるためのinclude/selectの適切な使用

## 11. TODO管理

各チケットファイル内でのTODO管理は以下の形式で記載：
- `[ ]`: 未完了のタスク
- `[x]`: 完了済みのタスク

### 開発チケット一覧

#### Phase 1: 基盤構築
- [ ] [01. 開発環境セットアップ](./docs/01_environment-setup.md)
- [ ] [02. データベース設計・構築](./docs/02_database-design.md)
- [ ] [03. 認証システム](./docs/03_auth-system.md)

#### Phase 2: 共通機能
- [ ] [04. 共通コンポーネント・レイアウト](./docs/04_shared-components.md)
- [ ] [05. プロフィール管理機能](./docs/05_profile-management.md)

#### Phase 3: メイン機能
- [ ] [06. 利用記録入力機能（メイン機能）](./docs/06_usage-record-input.md)
- [ ] [07. 利用状況確認機能](./docs/07_usage-status-display.md)
- [ ] [08. 個人履歴機能](./docs/08_personal-history.md)

#### Phase 4: 統合・デプロイ
- [ ] [09. SPAルーティング・ナビゲーション](./docs/09_spa-routing.md)
- [ ] [10. テスト・デプロイ](./docs/10_testing-deployment.md)

### 推奨開発順序
1. **Phase 1**: 01 → 02 → 03（基盤となる環境・認証・DB）
2. **Phase 2**: 04 → 05（共通機能・プロフィール）
3. **Phase 3**: 06 → 07 → 08（メイン機能群）
4. **Phase 4**: 09 → 10（統合・デプロイ）

---

**作成日**: 2025年8月10日  
**最終更新**: 2025年8月10日  
**バージョン**: 2.0