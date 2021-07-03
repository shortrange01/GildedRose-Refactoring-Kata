# チーム・ギルドローズ(小さな宿)

## 概要

-   商品の仕入れ販売
-   商品は販売期限が近づくと品質が低下する
-   在庫を更新するシステムの回収

## 仕様

-   すべてのアイテムには、販売するための残り日数（販売期限）を示す SellIn 値がある
-   すべてのアイテムには、価値を示す Quality 値がある
-   Quality 値: (min)0 ~ 50(max)
-   毎日の終わりに、システムは SellIn, Quality の項目の値を 1 小さくする
-   販売するための残り日数が無くなると、Quality 値は 2 小さくなる

### 特殊なアイテム

-   "Aged Brie"は、日が経つほど Quality 値が上がる
-   "Backstage passes"は、日が経つほど Quality 値が上がる
-   "Backstage passes"は、10 日以内になると毎日 Quality 値が 2 上がる
-   "Backstage passes"は、5 日以内になると毎日 Quality 値が 3 上がる
-   "Backstage passes"は、コンサート終了後には Quality 値が 0 になる
-   "Sulfuras"は伝説のアイテムなので、販売されたり、Quality 値が低下したりすることはありません。
-   "Sulfuras "は伝説のアイテムであるため、Quality 値は 80 であり、Quality 値が変わることはありません。

## 改修要件

-   新しいカテゴリーのアイテムを販売できるようにする
-   アイテムのサプライヤー"Conjured"のアイテムは、通常のアイテムの 2 倍の速さで Quality が下がる。

## 条件

-   UpdateQuality メソッドに追記、変更は自由
-   Item クラスや Items プロパティは変更禁止
-   UpdateQuality メソッドと Items プロパティを静的にしてもよい

## TODO List

[ ] 毎日の終わりに、システムは SellIn, Quality の項目の値を 1 小さくする
[ ] 販売するための残り日数が無くなると、Quality 値は 2 小さくなる
[ ] "Sulfuras" は updateQuality() で処理せず早期リターン

-   TEST
    -   "Aged Brie"
        -   [x] 日が経つほど Quality 値が上がる
        -   [x] Quality は max 50
    -   "Backstage passes"
        -   [x] SellIn が 10 を越える場合 Quality 値が 1 上がる
        -   [x] SellIn が 10 以内の場合 Quality 値が 2 上がる
        -   [x] SellIn が 5 以内の場合 Quality 値が 3 上がる
        -   [x] SellIn が マイナスの場合 Quality 値は 0 になる
    -   "Sulfuras"
        -   [x] 常に Quality 値 80
    -   サプライヤー"Conjured"
        -   [x] 通常のアイテムの 2 倍の速さで Quality が下がる

## 仕様不明点

-   コンサート終了の定義がない
-   "Sulfuras" は「販売されることがない」とあるが SellIn 値の必要性（変動）はあるのか？
-   特殊アイテムやサプライヤー "Conjured" は名前でしか判別できない（Item クラスの変更禁止のため）
-   「販売するための残り日数が無くなると、Quality 値は 2 小さくなる」 "Sulfuras" は？ 売れ残りの場合は下がり続ける？

### 不明点を仮の仕様で実装する

-   コンサート終了の定義がない
    -   販売終了日をコンサート終了日とする
-   "Sulfuras" は「販売されることがない」とあるが SellIn 値の必要性（変動）はあるのか？
    -   SellIn 値は通常アイテムと同じ仕様とする
-   特殊アイテムやサプライヤー "Conjured" は名前でしか判別できない（Item クラスの変更禁止のため）
    -   名前に含まれるか含まれないかで判別する
-   「販売するための残り日数が無くなると、Quality 値は 2 小さくなる」 "Sulfuras" は？ 売れ残りの場合は下がり続ける？
    -   "Sulfuras" は下げない。 売れ残りの場合は 0 になるまで下げ続ける
