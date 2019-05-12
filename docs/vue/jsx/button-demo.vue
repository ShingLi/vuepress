<script>
    const ButtonCounter = {
        name: 'button-counter',
        props: ['count'],
        methods: {
            change () {
                this.$emit('change', this.count + 1)
            }
        },
        render () {
            return (
                <button onClick = { this.change }> 点我试试 { this.count } </button>
            )
        }
    }

    export default {
        name: 'button-counter-container',
        data () {
            return {
                count: 0
            }
        },
        methods: {
            onChange (val) {
                this.count = val
            }
        },
        render () {
            return (
                <div>
                    <ButtonCounter type= 'button' count = { this.count } onChange = { this.onChange } />
                </div>
            )
        }
    }
</script>
