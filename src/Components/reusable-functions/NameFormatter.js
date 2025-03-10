export const HandleSimpleNameFormat = ({firstName, lastName}) => {
    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    }
    return "Name not available";
};