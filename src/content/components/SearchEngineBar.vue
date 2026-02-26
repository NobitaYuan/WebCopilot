<script lang="ts" setup>
import type { SearchEngine } from '@/types/search'
import baiduIcon from '@/common/icons/baidu.svg?component'
import googleIcon from '@/common/icons/google.svg?component'
import bingIcon from '@/common/icons/bing.svg?component'

interface Props {
    /** 搜索引擎列表 */
    engines: SearchEngine[]
    /** 当前选中的搜索引擎 ID */
    modelValue: string
    /** 搜索关键词 */
    keyword: string
}

interface Emits {
    /** 更新选中的搜索引擎 */
    (e: 'update:modelValue', value: string): void
    /** 执行搜索 */
    (e: 'search', engine: SearchEngine, keyword: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 图标映射（后续可扩展为动态导入）
const iconMap: Record<string, any> = {
    baidu: baiduIcon,
    google: googleIcon,
    bing: bingIcon,
}

/** 处理搜索引擎点击 */
const handleEngineClick = (engine: SearchEngine) => {
    emit('update:modelValue', engine.id)
    if (props.keyword.trim()) {
        emit('search', engine, props.keyword)
    }
}
</script>

<template>
    <div class="search_engine_bar">
        <div class="engine_list">
            <div
                v-for="engine in engines"
                :key="engine.id"
                class="engine_item"
                :class="{ active: modelValue === engine.id }"
                @click="handleEngineClick(engine)"
            >
                <component :is="iconMap[engine.icon]" class="engine_icon" />
                <span class="engine_name">{{ engine.name }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search_engine_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;

    .engine_list {
        display: flex;
        gap: 8px;
        flex: 1;

        .engine_item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;

            &:hover {
                background-color: var(--el-fill-color-light);
            }

            &.active {
                background-color: var(--el-color-primary-light-9);
                border-color: var(--el-color-primary);
            }

            .engine_icon {
                width: 18px;
                height: 18px;
            }

            .engine_name {
                font-size: 13px;
            }
        }
    }
}
</style>
