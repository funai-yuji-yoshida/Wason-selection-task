import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ウェイソン選択課題',
  description: '4枚カード問題で論理的思考力をテストしよう',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
