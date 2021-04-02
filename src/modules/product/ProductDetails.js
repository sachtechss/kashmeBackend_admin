import React from 'react';
import { Card, PageHeader, Carousel,Modal,Button } from 'antd';
import { getProductDetails,getProductDelete } from '../product/actions/productActions';
import { connect } from 'react-redux';
import history from '../../history';
import { PRODUCT_IMG_PATH,IMAGE_URL } from '../../actions/utilAction';
import { formatter } from '../../actions/constant';
import moment from 'moment';
import * as constant from '../../actions/constant';
const { confirm } = Modal;

const { Meta } = Card;

class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productDetails: '',
        }
    }

    componentDidMount() {
        let obj = {
            productId: this.props.match.params.productId
        }
        this.props.getProductDetails(obj)
    }


    showConfirm(productId) {
        console.log('productId',productId)
        let self = this;
        let obj = {
            productId: productId
        }
        
        confirm({
            title: constant.DELETE_PRODUCT,
            content: '',
            onOk() {
                self.props.getProductDelete(obj)
            },
            onCancel() { },
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            productDetails: nextProps.productDetails,
        })
    }

    render() {
        let state = this.state;
        console.log('product_details',state.productDetails)
        var image_url = 'https://ss.stagingsdei.com:9031/uploads/'
        let product = state.productDetails ? state.productDetails : '';
        let pics = product ? product.images : [];
        const productsPic = pics.map((x, index) => <div key={index}>
            <Card
                hoverable
                cover={<img alt="example" src={x.length ? IMAGE_URL + x : null } className="ht_300"/>}
            >
            </Card>
        </div>);

        return (<>
            <PageHeader
                onBack={() => history.goBack()}
                title="PRODUCT DETAILS"
                subTitle=""
            />
            <div className="proDetails box box-default mb-4">
                <div className="row">
                    <div className="col-sm-6 col-md-4 proImageBox">
                        <Carousel autoplay>
                            {productsPic}
                        </Carousel>

                    </div>
                    <div className="col-sm-6 col-md-8">
                        <Card
                        // style={{  }}
                        // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <div className="additional">
                                <p className="price">Price: {formatter.format(product.price)}
                                    {/* <a href="javascript:void(0)" className="btn btn-info btn-sm"><i className="fa fa-pencil"></i></a> */}
                                    <span className="pull-right socialIcon">
                                        {/* <a href="javascript:void(0)"><i className="fa fa-heart-o"></i></a> */}
                                        <a href="javascript:void(0)"
                                        onClick={this.showConfirm.bind(this,product._id)}
                                        ><i className="fa fa-trash"
                                        ></i></a>
                                        {/* <Button className="btn btn-info btn-sm mr-2" onClick={this.showConfirm.bind(this, product._id)}><i className="fa fa-trash"></i></Button> */}
                                    </span>
                                </p>
                            </div>
                            <Meta title={product.name} description={product.description} />
                            <div className="additional">
                                <p><i className="fa fa-clock-o"></i> { moment(product.createdAt).startOf('day').fromNow()}</p>
                                <p><i className="fa fa-calendar-check-o"></i> {product.productType}</p>
                                <p><i className="fa fa-bars"></i> Category <span className="category">{product && product._category ? product.category.value.data.name : ''}</span></p>
                                <p><i className="fa fa-envelope"></i> {product ? product.user.email : ''}</p>
                            </div>
                        </Card>
                    </div>
                    
                </div>

            </div>
        </>
        );
    }

}
function mapStateToProps(state) {
    return {
        productDetails: state.product.productDetails
    };
}
export default connect(mapStateToProps, { getProductDetails, getProductDelete })(ProductDetails);
