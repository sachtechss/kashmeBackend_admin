import React from 'react';
import { Pagination, Button, Modal, PageHeader, Form, Input, Spin, Row, Col,Select } from 'antd';
import CustomModal from '../../components/common/CustomModal';
import * as constant from '../../actions/constant';
import { getCategory, removeCategory, addCategory, editCategory } from '../admin/actions/adminActions';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
const { confirm } = Modal;

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 10,
            totalRecord: 0,
            visible: false,
            categoryData: [],
            categoryId: '',
            sortValue: '',
            sortOrder: -1,
            loading: true,
            pictures: [],
            noItems: '',
            action_add: true,
            image_edit: false,
            image_name: '',
            file: null,
            image_validation: false,
            image_val_chk: false
        };
    }

    componentDidMount() {
        let obj = {
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        this.props.getCategory(obj)
        setTimeout(() => {
            this.setState({
                loading: false,
                noItems: 'Category need to be added'
            })
        }, 1000);
    }

    showModal = (id, name, description, name_zh, description_zh, image, action_add, image_edit) => {

        this.setState({
            visible: true,
            categoryId: id,
            action_add: action_add,
            image_edit: image_edit,
            image_name: image,

        });
        this.props.form.setFieldsValue({ categoryname: name, categorydescription: description, categoryname_zh: name_zh, categorydescription_zh: description_zh })

    };

    handleOk = () => {
        this.props.form.validateFields((err, values) => {

            if (this.state.action_add) {
                //add
                let obj = {
                    name: values.categoryname,
                    description: values.categorydescription,
                    categoryIcon: this.state.pictures,
                    name_zh: values.categoryname_zh,
                    description_zh: values.categorydescription_zh,
                    
                }
                if (!err) {
                    if (!this.state.image_val_chk) {
                        this.setState({ image_validation: true });
                    } else {
                        this.setState({ visible: false ,
                            image_validation:false,
                            image_val_chk: false,
                            currentPage: 1 });
                        this.props.addCategory(obj)
                    }
                }
            } else {
                //edit
                let obj = {
                    id: this.state.categoryId,
                    name: values.categoryname,
                    description: values.categorydescription,
                    categoryIcon: this.state.pictures,
                    image_name: this.state.image_name,
                    image_edit: this.state.image_edit,
                    name_zh: values.categoryname_zh,
                    description_zh: values.categorydescription_zh,
                }
                if (!err) {

                    this.setState({ visible: false,
                        image_validation:false,
                        image_val_chk: false });
                    console.log(obj)

                    let userObj = {
                        page: this.state.currentPage,
                        sortValue: this.state.sortValue,
                        sortOrder: this.state.sortOrder,
                        pageSize: this.state.pageSize

                    }
                    this.props.editCategory(obj, userObj)
                }

            }

            this.setState({

                pictures: [],
                image_name: '',
                file: null
            });

        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            pictures: [],
            file: null,
            image_validation: false,
            image_val_chk: false
        });

    };

    manageSubCategory = (categoryId) => {
        history.push(constant.SUBCATEGORY + categoryId);
    }

    showConfirm(categoryId) {

        let self = this;
        let obj = {
            categoryId: categoryId
        }
        let userObj = {
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        confirm({
            title: constant.DELETE_RECORD,
            content: '',
            onOk() {
                self.props.removeCategory(obj, userObj)
            },
            onCancel() { },
        });
    }

    changePage(page, pageSize) {

        this.setState({
            currentPage: page,
        });
        let obj = {
            page: page,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }

        this.props.getCategory(obj)
    }

    handleChange(value) {

        this.setState({
            pageSize: value,
        });

        let obj = {
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: value
        }
        this.props.getCategory(obj);
        
    }

    sortData(sortVal) {
        
        let obj = {
            page: this.state.currentPage,
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            sortValue: sortVal,
            pageSize: this.state.pageSize

        }
        this.setState({
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            sortValue: sortVal,
        });
        this.props.getCategory(obj)
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.categoryData;
        this.setState({ categoryData: data, totalRecord: nextProps.totalCount, loading: false })
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles,
            image_edit: false,
            file: URL.createObjectURL(pictureFiles[0]),
            image_val_chk: true
        });
        console.log(pictureFiles);

    }



    render() {
        const { getFieldDecorator } = this.props.form;
        let state = this.state;
        let product_img_url = constant.IMAGE_URL;
        var sno = this.state.currentPage - 1;
        const { Option } = Select;
        //console.log(state)
        // x.value[1] && x.value[1].data.name != '' ? x.value[1].data.name : 'chinese name required'
        const category = state.categoryData.map((x, index) => <tr key={index}>
            <td style={{ 'width': '7%' }} >
                {
                  ( (this.state.currentPage - 1) * (this.state.pageSize)+index+1)

                }
                    </td>
            <td  style={{'width': '20%'}}  >{x.value[0].data.name}</td>
            <td style={{'width': '22%'}}  >{x.value[1] && x.value[1].data.name != '' ? x.value[1].data.name : 'chinese name required'}</td>
            <td style={{'width': '8%'}}  ><img src={product_img_url + x.value[0].data.categoryIcon} style={{ width: 40, height: 40 }} alt="category" title="yellowCow" /></td>
            <td style={{'width': '13%'}}  >{x.createdAt.substring(0, 10)}</td>
            <td style={{'width': '15%'}}  ><Link to={"/subcategory/" + x._id}><Button type="primary" >Sub Category</Button></Link></td>
            <td style={{'width': '15%'}}  >
                <Button className="btn btn-info btn-sm mr-2" onClick={this.showModal.bind(this, x._id, x.value[0].data.name, x.value[0].data.description, x.value[1] && x.value[1].data.name != '' ? x.value[1].data.name : 'chinese name required', x.value[1] && x.value[1].data.description != '' ? x.value[1].data.description : 'chinese description required', x.value[0].data.categoryIcon, false, true)}><i className="fa fa-pencil"></i></Button>
                <Button className="btn btn-info btn-sm mr-2" onClick={this.showConfirm.bind(this, x._id)}><i className="fa fa-trash"></i></Button>
                {/* <Button className="btn btn-info btn-sm" onClick={this.manageSubCategory.bind(this, x._id)} title="Sub Category"><i className="fa fa-eye"></i></Button> */}
            </td>
        </tr>);

        const image_edit = state.image_edit;
        const action_add = state.action_add;

        return (<>
            <div className="box box-default mb-4">
                <PageHeader
                    title="CATEGORY"
                    subTitle=""
                    extra={[
                        <Button key="1" type="primary" onClick={this.showModal.bind(this, "", "", "", "", "", "", true, false)}>Add Category</Button>,
                    ]}
                />
                <Spin spinning={this.state.loading} delay={500}>
                    <div className="box-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col" style={{'width': '7%'}} >Sr. No.</th>
                                    <th scope="col"  style={{'width': '20%'}}
                                    //onClick={this.sortData.bind(this, 'categoryname')}
                                    >Category Name
                                    {/* {this.state.sortOrder === 1 ? <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> : <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>} */}
                                    </th>
                                    <th scope="col"  style={{'width': '22%'}}  >分类名称</th>
                                    <th scope="col"  style={{'width': '8%'}}  >Icon</th>
                                    <th scope="col"  style={{'width': '13%'}} 
                                    onClick={this.sortData.bind(this, 'createdAt')}
                                    >Created On
                                    {this.state.sortOrder === 1 ? 
                                                <img src={require("../../img/up.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                    
                                    : 
                                    <img src={require("../../img/down.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                    
                                    }
                                    </th>
                                    <th scope="col"  style={{'width': '15%'}}  >Sub Categories</th>
                                    <th scope="col"  style={{'width': '15%'}}  >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {category.length ?
                                    category :
                                    <tr>
                                        <td style={{ 'textAlign': 'center' }} colSpan="6">{state.noItems}</td>
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
                        <Pagination showTotal={total => `Total ${total} items`} style={{ 'textAlign': 'right' }} pageSize={this.state.pageSize} defaultCurrent={this.state.currentPage} total={this.state.totalRecord ? this.state.totalRecord : 1} onChange={this.changePage.bind(this)} />
                        </Col>
                        </Row>
                        <CustomModal
                            handleCancel={this.handleCancel}
                            handleOk={this.handleOk}
                            visible={this.state.visible}
                            title="Category"
                            backBtnText="Back"
                            submitBtnText="Submit">
                            <Form className="category-form">
                                <Row>
                                    <Col span={11}>
                                        <Form.Item>
                                            {getFieldDecorator('categoryname', {
                                                rules: [{ required: true, whitespace: true, message: 'Please enter category' }],
                                            })(
                                                <Input placeholder="Category in English" />,

                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>

                                    </Col>
                                    <Col span={11}>
                                        <Form.Item>
                                            {getFieldDecorator('categoryname_zh', {
                                                rules: [{ required: true, whitespace: true, message: '请输入类别' }],
                                            })(
                                                <Input placeholder="中文类别" />,

                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    {getFieldDecorator('categorydescription', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter Description' }],
                                    })(
                                        <Input placeholder="Category Description in English" />,

                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('categorydescription_zh', {
                                        rules: [{ required: true, whitespace: true, message: '请输入说明' }],
                                    })(
                                        <Input placeholder="中文类别" />,

                                    )}
                                </Form.Item>
                                {
                                    image_edit ? (
                                        <div style={{ 'text-align': 'center' }} >
                                            <img src={"https://ss.stagingsdei.com:9031/uploads/" + state.image_name} style={{ width: 100, height: 100 }} alt="category" title="yellowCow" />
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

                                {
                                    action_add ? (
                                        <ImageUploader
                                            withIcon={false}
                                            withPreview={false}
                                            buttonText="Choose ICON"
                                            onChange={this.onDrop.bind(this)}
                                            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                            maxFileSize={5242880}
                                            singleImage={true}
                                            label="Max file size: 5MB, Format Accepted: JPG|GIF|PNG"

                                        />
                                    )
                                        :
                                        (
                                            <ImageUploader
                                                withIcon={false}
                                                withPreview={false}
                                                buttonText="Edit ICON"
                                                onChange={this.onDrop.bind(this)}
                                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                                label="Max file size: 5MB, Format Accepted: JPG|GIF|PNG"

                                            />
                                        )
                                }
                                <Row>
                                    <div class="ant-form-explain" style={{ 'text-align': 'center', 'color': 'red' }} > {this.state.image_validation ? 'Kindly upload Icon Image' : ''}</div>
                                </Row>
                                {/* <ImageUploader
                                    withIcon={false}
                                    withPreview={true}
                                    buttonText="Choose ICON"
                                    onChange={this.onDrop.bind(this)}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    
                                /> */}

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
        categoryData: state.admin.categoryData,
        totalCount: state.admin.categoryCount
    };
}
const Category = Form.create({ name: 'category' })(CategoryList);
export default connect(mapStateToProps, { getCategory, addCategory, removeCategory, editCategory })(Category);
