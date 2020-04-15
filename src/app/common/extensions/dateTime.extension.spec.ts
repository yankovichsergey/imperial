
describe('CommonModule dateTime.extension', () => {
    describe('#toTransportDateTimeString', () => {
        it('toTransportDateTimeString shoud be correct', () => {
            const expectedResult = '20191003203625';
            expect(new Date(2019, 09, 3, 20, 36, 25).toTransportDateTimeString()).toEqual(expectedResult);
        });
    });
    describe('#fromTransportDateTimeString', () => {
        it('fromTransportDateTimeString shoud be correct', () => {
            const expectedResult = '20191003203625';
            expect(new Date().fromTransportDateTimeString(expectedResult).toTransportDateTimeString()).toEqual(expectedResult);
        });
        it('fromTransportDateTimeString shoud be null', () => {
            expect(new Date().fromTransportDateTimeString('')).toBeNull();
        });
    });
    describe('#toTransportDateString', () => {
        it('toTransportDateString shoud be correct', () => {
            const expectedResult = '20191003';
            expect(new Date(2019, 09, 3).toTransportDateString()).toEqual(expectedResult);
        });
    });
    describe('#fromTransportDateString', () => {
        it('fromTransportDateString shoud be correct', () => {
            const expectedResult = '20191003';
            expect(new Date().fromTransportDateString(expectedResult).toTransportDateString()).toEqual(expectedResult);
        });
        it('fromTransportDateString shoud be null', () => {
            expect(new Date().fromTransportDateString('')).toBeNull();
        });
    });
    describe('#addCustomDays', () => {
        it('addCustomDays shoud be correct', () => {
            expect(new Date(2019, 09, 3).addCustomDays(2).toTransportDateString()).toEqual('20191005');
            expect(new Date(2019, 09, 3).addCustomDays(-2).toTransportDateString()).toEqual('20191001');
        });
    });
});
