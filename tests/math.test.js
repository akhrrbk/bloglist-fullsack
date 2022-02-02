const math = require('../utils/for_testing')

test('math test of adding 1 to 3', () => {
    expect(math.calculateadd(1, 3)).toBe(4)
})

test('math test of subbing 1 from 3', () => {
    expect(math.calculatesub(1, 3)).toBe(-2)
})