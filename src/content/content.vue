<script lang="ts" setup>
import { zhCn } from 'element-plus/es/locale/index.mjs'

/** 气泡宽 */
const bubbleWidth = 50
/** 气泡高 */
const bubbleHeight = 28

/** 是否显示气泡 */
const isBubbleShow = ref(false)

/** 选中的文字 */
const selectedStr = ref('')

/** 鼠标抬起时的位置 */
const mouseUpPosition = ref({
    left: 0,
    top: 0,
})

/** 位置样式 */
const bubblePositionStyle = computed(() => {
    /** 位置修正 */
    const fixOffset = {
        /** x偏移,使气泡悬浮于鼠标右上角 */
        xOffset: 20,
        /** y偏移,使气泡悬浮于鼠标右上角 */
        yOffset: 50,
        /** 内边距,用于显示时能与窗口周围有一定的边距 */
        padding: 20,
    }

    // 初始位置
    let left = mouseUpPosition.value.left + fixOffset.xOffset
    let top = mouseUpPosition.value.top - fixOffset.yOffset

    // 窗口宽高
    const { innerWidth, innerHeight } = window
    // 最大位置
    const maxLeft = innerWidth - bubbleWidth - fixOffset.padding
    const maxTop = innerHeight - bubbleHeight - fixOffset.padding

    // 位置矫正
    if (left < 0) {
        left = fixOffset.padding
    }
    if (top < 0) {
        top = fixOffset.padding
    }
    if (left > maxLeft) {
        left = maxLeft
    }
    if (top > maxTop) {
        top = maxTop
    }
    return {
        left: left + 'px',
        top: top + 'px',
        width: bubbleWidth + 'px',
        height: bubbleHeight + 'px',
    }
})

/** 文本选中事件 */
function handelSelectionchange() {
    /** Selection 相关文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Selection */
    const selection = window.getSelection()
    selectedStr.value = selection.toString()
    if (selectedStr.value.length <= 0) {
        isBubbleShow.value = false
    }
}

/** 鼠标抬起事件 */
function handelMouseUp(e: MouseEvent) {
    mouseUpPosition.value.left = e.clientX
    mouseUpPosition.value.top = e.clientY

    if (selectedStr.value.length > 0) {
        isBubbleShow.value = true
        // console.log('selectedStr.value', selectedStr.value, e)
    }
    nextTick(() => {
        console.log('bubbleStyle.value', bubblePositionStyle.value)
    })
}

document.addEventListener('selectionchange', handelSelectionchange)
document.addEventListener('mouseup', handelMouseUp)
</script>

<template>
    <div :style="bubblePositionStyle" class="content_container rise_up" v-show="isBubbleShow">
        <el-config-provider :locale="zhCn"> </el-config-provider>
    </div>
</template>

<style lang="scss" scoped>
/*
  如果要引用public中的图片资源，请按如下方式使用：
  background: url('chrome-extension://__MSG_@@extension_id__/images/app.png')
*/
.content_container {
    // right: 50px;
    // bottom: 50px;
    position: fixed;
    z-index: 9999;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    background: url('chrome-extension://__MSG_@@extension_id__/images/app.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #dcdee1;
    box-shadow:
        0 5px 15px #00000014,
        0 2px 4px #0000001c;
    transition: all 0.1s ease-in-out;
    b &.rise_up {
        --animate-duration: 0.3s;
        animation: up var(--animate-duration) ease-in-out;
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
