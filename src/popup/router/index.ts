import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        redirect: '/settings',
    },
    {
        path: '/index.html',
        name: '/index.html',
        redirect: '/settings',
    },
    {
        path: '/index',
        name: 'index',
        meta: { title: 'Taco' },
        component: () => import('@/popup/views/index/index.vue'),
    },
    {
        path: '/settings',
        name: 'settings',
        meta: { title: '设置' },
        component: () => import('@/popup/views/setting/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: { title: '404' },
        component: () => import('@/popup/views/error/404View.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
