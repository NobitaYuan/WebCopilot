<script lang="ts" setup>
import { zhCn } from 'element-plus/es/locale/index.mjs'
import { useSelectionStore } from '@content/store/index'
import dialogBox from '@content/components/dialog.vue'

const selectionStore = useSelectionStore()

onMounted(() => {
    selectionStore.addEvent()
})

const bubblePositionStyle = computed(() => {
    return {
        left: selectionStore.state.bubblePosition.left + 'px',
        top: selectionStore.state.bubblePosition.top + 'px',
        width: selectionStore.bubbleWidth + 'px',
        height: selectionStore.bubbleHeight + 'px',
    }
})
</script>

<template>
    <div
        :style="bubblePositionStyle"
        class="content_container rise_up"
        v-show="selectionStore.state.isBubbleShow"
        @click="selectionStore.toggleDialogShow(true)"
    >
        <el-config-provider :locale="zhCn"> </el-config-provider>
    </div>
    <dialogBox />
</template>

<style lang="scss" scoped>
/*
  如果要引用public中的图片资源，请按如下方式使用：
  background: url('chrome-extension://__MSG_@@extension_id__/images/app.png')
*/
.content_container {
    position: fixed;
    // 最大值 - 1
    z-index: 2147483646;
    font-size: 12px;
    font-weight: 500;
    user-select: none;
    cursor: pointer;
    border-radius: 10px;
    background: url('chrome-extension://__MSG_@@extension_id__/images/app.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #dcdee1;
    background-color: #fff;
    box-shadow:
        0 5px 15px #00000014,
        0 2px 4px #0000001c;
    transition: all 0.3s ease-out;
    &:hover {
        background-color: #dbdeff;
    }
    &.rise_up {
        animation: up 0.3s ease-in-out;
        @keyframes up {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style>
