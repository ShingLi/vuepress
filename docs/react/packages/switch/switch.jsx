/*
 * @Description: Switch react 组件
 * @Author: shingli
 * @Date: 2019-06-22 19:52:39
 * @LastEditTime: 2019-06-25 23:17:39
 * @LastEditors: Please set LastEditors
 */

import React, { Component, Fragment } from 'react'

class Switch extends Component {

    state = {
        checked: undefined
    }

    change = () => {
        this.setState({
            checked: this.input.checked
        })
    }

    render () {
        return (
            <Fragment>
                <label htmlFor="switch" className='switch_wrapper'>
                    <input type="checkbox" id='switch' className='switch_input' ref= {el => this.input = el} onClick = {this.change}/>
                    <span className='switch_core'></span>
                </label>
                <style jsx>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .switch_wrapper{
                        display: flex;
                        .switch_input {
                            display: none;
                        }
                        .switch_core {
                            width: 52px;
                            height: 32px;
                            overflow: hidden;
                            position: relative;
                            border: 1px solid #d5d5d5;
                            border-radius: 16px;
                            & ::before, ::after {
                                position: absolute;
                                content: "";
                                top: 0;
                                left: 0;
                                height: 30px;
                                transition: all .3s linear
                            }
                            & ::before {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                z-index: 9;
                                box-shadow: 0 0 3px rgba(0,0,0,.5);
                            }
                        }
                    }
                `}</style>
            </Fragment>
        )
    }
}

export default Switch