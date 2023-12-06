export const convertDatetimeLocal = (dateString: any) => {
    let date = new Date(dateString);

    // Format the date as dd-mm-yyyy
    let formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}