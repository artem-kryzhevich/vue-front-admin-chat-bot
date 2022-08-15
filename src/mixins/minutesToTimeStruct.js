function words(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const word_obj = {
    years: ['год', 'года', 'лет'],
    month: ['месяц', 'месяца', 'месяцев'],
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут']
}
const plural = (tStruct, word) => {
    return words(tStruct, word_obj[word])
}
const timeStruct = (mm) => {
    let y, m, d, h;
    if (isNaN(mm)) {
        return {};
    }
    y = mm / (60 * 24 * 31 * 12);
    m = (y - ~~y) * 12;
    d = (m - ~~m) * 31;
    h = (d - ~~d) * 24;
    mm = (h - ~~h) * 60;
    return {y: ~~y, m: ~~m, d: ~~d, h: ~~h, mm: ~~mm};
};
const toFormattedStr = (tStruct, res = '') => {
    if (typeof tStruct === 'object') {
        if (tStruct.y > 0) {
            res += tStruct.y + ' ' + plural(tStruct.y, 'years') + ' '
        }
        if (tStruct.m > 0) {
            res += tStruct.m + ' ' + plural(tStruct.m, 'month') + ' '
        }
        if (tStruct.d > 0) {
            res += tStruct.d + ' ' + plural(tStruct.d, 'days') + ' '
        }
        if (tStruct.h > 0) {
            res += tStruct.h + ' ' + plural(tStruct.h, 'hours') + ' '
        }
        if (tStruct.mm > 0) {
            res += tStruct.mm + ' ' + plural(tStruct.mm, 'minutes')
        }
    }
    return res;
};

export default {
    methods: {
        minutesToTimeStruct(mm) {
            timeStruct(mm)
            toFormattedStr(timeStruct(mm))
            return toFormattedStr(timeStruct(mm));
        }
    }
}
