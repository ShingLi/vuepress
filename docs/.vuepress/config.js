module.exports = {
    title: '邂逅烟雨浮萍',
    description: 'shingli的博客',
    serviceWorker: true,
    locales: {
        '/':{
            lang: 'zh-CN'
        }
    },
    port:8081,
    dest: './dist',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }]
    ],
    themeConfig: {
        nav:[
            { text: '主页', link :'/'},
            {
                text: '博文',
                items: [
                    { text: 'CSS', link: '/css/'},
                    { text: 'Vue', link: '/vue/'},
                    { text: 'JavaScript', link: '/javascript/'}
                ]
            },
            { text: '关于', link: '/about/'},
            { text: 'GitHub', link: 'https://github.com/ShingLi'}

        ],
        sidebar: {
            '/css/': cssConfig()
        },
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
    },
    markdown: {
        // lineNumbers: true 
    }
}

function cssConfig () {
    return [
        {
            title: 'Css Sticky footers',
            collapsable: false,
            children: [
                ''
            ]
        }
    ]
}