function idrFormatter(input) {
    let idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(input);
    return idr;
}

function dateFormatter(input) {
    return new Date(input).toISOString().slice(0, 10);
}

module.exports = { idrFormatter, dateFormatter }