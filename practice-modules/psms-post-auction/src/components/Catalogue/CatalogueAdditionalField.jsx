import React, { useContext, useEffect, useState } from 'react'
import apiService from '../../ApiServices/apiService'
import { API_ENDPOINT_CATALOGUE } from '../../ApiServices/ApiConstant'
import { CatalogueContext } from '../../pages/Catalogue/Catalogue';

export default function CatalogueAdditionalField(props)
{

    const { handleSelect_DPC_Clause, handleSelect_GR_Clause, handleSelect_BID_Validity, handleSelect_Penal_Non_Payment_Clause, handleSelect_Penal_Non_Lifting_Clause } = useContext(CatalogueContext);

    const [dpcList, setDpcList] = useState([]);
    const [grClauseList, setGrClauseList] = useState([]);
    const [bidValidityList, setBidValidityList] = useState([]);
    const [NPList, setNPList] = useState([]);
    const [NLList, setNLList] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const obj = {
                "clientId": 2
            }
            const [dpclist_resp, gr_resp, bid_resp, np_rep, pn_resp] = await Promise.all([
                apiService('POST', API_ENDPOINT_CATALOGUE.DPC_LIST, obj),
                apiService('POST', API_ENDPOINT_CATALOGUE.GR_CLAUSE_LIST, obj),
                apiService('POST', API_ENDPOINT_CATALOGUE.BID_VALIDITY_LIST, obj),
                apiService('POST', API_ENDPOINT_CATALOGUE.PENAL_NON_PAYMENT_CLAUSE_LIST, obj),
                apiService('POST', API_ENDPOINT_CATALOGUE.PENAL_NON_LIFTING_CLAUSE_LIST, obj),
            ])

            setDpcList(dpclist_resp.results);
            setGrClauseList(gr_resp.results);
            setBidValidityList(bid_resp.results);
            setNPList(np_rep.results);
            setNLList(pn_resp.results);
        }

        fetchData();

    }, [])


    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor='' className='form-label'>DPC Clause</label>
                        <select onChange={(event) => handleSelect_DPC_Clause(event.target.value)} class="form-control" id="Category" name="Category">
                            <option value="">--Select--</option>
                            {
                                dpcList.map(item =>
                                {
                                    return (
                                        <option key={item.dpcClauseID} value={item.dpcClauseID}>{item.clause}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor='' className='form-label'>GR Clause</label>
                        <select onChange={(event) => handleSelect_GR_Clause(event.target.value)} class="form-control select2-hidden-accessible" id="ddOfficer" name="ddOfficer" tabIndex="-1" aria-hidden="true">
                            <option value="">--Select--</option>
                            {
                                grClauseList.map(item =>
                                {
                                    return (
                                        <option key={item.grClauseID} value={item.grClauseID}>{item.clause}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor='' className='form-label'>BID Validity</label>
                        <select onChange={(event) => handleSelect_BID_Validity(event.target.value)} class="form-control select2-hidden-accessible" id="ddNoms" name="ddNoms" tabIndex="-1" aria-hidden="true">
                            <option value="">--Select--</option>
                            {
                                bidValidityList.map(item =>
                                {
                                    return (
                                        <option key={item.bidValidityId} value={item.bidValidityId}>{item.validity}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor='' className='form-label'>Penal Non-Payment Clause</label>
                        <select onChange={(event) => handleSelect_Penal_Non_Payment_Clause(event.target.value)} class="form-control" id="Category" name="Category">
                            <option value="">--Select--</option>
                            {
                                NPList.map(item =>
                                {
                                    return (
                                        <option key={item.nonPaymentClauseID} value={item.nonPaymentClauseID}>{item.clause}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor='' className='form-label'>Penal Non-Lifting Clause</label>
                        <select onChange={(event) => handleSelect_Penal_Non_Lifting_Clause(event.target.value)} class="form-control select2-hidden-accessible" id="ddOfficer" name="ddOfficer" tabIndex="-1" aria-hidden="true">
                            <option value="">--Select--</option>
                            {
                                NLList.map(item =>
                                {
                                    return (
                                        <option key={item.nonLiftingClauseID} value={item.nonLiftingClauseID}>{item.clause}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
