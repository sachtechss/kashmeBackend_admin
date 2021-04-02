import React from 'react';
import { PageHeader, Form, Input, Upload, Spin, message, Row, Col } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import autoBind from 'react-autobind';
import CustomModal from '../../components/common/CustomModal';
import { PROFILE_IMG_PATH } from '../../actions/utilAction';
import { updateProfile, updateProfilePic, getAdminDetails } from '../user/actions/userActions';
import { getBase64 } from '../../actions/constant';
import history from '../../history';
import ImageUploader from "react-images-upload";

import axios from 'axios';
import * as constant from '../../actions/constant';
import { API_URL } from '../../actions/utilAction';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userInfo: '',
            imageUrl: '',
            changeImage: false,
            loading: false,
            //action_add: true,
            image_edit: true,
            image_name: '',
            file: null,
            image_validation: false,
            image_val_chk: false,
            pictures: [],
        };
        autoBind(this);
    }


    componentDidMount() {

        this.props.getAdminDetails()

    }


    showModal = () => {
        
        let user = this.state.userInfo ? this.state.userInfo : this.props.userInfo;
        this.setState({
            visible: true,
           image_name:user.profilePhoto 
        });
        console.log('userrr',user)
        this.props.form.setFieldsValue({
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address
        })
    };

    handleOk = () => {
        let userInfo = this.state.userInfo;
        this.props.form.validateFields((err, values) => {



            let obj = {
                firstname: values.firstname,
                lastname: values.lastname,
                address: values.address,
                userId: userInfo.userId,
                    categoryIcon: this.state.pictures,
                    image_name: this.state.image_name,
                    image_edit: this.state.image_edit,
            }
            if (!err) {
                userInfo.firstname = values.firstname;
                userInfo.lastname = values.lastname;
                userInfo.address = values.address;
                this.setState({ visible: false, userInfo });
                this.props.updateProfile(obj)
            }
            
        });
    };

    handleCancel = () => {
        this.setState({ visible: false ,
            pictures: [],
            file: null,
            image_edit:true
        });
    };

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles,
            image_edit: false,
            file: URL.createObjectURL(pictureFiles[0]),
            image_val_chk: true
        });
        // console.log(pictureFiles);

    }


    // handleChange = info => {

    //     if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //     }

    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, imageUrl =>
    //             this.setState({
    //                 imageUrl,
    //                 changeImage: true
    //             }),
    //         );
    //         let formData = new FormData();
    //         formData.append("file", info.file.originFileObj)

    //         let obj = this.state.userInfo
    //         this.props.updateProfilePic(formData, obj)
    //     } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // };

    componentWillReceiveProps(nextProps) {
        this.setState({ userInfo: nextProps.userInfo, changeImage: false, imageUrl: nextProps.userInfo.profilePic })
    }

    render() {

        let state = this.state;
        let user = state.userInfo;
       // const action_add = state.action_add;
        const image_edit = state.image_edit;
        //let profilePic = state.imageUrl ? state.imageUrl : this.props.userInfo.profilePic;
        // console.log('this.props.userInfo', this.props.userInfo)
        const { getFieldDecorator } = this.props.form;


        //profileimage
        var userimage = 'https://ss.stagingsdei.com:9031/uploads/profile_1605079222035.jpg'
        if (user.profilePhoto) {

            if (user.profilePhoto.length > 40) {
                userimage = user.profilePhoto
            }
        }

        return (<>
            <div className="overflowBox">

                <PageHeader
                    title="PROFILE"
                    onBack={() => history.goBack()}
                    subTitle="" />
                <Spin spinning={this.state.loading} delay={500}>
                    <div className="box box-default mb-4">
                        <div className="box-body">
                            <div className="row profileDetails">
                                <div className="col-sm-6 col-md-6">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-4">
                                            {/* <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={this.handleChange}>

                                            {state.changeImage ? <img src={userimage ? userimage : "http://placehold.it/380x500"} alt="profile" className="img-rounded img-responsive img-104" /> :
                                                <img 
                                                src={userimage} 
                                                alt="profile" className="img-rounded img-responsive img-104" />}

                                        </Upload> */}

                                            <img
                                                src={userimage}
                                                alt="profile" height="150px" width="200px" />
                                        </div>
                                        <div className="col-sm-6 col-md-8">
                                            <h4>
                                                {user.firstname} {user.lastname} &nbsp;
                                        </h4>
                                            <cite title="">
                                                <i className="fa fa-map-marker"></i> {user.address ? user.address : ' NA'}
                                            </cite>
                                            <p>
                                                <i className="fa fa-envelope"></i> {user.email}
                                                <br />
                                                <i className="fa fa-gift"></i> Joined: {moment(user.joinedDate).format('LL')}
                                                <br />
                                                <i className="fa fa-mars"></i> {user.gender === 'male' ? 'Male' : 'Female'}

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
                                </div>
                                <div className="col-sm-6 col-md-6" style={{ textAlign: 'right' }}>
                                    <i className="fa fa-pencil btn" onClick={this.showModal}></i>
                                </div>
                            </div>
                            {/* <hr /> */}
                        </div>
                    </div>
                </Spin>
            </div>
            <CustomModal
                handleCancel={this.handleCancel}
                handleOk={this.handleOk}
                visible={this.state.visible}
                title="Profile Details"
                backBtnText="Back"
                submitBtnText="Submit">
                <Form className="profile-form">

                    {
                        image_edit ? (
                            <div style={{ 'text-align': 'center' }} >
                                <img src={state.image_name} style={{ width: 100, height: 100 }} alt="category" title="yellowCow" />
                            </div>
                        )
                            :
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
                                    buttonText="Edit IMAGE"
                                    onChange={this.onDrop.bind(this)}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    label="Max file size: 5MB, Format Accepted: JPG|GIF|PNG"

                                />
                       
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Firstname">
                                {getFieldDecorator('firstname', {
                                    rules: [{ transform: (value) => value.trim() },
                                    { required: true, message: 'Please enter your firstname' }],
                                })(
                                    <Input placeholder="Enter Firstname" />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={2}>

                        </Col>
                        <Col span={11}>
                            <Form.Item label="Lastname">
                                {getFieldDecorator('lastname', {
                                    rules: [{ transform: (value) => value.trim() },
                                    { required: true, message: 'Please enter your lastname' }],
                                })(
                                    <Input placeholder="Enter Lastname" />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Address">
                        {getFieldDecorator('address', {
                            rules: [{ transform: (value) => value.trim() },
                            { required: true, message: 'Please enter your address' }],
                        })(
                            <Input placeholder="Enter Address" />,
                        )}
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
        );
    }

}
function mapStateToProps(state) {

    return {
        userInfo: state.user.userInfo,
    };
}

const AdminProfile = Form.create({ name: 'profile' })(Profile);
export default connect(mapStateToProps, { updateProfile, updateProfilePic, getAdminDetails })(AdminProfile);
