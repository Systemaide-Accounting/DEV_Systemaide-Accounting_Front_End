export const HandleSimpleNameFormat = ({firstName, lastName}) => {
    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    }
    return "Name not available";
};

export const HandleFullNameFormat = ({firstName, middleName, lastName}) => {
    if (firstName && middleName && lastName) {
      return `${lastName}, ${firstName} ${middleName}`;
    }
    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    }
    return "N/A";
};