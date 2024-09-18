import React, { useContext, useEffect, useMemo, useRef } from 'react'
import ButtonWithLoader from '../Buttons/ButtonWithLoader';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useState } from 'react';
import CatalogueDetailsTable from './CatalogueDetailsTable';
import CatalogueAdditionalField from './CatalogueAdditionalField';
import style from './Catalogue.module.css';
import { API_ENDPOINT_CATALOGUE } from '../../ApiServices/ApiConstant';
import apiService from '../../ApiServices/apiService';
import { CatalogueContext } from '../../pages/Catalogue/Catalogue';

export default function CatalogueDetails({ catalogueId })
{
    const { CatalogueData, handleSetAll, handleSelectCategory, handleSelectDealingOfficer, handleSelectLCNorms, handleSelectCRMCategory, loading, handleSubmit } = useContext(CatalogueContext)
    const [isadditionalField, setIsAdditionField] = useState(false);
    const [getCategory, setGetCategory] = useState([]);
    const [getDealingOfficer, setGetDealingOfficer] = useState([]);
    const [getLcNorms, setGetLcNorms] = useState([]);
    const [getCrmCategoryList, setGetCrmCategoryList] = useState([]);

    const section1Ref = useRef(null);

    useEffect(() =>
    {
        section1Ref.current.scrollIntoView({ behavior: 'smooth' });

    }, [CatalogueData.TypeAuctionDetails])


    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const obj = {
                "clientId": 2
            }
            const [categoryList, dealingOfficerList, lcNormsList, crmCategoryList] = await Promise.all([
                apiService('POST', API_ENDPOINT_CATALOGUE.CATEGORY, JSON.stringify(obj)),
                apiService('POST', API_ENDPOINT_CATALOGUE.DEALING_OFFICER, JSON.stringify(obj)),
                apiService('GET', API_ENDPOINT_CATALOGUE.LC_NORMS_LIST),
                apiService('GET', API_ENDPOINT_CATALOGUE.CRM_CATEGORY_LIST)
            ]);

            setGetCategory(categoryList.results);
            setGetDealingOfficer(dealingOfficerList.results);
            setGetLcNorms(lcNormsList.results);
            setGetCrmCategoryList(crmCategoryList.results);
        }
        fetchData();

    }, [])









    let previousIndex = 0;


    const handleOnSetAll = (e) =>
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {}
        for (const [key, value] of formData.entries())
        {
            obj[key] = value;
        }

        handleSetAll(obj);

    }


    return (
        <>
            <div ref={section1Ref} className="card">
                <div className="card-header">
                    CATALOGUE DATA
                </div>
                <div className="card-body">

                    <h3>{catalogueId}</h3>

                    <form onSubmit={handleOnSetAll}>
                        <div className="row">
                            {
                                Object.keys(CatalogueData.TypeAuctionDetails[0]).map((column, index, arr) =>
                                {
                                    if (index === 15)
                                    {
                                        previousIndex = column;
                                    }

                                    if (index === 4)
                                    {
                                        return (
                                            <div key={index} className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor={column} className='form-label'>{column}</label>
                                                    <input type="text" name={column} id={column} className='form-control' autoComplete='off' disabled />
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (index === 5)
                                    {
                                        return (
                                            <div key={index} className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor={column} className='form-label'>{column}</label>
                                                    <input type="text" name={column} id={column} className='form-control' autoComplete='off' />
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (index >= 6 && index <= 9)
                                    {
                                        return (
                                            <div key={index} className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor={column} className='form-label'>{column}</label>
                                                    <select name={column} id={column} className="form-control" aria-label="Default select example">
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (index === 15)
                                    {
                                        previousIndex = column;
                                    }
                                    else if (index >= 29 && index <= 36)
                                    {
                                        if (index >= 29 && index <= 35)
                                        {
                                            return (
                                                <div key={index} className="col-md-2">
                                                    <div className="form-group">
                                                        <label htmlFor={column} className='form-label'>{column.toUpperCase()}</label>
                                                        <input type="text" name={column} id={column} className='form-control' autoComplete='off' />
                                                    </div>
                                                </div>
                                            )
                                        }

                                        if (index === arr.length - 1)
                                        {
                                            return (
                                                <>
                                                    <div key={index} className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor={column} className='form-label'>{column.toUpperCase()}</label>
                                                            <input type="text" name={column} id={column} className='form-control' autoComplete='off' />
                                                        </div>
                                                    </div>
                                                    <div key={previousIndex} className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor={column} className='form-label'>{previousIndex}</label>
                                                            <select name={previousIndex} id={previousIndex} className="form-control" aria-label="Default select example">
                                                                <option value="Stock">Stock</option>
                                                                <option value="Arising">Arising</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        }
                                    }
                                })
                            }
                        </div>
                        <div className="row">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <ButtonWithLoader style={'btn btn-outline-secondary'}>RESET</ButtonWithLoader>
                                <ButtonWithLoader style={'btn btn-primary'}>SET ALL</ButtonWithLoader>
                            </div>
                        </div>
                    </form>

                    <div className='mt-4'>
                        {
                            CatalogueData.TypeAuctionDetails && (<CatalogueDetailsTable></CatalogueDetailsTable>)
                        }
                    </div>

                    <div className="mt-4">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor='' className='form-label'>Category</label>
                                    <select onChange={(event) => handleSelectCategory(event.target.value)} class="form-control" id="Category" name="Category">
                                        <option value="">--Select--</option>
                                        {
                                            getCategory.map((item) =>
                                            {
                                                return (
                                                    <option value={item.id}>{item.description}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor='' className='form-label'>Dealing Officer</label>
                                    <select onChange={(event) => handleSelectDealingOfficer(event.target.value)} class="form-control select2-hidden-accessible" id="ddOfficer" name="ddOfficer" tabIndex="-1" aria-hidden="true">
                                        <option value="">--Select--</option>
                                        {
                                            getDealingOfficer.map((item) =>
                                            {
                                                return (
                                                    <option value={item.dealingOfficerId}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor='' className='form-label'>LC Norms</label>
                                    <select onChange={(event) => handleSelectLCNorms(event.target.value)} class="form-control select2-hidden-accessible" id="ddNoms" name="ddNoms" tabIndex="-1" aria-hidden="true">
                                        <option value="">--Select--</option>
                                        {
                                            getLcNorms.map((item) =>
                                            {
                                                return (
                                                    <option value={item.lcNormsId}>{item.lcNorms}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor='' className='form-label'>CRM Category</label>
                                    <select onChange={(event) => handleSelectCRMCategory(event.target.value)} class="form-control select2-hidden-accessible" id="ddCrm" name="ddCrm" tabIndex="-1" aria-hidden="true">
                                        <option value="">--Select--</option>
                                        {
                                            getCrmCategoryList.map((item) =>
                                            {
                                                return (
                                                    <option value={item.crmcatId}>{item.crm}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Additional fields
                                <div className="form-check form-switch">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="toggleButton"
                                        checked={isadditionalField}
                                        onChange={(e) => { setIsAdditionField(e.target.checked) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            {isadditionalField && <CatalogueAdditionalField />}
                        </div>
                    </div>

                    <div className="row">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <ButtonWithLoader style={'btn btn-outline-secondary'}>RESET</ButtonWithLoader>
                            <ButtonWithLoader isLoading={loading} onClick={handleSubmit} style={'btn btn-primary'}>SUBMIT</ButtonWithLoader>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
};




