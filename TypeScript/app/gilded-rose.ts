const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

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
            switch(item.name) {
                case 'Sulfuras, Hand of Ragnaros':
                    break;
                case 'Aged Brie':
                    item = this.updateAgedBrie(item);
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    item = this.updateBackstagePasses(item);
                    break;
                default:
                    if(item.quality <= MIN_QUALITY) {
                        item.sellIn = item.sellIn - 1;
                        break;
                    }
                    item = this.updateOtherItem(item);
                    break;
            }
        });

        return this.items;
    }

    updateAgedBrie(item: Item): Item {

        item.quality = this.incrementQuality(item.quality);

        // 販売期間を1減少させる
        item.sellIn = item.sellIn - 1;

        return item;
    }

    updateBackstagePasses(item: Item): Item {

        item.quality = this.incrementQuality(item.quality);

        if (item.sellIn < 11) item.quality = this.incrementQuality(item.quality);
        if (item.sellIn < 6) item.quality = this.incrementQuality(item.quality);

        // 販売期間を1減少させる
        item.sellIn = item.sellIn - 1;

        // Backstage passes は販売期間が過ぎるとqualityが0になる
        if (item.sellIn < 0)  item.quality = MIN_QUALITY;

        return item;
    }

    updateOtherItem(item: Item): Item {
            
        item.quality = item.quality - 1;

        // サブプライヤーの商品はさらにqualityを減算する
        if (item.name === 'Conjured') item.quality = this.decrementQuality(item.quality);
        
        // 販売期間を1減少させる
        item.sellIn = item.sellIn - 1;

        // 販売期間中またはqualityが0の場合は処理終了
        if (item.sellIn >= 0 || item.quality <= MIN_QUALITY) return item;

        // 販売期限を過ぎた場合は、Quality 値をさらに増減させる
        item.quality = this.decrementQuality(item.quality);

        // サブプライヤーの商品はさらにqualityを減算する
        if (item.name === 'Conjured') item.quality = this.decrementQuality(item.quality);

        return item;
    }

    incrementQuality(quality: number): number {
        return quality < MAX_QUALITY ? quality + 1 : quality;
    }

    decrementQuality(quality: number): number {
        return quality > MIN_QUALITY ? quality - 1 : quality;
    }
}
