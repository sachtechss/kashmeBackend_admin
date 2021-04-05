import React from 'react';
import { Pagination, Button, Modal, PageHeader, Form, Input, Spin, Row, Col,Select } from 'antd';
import CustomModal from '../../components/common/CustomModal';
import * as constant from '../../actions/constant';
import { getSubcategory, removeSubcategory, addSubCategory, editSubCategory, getemptySubcategory } from '../admin/actions/adminActions';
import { connect } from 'react-redux';
import history from '../../history';

const { confirm } = Modal;

class SubCategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalRecord: 0,
            visible: false,
            subcategoryData: [],
            subCategoryId: '',
            sortValue: '',
            sortOrder: -1,
            loading: true,
            action_add: true,
            noItems:'',
            pageSize: 10,
        };
    }

    componentDidMount() {
        let obj = {
            page: this.state.currentPage,
            categoryId: this.props.match.params.categoryId,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        this.props.getSubcategory(obj)
        setTimeout(() => {
            this.setState({
                loading:false,
                noItems:'Sub Category need to be added'
            })    
        }, 1000);
        
    }
    componentWillUnmount() {
        this.props.getemptySubcategory()
    }

    showModal = (id, name, description, name_zh, description_zh, action_add) => {
       
        this.setState({
            visible: true,
            subCategoryId: id,
            action_add: action_add

        });
        if (this.state.subcategoryData.length > 0) {
            this.props.form.setFieldsValue({ subcategoryname: name, subcategorydescription: description,subcategoryname_zh: name_zh, subcategorydescription_zh: description_zh })
        }
    };

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (this.state.action_add) {


                    this.setState({ visible: false,currentPage: 1 });
                    let obj = {
                        value: [
                            {
                                lang: "en",
                                data: {
                                    name: values.subcategoryname,
                                    description: values.subcategorydescription,
                                    _category: this.props.match.params.categoryId,

                                }
                            },
                            {
                                lang: "zh",
                                data: {
                                    name: values.subcategoryname_zh,
                                    description: values.subcategorydescription_zh,
                                    _category: this.props.match.params.categoryId,
                                }
                                
                            }
                        ]
                    }
                    let usrObj = {
                        
                        page: this.state.currentPage,
                        sortValue: this.state.sortValue,
                        sortOrder: this.state.sortOrder,
                        
    
                    }
                    this.props.addSubCategory(obj,usrObj)
                }
                else {
                    //edit

                    this.setState({ visible: false });
                    let obj = {
                        id: this.state.subCategoryId,
                        value: [
                            {
                                lang: "en",
                                data: {
                                    name: values.subcategoryname,
                                    description: values.subcategorydescription,
                                    _category: this.props.match.params.categoryId,

                                }
                            },
                            {
                                lang: "zh",
                                data: {
                                    name: values.subcategoryname_zh,
                                    description: values.subcategorydescription_zh,
                                    _category: this.props.match.params.categoryId,
                                }
                                
                            }
                        ]
                    }
                    let usrObj = {
                        
                        page: this.state.currentPage,
                        sortValue: this.state.sortValue,
                        sortOrder: this.state.sortOrder,
                        pageSize: this.state.pageSize

    
                    }
                    //console.log('sucategoryaddd=========>>>>>', obj)
                    this.props.editSubCategory(obj,usrObj)
                }
            } else {
            }
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    showConfirm(categoryId) {
        let self = this;
        let obj = {
            subCategoryId: categoryId,
            categoryId: this.props.match.params.categoryId
        }
        let usrObj = {
                        
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        confirm({
            title: constant.DELETE_RECORD,
            content: '',
            onOk() {
                self.props.removeSubcategory(obj,usrObj)
            },
            onCancel() { },
        });
    }

    changePage(page, pageSize) {
        this.setState({
            currentPage: page ,
        });
        let obj = {
            page: page,
            categoryId: this.props.match.params.categoryId,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: this.state.pageSize

        }
        
        this.props.getSubcategory(obj)
    }

    sortData(sortVal) {
        this.setState({
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            sortValue: sortVal,
        });
        let obj = {
            page: this.state.currentPage,
            categoryId: this.props.match.params.categoryId,
            sortValue: sortVal,
            sortOrder: this.state.sortOrder === -1 ? 1 : -1,
            pageSize: this.state.pageSize

        }
        this.props.getSubcategory(obj)
    }

    handleChange(value) {

        this.setState({
            pageSize: value,
        });

        let obj = {
            categoryId: this.props.match.params.categoryId,
            page: this.state.currentPage,
            sortValue: this.state.sortValue,
            sortOrder: this.state.sortOrder,
            pageSize: value
        }
        this.props.getSubcategory(obj);
        
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.subcategoryData;
        this.setState({ subcategoryData: data, totalRecord: nextProps.totalCount, loading: false })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        let state = this.state;
        var sno = this.state.currentPage - 1;
        const { Option } = Select;

        // console.log('subcategory========>',state)
        const subCategory = state.subcategoryData.map((x, index) => <tr key={index}>
           <td style={{ 'width': '7%' }} >
                {
                  ( (this.state.currentPage - 1) * (this.state.pageSize)+index+1)

                }
                    </td>
            <td style={{'width': '28%'}} >{x.value[0].data.name}</td>
            <td style={{'width': '30%'}} >{x.value[1] && x.value[1].data.name != '' ? x.value[1].data.name : 'chinese name required' }</td>
            <td style={{'width': '20%'}} >{x.createdAt.substring(0, 10)}</td>
            <td style={{'width': '15%'}} >
                <Button className="btn btn-info btn-sm mr-2" onClick={this.showModal.bind(this, x._id, x.value[0].data.name, x.value[0].data.description,x.value[1] && x.value[1].data.name != '' ? x.value[1].data.name : 'chinese name',x.value[1] && x.value[1].data.description != '' ? x.value[1].data.description : 'chinese description required', false)}><i className="fa fa-pencil"></i></Button>
                <Button className="btn btn-info btn-sm mr-2" onClick={this.showConfirm.bind(this, x._id)}><i className="fa fa-trash"></i></Button>
            </td>
            
        </tr>);
        

        return (<>
            <div className="box box-default mb-4">
                <PageHeader
                    onBack={() => history.goBack()}
                    title="Sub Category"
                    subTitle=""
                    extra={[
                        <Button key="1" type="primary" onClick={this.showModal.bind(this, "", "", "", "", "", true)}>Add Sub Category</Button>,
                    ]}
                />
                <Spin spinning={this.state.loading} delay={500}>
                    <div className="box-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col" style={{'width': '7%'}} >Sr. No.</th>
                                    <th scope="col"  style={{'width': '28%'}} 
                                    //onClick={this.sortData.bind(this, 'name')}
                                    >Sub Category 
                                    {/* {this.state.sortOrder === 1 ? <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> : <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>} */}
                                    </th>
                                    <th scope="col" style={{'width': '30%'}} >子类别</th>
                                    <th scope="col" style={{'width': '20%'}} 
                                    onClick={this.sortData.bind(this, 'createdAt')}>
                                        Created At
                                        {this.state.sortOrder === 1 ? 
                                                <img src={require("../../img/up.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                    
                                    : 
                                    <img src={require("../../img/down.png")} style={{ 'margin-left': '5px' }} height="16px" width="18px" alt="yellowCow" />
                                    
                                    }

                                        </th>
                                    <th scope="col" style={{'width': '15%'}} >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {subCategory.length ? 
                                subCategory : 
                                <tr>
                                    <td style={{ 'textAlign': 'center' }} colSpan="3">{state.noItems}</td>
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
                        <Pagination style={{ 'textAlign': 'right' }} pageSize={this.state.pageSize} defaultCurrent={this.state.currentPage} total={this.state.totalRecord ? this.state.totalRecord : 1} onChange={this.changePage.bind(this)} />
                        </Col>
                        </Row>
                        <CustomModal
                            handleCancel={this.handleCancel}
                            handleOk={this.handleOk}
                            visible={this.state.visible}
                            title="Sub Category"
                            backBtnText="Back"
                            submitBtnText="Submit">
                            <Form className="subcategory-form">
                            <Row>
                                <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('subcategoryname', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter sub category' }],
                                    })(
                                        <Input placeholder="Sub Category Name" />,
                                    )}
                                </Form.Item>
                                </Col>
                                <Col span={2}>

                                </Col>
                                <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('subcategoryname_zh', {
                                        rules: [{ required: true, whitespace: true, message: '请输入子类别' }],
                                    })(
                                        <Input placeholder="子类别名称" />,

                                    )}
                                </Form.Item>
                                </Col>
                                </Row>
                                <Form.Item>
                                    {getFieldDecorator('subcategorydescription', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter description' }],
                                    })(
                                        <Input placeholder="Sub Category Description" />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('subcategorydescription_zh', {
                                        rules: [{ required: true, whitespace: true, message: '请输入说明' }],
                                    })(
                                        <Input placeholder="中文类别" />,
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
        subcategoryData: state.admin.subcategoryData,
        totalCount: state.admin.subcategoryCount
    };
}
const SubCategory = Form.create({ name: 'subcategory' })(SubCategoryList);
export default connect(mapStateToProps, { getSubcategory, addSubCategory, removeSubcategory, editSubCategory, getemptySubcategory })(SubCategory);
