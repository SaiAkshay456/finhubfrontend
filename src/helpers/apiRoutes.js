export const API_BASE = '/v1';

export const RISK_PROFILE = `riskprofile`;

export const USER_MANAGEMENT = 'users';
export const AUTH_MANAGE = 'auth';
export const RISK_ROUTES = {
    SEND_TO_USERS_QUESTIONNAIRE: `${RISK_PROFILE}/send/questionaries-to-users`,
    USER_RESPONSE: `${RISK_PROFILE}/user-response`,
    CREATE_QUESTIONNARIE: `${RISK_PROFILE}/create-questionarre`,
    GET_QUESTIONNARIE_OF_USER: `${RISK_PROFILE}/get/questionarrie-user`,
    UPDATE_QUESTIONNARIE: `${RISK_PROFILE}/update/questionarrie`,
    GET_QUESTIONNARIES: `${RISK_PROFILE}/get/questionarries`,
    DUPLICATE_QUESTIONNARIE: `${RISK_PROFILE}/duplicate-questionarre`
};

export const USER_MANAGE_ROUTES = {
    CREATE_USER: `${USER_MANAGEMENT}/create-user`,
    USER_STATUS_UPDATE: `${USER_MANAGEMENT}/user-status-update`,
    GET_USER_DETAILS: `${USER_MANAGEMENT}/user`,
    KYC_VERIFY_USER: `${USER_MANAGEMENT}/user/kyc-form-submit`,
    USER_UPDATE: `${USER_MANAGEMENT}/user/update-user`,
    GET_ALL_USERS: `${USER_MANAGEMENT}/get-all-users`,
    UPLOAD_PORTFOLIO: `${USER_MANAGEMENT}/user/portfolio-upload`
}
export const AUTH_ROUTES = {
    LOGIN: `${AUTH_MANAGE}/login`,
    LOGOUT: `${AUTH_MANAGE}/logout`
}


