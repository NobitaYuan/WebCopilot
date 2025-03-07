<script lang="ts" setup>
import { zhCn } from 'element-plus/es/locale/index.mjs'
</script>

<template>
    <div class="content_container">
        <el-config-provider :locale="zhCn">
            <ElButton>你好</ElButton>
        </el-config-provider>
    </div>
</template>

<style lang="scss" scoped>
/*
  如果要引用public中的图片资源，请按如下方式使用：
  background: url('chrome-extension://__MSG_@@extension_id__/images/app.png')
*/
.content_container {
    position: fixed;
    z-index: 9999;
    width: 50px;
    height: 50px;
    right: 50px;
    bottom: 50px;
    background: url('chrome-extension://__MSG_@@extension_id__/images/app.png');
    background-size: 100% 100%;
    cursor: pointer;
}
</style>
