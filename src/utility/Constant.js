export const ADD="Thêm"
export const EDIT="Sửa"
export const DELETE="Xóa"
export const valueType = {
    string: "string",
    number: "number",
    date: "date",
    datetime: "datetime",
    bool: "bool"
}
export const editMode = {
    add: "add",
    dupplicate:"dupplicate",
    edit: "edit",
    delete: "delete",
    none: "none"
}
export const commandName = {
    add: "add",
    edit: "edit",
    delete: "delete",
    dupplicate: "dupplicate",
    import:"import",
    export:"export",
    help:"help",
    refresh:"refresh"
}
export const clients = {
    dashboard:"http://202.134.19.107:3000"
}
const ssoUrl="http://localhost:8080";
export const sso = {
    // callBackUrl:"http://localhost:3004/callback",
    // client_ID : "client_phanquyen",
    // client_Secret : "8114a742-5fc0-4b9f-8184-cfa0491bc89a",
    authUri : ssoUrl+"/auth/realms/{0}/protocol/openid-connect/auth",
    accessTokenUri : ssoUrl+"/auth/realms/{0}/protocol/openid-connect/token",
    logoutUri : ssoUrl+"/auth/realms/{0}/protocol/openid-connect/logout",
    getUserByIDUri:ssoUrl+"/auth/admin/realms/{0}/users/{1}",
    baseUrl:ssoUrl+"/auth/admin/realms/{0}/users",
    resetPassUrl:ssoUrl+"/auth/admin/realms/{0}/users/{1}/reset-password",
    groupsUrl:ssoUrl+"/auth/admin/realms/{0}/groups?first=0&max=20",
    setgroupUrl:ssoUrl+"/auth/admin/realms/{0}/users/{1}/groups/{2}"
}
export const cookie = {
    realm: "realm",
    access_token: "access_token",
    refresh_token: "refresh_token",
    token_type: "token_type",
    id_token:"id_token",
    redirect_uri: "redirect_uri",
    client_id:"client_id",
    client_secret:"client_secret"
}

const apiGateway="http://202.134.19.107:8080";
// const apigateway="http://localhost:38241";
export const api_authentication = {
    getLoginUrl:apiGateway+"/REST/API_AUTHENTICATION/AUT_LOGIN"
}

//Data
export const LandType=[
    {ID:"1",VALUE:"Theo tên đường"},
    {ID:"2",VALUE:"Khu đô thị"},
    {ID:"3",VALUE:"Khu vực"}
]
export const LayoutAction={
    ACTIVE_CURRENT:"ACTIVE_CURRENT",
    COLLAPSED:"COLLAPSED",
    PREPARE_BREADCRUM:"PREPARE_BREADCRUM"
}
export const BaseAction={
    LOAD_DATA:"_LOAD_DATA",
    LOAD_COMPLETE:"_LOAD_COMPLETE",
    REFRESH: "_REFRESH",
    PAGING: "_PAGING",
    SHOW_FORM: "_SHOW_FORM",
    CLOSE_FORM:"_CLOSE_FORM",
    LOAD_INFO:"_LOAD_INFO",
    LOAD_INFO_COMPLETE:"_LOAD_INFO_COMPLETE",
}
export const CustomerAction={
    LOAD_DATA:"CUSTOMER_LOAD_DATA",
    LOAD_COMPLETE:"CUSTOMER_LOAD_COMPLETE",
    REFRESH: "CUSTOMER_REFRESH",
    PAGING: "CUSTOMER_PAGING",
    SHOW_FORM: "CUSTOMER_SHOW_FORM",
    CLOSE_FORM:"CUSTOMER_CLOSE_FORM",
    LOAD_INFO:"CUSTOMER_LOAD_INFO",
    LOAD_INFO_COMPLETE:"CUSTOMER_LOAD_INFO_COMPLETE",
}