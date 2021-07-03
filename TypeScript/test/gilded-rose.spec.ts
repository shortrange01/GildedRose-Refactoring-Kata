import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', () => {
    it('Gilded Rose クラスにアイテムを追加できる', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
        expect(gildedRose.items[0].name).to.equal('foo');
        expect(gildedRose.items[0].sellIn).to.equal(10);
        expect(gildedRose.items[0].quality).to.equal(20);
    });

    it('Gilded Rose クラスにアイテムを追加して日をまたぐとsellInとqualityが1減少する', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(19);
    });

    it('qualityは負数にならない', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    describe('Sulfuras', () => {
        it('Quality 値は常に 80', () => {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
            gildedRose.updateQuality();
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(80);
        });
        it('SellIn は変化しない', () => {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 3, 80)]);
            gildedRose.updateQuality();
            const item = gildedRose.updateQuality();
            expect(item[0].sellIn).to.equal(3);
        });
    });

    describe('Aged Brie', () => {
        it('日が経つほど Quality 値が上がる, SellIn は下がる', () => {
            const gildedRose = new GildedRose([new Item('Aged Brie', 3, 10)]);
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(11);
            expect(item[0].sellIn).to.equal(2);
        });

        it('Quality 値は 50 がmax', () => {
            const gildedRose = new GildedRose([new Item('Aged Brie', 3, 48)]);
            // 10日経過させる
            for (let i = 0; i < 10; i += 1) {
                gildedRose.updateQuality();
            }
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(50);
        });
    });

    describe('Backstage passes', () => {
        it('SellIn が 10 を越える場合 Quality 値が 1 上がる, SellIn は下がる', () => {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)]);
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(11);
        });

        it('SellIn が 10 以内の場合 Quality 値が 2 上がる, SellIn は下がる', () => {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(12);
            expect(item[0].sellIn).to.equal(9);

            const gildedRose2 = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)]);
            const item2 = gildedRose2.updateQuality();
            expect(item2[0].quality).to.equal(12);
            expect(item2[0].sellIn).to.equal(5);
        });

        it('SellIn が 5 以内の場合 Quality 値が 3 上がる, SellIn は下がる', () => {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(13);
            expect(item[0].sellIn).to.equal(4);
        });

        it('SellIn が マイナスの場合 Quality 値は 0 になる, SellIn は下がる', () => {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 10)]);
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(0);
            expect(item[0].sellIn).to.equal(-2);
        });
    });

    describe('サプライヤー"Conjured"', () => {
        it('1日経過すると Quality が 2 下がる', () => {
            const gildedRose = new GildedRose([new Item('Conjured', 1, 20)]);
            // 3日経過させる
            for (let i = 0; i < 3; i += 1) {
                gildedRose.updateQuality();
            }
            const item = gildedRose.updateQuality();
            expect(item[0].quality).to.equal(6);
            expect(item[0].sellIn).to.equal(-3);
        });
    });
});
