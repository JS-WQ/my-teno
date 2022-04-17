const actions = {
    toHide(context,bool){
        context.commit('hideLoading', bool)
    },
    setTeCampId(context,id){
        context.commit('setTeCampId', id)
    },
    setCampaignList(context, arr) {
        //形象视觉数据
        context.commit('setCampaignList', arr)
    },
    setHeadMenuImgs(context, arr) {
        //菜单图片数据
        context.commit('setHeadMenuImgs', arr)
    }
}

export default actions