import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index'
import TeCampaign from '@/pages/TeCampaign'
import TeLookBook from '@/pages/TeLookBook'
import TeAbout from '@/pages/TeAbout'
import TeTeam from '@/pages/TeTeam'
import TeHistory from '@/pages/TeHistory'
import TeNew from '@/pages/TeNew'
import TeStar from '@/pages/TeStar'
import TeShow from '@/pages/TeShow'
import TeStores from '@/pages/TeStores'
import LaCampaign from '@/pages/LaCampaign'
import LaLookBook from '@/pages/LaLookBook'
import LaAbout from '@/pages/LaAbout'
import LaTeam from '@/pages/LaTeam'
import LaHistory from '@/pages/LaHistory'
import LaNew from '@/pages/LaNew'
import LaStar from '@/pages/LaStar'
import LaShow from '@/pages/LaShow'
import LaStores from '@/pages/LaStores'
import Group from '@/pages/Group'
import Culture from '@/pages/Culture'
import Career from '@/pages/Career'





const routes = [
    { path: '/', name: 'index', component: Index ,meta:{title:'马天奴集团官网'} },
    { path: '/culture', name: 'culture', component: Culture, meta: { title: '马天奴集团官网' } },
    { path: '/group', name: 'group', component: Group, meta: { title: '马天奴集团官网' }},
    { path: '/career', name: 'career', component: Career, meta: { title: '马天奴集团官网' }},
    { path: '/teCampaign/:id', name: 'teCampaign', component: TeCampaign, meta: { title: 'MY TENO' }},
    { path: '/teLookBook/:id', name: 'teLookBook', component: TeLookBook, meta: { title: 'MY TENO' }},
    { path: '/teAbout', name: 'teAbout', component: TeAbout, meta: { title: 'MY TENO' }},
    { path: '/teTeam', name: 'teTeam', component: TeTeam, meta: { title: 'MY TENO' }},
    { path: '/teHistory', name: 'teHistory', component: TeHistory, meta: { title: 'MY TENO' }},
    { path: '/teNew', name: 'teNew', component: TeNew, meta: { title: 'MY TENO' }},
    { path: '/teStar', name: 'teStar', component: TeStar, meta: { title: 'MY TENO' }},
    { path: '/teShow', name: 'teShow', component: TeShow, meta: { title: 'MY TENO' }},
    { path: '/teStores', name: 'teStores', component: TeStores, meta: { title: 'MY TENO' }},
    { path: '/laCampaign/:id', name: 'laCampaign', component: LaCampaign, meta: { title: 'La Danum' }},
    { path: '/laLookBook/:id', name: 'laLookBook', component: LaLookBook, meta: { title: 'La Danum' }},
    { path: '/laAbout', name: 'laAbout', component: LaAbout, meta: { title: 'La Danum' }},
    { path: '/laTeam', name: 'laTeam', component: LaTeam, meta: { title: 'La Danum' }},
    { path: '/laHistory', name: 'laHistory', component: LaHistory, meta: { title: 'La Danum' }},
    { path: '/laNew', name: 'laNew', component: LaNew, meta: { title: 'La Danum' }},
    { path: '/laStar', name: 'laStar', component: LaStar, meta: { title: 'La Danum' }},
    { path: '/laShow', name: 'laShow', component: LaShow, meta: { title: 'La Danum' }},
    { path: '/laStores', name: 'laStores', component: LaStores, meta: { title: 'La Danum' }},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router