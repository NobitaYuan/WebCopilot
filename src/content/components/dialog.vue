<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import { CSSProperties } from 'vue'

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
    <div class="dialog_container" :style="dialogPositionStyle" v-show="selectionStore.state.isDialogShow" @click="selectionStore.toggleDialogShow(false)">
        {{ selectionStore }}
    </div>
</template>

<style lang="scss" scoped>
.dialog_container {
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
}
</style>
