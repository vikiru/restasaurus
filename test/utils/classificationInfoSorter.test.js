const { expect } = require('chai');

const {
    sortInfo,
    getClassSorter,
    getFamilySorter,
    getOrderSorter,
} = require('../../app/utils/classificationInfoSorter');

/* Ensure that classificationInfo is sorted properly according to the order defined.
For the purposes of this test, the value is neglible as the key property being tested is the type. */
describe('classificationInfoSorter', function () {
    describe('Sort by class', function () {
        it('should sort the provided information according to the sort order', function () {
            const classInfo = [
                { type: 'Superclass', value: 'Some value here' },
                { type: 'Class', value: 'Some value here' },
                { type: 'Subclass', value: 'Some value here' },
                { type: 'Infraclass', value: 'Some value here' },
                { type: 'Subterclass', value: 'Some value here' },
                { type: 'Parvclass', value: 'Some value here' },
            ];
            const classSorter = getClassSorter();
            const newClassInfo = sortInfo(classInfo.reverse(), classSorter);

            expect(newClassInfo).to.have.length(classInfo.length);
            for (let i = 0; i < classInfo.length; i++) {
                expect(newClassInfo[i]).to.deep.equal(classInfo[i]);
            }
        });
    });

    describe('Sort by order', function () {
        it('should sort the provided information according to the sort order', function () {
            const orderInfo = [
                { type: 'Magnorder', value: 'Some value here' },
                { type: 'Superorder', value: 'Some value here' },
                { type: 'Grandorder', value: 'Some value here' },
                { type: 'Mirorder', value: 'Some value here' },
                { type: 'Order', value: 'Some value here' },
                { type: 'Suborder', value: 'Some value here' },
                { type: 'Infraorder', value: 'Some value here' },
                { type: 'Parvorder', value: 'Some value here' },
            ];
            const orderSorter = getOrderSorter();
            const newOrderInfo = sortInfo(orderInfo.reverse(), orderSorter);

            expect(newOrderInfo).to.have.length(orderInfo.length);
            for (let i = 0; i < orderInfo.length; i++) {
                expect(newOrderInfo[i]).to.deep.equal(orderInfo[i]);
            }
        });
    });

    describe('Sort by family', function () {
        it('should sort the provided information according to the sort order', function () {
            const familyInfo = [
                { type: 'Family', value: 'Some value here' },
                { type: 'Subfamily', value: 'Some value here' },
            ];
            const familySorter = getFamilySorter();
            const newFamilyInfo = sortInfo(familyInfo.reverse(), familySorter);

            expect(newFamilyInfo).to.have.length(familyInfo.length);
            for (let i = 0; i < familyInfo.length; i++) {
                expect(newFamilyInfo[i]).to.deep.equal(familyInfo[i]);
            }
        });
    });
});
