
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

export const formatDate = (date: string) => {
    const newDate = new Date(date);  // convert to milliseconds
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    // console.log("newDate", newDate, "day", day, "month", month, "year", year);
    if (month < 10) {
        return `${year}-0${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
};

export const formatDate3 = (date: string) => {
    const newDate = new Date(date);  // convert to milliseconds
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    // console.log("newDate", newDate, "day", day, "month", month, "year", year);
    return `${months[month]} ${day}, ${year}`;
};
  

export const formatDate2 = (date: string) => {
    const newDate = new  Date(date);  // convert to milliseconds
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    newDate.getTime()
    return `${day}/${month}/${year} ${newDate.getHours()}:${newDate.getMinutes()}`;
};
// export const formatDate = (date: string) => {
//     const newDate = new  Date(date);  // convert to milliseconds
//     const day = newDate.getDate();
//     const month = newDate.getMonth() + 1;
//     const year = newDate.getFullYear();
//     return `${months[month-1]} ${day}, ${year}`;
// };


export const daysAgo = (date: string) => {
    const newDate = new Date(date); // convert to milliseconds
    const today = Date.now();

    const diffTime = Math.abs(today - Number(newDate));

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};



// export const expired = (date: number) => {
//     if (!date) return true;
    
//     const newDate = new Date(date * 1000); // convert to milliseconds
//     const today = new Date();


//     if (newDate < today) {
//         return true;
//     }
//     return false;
// };
  
  