'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';

export const dynamic = 'force-dynamic';

type Version = 'abstract' | 'concrete';

const ABSTRACT_CARDS = [
  { front: 'E', back: '4', needsCheck: true },
  { front: 'K', back: '7', needsCheck: false },
  { front: '4', back: 'E', needsCheck: true },
  { front: '7', back: 'K', needsCheck: false },
];

const CONCRETE_CARDS = [
  { front: 'ビール', back: '25歳', needsCheck: true },
  { front: 'ジュース', back: '17歳', needsCheck: false },
  { front: '25歳', back: 'ビール', needsCheck: false },
  { front: '17歳', back: 'ジュース', needsCheck: true },
];

export default function HomePage() {
  const [version, setVersion] = useState<Version>('abstract');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const CARDS = version === 'abstract' ? ABSTRACT_CARDS : CONCRETE_CARDS;

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

  const handleVersionChange = (newVersion: Version) => {
    setVersion(newVersion);
    setSelectedCards([]);
    setShowResult(false);
    setShowExplanation(false);
  };

  const isCorrect = () => {
    const correctIndices = CARDS.map((card, i) => card.needsCheck ? i : -1).filter(i => i !== -1);
    return selectedCards.length === correctIndices.length &&
           selectedCards.every(i => correctIndices.includes(i));
  };

  const getCorrectAnswer = () => {
    if (version === 'abstract') {
      return 'Eと4のカード';
    }
    return 'ビールと17歳のカード';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">ウェイソン選択課題</h1>
          <p className="text-xl text-gray-600">4枚カード問題</p>
        </div>

        {/* Version Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleVersionChange('abstract')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              version === 'abstract'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            抽象版（難しい）
          </button>
          <button
            onClick={() => handleVersionChange('concrete')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              version === 'concrete'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            日常版（簡単）
          </button>
        </div>

        {/* Rule */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">ルール</h2>
          {version === 'abstract' ? (
            <>
              <p className="text-lg mb-4">
                「<span className="font-bold text-blue-600">カードの片面が偶数ならば、もう片面は母音である</span>」
              </p>
              <p className="text-gray-700">
                このルールが正しいかどうかを確認するために、
                <span className="font-bold">どのカードを裏返す必要がありますか？</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-lg mb-4">
                「<span className="font-bold text-blue-600">ビールを飲んでいる人は20歳以上でなければならない</span>」
              </p>
              <p className="text-gray-700">
                このルールが守られているかどうかを確認するために、
                <span className="font-bold">どのカードを裏返す必要がありますか？</span>
              </p>
            </>
          )}
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
              正解は：<span className="font-bold">{getCorrectAnswer()}</span>を裏返す
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">解説</h2>

            {version === 'abstract' ? (
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
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">✅ ビールのカード</h3>
                  <p className="text-gray-700">
                    ビールを飲んでいる人がいます。この人が20歳以上かどうかを確認する必要があります。
                    裏を見ると「25歳」なので、ルールに適合しています。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">❌ ジュースのカード</h3>
                  <p className="text-gray-700">
                    ジュースを飲んでいる人は、何歳でも問題ありません。
                    ルールは「ビールを飲む人は20歳以上」なので、ジュースを飲んでいる人の年齢を確認する必要はありません。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">❌ 25歳のカード</h3>
                  <p className="text-gray-700">
                    25歳の人は成人なので、ビールを飲んでも問題ありません。
                    何を飲んでいるか確認する必要はありません。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">✅ 17歳のカード</h3>
                  <p className="text-gray-700">
                    17歳の人がいます。この人がビールを飲んでいないか確認する必要があります。
                    裏を見ると「ジュース」なので、ルールに適合しています。
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <h3 className="text-xl font-bold mb-2">なぜ日常版は簡単なのか？</h3>
                  <p className="text-gray-700 mb-3">
                    この問題は抽象版（偶数と母音）と論理的には全く同じ構造ですが、
                    日常的な状況（飲酒年齢の確認）だと正答率が大幅に上昇します。
                  </p>
                  <p className="text-gray-700 mb-3">
                    <span className="font-bold">抽象版の正答率：約10%</span><br/>
                    <span className="font-bold">日常版の正答率：約75%</span>
                  </p>
                  <p className="text-gray-700">
                    これは、人間の脳が抽象的な論理よりも、具体的な社会的ルールや
                    経験に基づいた推論を得意としているためです。
                    この現象は「内容効果」と呼ばれています。
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison Note */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">💡 興味深い事実</h2>
          <p className="text-gray-700 mb-3">
            この2つの問題は論理的には全く同じ構造です：
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><span className="font-bold">抽象版</span>：「偶数→母音」というルールの検証（正答率：約10%）</li>
            <li><span className="font-bold">日常版</span>：「ビール→20歳以上」というルールの検証（正答率：約75%）</li>
          </ul>
          <p className="text-gray-700 mt-4">
            同じ論理構造なのに、日常的な文脈だと正答率が<span className="font-bold text-yellow-700">7倍以上</span>になります！
            これは人間が抽象的な論理より、具体的な社会的ルールの方が得意であることを示しています。
          </p>
        </div>
      </div>
    </div>
  );
}
