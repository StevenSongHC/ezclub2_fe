import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@components/layout';
import { Button } from 'antd';
import 'isomorphic-unfetch';

export default class extends Component {
    static async getInitialProps() {
        const res = await fetch('http://ez2:8080/test');
        const json = await res.json();
        return {
            msg: json.msg
        };
    };

    render() {
        return (
            <Layout title='user | ezclub'>
                <div>{ this.props.msg }</div>
                <Button type="dashed">ANTD</Button>
            </Layout>
        );
    };
};
