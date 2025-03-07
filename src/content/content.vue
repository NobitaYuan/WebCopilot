<script lang="ts" setup>
import { zhCn } from 'element-plus/es/locale/index.mjs'

const selectedStr = ref('')
const handelSelectionchange = (event: Event) => {
    /** Selection 相关文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Selection */
    const selection = window.getSelection()
    selectedStr.value = selection.toString()

    // 获取鼠标的位置
    const mouseX = event.clientX
    const mouseY = event.clientY

    console.log('鼠标位置：', mouseX, mouseY)
    console.log('selectedChar.value', selection)
}
document.addEventListener('selectionchange', handelSelectionchange)
</script>

<template>
    <div class="content_container rise_up" v-show="selectedStr">
        <el-config-provider :locale="zhCn"> </el-config-provider>
    </div>
</template>

<style lang="scss" scoped>
/*
  如果要引用public中的图片资源，请按如下方式使用：
  background: url('chrome-extension://__MSG_@@extension_id__/images/app.png')
*/
.content_container {
    right: 50px;
    bottom: 50px;
    position: fixed;
    z-index: 9999;
    width: 50px;
    height: 28px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    background: url('chrome-extension://__MSG_@@extension_id__/images/app.png');
    background-size: contain;
    background-position: center;
    border: 1px solid #dcdee1;
    box-shadow:
        0 5px 15px #00000014,
        0 2px 4px #0000001c;

    &.rise_up {
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
