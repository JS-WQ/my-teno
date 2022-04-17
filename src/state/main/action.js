const actions = {
    toHide(context,bool){
        context.commit('hideLoading', bool)
    },
    setMainHeadData(context,obj){
        context.commit('setMainHead', obj)
    },
}

export default actions