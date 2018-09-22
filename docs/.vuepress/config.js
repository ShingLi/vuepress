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
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        [
            'meta',{
                name:'viewport',content:'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui'
            }
        ]
    ],
    themeConfig: {
        nav:[
            { text: '主页', link :'/'},
            {
                text: '博文',
                items: [
                    { text: 'CSS', link: '/css/'},
                    { text: 'Vue', link: '/vue/'},
                    { text: 'Koa', link: '/koa/'},
                    { text: 'JavaScript', link: '/javascript/'},
                    { text: 'ChinesePoetry', link: '/chinesePoetry/'}
                ]
            },
            { text: '关于', link: '/about/'},
            { text: 'GitHub', link: 'https://github.com/ShingLi'}

        ],
        sidebar: {
            '/css/': cssConfig(),
            '/koa/': koaConfig(),
            '/vue/': vueConfig(),
            '/javascript/': javascriptConfig(),
            '/chinesePoetry/':chinesePoetryConfig()
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
            title: 'css Sticky footers',
            collapsable: false,
            children: [
                ''
            ]
        }
    ]
}

function javascriptConfig () {
    return [
        {
            title:'ES6 标准入门',
            collapsable: false,
            children: [
                '',
                'promise',
                'array'
            ]            
        }
    ]
}

function vueConfig () {
    return [
        {
            title:'Vue.js',
            collapsable: false,
            children: [
                '',
                'Ide',
                'vant-SwipeCell'
            ]
        }
    ]
}
function chinesePoetryConfig() {
    return [
        {
            title:'中文古诗',
            collapsable: false,
            children: [
                ''
            ]
        }
    ]
}
function koaConfig() {
    return [
        {
            title:'Koa',
            collapsable: false,
            children: [
                '',
                'start'
            ]
        }
    ]
}