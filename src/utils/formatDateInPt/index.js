const formatDateInPT = dateStr => {
    // 1 de maio de 2015
    const parts = dateStr.split(' ');
    const month = parts[2];
    const upperCaseMonth = `${month[0].toUpperCase()}${month.slice(1)}`;
    const newDateArray = [parts[0], parts[1], upperCaseMonth, parts[3], parts[4]];
    const newDateString = newDateArray.join(' ');
    return newDateString;
};

export default formatDateInPT;
