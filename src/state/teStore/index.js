import state from './state'
import mutations from './mutation'
import actions from './action'

const teStore = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default teStore