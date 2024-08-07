export const formatDate = (date: string | undefined) => {
    if (!date) return ''
    const newDate = new  Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    // newDate.getTime()
    return `${day}/${month}/${year} ${newDate.getHours()}:${newDate.getMinutes()}`;
};

export const daysAgo = (date: string | undefined) => {
    if (!date) return ''
    const newDate = new Date(date);
    const today = Date.now();

    const diffTime = Math.abs(today - Number(newDate));

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    

    return diffDays;
};

export const timeAgo = (date: string | undefined) => {
    if (!date) return ''
    const newDate = new Date(date)
    const today = Date.now();

    const diffTime = Math.abs(today - Number(newDate));

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays > 1) {
        return `${Math.floor(diffDays)} days ago`; 
    } else if (diffDays === 1) {
        return `${Math.floor(diffDays)} day ago`; 
    } else if ((diffDays * 24) > 1) {
        return `${Math.floor(diffDays * 24)} hours ago`; 
    } else if ((diffDays * 24) === 1) {
        return `${Math.floor(diffDays * 24)} hour ago`; 
    } else if ((diffDays * 24 * 60) > 1) {
        return `${Math.floor(diffDays * 24 * 60)} mins ago`; 
    } else {
        return `${Math.floor(diffDays * 24 * 60)} min ago`; 
    }

};

export const formatDate2 = (date: string | undefined) => {
    if (!date) return ''
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
};
  

export const formatDate3 = (date: string | undefined) => {
    if (!date) return ''
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
};
  

export const getTomorrowsDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = tomorrow.getDate();
    const month = tomorrow.getMonth() + 1; // January is 0!
    const year = tomorrow.getFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
};
