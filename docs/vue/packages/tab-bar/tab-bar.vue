<script>
    import TabItem from './tab-item'
    export default {
        name: 'tab-bar',
        props: {
            data: {
                type: Array,
                default: () => []
            },
            value: {
                type: [String, Number],
                required: true
            },
            transition: {
                type: Boolean,
                default: true
            }
        },
        components: {
            TabItem
        },
        watch: {
            value (newVal) {
                this._updateSliderStyle()
            }
        },
        created () {
            this.tabs = []
        },
        mounted () {
            this._updateSliderStyle ()
        },
        methods: {
            trigger (val) {
                this.$emit('input', val)
            },
            addTabs (tab) {
                this.tabs.push(tab)
            },
            _updateSliderStyle () {
                let { width, index } = this._calculateWidthAndIndex()

                const slider = this.$refs.slider
                let offset = this._calculateOffsetLeft(index) + 'px'

                this.$nextTick(() => {
                    slider.style.width = `${width}px`
                    if (this.transition) {
                        slider.style.transition = 'transform .3s linear'
                    }
                    slider.style.transform = `translateX(${offset})`
                })
            },
            _calculateWidthAndIndex () {
                let width = 0, index = 0;
                if (this.tabs.length) {
                    index = this.tabs.findIndex(item => { return item.label == this.value })
                    width = this.tabs[index].$el.clientWidth
                }
                return {
                    width,
                    index
                }
            },
            _calculateOffsetLeft (index) {
                return this.tabs[index].$el.offsetLeft
            }
        },
        render () {
            return (
                <div class="tab-bar">
                    {
                        !this.$slots.default ?
                            this.data.length &&
                            this.data.map((item, index) => {
                                return (
                                    <tab-item
                                        label = {item.label}
                                        icon = {item.icon}
                                    ></tab-item>
                                )
                            })
                            : this.$slots.default
                        }
                    <div class="slider" ref= 'slider'></div>
                </div>
            )
        }
    }
</script>
<style lang="scss" scoped>
    .tab-bar{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .slider {
            position: absolute;
            height: 2px;
            bottom: 0;
            width: 20px;
            left: 0;
            background-color: #f01414;
        }
    }
</style>
