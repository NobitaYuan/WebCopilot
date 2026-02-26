<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import dialogBox from '@content/dialog/dialog.vue'
import { openSearch } from '@content/utils/search'

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

/** 处理快捷搜索按钮点击 */
const handleQuickSearch = () => {
    const engine = selectionStore.state.searchEngines.find((e) => e.id === selectionStore.state.searchConfig.defaultEngineId)
    if (engine && selectionStore.state.selectedStr) {
        openSearch(engine, selectionStore.state.selectedStr)
    }
}
</script>

<template>
    <div
        :style="bubblePositionStyle"
        class="webcopilot_content_container animate_rise_up"
        v-show="selectionStore.state.isBubbleShow"
        @click="selectionStore.toggleDialogShow(true)"
    >
        <!-- 快捷搜索按钮 -->
        <div class="quick_search" @click.stop="handleQuickSearch">🔍</div>
    </div>
    <!-- 交互框 -->
    <dialogBox />
</template>

<style lang="scss" scoped>
.webcopilot_content_container {
    position: fixed;
    // 最大值 - 1
    z-index: 2147483646;
    font-size: 12px;
    font-weight: 500;
    user-select: none;
    cursor: pointer;
    border-radius: 10px;
    /*
      如果要引用public中的图片资源，请按如下方式使用：
      background: url('chrome-extension://__MSG_@@extension_id__/images/app.png')
    */
    background: url('chrome-extension://__MSG_@@extension_id__/images/app.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow:
        0 5px 15px #00000014,
        0 2px 4px #0000001c;
    transition: all 0.3s ease-out;

    .quick_search {
        position: absolute;
        right: -22px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #dcdee1;
        transition: all 0.2s;

        .search_icon {
            width: 12px;
            height: 12px;
            color: #666;
        }

        &:hover {
            background-color: #409eff;
            border-color: #409eff;

            .search_icon {
                color: #fff;
            }
        }
    }

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
