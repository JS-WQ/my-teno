import { createStore } from 'vuex'
import mainStore from './main'
import laStore from './laStore'
import teStore from './teStore'

const store = createStore({
    modules: {
        mainStore,
        teStore,
        laStore,
    }
})

export default store