<template>
    <div class="cartcontrol">
        <transition name='move'>
            <div class="cart-decrease" v-show="food.count>0" @click= 'minus'>
                <span class="inner iconfont icon-minus-circle"></span>
            </div>
        </transition>
        <div class="cart-count">{{food.count - 0 > 0 ? food.count : ''}}</div>
        <div class="cart-add iconfont icon-plus-circle" @click.stop = 'add'></div>
    </div>
</template>
<script>
import './assets/iconfont.css'
export default {
    name: 'control',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        add () {
            this.food.count++
        },
        minus () {
            this.food.count--
        }
    }
}
</script>
<style lang="scss" scoped>
    .cartcontrol{
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        .cart{
            &-add{
                display: inline-block;
                padding: 6px;
                line-height: 24px;
                font-size: 24px;
                color: #00a0dc;
            }
            &-count{
                width: 12px;
                line-height: 24px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            &-decrease {
                display: inline-block;
                padding: 6px;
                opacity: 1;
                .inner{
                    display: inline-block;
                    line-height: 24px;
                    font-size: 24px;
                    color: #00a0dc;
                    transition: all .4s linear;
                    transform: rotate(0);
                }
                &.move-enter, &.move-leave-to{
                    opacity: 0;
                    transform: translate3d(24px, 0, 0);
                    .inner{
                        transform: rotate(180deg)
                    }
                }
                &.move-enter-active, &.move-leave-active{
                    transition: all .4s linear;
                }
            }
        }
    }
</style>
