# Webサイト制作 依頼用サイト（スターター）

静的な1ページ構成（日本語）の依頼受付サイトです。サービス紹介、流れ、実績、料金、FAQ、問い合わせフォームを含みます。

## 使い方

1. プロジェクトを開き、`index.html` をブラウザで開きます。
2. 受信先メールアドレスを変更します：
   - `assets/js/main.js` の `CONTACT_EMAIL` をあなたのアドレスに変更。
3. 文言・価格・実績などを編集します：
   - `index.html` の各セクション（サービス/料金/FAQ/実績など）。
   - デザインは `assets/css/styles.css` を調整。

## 問い合わせフォームについて

現状はメールアプリを起動する `mailto:` 方式です。より確実な送信/自動返信が必要な場合は以下いずれかをご検討ください。

- フォームサービス: Formspree / Basin / Netlify Forms などのエンドポイントにPOST
- Google フォーム埋め込み
- 独自バックエンド(API)を用意（Node/Python/PHP等）し、メール送信（SendGridなど）

## デプロイ

静的ホスティングでOKです。

- GitHub Pages / Cloudflare Pages / Netlify / Vercel のいずれかで `index.html` を公開

## ライセンス

商用/個人問わず自由に改変・利用可（クレジット不要）。

