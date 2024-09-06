export const EndPoints = {
    Authentication: {
        Authenticate: "authenticate",
        Register: "registration"
    },
    Dashboard: {
        ViewUser: 'viewuser',
        DropDown: {
            GetAllCountry: 'getAllCountry',
            GetAllStateByCountry: "getAllStateByCountry",
            GetAllCityByState: "getAllCityByState",
            FilmList: 'filmList'
        },
        FileUpload: {
            Single: 'uploadSingleFile',
            SaveEnquiryDocument: "saveEnquiryDocument",
            DownloadEnquiryDocument: "downloadEnquiryDocument"
        },
        TableGridView: {
            GetAllEnquiry: 'getAllEnquiry',
            ActiveInactiveEnquiry: 'activeInactiveEnquiry',
            FilterActiveInactiveEnquiry: 'filterActiveInactiveEnquiry',
            GetAllEnquiryDocuments: "getAllEnquiryDocuments"
        }
    },
    Users: {
        ListUser: 'getUser',
        CreateUser: 'createUser'
    }
}