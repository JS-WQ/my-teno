import state from './state'
import mutations from './mutation'
import actions from './action'

const mainStore = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default mainStore