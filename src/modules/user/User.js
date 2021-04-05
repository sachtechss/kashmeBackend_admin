import React from 'react';
import { Switch, Pagination, Input, Modal, PageHeader, Button, Form, Spin, Row, Col, Select } from 'antd';
import CustomModal from '../../components/common/CustomModal';
import { Link } from "react-router-dom";
import { getUsers, deActivateUser, deleteUser, updateProfile_user } from './actions/userActions';
import { connect } from 'react-redux';
import * as constant from '../../actions/constant';
import { export_table_to_csv } from '../../static/utils/utils';

const { confirm } = Modal;
class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalRecord: 0,
            visible: false,
            search_string: '',
            userData: [],
            sortValue: '',
            sortOrder: '',
            loading: true,
            noItems: '',
            pageSize: 10,
            userId: '',
            editUser: [],
            nameSort: false,
            emailSort: false,
            createdSort: false
        };
    }
    componentDidMount() {
        let obj = {
            searchString: this.state.search_string,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize
        }
        this.props.getUsers(obj);
        setTimeout(() => {
            this.setState({
                loading: false,
                noItems: 'No Users registered'
            })
        }, 1000);
    }

    showConfirm(userId) {
        let self = this;
        let obj = {
            userId: userId
        }
        let userObj = {
            searchString: this.state.search_string,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        confirm({
            title: constant.DELETE_RECORD,
            content: '',
            onOk() { self.props.deleteUser(obj, userObj) },
            onCancel() { },
        });
    }

    deActivateUser(userId) {
        let values = {
            userId: userId,
        }

        let users = this.state.userData;
        let index = users.findIndex(x => x._id === userId);

        const status = users[index].isActive;

        const obj = {
            "userId": users[index]._id,
            "username": users[index].username,
            "firstname": users[index].firstname,
            "lastname": users[index].lastname,
            "profilePhoto": users[index].profilePhoto,
            "coverPhoto": users[index].coverPhoto,
            "phone": users[index].phone,
            "address": users[index].address,
            "city": users[index].city,
            "state": users[index].state,
            "country": users[index].country,
            "geo": users[index].geo,
            "gender": users[index].gender,
            "bio": users[index].bio,
            "isActive": !status
        }

        let userObj = {
            searchString: this.state.search_string,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        this.props.updateProfile_user(obj, userObj);
    }
    searchString(e) {
        this.setState({
            search_string: e.target.value
        });
        let obj = {
            searchString: e.target.value,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        this.props.getUsers(obj)
    }
    changePage(page) {
        this.setState({
            currentPage: page,
        });
        let obj = {
            searchString: this.state.search_string,
            page: page,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        this.props.getUsers(obj)
    }

    handleChange(value) {

        this.setState({
            pageSize: value,
        });

        let obj = {
            searchString: this.state.search_string,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: value
        }
        this.props.getUsers(obj);

    }

    exportRecord() {
        let html = document.querySelector("table").outerHTML;
        export_table_to_csv(html, "user.csv");
    }

    sortData(sortVal, name, email, created) {



        let obj = {
            searchString: this.state.search_string,
            page: this.state.currentPage,
            sortValue: sortVal,
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            pageSize: this.state.pageSize

        }
        this.setState({
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            sortValue: sortVal,
            nameSort: name,
            emailSort: email,
            createdSort: created
        });

        this.props.getUsers(obj)


    }
    showModal = (obj) => {

        this.setState({
            visible: true,
            userId: obj._id,
            editUser: obj

        });

        this.props.form.setFieldsValue({
            firstname: obj.firstname,
            lastname: obj.lastname,
            address: obj.address
        })

    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {

            var edit_userData = this.state.editUser;
            if (!err) {
                const obj = {
                    "userId": edit_userData._id,
                    "username": edit_userData.username,
                    "firstname": values.firstname,
                    "lastname": values.lastname,
                    "profilePhoto": edit_userData.profilePhoto,
                    "coverPhoto": edit_userData.coverPhoto,
                    "phone": edit_userData.phone,
                    "address": values.address,
                    "city": edit_userData.city,
                    "state": edit_userData.state,
                    "country": edit_userData.country,
                    "geo": edit_userData.geo,
                    "gender": edit_userData.gender,
                    "bio": edit_userData.bio,
                    "isActive": edit_userData.isActive
                }
                let userObj = {
                    searchString: this.state.search_string,
                    page: this.state.currentPage,
                    sortValue: this.state.sortValue,
                    sortOrder: this.state.sortOrder,
                    pageSize: this.state.pageSize


                }
                this.props.updateProfile_user(obj, userObj);

                this.setState({
                    visible: false,
                    userId: '',
                    editUser: []

                });


            }
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            userId: '',
            editUser: []
        });

    };

    componentWillReceiveProps(nextProps) {
        let data = nextProps.userData;
        this.setState({ userData: data, totalRecord: nextProps.totalCount, loading: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { Option } = Select;

        let state = this.state;
        let props = this.props;


        const users = state.userData.map((x, index) => <tr key={index}>
            <td style={{ 'width': '8%' }} >
                {
                    ((this.state.currentPage - 1) * (this.state.pageSize) + index + 1)

                }
            </td>

            <td style={{ 'width': '20%' }} >{x.firstname} {x.lastname}</td>
            <td style={{ 'width': '27%' }} >{x.email}</td>
            {/* <td>{x.address ? x.address : '-'}</td> */}
            <td style={{ 'width': '15%' }} >{x.createdAt.substring(0, 10)}</td>
            <td style={{ 'width': '10%' }} > <Switch checked={x.isActive} onChange={this.deActivateUser.bind(this, x._id)} /></td>
            <td style={{ 'width': '20%' }} > <Link to={"/userprofile/" + x._id}> <Button className="btn btn-info btn-sm mr-2"><i className="fa fa-eye"></i></Button></Link>
                <Button className="btn btn-info btn-sm mr-2" onClick={this.showModal.bind(this, x)} ><i className="fa fa-pencil"></i></Button>
                <Button className="btn btn-info btn-sm" onClick={this.showConfirm.bind(this, x._id)}><i className="fa fa-trash"></i></Button>
            </td>
        </tr>);


        return (<>
            <div className="box box-default mb-4">
                <PageHeader
                    title="USERS"
                    subTitle=""
                    extra={[
                        <Button key="export" type="dashed" size="small" onClick={this.exportRecord.bind(this)} title="export csv">
                            <i className="fa fa-download"></i>
                        </Button>,
                        <Input placeholder="Search" onChange={this.searchString.bind(this)} key="search" style={{ width: 'auto' }} />,
                    ]}
                />
                <Spin spinning={this.state.loading} delay={500}>
                    <div className="box-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ 'width': '8%' }}  >Sr. No.</th>
                                    <th scope="col" style={{ 'width': '20%' }}
                                        onClick={this.sortData.bind(this, 'firstname',true,false,false)}
                                    >Name

                                    {
                                    
                                            this.state.sortOrder === -1 && this.state.nameSort ?
                                                <img src={require("../../img/up.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                                :
                                                this.state.sortOrder === 1 && this.state.nameSort ?
                                                <img src={require("../../img/down.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                                : ''
                                    }
                                    </th>

                                    <th scope="col" style={{ 'width': '27%' }}
                                        onClick={this.sortData.bind(this, 'email',false,true,false)}
                                    >Email
                                    {
                                    
                                    this.state.sortOrder === -1 && this.state.emailSort ?
                                        <img src={require("../../img/up.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                        :
                                        this.state.sortOrder === 1 && this.state.emailSort ?
                                        <img src={require("../../img/down.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                        : ''
                            }
                                    </th>
                                    {/* <th scope="col"
                                        onClick={this.sortData.bind(this, 'email')}
                                    >Address
                                    {this.state.sortOrder === 1 ? <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> : <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>}
                                    </th> */}
                                    <th scope="col" style={{ 'width': '15%' }}
                                        onClick={this.sortData.bind(this, 'createdAt',false,false,true)}
                                    >Created On
                                    {
                                    
                                    this.state.sortOrder === -1 && this.state.createdSort ?
                                        <img src={require("../../img/up.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                        :
                                        this.state.sortOrder === 1 && this.state.createdSort ?
                                        <img src={require("../../img/down.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                        : ''
                            }
                                    </th>
                                    <th scope="col" style={{ 'width': '10%' }}   >Status</th>
                                    <th scope="col" style={{ 'width': '20%' }}   >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {users.length ?
                                    users :
                                    <tr>
                                        <td style={{ 'textAlign': 'center' }} colSpan="5">{state.noItems}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>


                        <Row>
                            <Col span={8}>
                                <Select defaultValue="10" style={{ width: 120 }}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <Option value="10">10 / Page</Option>
                                    <Option value="20">20 / Page</Option>
                                    <Option value="50">50 / Page</Option>
                                    <Option value="100">100 / Page</Option>
                                </Select>
                            </Col>

                            <Col span={16}>
                                <Pagination
                                    style={{ 'textAlign': 'right' }}
                                    pageSize={this.state.pageSize}
                                    defaultCurrent={this.state.currentPage}
                                    onChange={this.changePage.bind(this)}
                                    total={this.state.totalRecord ? this.state.totalRecord : 1}
                                    showTotal={total => `Total ${total} items`}
                                />
                            </Col>
                        </Row>

                        <CustomModal
                            handleCancel={this.handleCancel}
                            handleOk={this.handleOk}
                            visible={this.state.visible}
                            title="User Details"
                            backBtnText="Back"
                            submitBtnText="Submit">
                            <Form className="user">
                                <Form.Item label="Firstname">
                                    {getFieldDecorator('firstname', {
                                        rules: [{ transform: (value) => value.trim() },
                                        { required: true, message: 'Please enter firstname' }],
                                    })(
                                        <Input placeholder="Enter Firstname" />,
                                    )}
                                </Form.Item>
                                <Form.Item label="Lastname">
                                    {getFieldDecorator('lastname', {
                                        rules: [{ transform: (value) => value.trim() },
                                        { required: true, message: 'Please enter lastname' }],
                                    })(
                                        <Input placeholder="Enter Lastname" />,
                                    )}
                                </Form.Item>
                                <Form.Item label="Address">
                                    {getFieldDecorator('address', {
                                        rules: [{ transform: (value) => value.trim() },
                                        { required: true, message: 'Please enter address' }],
                                    })(
                                        <Input placeholder="Enter Address" />,
                                    )}
                                </Form.Item>
                            </Form>
                        </CustomModal>
                    </div>
                </Spin>
            </div>
        </>
        );
    }

}

function mapStateToProps(state) {
    return {
        userData: state.user.userData,
        totalCount: state.user.totalCount,
        userInfo: state.login.authData
    };
}

const User = Form.create({ name: 'user' })(Users);

export default connect(mapStateToProps, { getUsers, deActivateUser, deleteUser, updateProfile_user })(User);

