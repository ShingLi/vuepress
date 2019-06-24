/*
 * @Description: Switch react 组件
 * @Author: shingli
 * @Date: 2019-06-22 19:52:39
 * @LastEditTime: 2019-06-24 23:26:44
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react'

class Switch extends Component {
    render () {
        return (
            <label htmlFor="switch" className ='switch_wrapper'>
                <input type="checkbox" id= 'switch'/>
                <span className='switch_core'></span>
                <style jsx>
                    {
                        `
                            .switch_wrapper {
                                
                            }
                        `
                    }
                </style>
            </label>
        )
    }
}