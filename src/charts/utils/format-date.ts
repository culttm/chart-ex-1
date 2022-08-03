export const formatDate = (date: Date) => {
    const dateArray = date.toLocaleDateString().split('/');
    return `${dateArray[0]}/${dateArray[1]}`;
}
