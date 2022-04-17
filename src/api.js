import config from "./config";
import axios from "axios";
import qs from 'qs'

//拼接图片的路径

function setImgAddress(data){
    data.forEach(item => {
        if(typeof item !== 'object' || item === null){
            return;
        }
        if (typeof item.albums !== 'undefined' && item.albums.length > 0) {
            setImgAddress(item.albums)
        }
        if(Object.prototype.toString.call(item) === '[object Object]'){
            for (var key in item){
                setGetter(item, key)
            }
        }
    });
    
}

function setGetter(obj, key, basepath) {
    var val = obj[key];
    if (!val || Object.prototype.toString.call(val) === '[object Array]') {
        return;
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        // writable: true,
        get: function () {
            return (key === 'img_url' || key === 'big_img' || key === 'original_path' || key === 'video_src') ? 'https://www.myteno.com' + val : unescape(val);
        }
    });
}

function axiosPost(option) {
    axios({
        url: '/api' + option.url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: option.data
    }).then(res => {
        setImgAddress(res.data.data)
        option.success(res.data)
    }).catch(res => {
        option.error(res)
    })
}

const api = {
    getSubmenu: function (opt) {
        return new Promise((resolve, reject) => {
            axiosPost({
                url: config.getSubmenu,
                data: qs.stringify(opt),
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },
    getCategoryModel: function (opt) {
        return new Promise((resolve, reject) => {
            axiosPost({
                url: config.getCategoryModel,
                data: qs.stringify(opt),
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },
    getAlbum: function (opt) {
        return new Promise((resolve, reject) => {
            axiosPost({
                url: config.getAlbum,
                data: qs.stringify(opt),
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },
    getRows: function (opt) {
        return new Promise((resolve, reject) => {
            axiosPost({
                url: config.getRows,
                data: qs.stringify(opt),
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    },
    getRow: function (opt) {
        return new Promise((resolve, reject) => {
            axiosPost({
                url: config.getRow,
                data: qs.stringify(opt),
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    }
}

export default api