
class Rut {
    constructor(base, digit) {
        this._base = base;
        this._digit = digit;
    }

    toString() {
        return base + '-' + digit;
    }
}

module.exports = {
    Rut
};
