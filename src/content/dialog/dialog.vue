<script lang="ts" setup>
import { useSelectionStore } from '@content/store/index'
import { CSSProperties } from 'vue'
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

/** 清空 textarea */
const handleClear = () => {
    selectionStore.state.selectedStr = ''
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
                <svg class="close-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    ></path>
                </svg>
            </button>
        </div>
        <div class="bd">
            <div class="textarea">
                <div class="custom-textarea-wrapper">
                    <textarea v-model="selectionStore.state.selectedStr" class="custom-textarea" placeholder="请输入内容" rows="3" />
                    <button v-if="selectionStore.state.selectedStr" class="textarea-clear-btn" @click="handleClear" type="button">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                            ></path>
                        </svg>
                    </button>
                </div>
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
            // background: #409eff;
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

            .close-icon {
                width: 20px;
                height: 20px;
            }

            &:hover {
                color: #409eff;
            }
        }
    }
    .bd {
        overflow: auto;
        flex: 1;

        .textarea {
            .custom-textarea-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;

                .custom-textarea {
                    width: 100%;
                    padding: 8px 40px 8px 11px;
                    font-size: 14px;
                    color: #606266;
                    background-color: #fff;
                    border: 1px solid #dcdfe6;
                    border-radius: 4px;
                    outline: none;
                    resize: none;
                    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    font-family: inherit;

                    &::placeholder {
                        color: #a8abb2;
                    }

                    &:hover {
                        border-color: #c0c4cc;
                    }

                    &:focus {
                        border-color: #409eff;
                    }
                }

                .textarea-clear-btn {
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                    height: 18px;
                    padding: 0;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    color: #a8abb2;
                    transition: color 0.2s;

                    svg {
                        width: 14px;
                        height: 14px;
                    }

                    &:hover {
                        color: #606266;
                    }
                }
            }
        }
        .operation {
            font-size: 12px;
        }
    }
}
</style>
