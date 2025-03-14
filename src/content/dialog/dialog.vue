<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import { CSSProperties } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'

const selectionStore = useSelectionStore()

const dialogPositionStyle = computed<CSSProperties>(() => {
    return {
        left: selectionStore.state.dialogPosition.left + 'px',
        top: selectionStore.state.dialogPosition.top + 'px',
        width: selectionStore.dialogWidth + 'px',
        minHeight: selectionStore.dialogMinHeight + 'px',
    }
})
</script>

<template>
    <div class="webcopilot_dialog_container animate_rise_up" :style="dialogPositionStyle" v-show="selectionStore.state.isDialogShow">
        <button class="closeBtn" @click="selectionStore.toggleDialogShow(false)">
            <el-icon><CloseBold /></el-icon>
        </button>
        <div>
            {{ selectionStore }}
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
    padding: 12px;
    .closeBtn {
        position: absolute;
        right: -50px;
        top: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>
