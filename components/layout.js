import Head from 'next/head';

export default({ title = '无标题 | ezclub', children }) => (
    <div>
        <Head>
            <title>{ title }</title>
            <link rel="shortcut icon" type="image/ico" href="/static/favicon.ico" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <link rel='stylesheet' href='https://cdn.bootcss.com/antd/3.1.3/antd.min.css' />
        </Head>
        <style jsx global>{`
            body {
                margin: 0;
            }
        `}
        </style>
        { children }
    </div>
);