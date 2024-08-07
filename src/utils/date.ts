const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

export const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A'
    const newDate = new Date(date);  // convert to milliseconds
    const day = newDate.getDate();

    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    if (month < 10) {
        return `${year}-0${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
};

export const formatDate3 = (date: string | undefined) => {
    if (!date) return 'N/A'
    const newDate = new Date(date);  // convert to milliseconds
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${months[month]} ${day}, ${year}`;
};
  

export const formatDate2 = (date: string | undefined) => {
    if (!date) return 'N/A'
    const newDate = new  Date(date);  // convert to milliseconds
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    newDate.getTime()
    return `${day}/${month}/${year} ${newDate.getHours()}:${newDate.getMinutes()}`;
};

export const daysAgo = (date: string | undefined) => {
    if (!date) return 'N/A'
    const newDate = new Date(date); // convert to milliseconds
    const today = Date.now();

    const diffTime = Math.abs(today - Number(newDate));

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};
