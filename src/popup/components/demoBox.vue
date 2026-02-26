<script lang="ts" setup>
import viewport_animation from '@/popup/components/viewport_animation.vue'
import { useDarkModeStore } from '@/popup/stores'
import { useRouter } from 'vue-router'

const darkModeStore = useDarkModeStore()
const router = useRouter()
const dev = import.meta.env

/** 跳转到设置页面 */
const goToSettings = () => {
    router.push('/settings')
}
</script>

<template>
    <div class="demoBox">
        <viewport_animation>
            <h1>WebCopilot</h1>
        </viewport_animation>
        <div class="flex items-center gap-4">
            <ElSwitch :size="'large'" v-model="darkModeStore.isDark"></ElSwitch>
            黑夜模式
        </div>
        <div class="flex items-center gap-4">
            <ElButton type="primary" @click="goToSettings">设置</ElButton>
        </div>
        <ElCard :header="'环境变量'">
            <div class="flex flex-col gap-[12px] leading-[1.3]">
                <div class="flex w-full items-center" v-for="item of Object.entries(dev)" :key="item[0]">
                    <label class="w-[200px] text-[13px]">{{ item[0] }}：</label>
                    <div class="text-[18px]">{{ item[1] }}</div>
                </div>
            </div>
        </ElCard>
    </div>
</template>

<style lang="scss" scoped>
.demoBox {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAAXNSR0IArs4c6QAAAWlJREFUeNqlloFtwzAMBFU0PxF34k5eoUtktBZVnBysixEEUWBD+idpUnrTGXNkhPvt18awXZjKyE5BE5ix8sw6IEQHfKA1kZoMF5ZNnndqy1k2vae+wTAjMBPIp+sY3QJP1JADaXtvFjv4LR1TFKA5GD4suFSQcGEhjPWRn2+zKpRLT0hBwSo3lRerdpScpbMQCgZS2cH4tHQwerJVPIQjUVBH9wFTPOMgxnRwObhWLLkKlpaJA8TnpDxBwEv1r8Uo+ImegDVX4DBXKKWt3mQnZRRMlxZ7vfxDra6j0vD8vKUtKvJ79Pt1X9W6XxZNTvphhYxcGEjneWncGVH3pM2kAs6Qlq4XDIus4x2qDKieYEsz0nTAYd96MelYZEEgElZxnJtEa4mefZpr7hHGsLLmS2uDVgPGEUadgBxwrn3zwRwGhkU2NVqy6fUEbRs1CruoCM5zlPaIIL6/biLs0edft/d7IfjhT9gfL6wnSxDYPyIAAAAASUVORK5CYII=);
    background-attachment: scroll;
    background-color: var(--background-gray-50);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    color: var(--el-text-color-primary);
    padding: 24px;

    h1 {
        font-size: 40px;
        font-weight: bold;
    }
}
</style>
