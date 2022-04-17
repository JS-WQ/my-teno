// const BASE_URL = 'http://test2.yfd.com.cn/work92021/';
const BASE_STR = '/tools/yufei.ashx?action='

const config = {
    getRow: BASE_STR + 'get_model_parms',
    getOneRow: BASE_STR + 'get_list_parms_one',
    getRows: BASE_STR +'get_list_parms',
    getSubmenu: BASE_STR + 'get_category_list',
    getProvinces: BASE_STR + 'get_province_city',
    getStores: BASE_STR + 'get_address_channelid',
    getAlbum: BASE_STR + 'get_album_list',
    getSeo: BASE_STR + 'get_seo_list',
    postMsg: BASE_STR + 'submit_feedback',
    postEmail: BASE_STR + 'submit_Email',
    search: BASE_STR + 'get_list_search',
    getCity: BASE_STR + 'get_city',
    getAddresses: BASE_STR + 'get_address',
    getCategoryModel: BASE_STR + 'get_category_Model',
    submit_solution: BASE_STR + 'submit_solution'
}

export default config;