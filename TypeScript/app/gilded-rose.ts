export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn; //販売期限日数
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Item[] {
        this.items.forEach((item: Item) => {
            // Sulfurasは何も変更せずに早期リターン
            if (item.name === 'Sulfuras, Hand of Ragnaros') return;

            if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.quality < 50) {
                        if (item.sellIn < 11) item.quality = item.quality + 1;
                        if (item.sellIn < 6 && item.quality < 50) item.quality = item.quality + 1;
                    }
                }
            } else {
                if (item.quality > 0) {
                    item.quality = item.quality - 1;
                    if (item.name === 'Conjured' && item.quality > 0) item.quality = item.quality - 1;
                }
            }

            // 販売期間を1減少させる
            item.sellIn = item.sellIn - 1;

            if (item.sellIn >= 0) return;

            // [begin] 販売期限を過ぎた場合は、Quality 値をさらに増減させる
            if (item.name === 'Aged Brie') {
                if (item.quality >= 50) return;
                item.quality = item.quality + 1;
                return;
            }

            // Backstage passes は販売期間が過ぎると0になる
            if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                item.quality = 0;
                return;
            }

            if (item.quality <= 0) return;

            item.quality = item.quality - 1;
            if (item.name === 'Conjured' && item.quality > 0) item.quality = item.quality - 1;
            // [end] 販売期限を過ぎた場合は、Quality 値をさらに減少させる
        });

        return this.items;
    }
}
