<!--
 * @Description: tab-item
 * @Author: shingli
 * @Date: 2019-05-19 15:12:17
 * @LastEditTime: 2019-05-26 15:42:09
 * @LastEditors: Please set LastEditors
 -->

<script>
    const tab = {
        name: 'tab-item',
        props: {
            label: {
                type: [String, Number],
                required: true
            },
            icon:{
                type: String,
                default: ''
            },
        },
        computed: {
            isActive () {
                return this.$parent.value == this.label
            }
        },
        created () {
            this.$parent.addTabs(this)
        },
        methods:{
            handleClick () {
                this.$parent.trigger(this.label)
            }
        },
        render () {
            // console.log(this)
            let className = 'tab-item'
            className += this.isActive ? ' tab-active-color' : ''
            return (
                <div class= { className }
                    onClick = { this.handleClick }
                >
                    {
                        !this.$slots.icon ? (
                            <i class= {this.icon} ></i>
                        ) : this.$slots.icon
                    }
                    {
                        !this.$slots.default ? <div domPropsInnerHTML = {this.label}></div> : this.$slots.default
                    }
                </div>
            )
        }
    }
    export default tab
</script>
<style lang="scss" scoped>
    .tab-item{
        flex:1;
        padding: 13px 0;
        color: #666;
        text-align: center;
    }
    .tab-active-color{
        color: #f01414;
    }
</style>
