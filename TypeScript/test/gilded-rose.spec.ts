import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('Gilded Rose にアイテムを追加できる', function () {
        const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
        expect(gildedRose.items[0].name).to.equal('foo');
        expect(gildedRose.items[0].sellIn).to.equal(10);
        expect(gildedRose.items[0].quality).to.equal(20);
    });

    it('Gilded Rose にアイテムを追加して日をまたぐとsellInとqualityが1減少する', function () {
        const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(19);
    });

    it('qualityは負数にならない', function () {
        const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});
