const mutations = {
    hideLoading(state,bool){
        state.isloading = bool
    },
    setTeCampId(state,id){
        state.teCampaignId = id;
    },
    setCampaignList(state, arr) {
        state.teCampaignList = arr
    },
    setHeadMenuImgs(state, arr) {
        state.teHeadMenuImgs.newsImg = arr[0].big_img;
        state.teHeadMenuImgs.aboutImg = arr[1].big_img;
        state.teHeadMenuImgs.storeImg = arr[2].big_img;
        state.teHeadMenuImgs.campaignImg = arr[3].img_url;
    }
}
export default mutations