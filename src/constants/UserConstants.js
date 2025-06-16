export const userAllowedViewSystemConfig = (permissions) => {
    return permissions && permissions.includes("viewSystemConfig");
};
export const userAllowedRestoreTransaction = (permissions) => {
    return permissions && permissions.includes("restoreTransaction");
};
export const userAllowedRestoreTransactionLog = (permissions) => {
    return permissions && permissions.includes("restoreTransactionLog");
};
export const userAllowedRestoreUser = (permissions) => {
    return permissions && permissions.includes("restoreUser");
};
export const userAllowedRestoreAgent = (permissions) => {
    return permissions && permissions.includes("restoreAgent");
};
export const userAllowedRestoreAccount = (permissions) => {
    return permissions && permissions.includes("restoreAccount");
};
export const userAllowedRestoreLocation = (permissions) => {
    return permissions && permissions.includes("restoreLocation");
};
export const userAllowedRestoreBranch = (permissions) => {
    return permissions && permissions.includes("restoreBranch");
};