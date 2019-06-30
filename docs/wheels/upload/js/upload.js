/*
 * @Description: upload
 * @Author: shingli
 * @Date: 2019-06-29 20:08:26
 * @LastEditTime: 2019-06-30 15:55:04
 * @LastEditors: Please set LastEditors
 */

class Upload {
    constructor (options) {
        const defaultOptions = {
            method: 'post'
        }
        this.options = Object.assign({}, defaultOptions, options)
        this.checkOptions ()
        this.init ()
    }
    checkOptions () {
        let { el, upload: { url, method, inputName } } = this.options
        if (!el || !url || !method || !inputName) {
            throw new Error('选项不能为空')
        }
    }
    init () {
        this.createDom ()
        this.addEvent ()
    }
    createDom () {
        var input = this.input =  document.createElement('input')
        input.type ='file'
        this.options.el.appendChild(input)
    }
    addEvent () {
        this.input.addEventListener('change', e => {
            let { upload } = this.options
            let formData = new FormData ()
            formData.append(upload.inputName, e.target.files[0])
            this.willUpload (formData)
            this.upload(formData)
        })
    }
    willUpload (formData) {
        this.options.el.classList.add('loading')
    }
    upload (formData) {
        
    }
}