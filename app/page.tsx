'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';

export const dynamic = 'force-dynamic';

const CARDS = [
  { front: 'E', back: '4', needsCheck: true },  // 母音→裏が偶数か確認必要
  { front: 'K', back: '7', needsCheck: false }, // 子音→確認不要
  { front: '4', back: 'E', needsCheck: true },  // 偶数→裏が母音か確認必要
  { front: '7', back: 'K', needsCheck: false }, // 奇数→確認不要
];

export default function HomePage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCardClick = (index: number) => {
    if (showResult) return;

    setSelectedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedCards([]);
    setShowResult(false);
    setShowExplanation(false);
  };

  const isCorrect = () => {
    const correctIndices = CARDS.map((card, i) => card.needsCheck ? i : -1).filter(i => i !== -1);
    return selectedCards.length === correctIndices.length &&
           selectedCards.every(i => correctIndices.includes(i));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">ウェイソン選択課題</h1>
          <p className="text-xl text-gray-600">4枚カード問題</p>
        </div>

        {/* Rule */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">ルール</h2>
          <p className="text-lg mb-4">
            「<span className="font-bold text-blue-600">カードの片面が偶数ならば、もう片面は母音である</span>」
          </p>
          <p className="text-gray-700">
            このルールが正しいかどうかを確認するために、
            <span className="font-bold">どのカードを裏返す必要がありますか？</span>
          </p>
        </div>

        {/* Cards */}
        <div className="flex justify-center gap-6 mb-8">
          {CARDS.map((card, index) => (
            <Card
              key={index}
              value={card.front}
              backValue={card.back}
              isSelected={selectedCards.includes(index)}
              isRevealed={showResult}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Selection Info */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {selectedCards.length === 0
              ? 'カードをクリックして選択してください'
              : `${selectedCards.length}枚のカードを選択中`}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {!showResult ? (
            <>
              <button
                onClick={handleSubmit}
                disabled={selectedCards.length === 0}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                         hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                回答する
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
              >
                リセット
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              もう一度挑戦
            </button>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className={`rounded-lg shadow-md p-6 mb-8 ${
            isCorrect() ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            <h2 className="text-2xl font-bold mb-4">
              {isCorrect() ? '✅ 正解です！' : '❌ 不正解です'}
            </h2>
            <p className="text-lg mb-4">
              正解は：<span className="font-bold">Eと4のカード</span>を裏返す
            </p>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-blue-600 hover:underline font-medium"
            >
              {showExplanation ? '解説を閉じる' : '解説を見る'}
            </button>
          </div>
        )}

        {/* Explanation */}
        {showResult && showExplanation && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">解説</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">✅ Eのカード（母音）</h3>
                <p className="text-gray-700">
                  ルールは「偶数→母音」です。Eは母音なので、裏が偶数でなければルール違反にはなりません。
                  しかし、もし表が母音なら裏が偶数でなければならないという逆のケースを確認するために、
                  実際には<span className="font-bold">裏が偶数であることを確認する必要があります</span>。
                  裏が「4」（偶数）なので、ルールに適合しています。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">❌ Kのカード（子音）</h3>
                <p className="text-gray-700">
                  Kは子音なので、ルールには関係ありません。裏が何であっても、
                  ルールの正しさには影響しないため、確認する必要はありません。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">✅ 4のカード（偶数）</h3>
                <p className="text-gray-700">
                  ルールは「偶数→母音」なので、4の裏は母音でなければなりません。
                  裏を確認して、母音（E）であることを確認する必要があります。
                  実際に裏は「E」なので、ルールに適合しています。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">❌ 7のカード（奇数）</h3>
                <p className="text-gray-700">
                  7は奇数なので、ルールには関係ありません。
                  「偶数→母音」というルールは、奇数については何も言っていないため、
                  確認する必要はありません。
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h3 className="text-xl font-bold mb-2">なぜ難しいのか？</h3>
                <p className="text-gray-700">
                  多くの人は「Eと4」ではなく「EとK」や「Eだけ」を選んでしまいます。
                  これは、ルールを「母音⇔偶数」と誤解してしまうためです。
                  実際のルールは「偶数→母音」という一方向の条件文なので、
                  偶数の裏が母音であることを確認する必要があります。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
