const mutations = {
    hideLoading(state,bool){
        state.isloading = bool
    },
    setTeCampId(state,id){
        state.laCampaignId = id;
    },
    setCampaignList(state,arr){
        state.laCampaignList = arr
    },
    setHeadMenuImgs(state,arr){
        state.laHeadMenuImgs.newsImg = arr[0].big_img;
        state.laHeadMenuImgs.aboutImg = arr[1].big_img;
        state.laHeadMenuImgs.storeImg = arr[2].big_img;
        state.laHeadMenuImgs.campaignImg = arr[3].img_url;
    }
}
export default mutations