import React from 'react'
import TransferDetails from './TransferDetails'

export default function Payment()
{


    return (
        <>

            <div className="card" style={{ width: "50rem" }}>
                <div className="card-body">
                    <h2 className="card-title">Payment</h2>
                    <hr />
                    <form action="">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Payment Mode
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Source of Adjustment
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Adjustment Amount
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Transfer Date/Pick-up Date
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Request Date
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="username" className='form-label'>Choose Organization
                                        <span className='asterisk'> *</span>
                                    </label>
                                    <input type="text" id="username" placeholder='Enter User ID' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-grid gap-2 d-md-block">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-secondary me-md-2" type="button">RESET</button>
                                    <button class="btn btn-primary" type="button">SAVE</button>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div >

            <TransferDetails></TransferDetails>

        </>
    )
}
