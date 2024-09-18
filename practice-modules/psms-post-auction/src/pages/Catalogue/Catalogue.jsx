import React, { createContext, useContext, useReducer, useState } from 'react'
import CatalogueList from '../../components/Catalogue/CatalogueList'
import CatalogueDetails from '../../components/Catalogue/CatalogueDetails'
import apiService from '../../ApiServices/apiService';
import { API_ENDPOINT_CATALOGUE } from '../../ApiServices/ApiConstant';
import moment from 'moment';

const initial = {
    TypeAuctionDetails: [],
    TypAttributeTran: [],
    Category: '',
    Officer: '',
    Type: '',
    DealingOfficeId: 0,
    LcNormsId: '',
    CRM: '',
    DpcId: 0,
    Grid: 0,
    BidId: 0,
    NonPaymentId: 0,
    NonLiftingId: 0,
    ClientId: 0,
}

export const CatalogueContext = createContext(initial)

export default function Catalogue()
{
    const [catalogueId, setCatalogueId] = useState('');
    const [loading, setLoading] = useState(false);

    const CatalogueReducer = (prev, action) =>
    {
        let newItem = prev;

        if (action.type === "GET_CATALOGUE_DETAILS")
        {
            newItem = { ...prev, TypeAuctionDetails: action.payload.data }
        }
        else if (action.type === "SET_ALL")
        {

            newItem = {
                ...prev,
                TypeAuctionDetails: prev.TypeAuctionDetails.map(item => ({
                    ...item, ...action.payload.data, auction_Date: moment(item.auctionDate).toISOString()
                }))
            };
        }
        else if (action.type === "EDIT_DATA")
        {
            const { rowid, columnid, value } = action.payload.data;
            const newItem = {
                ...prev,
                TypeAuctionDetails: prev.TypeAuctionDetails.map((item, idx) =>
                    idx == rowid ? ({ ...item, [columnid]: value }) : item
                    // console.log('idx:', typeof (idx), ', rowid:', typeof (rowid))
                )
            };
            return newItem;
        }
        else if (action.type === "SET_CATEGORY")
        {
            newItem = { ...prev, Category: action.payload.data };
        }
        else if (action.type === "SET_DEALING_OFFICER")
        {
            newItem = { ...prev, DealingOfficeId: action.payload.data };
        }
        else if (action.type === "SET_LC_NORMS")
        {
            newItem = { ...prev, LcNormsId: action.payload.data };
        }
        else if (action.type === "SET_CRM_CATEGORY")
        {
            newItem = { ...prev, CRM: action.payload.data };
        }
        else if (action.type === "handleSelect_DPC_Clause")
        {
            newItem = { ...prev, DpcId: action.payload.data };
        }
        else if (action.type === "handleSelect_GR_Clause")
        {
            newItem = { ...prev, Grid: action.payload.data };
        }
        else if (action.type === "handleSelect_BID_Validity")
        {
            newItem = { ...prev, BidId: action.payload.data };
        }
        else if (action.type === "handleSelect_Penal_Non_Payment_Clause")
        {
            newItem = { ...prev, NonPaymentId: action.payload.data };
        }
        else if (action.type === "handleSelect_Penal_Non_Lifting_Clause")
        {
            newItem = { ...prev, NonLiftingId: action.payload.data };
        }

        return newItem;
    }

    const [CatalogueData, dispatchCatalogue] = useReducer(CatalogueReducer, initial);



    const handleOnCatalogueDetails = async (catalogueid) =>
    {
        setLoading(true);
        setCatalogueId(catalogueid);

        const obj = {
            // "minNo": "TS19292977"
            "minNo": catalogueid
        }

        const res = await apiService('POST', API_ENDPOINT_CATALOGUE.GET_EXTERNAL_AUCTION, JSON.stringify(obj))

        dispatchCatalogue({
            type: 'GET_CATALOGUE_DETAILS',
            payload: {
                data: res.results
            }
        })
        setLoading(false);
    }

    const handleSetAll = (obj) =>
    {

        dispatchCatalogue({
            type: 'SET_ALL',
            payload: {
                data: obj
            }
        })
    }

    const handleSetEditData = (rowid, columnid, value) =>
    {
        dispatchCatalogue({
            type: 'EDIT_DATA',
            payload: {
                data: {
                    rowid, columnid, value
                }
            }
        })
    }

    const handleSelectCategory = (val) =>
    {
        dispatchCatalogue({
            type: 'SET_CATEGORY',
            payload: {
                data: val
            }
        })
    }

    const handleSelectDealingOfficer = (val) =>
    {
        dispatchCatalogue({
            type: 'SET_DEALING_OFFICER',
            payload: {
                data: val
            }
        })
    }
    const handleSelectLCNorms = (val) =>
    {
        dispatchCatalogue({
            type: 'SET_LC_NORMS',
            payload: {
                data: val
            }
        })
    }
    const handleSelectCRMCategory = (val) =>
    {
        dispatchCatalogue({
            type: 'SET_CRM_CATEGORY',
            payload: {
                data: val
            }
        })
    }

    const handleSelect_DPC_Clause = (val) =>
    {
        dispatchCatalogue({
            type: 'handleSelect_DPC_Clause',
            payload: {
                data: val
            }
        })
    }
    const handleSelect_GR_Clause = (val) =>
    {
        dispatchCatalogue({
            type: 'handleSelect_GR_Clause',
            payload: {
                data: val
            }
        })
    }
    const handleSelect_BID_Validity = (val) =>
    {
        dispatchCatalogue({
            type: 'handleSelect_BID_Validity',
            payload: {
                data: val
            }
        })
    }
    const handleSelect_Penal_Non_Payment_Clause = (val) =>
    {
        dispatchCatalogue({
            type: 'handleSelect_Penal_Non_Payment_Clause',
            payload: {
                data: val
            }
        })
    }
    const handleSelect_Penal_Non_Lifting_Clause = (val) =>
    {
        dispatchCatalogue({
            type: 'handleSelect_Penal_Non_Lifting_Clause',
            payload: {
                data: val
            }
        })
    }

    const handleSubmit = async () =>
    {
        setLoading(true);
        try
        {
            console.log('Before:', CatalogueData.TypeAuctionDetails)
            const res = await apiService('POST', API_ENDPOINT_CATALOGUE.SAVE_CATALOGUE, JSON.stringify(CatalogueData))
            console.log('SAVE CATALOGUE:', res);
            setLoading(false)
        }
        catch (err)
        {
            setLoading(false);
            console.log(err.message);
        }
    }

    return (
        <>
            <CatalogueContext.Provider value={{
                CatalogueData,
                handleSetAll,
                handleSetEditData,
                handleSelectCategory,
                handleSelectDealingOfficer,
                handleSelectLCNorms,
                handleSelectCRMCategory,
                handleSelect_DPC_Clause,
                handleSelect_GR_Clause,
                handleSelect_BID_Validity,
                handleSelect_Penal_Non_Payment_Clause,
                handleSelect_Penal_Non_Lifting_Clause,
                loading,
                handleSubmit
            }}>
                <CatalogueList handleOnCatalogueDetails={handleOnCatalogueDetails}></CatalogueList>
                {
                    loading && <p>Loading...</p>
                }
                {
                    CatalogueData.TypeAuctionDetails.length > 0 && (<CatalogueDetails catalogueId={catalogueId}></CatalogueDetails>)
                }
            </CatalogueContext.Provider>
        </>
    )
}
