import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@components/layout';
import { Button, Form, Input, Tooltip } from 'antd';
import 'isomorphic-unfetch';

class RegistrationForm extends Component {
    state = { confirmDirty: false }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("sending out ", values)
                fetch("http://ez2:8080/submitRegister", {
                    method: "POST",
                    "headers": { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                })
                .then( r => r.json() )
                .then( data => {
                    console.log(data);
                });
            }
        })
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value});
    }

    validateNickname = (rule, value, callback) => {
        if (value && (value.length < 3 || value.length > 11)) {
            callback("输入昵称长度必须大于 2 且小于 12");
        }
        callback();
    }
    validatePassword = (rule, value, callback) => {
        if (value && (value.length < 8 || value.length > 16)) {
            callback("请将密码长度设于 8 到 16 之间");
        } else if (value && this.state.confirmDirty) {
            this.props.form.validateFields(["confirm"], { force: true});
        }
        callback();
    }
    confirmPassword = (rule, value, callback) => {
        if (value && value !== this.props.form.getFieldValue("password")) {
            callback("两次输入的密码不一致");
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout} label="Email">
                    {getFieldDecorator("email", {
                        rules: [{
                            type: "email", message: "输入的邮箱地址无效"
                        }, {
                            required: true, message: "请输入邮箱地址"
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="昵称">
                    {getFieldDecorator("nickname", {
                        rules: [{
                            required: true, message: "请输入密码"
                        }, {
                            validator: this.validateNickname
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator("password", {
                        rules: [{
                            required: true, message: "请输入密码"
                        }, {
                            validator: this.validatePassword
                        }]
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="确认密码">
                    {getFieldDecorator("confirm", {
                        rules: [{
                            required: true, message: "请重复输入一次密码"
                        }, {
                            validator: this.confirmPassword
                        }]
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        )
    }
}
RegistrationForm = Form.create()(RegistrationForm);

export default class extends Component {
    static async getInitialProps() {
        console.log("entering register page");
        return {}
    }

    render () {
        return (
            <Layout title='注册 | ezclub'>
                <h1>欢迎注册</h1>
                <RegistrationForm />
            </Layout>
        )
    }
}
