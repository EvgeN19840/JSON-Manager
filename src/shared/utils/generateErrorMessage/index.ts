export const generateErrorMessage = (label: string, errorType: string) => {
    switch (errorType) {
        case "required":
            return `Please enter ${label}.`;
        case "minLength":
            return `${label} must be at least X characters.`;
        case "maxLength":
            return `${label} must be less than Y characters.`;
        default:
            return `${label} is not valid.`;
    }
};
