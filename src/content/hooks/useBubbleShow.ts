/**
 * @description 控制气泡选择文本的显隐hook
 */
export const useBubbleShow = () => {
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
            xOffset: 16,
            /** y偏移,使气泡悬浮于鼠标右上角 */
            yOffset: 46,
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
        /**
         * Selection对象
         * 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
         */
        const selection = window.getSelection()
        selectedStr.value = selection.toString()
    }

    /** 鼠标抬起事件 */
    function handelMouseUp(e: MouseEvent) {
        mouseUpPosition.value.left = e.clientX
        mouseUpPosition.value.top = e.clientY

        if (selectedStr.value.length > 0) {
            isBubbleShow.value = true
            // console.log('selectedStr.value', selectedStr.value, e)
        } else {
            isBubbleShow.value = false
        }
    }

    /** 注册事件 */
    const addEvent = () => {
        document.addEventListener('selectionchange', handelSelectionchange)
        document.addEventListener('mouseup', handelMouseUp)
    }

    /** 移除事件 */
    const removeEvent = () => {
        document.removeEventListener('selectionchange', handelSelectionchange)
        document.removeEventListener('mouseup', handelMouseUp)
    }

    return {
        /** 气泡宽 */
        bubbleWidth,
        /** 气泡高 */
        bubbleHeight,
        /** 是否显示气泡 */
        isBubbleShow,
        /** 选中的文字 */
        selectedStr,
        /** 鼠标抬起时的位置 */
        mouseUpPosition,
        /** 位置样式 */
        bubblePositionStyle,
        /** 注册事件 */
        addEvent,
        /** 移除事件 */
        removeEvent,
    }
}
