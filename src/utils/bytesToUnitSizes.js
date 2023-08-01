function bytesToSize(bytes, unit) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = sizes.indexOf(unit);
    if (i === -1) {
        throw new Error(
            `Invalid unit. Supported units are: ${sizes.join(', ')}`
        );
    }
    return ((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

module.exports = {
    bytesToSize,
};
