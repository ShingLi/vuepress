<template>
    <label class="lc-switch-wrapper">
        <input type="checkbox"
            class="lc-switch-input"
            v-model="currentValue"
            @change="$emit('change', $event.target.checked)"
        >
        <span class="lc-switch-core"></span>
        <div class="lc-switch-label">
            <slot></slot>
        </div>
    </label>
</template>
<script>
    export default {
        name: 'lc-switch',
        props: {
            value: Boolean,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            currentValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .lc-switch{
        &-wrapper{
            display: flex;
            align-items: center;
            & * {
                box-sizing: border-box;
            }
        }
        &-input{
            display: none;
            &:checked{
                + .lc-switch-core{
                    &::after{
                        transform: translateX(20px)
                    }
                    &::before{
                        transform: scale(0)
                    }
                    border-color: #26a2ff;
                    background-color:#26a2ff;
                }
            }
        }
        &-core{
            position: relative;
            display: block;
            width: 52px;
            height: 32px;
            border-radius: 15px;
            border: 1px solid #d9d9d9;
            background: #d9d9d9;
            &::before, &::after{
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                transition: all .3s;
            }
            &::before{
                width: 50px;
                height: 30px;
                border-radius: 15px;
                background: #fdfdfd;
            }
            &::after{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 1px 3px rgba(0,0,0,.4);
            }
        }
        &-label{
            margin-left: 10px;
        }

    }
</style>
