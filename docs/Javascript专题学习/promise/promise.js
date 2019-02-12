const PENGING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (excutor) {
    this.status = PENDING
    this.value = undefined
    this.onFulfilledCallbacks = []

    function resolve (value) {
        setTimeout(() => {
            if (this.status === PENGING) {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach( cb => cb (this.value))
            }
        })
    }
}