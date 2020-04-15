import {
    fakeAsync
} from '@angular/core/testing';

import { HeaderSortModel, HeaderItemModel } from '.';
import { SortingConstants } from '../../constants/sorting.constants';

describe('HeaderSortModel', () => {
    let model: HeaderSortModel;
    beforeEach(() => {
        model = new HeaderSortModel();
    });
    it('#constructor', fakeAsync(() => {
        expect(model.items).toBeDefined();
        expect(model.items.length).toEqual(0);
        expect(model.onChangeSorting).toBeDefined();
    }));
    describe('#getActiveSorting', () => {
        it('getActiveSorting must be return active item', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            model.items.push(item);
            item = new HeaderItemModel('field2', 'displayName2');
            model.items.push(item);
            item.isSelected = true;
            const activeItem = model.getActiveSorting();
            expect(activeItem).toEqual(item);
        }));
        it('getActiveSorting must be return not active item if all items not selected', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            model.items.push(item);
            item = new HeaderItemModel('field2', 'displayName2');
            model.items.push(item);
            const activeItem = model.getActiveSorting();
            expect(activeItem).not.toBeDefined();
        }));
    });
    describe('#getSortingByField', () => {
        it('getSortingByField must be return item if exist', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            model.items.push(item);
            item = new HeaderItemModel('field2', 'displayName2');
            model.items.push(item);
            item.isSelected = true;
            const activeItem = model.getSortingByField('field1');
            expect(activeItem.field).toEqual('field1');
        }));
        it('getSortingByField must be return undefined if not exist', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            model.items.push(item);
            item = new HeaderItemModel('field2', 'displayName2');
            model.items.push(item);
            item.isSelected = true;
            const activeItem = model.getSortingByField('field11');
            expect(activeItem).not.toBeDefined();
        }));
    });
    describe('#changeDirectOfSorting', () => {
        it('changeDirectOfSorting must be change direct from asc to desc', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            item.rule = SortingConstants.ASC;
            model.items.push(item);
            item = model.changeDirectOfSorting('field1');
            expect(item.rule).toEqual(SortingConstants.DESC);
        }));
        it('changeDirectOfSorting must be change direct from desc to asc', fakeAsync(() => {
            let item = new HeaderItemModel('field1', 'displayName1');
            item.rule = SortingConstants.DESC;
            model.items.push(item);
            item = model.changeDirectOfSorting('field1');
            expect(item.rule).toEqual(SortingConstants.ASC);
        }));
        it('changeDirectOfSorting must be return undefined result in not found', fakeAsync(() => {
            const item = new HeaderItemModel('field1', 'displayName1');
            item.rule = SortingConstants.DESC;
            model.items.push(item);
            const itemResult = model.changeDirectOfSorting('field2');
            expect(itemResult).not.toBeDefined();
            expect(item.rule).toEqual(SortingConstants.DESC);
        }));
    });
    describe('#setActiveSorting', () => {
        it('setActiveSorting must be set item as active by field name', fakeAsync(() => {
            const item = new HeaderItemModel('field1', 'displayName1');
            item.rule = SortingConstants.ASC;
            model.items.push(item);
            const activeItemBySet = model.setActiveSorting('field1');
            const activeItemByGet = model.getActiveSorting();
            expect(activeItemBySet).toEqual(activeItemByGet);
        }));
        it('setActiveSorting must be no change current active item if not found', fakeAsync(() => {
            const item = new HeaderItemModel('field1', 'displayName1');
            item.rule = SortingConstants.ASC;
            model.items.push(item);
            model.setActiveSorting('field1');
            const activeItemBySet = model.setActiveSorting('field2');
            const activeItemByGet = model.getActiveSorting();
            expect(activeItemBySet).not.toBeDefined();
            expect(activeItemByGet).toEqual(item);
        }));
    });

});
