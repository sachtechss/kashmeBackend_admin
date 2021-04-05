
import React, { Component } from 'react';
import { Pagination, Button, Modal, PageHeader, Form, Input, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import CustomModal from '../../../components/common/CustomModal';
import ImageUploader from "react-images-upload";
import { getBanner, removeBanner, addBanner } from '../../admin/actions/adminActions';
import * as constant from '../../../actions/constant';
const { confirm } = Modal;

class Banners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 10,
            totalRecord: 0,
            bannerData: [],
            loading: true,
            visible: false,
            noItems: '',
            visible_view: false,
            imageView: '',
            file: null,
            pictures: [],
            image_validation: false,
            image_val_chk: false,
            imageError: 'Kindly upload Banner Image'
        };
    }

    componentDidMount() {
        let obj = {
            page: this.state.currentPage,
            // sortValue: this.state.sortValue,
            // sortOrder: this.state.sortOrder
        }

        this.props.getBanner(obj)

        setTimeout(() => {
            this.setState({
                loading: false,
                noItems: 'Banners need to be added'
            })
        }, 1000);
    }
    showModal = () => {

        this.setState({
            visible: true,

        });


    };
    handleOk = () => {
        if (!this.state.image_val_chk) {
            this.setState({ image_validation: true });
        } else {
            let obj = {
                bannerIcon: this.state.pictures,
            }
            this.setState({ visible: false, image_validation: false, image_val_chk: false });
            this.props.addBanner(obj)
        }
        this.setState({
            pictures: [],
            file: null,
        });

    };

    handleCancel = () => {
        this.setState({
            visible: false,
            file: null,
            image_val_chk: false,
            image_validation: false,
            imageError: 'Kindly upload Banner Image',
        });

    };

    async onDrop(pictureFiles, pictureDataURLs) {
        console.log('picture', pictureFiles)

        var image = new Image();
        image.src = URL.createObjectURL(pictureFiles[0]);

        var status = true;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (height < 900 && width < 600) {
                status = false;

            }
        };

        setTimeout(() => {
            if (status) {

                this.setState({
                    pictures: pictureFiles,
                    file: URL.createObjectURL(pictureFiles[0]),
                    image_val_chk: true,
                    imageError: 'Kindly upload Banner Image',
                    image_validation: false
                });
            } else {

                this.setState({
                    imageError: 'Kindly upload image with minimum 1080x720',
                    image_validation: true,
                   
                    file: null,
                    image_val_chk: false,
                });
            }
        }, 300);





    }

    viewBanner(pic) {

        this.setState({
            visible_view: true,
            imageView: pic
        })
    }

    handleCancel_view() {

        this.setState({
            visible_view: false,
            imageView: ''
        })
    }

    showConfirm(bannerId) {

        let self = this;
        let obj = {
            bannerId: bannerId
        }
        let userObj = {
            page: this.state.currentPage

        }
        confirm({
            title: constant.DELETE_RECORD,
            content: '',
            onOk() {
                self.props.removeBanner(obj, userObj)
            },
            onCancel() { },
        });
    }

    changePage(page) {

        this.setState({
            currentPage: page,
        });
        let obj = {
            page: page,
            // sortValue: this.state.sortValue,
            // sortOrder: this.state.sortOrder
        }

        this.props.getBanner(obj)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            bannerData: nextProps.bannerData,
            totalRecord: nextProps.totalCount
        });
    }

    render() {
        let state = this.state;
        let product_img_url = constant.IMAGE_URL;
        var sno = this.state.currentPage - 1;

        const banner = state.bannerData.map((x, index) => <tr key={index}>
            {index === 9 ? 
            <td>{ this.state.currentPage * (index + 1)}</td>
             : 
             <td>{sno === 0 ? '': sno }{index + 1}</td>
               }
            <td><img src={product_img_url + x.url} style={{ width: 40, height: 40 }} alt="Banner" title="yellowCow" /></td>
            <td>{x.createdAt.substring(0, 10)}</td>
            <td>
                <Button className="btn btn-info btn-sm mr-2" onClick={this.viewBanner.bind(this, x.url)} ><i className="fa fa-eye"></i></Button>
                <Button className="btn btn-info btn-sm mr-2"
                    onClick={this.showConfirm.bind(this, x._id)}
                ><i className="fa fa-trash"></i></Button>
            </td>
        </tr>);

        return (<>
            <div className="box box-default mb-4">
                <PageHeader
                    title="BANNERS"
                    subTitle=""
                    extra={[
                        <Button key="1" type="primary"
                            onClick={this.showModal.bind(this)}
                        >Add Banner</Button>,
                    ]}
                />
                <Spin spinning={this.state.loading} delay={500}>
                    <div className="box-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">S.no</th>
                                    <th scope="col">Banner Image</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banner.length ?
                                    banner :
                                    <tr>
                                        <td style={{ 'textAlign': 'center' }} colSpan="3">{state.noItems}</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                        <Pagination style={{ 'textAlign': 'right' }}
                            pageSize={this.state.pageSize}
                            defaultCurrent={this.state.currentPage}
                            total={this.state.totalRecord ? this.state.totalRecord : 1} onChange={this.changePage.bind(this)}
                        />

                        <CustomModal
                            handleCancel={this.handleCancel}
                            handleOk={this.handleOk}
                            visible={this.state.visible}
                            title="Banner"
                            backBtnText="Back"
                            submitBtnText="Submit">
                            <Form className="category-form">


                                {
                                    this.state.file != null ?
                                        (
                                            <div style={{ 'text-align': 'center' }} >
                                                <img src={this.state.file} alt="Icon" style={{ width: 100, height: 100 }} />

                                            </div>)
                                        : null
                                }

                                <ImageUploader
                                    withIcon={false}
                                    withPreview={false}
                                    buttonText="Choose Banner Minimum 1080 x 720"
                                    onChange={this.onDrop.bind(this)}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    label="Max file size: 5MB, Format Accepted: JPG|GIF|PNG"
                                />
                                <Row>
                                    <div class="ant-form-explain" style={{ 'text-align': 'center', 'color': 'red' }} > {this.state.image_validation ? this.state.imageError : ''}</div>
                                </Row>


                            </Form>
                        </CustomModal>

                        <Modal
                            visible={this.state.visible_view}
                            title='Banner'
                            //onOk={this.handleOk}
                            onCancel={this.handleCancel_view.bind(this)}
                            footer={[
                                <Button key="back"
                                    onClick={this.handleCancel_view.bind(this)}
                                >
                                    Cancel
                                </Button>
                            ]}
                        >
                            {this.state.visible_view ? (
                                <div style={{ 'text-align': 'center' }}>
                                    <img src={product_img_url + this.state.imageView} style={{ width: 300, height: 250 }} alt="Banner" title="yellowCow" />
                                </div>
                            ) : ''}
                        </Modal>



                    </div>
                </Spin>
            </div>
        </>
        );
    }
}

function mapStateToProps(state) {
    return {
        bannerData: state.admin.bannerData,
        totalCount: state.admin.bannerCount
    };
}


export default connect(mapStateToProps, { getBanner, removeBanner, addBanner })(Banners);
