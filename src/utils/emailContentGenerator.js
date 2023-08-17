function emailContentGenerator(data) {
    let emailContent = '<p>';

    emailContent += Object.entries(data)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                let subSection = `<h4>${key.toUpperCase()}</br></h4>`;
                if (key == 'Attachments') {
                    subSection += value
                        .map((val, idx) => `<a href=${val}>${val}</a></br>`)
                        .join('');
                } else {
                    subSection += value
                        .map(
                            (val, idx) =>
                                `${idx + 1}) ${emailContentGenerator(val)}`
                        )
                        .join('');
                }
                return subSection;
            } else if (typeof value === 'object' && value !== null) {
                return `${emailContentGenerator(value)}`;
            } else {
                return `${
                    key.charAt(0).toUpperCase() +
                    key.slice(1).toLocaleLowerCase()
                } : ${value}<br>`;
            }
        })
        .join('');

    return (emailContent += `</p>`);
}
module.exports = emailContentGenerator;
