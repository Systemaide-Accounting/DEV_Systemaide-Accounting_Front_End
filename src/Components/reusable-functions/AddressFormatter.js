export const HandleSimpleAddressFormat = ({ barangay, city }) => {
    if (barangay && city) {
        return `${barangay}, ${city}`;
    }
    return "Address not available";
};