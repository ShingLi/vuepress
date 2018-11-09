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
                    { text: 'React', link: '/react/'},
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
            '/react/': reactConfig(),
            '/javascript/': javascriptConfig(),
            '/chinesePoetry/':chinesePoetryConfig()
        },
        sidebarDepth: 4,
        lastUpdated: 'Last Updated',
    },
    markdown: {
        // lineNumbers: true 
    }
}

function cssConfig () {
    return [
        {
            title: 'Css',
            collapsable: false,
            children: [
                'animation'
            ]
        }
    ]
}

function javascriptConfig () {
    return [
        {
            title:'ES5&ES6标准入门',
            collapsable: false,
            children: [
                '',
                'object',
                'function',
                'array',
                'object6',
                'promise',
                'class',
                'extendsClass'
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
                'vant-SwipeCell',
                'vue-config',
                'transition'
            ]
        }
    ]
}
function reactConfig () {
    return [
        {
            title: 'React.js',
            collapsable: false,
            children: [
                '',
                'jsx',
                'Components'
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