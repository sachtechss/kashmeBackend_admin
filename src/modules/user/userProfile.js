import React from 'react';
import { Card, Rate, PageHeader, Spin, Button, Typography } from 'antd';
import { Link } from "react-router-dom";
import { getUserDetails } from './actions/userActions';
import { getProductList } from '../product/actions/productActions';
import { connect } from 'react-redux';
import moment from 'moment';
import UserProduct from './userProduct';
import history from '../../history';
import autoBind from 'react-autobind';
import { PRODUCT_IMG_PATH, PROFILE_IMG_PATH, IMAGE_URL } from '../../actions/utilAction';
import { formatter } from '../../actions/constant';
import * as constant from '../../actions/constant';

const { Meta } = Card;
const { Text } = Typography;

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: '',
            productList: [],
            loading: false,
            page: 0,
            objProduct: {
                userId: this.props.match.params.userId,
                categoryId: "",
                subcategoryId: "",
                productType: "",
                minPrice: 0,
                maxPrice: 0,
                sortValue: "",
                sortOrder: 0,
                count: 8,
                page: 0
            }
        }
        autoBind(this);
    }

    componentDidMount() {
        let obj = {
            userId: this.props.match.params.userId
        }

        this.props.getUserDetails(obj);
        this.props.getProductList(this.state.objProduct);
    }

    loadMoreRecord() {
        this.setState({ loading: true })
        this.setState({ page: this.state.page + 1 })
        let obj = this.state.objProduct;
        obj.page = this.state.page + 1;
        this.props.getProductList(obj);
    }

    componentWillReceiveProps(nextProps) {
        let records = nextProps.productList;
        if (this.state.loading) {
            records = [...new Set([...this.state.productList, ...nextProps.productList])]
        }
        this.setState({
            userDetails: nextProps.userDetails,
            productList: records,
            loading: false
        })
    }

    render() {

        let state = this.state;
        console.log('productsss', state.productList.data)
        var image_url = 'https://ss.stagingsdei.com:9031/uploads/'
        const products = state.productList ? (state.productList.map((x, index) => <div key={index} className="col-sm-6 col-md-4 col-lg-3 col-xs-12">
            <Link to={"/productdetails/" + x._id} >
                <Card
                    hoverable
                    className="mt-3"
                    cover={<img alt="example" src={x.images.length ? IMAGE_URL + x.images[0] : null} className="ht_200" />}>
                    <div className="additional">
                        <p className="price">Price: {formatter.format(x.price)}
                            {/* <span className="pull-right socialIcon">
                            <a href="javascript:;"><i className="fa fa-heart-o"></i></a>
                            <a href="javascript:;"><i className="fa fa-share"></i></a>
                        </span> */}
                        </p>
                    </div>
                    <Meta title={x.name} description={x.description} />
                    <div className="additional">
                        {/* <p><i className="fa fa-clock-o"></i> 12 hours ago</p> */}
                        {/* <p><i className="fa fa-calendar-check-o"></i> {x.productType}</p> */}
                        <p><b>{x.productType}</b></p>
                        {/* <p><i className="fa fa-bars"></i> Category <span className="category">Sports & Outdoor</span></p>
                <p><i className="fa fa-user-o"></i> Username</p> */}
                    </div>
                </Card></Link>
        </div>)
        ) : null
        let product_img_url = constant.IMAGE_URL;
        let user = state.userDetails ? state.userDetails : '';
        let userRating = user ? parseInt(user.rating.averageRating) : 0;


        //profileimage
        var userimage = 'https://ss.stagingsdei.com:9031/uploads/profile_1605079222035.jpg'
        if (user.profilePhoto) {

            if (user.profilePhoto.length > 40) {
                userimage = user.profilePhoto;
                console.log('userrrr',userimage)
            }
        }

        return (<>
            <div className="overflowBox">
                <PageHeader
                    onBack={() => history.goBack()}
                    title="USER PROFILE"
                    subTitle="" />
                <div className="box box-default mb-4">
                    <div className="box-body">
                        <div className="row profileDetails">
                            <div className="col-sm-6 col-md-6">
                                <div className="row">
                                    <div className="col-sm-6 col-md-4">
                                        <img src={userimage} alt="profile_image" className="img-rounded img-responsive ht_150" />
                                        <div className="ratingBox text-center">
                                            <h4 className="rating-num">
                                                {/* {userRating} */}
                                            </h4>
                                            <div className="rating">
                                                {/* <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <i className="fa fa-star-o"></i> */}
                                                {/* <Rate allowHalf value={userRating} /> */}
                                                <Rate
                                                    disabled
                                                    allowHalf
                                                    value={userRating} />
                                            </div>
                                            <div>
                                                {/* <span className="fa fa-user"></span>  */}
                                                {/* {user ? user.userRating.totalUser : 0} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 col-md-8">
                                        <h4>
                                            {user.firstname} {user.lastname} &nbsp;
                                              {user.isVerified ? <span className="badge badge-success"> Verified user</span> : <span className="badge badge-danger"> Not Verified</span>} &nbsp;

                                        </h4>
                                        <cite title="">

                                        </cite>
                                        {/* <small> */}
                                        
                                            <i className="fa fa-map-marker"></i> {user.address ? user.address : ' NA'}{user.city ? ',' + user.city : ''}{user.state ? ',' + user.state : ''}{user.country ? ',' + user.country : ''}
                                        
                                        {/* </small> */}
                                        <p>
                                            <i className="fa fa-envelope"></i> {user.email}
                                            {/* <br /> */}
                                            {/* <i className="fa fa-globe"></i> <a href="http://www.google.com">www.google.com</a> */}
                                            <br />
                                            <i className="fa fa-gift"></i> Joined: {moment(user.joinedDate).format('LL')}
                                            <br />
                                            <i className="fa fa-mars"></i> {user.gender === 'male' ? 'Male' : 'Female'}
                                            <br />
                                            <i className="fa fa-mobile"></i> {user.phone ? user.phone : 'NA'}
                                        </p>

                                        {/* <div className="btn-group">
                                            <button type="button" className="btn btn-primary">
                                                Social</button>
                                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                <span className="caret"></span><span className="sr-only">Social</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Twitter</a></li>
                                                <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                                <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                                <li className="divider"></li>
                                                <li><a href="#">Github</a></li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4" >
                                <cite title="">

                                    <i className="fa fa-info-circle"></i> {user.bio ? user.bio : ' NA'}
                                    
                                </cite>
                            </div>
                        </div>
                        <hr />

                        {products.length ?
                            (<Spin spinning={this.state.loading} delay={500}>
                                <UserProduct products={products} />
                            </Spin>)
                            :
                            //      <div style={{ textAlign: 'center' }}>
                            //       <Button type="primary" loading={this.state.loading} onClick={this.loadMoreRecord}>
                            //          Load More
                            //      </Button> 
                            //  </div> :
                            <div style={{ textAlign: 'center' }}><Text type="warning">Products not added</Text></div>
                        }



                    </div>

                </div>

            </div>
        </>
        );
    }

}
function mapStateToProps(state) {
    return {
        userDetails: state.user.userDetails,
        productList: state.product.productList
    };
}
export default connect(mapStateToProps, { getUserDetails, getProductList })(UserProfile);
