<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import { CSSProperties } from 'vue'
import { Close } from '@element-plus/icons-vue'

const selectionStore = useSelectionStore()

const dialogPositionStyle = computed<CSSProperties>(() => {
    return {
        left: selectionStore.state.dialogPosition.left + 'px',
        top: selectionStore.state.dialogPosition.top + 'px',
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
        console.log('fixh', height, selectionStore.state)
    },
)
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
            <button class="closeBtn" @click="selectionStore.toggleDialogShow(false)">
                <el-icon><Close /></el-icon>
            </button>
        </div>
        <div class="bd">
            <div>
                {{ selectionStore.state.selectedStr }}
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
    box-shadow:
        0 5px 15px #00000014,
        0 2px 4px #0000001c;
    transition: all 0.3s ease-out;
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
        line-height: 1.333;
    }
}
</style>
