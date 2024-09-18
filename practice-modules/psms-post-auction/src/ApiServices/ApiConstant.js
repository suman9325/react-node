const API_BaseUrl = "https://localhost:7155/api";

export const API_ENDPOINT_LOGIN = {
    LOGIN_BIDDER: `/Account`,
}

export const API_ENDPOINT_CATALOGUE = {
    GETEXTERNALCATALOG: `${API_BaseUrl}/Catalogue/getexternalcatalog`,
    UOM_DESC: `${API_BaseUrl}/Catalogue/getuomcode`,
    CATEGORY: `${API_BaseUrl}/Catalogue/getcategorylist`,
    DEALING_OFFICER: `${API_BaseUrl}/Catalogue/getdealingofficerlist`,
    LC_NORMS_LIST: `${API_BaseUrl}/Catalogue/getlcnormslist`,
    CRM_CATEGORY_LIST: `${API_BaseUrl}/Catalogue/getcrmcategorylist`,
    DPC_LIST: `${API_BaseUrl}/Catalogue/getdpclist`,
    GR_CLAUSE_LIST: `${API_BaseUrl}/Catalogue/getgrlist`,
    BID_VALIDITY_LIST: `${API_BaseUrl}/Catalogue/getbidvaliditylist`,
    PENAL_NON_PAYMENT_CLAUSE_LIST: `${API_BaseUrl}/Catalogue/getnplist`,
    PENAL_NON_LIFTING_CLAUSE_LIST: `${API_BaseUrl}/Catalogue/getnllist`,
    GET_EXTERNAL_AUCTION: `${API_BaseUrl}/Catalogue/externalauction`,
    SAVE_CATALOGUE: `${API_BaseUrl}/Catalogue/saveauctiondetails`,
}
