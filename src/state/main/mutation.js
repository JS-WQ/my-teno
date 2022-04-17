const mutations = {
    hideLoading(state,bool){
        if(bool === false){
            if (state.teCampaignId) {
                state.isloading = bool
            } else {
                state.isloading = 'PENDDING'
            }
        }else{
            state.isloading = bool
        }
    },
    setMainHead(state,obj){
        state.teCampaignId = obj.teId;
        state.laCampaignId = obj.laId;
        state.headMenuImg = obj.headImg;
        if (state.isloading === 'PENDDING'){
            state.isloading = false
        }
    }
}
export default mutations