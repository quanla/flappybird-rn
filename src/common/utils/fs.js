const chain = (value, ...fList) => {
    for (let i = 0; i < fList.length; i++) {
        const fn = fList[i];
        value = fn(value);
    }
    return value;
};

exports.chain = chain;