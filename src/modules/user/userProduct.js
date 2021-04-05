import React from 'react';

function UserProduct(props) {
    return (<div className="listingPage">
        {/* <h3>7 Listings</h3> */}
        {/* <input className="form-control" /> */}
        <div className="row ListItems">
            <div className="col-sm-12 col-md-12">
                <div>
                    <div className="row">
                        {props.products}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default UserProduct;
