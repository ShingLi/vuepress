/*
 * @Description: Switch react 组件
 * @Author: shingli
 * @Date: 2019-06-22 19:52:39
 * @LastEditTime: 2019-06-26 22:15:12
 * @LastEditors: Please set LastEditors
 */

import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'

class Switch extends Component {

    state = {
        checked: undefined
    }

    handleChange () {
        const { props } = this
        
        this.setState({
            checked: !this.state.checked
        },() => {
            props.onChange && props.onChange(this.state.checked)
        })
    }

    componentWillMount () {
        const { props } = this
        props.checked && this.setState({
            checked: props.checked
        })
    }

    render () {
        return (
            <Fragment>
                <label htmlFor="switch" className='switch_wrapper'>
                    <input type="checkbox" 
                        id='switch' 
                        className='switch_input'
                        checked = { this.state.checked }
                        onChange = { this.handleChange.bind(this) }
                    />
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
                            & :checked + .switch_core{
                                & ::before {
                                    transform: translateX(20px)
                                }
                                & ::after {
                                    transform: scale(0)
                                }
                                border-color: #04BE02;
                                background-color: #04BE02;
                            }
                        }
                        .switch_core {
                            width: 52px;
                            height: 32px;
                            overflow: hidden;
                            position: relative;
                            border: 1px solid #d9d9d9;
                            border-radius: 16px;
                            background: #d9d9d9;
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
                                border-radius: 50%;
                                z-index: 9;
                                box-shadow: 0 0 3px rgba(0,0,0,.5);
                                background-color: #fff;
                            }
                            & ::after {
                                width: 50px;
                                background-color: #fff;
                                border-radius: 16px;
                            }
                        }
                    }
                `}</style>
            </Fragment>
        )
    }
}

Switch.propTypes = {
    checked: PropTypes.bool
}

export default Switch