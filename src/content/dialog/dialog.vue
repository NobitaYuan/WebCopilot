<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import { CSSProperties } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useCursorMove } from '../hooks'
import SearchEngineBar from '@content/components/SearchEngineBar.vue'
import { openSearch } from '@content/utils/search'
import type { SearchEngine } from '@/types/search'

const selectionStore = useSelectionStore()

const dialogPositionStyle = computed<CSSProperties>(() => {
    return {
        left: selectionStore.state.dialogPosition.left + moveX.value + 'px',
        top: selectionStore.state.dialogPosition.top + moveY.value + 'px',
        width: selectionStore.dialogWidth + 'px',
        minHeight: selectionStore.dialogMinHeight + 'px',
    }
})
const inOutDialog = (isIn: boolean) => {
    selectionStore.state.isDialogInner = isIn
}
const dialogRef = ref<HTMLElement>()

// 显示以后，根据dialog的实际高度，再次修正dialog出现的位置
watch(
    () => selectionStore.state.isDialogShow,
    async (val) => {
        if (!val) return
        if (!dialogRef.value) return
        await nextTick()
        const { height } = dialogRef.value.getBoundingClientRect()
        selectionStore.setDialogMinheight(height)
        selectionStore.dialogPositionFix()
        // 每次打开弹窗-加载配置
        selectionStore.initSearchConfig()
        // console.log('fixh', height, selectionStore.state)
    },
)

const dragRef = ref<HTMLElement>()
const { moveX, moveY } = useCursorMove(dragRef)

/** 处理搜索事件 */
const handleSearch = (engine: SearchEngine, keyword: string) => {
    openSearch(engine, keyword)
    selectionStore.toggleDialogShow(false)
}
</script>

<template>
    <div
        ref="dialogRef"
        class="webcopilot_dialog_container animate_rise_up"
        v-show="selectionStore.state.isDialogShow"
        :style="dialogPositionStyle"
        @mouseenter="inOutDialog(true)"
        @mouseleave="inOutDialog(false)"
    >
        <div class="hd">
            <div class="logo">WebCopilot</div>
            <div class="drag" ref="dragRef"></div>
            <button class="closeBtn" @click="selectionStore.toggleDialogShow(false)">
                <el-icon><Close /></el-icon>
            </button>
        </div>
        <div class="bd">
            <div class="textarea">
                <el-input
                    type="textarea"
                    v-model="selectionStore.state.selectedStr"
                    clearable
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入内容"
                />
            </div>
            <div class="operation">
                <SearchEngineBar :engines="selectionStore.state.searchEngines" :keyword="selectionStore.state.selectedStr" @search="handleSearch" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.webcopilot_dialog_container {
    position: fixed;
    // 最大值
    z-index: 2147483647;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.8) 0 4px 23px -6px;
    // transition: all 0.3s ease-out;
    border: 1px solid #dcdee1;
    font-weight: normal;
    font-size: 16px;
    padding: 6px 12px;
    max-height: 50vh;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .hd {
        display: flex;
        justify-content: space-between;
        .logo {
        }
        .drag {
            cursor: move;
            flex: 1;
            // background: var(--el-color-primary-light-9);
            margin-left: 10px;
        }
        .closeBtn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border-radius: 6px;
            cursor: pointer;
            color: #000;
            transform: translateX(6px);
            &:hover {
                color: var(--el-color-primary);
            }
        }
    }
    .bd {
        overflow: auto;
        flex: 1;

        .textarea {
        }
        .operation {
            font-size: 12px;
        }
    }
}
</style>
