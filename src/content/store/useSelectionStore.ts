import { defineStore } from 'pinia'
import { fixPosition, getWindowEventControl, addDoubleKeydownEvent } from '@content/utils'

export const useSelectionStore = defineStore('selectionStore', () => {
    const state = reactive({
        /** 选中的文字 */
        selectedStr: '',
        /** 文本选中后，鼠标抬起时的位置 */
        mouseUpPosition: {
            left: 0,
            top: 0,
        },
        /** 气泡显示 */
        isBubbleShow: false,
        /** 气泡位置 */
        bubblePosition: { left: 0, top: 0 },
        /** dialog显示 */
        isDialogShow: false,
        /** dialog位置 */
        dialogPosition: { left: 0, top: 0 },
        /** 是否在dialog内 */
        isDialogInner: false,
    })

    /* ______________selection_____________ */
    /**
     * 文本选中事件
     * Selection对象
     * 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
     */
    function handelSelectionchange() {
        const selection = window.getSelection()
        // 如果在打开的弹窗内，不处理
        if (state.isDialogInner) {
            return
        }
        // 打开弹窗后如果没有选中文字，不处理
        if (state.isDialogShow && !selection.toString().length) {
            return
        }
        state.selectedStr = selection.toString()
    }
    /** 鼠标抬起事件 */
    function handelMouseUp(e: MouseEvent) {
        state.mouseUpPosition.left = e.clientX
        state.mouseUpPosition.top = e.clientY

        if (state.selectedStr.length > 0) {
            toggleBubbleShow(true)
            bubblePositionFix()
        } else {
            toggleBubbleShow(false)
        }
    }

    const [addSelectionchangeEvent, removeSelectionchangeEvent] = getWindowEventControl('selectionchange', handelSelectionchange)
    const [addMouseUpEvent, removeMouseUpEvent] = getWindowEventControl('mouseup', handelMouseUp)

    /** 注册事件 */
    const addEvent = () => {
        addSelectionchangeEvent()
        addMouseUpEvent()
        addDoubleCtrlEvent()
    }
    /** 移除事件 */
    const removeEvent = () => {
        removeSelectionchangeEvent()
        removeMouseUpEvent()
        removeDoubleCtrlEvent()
    }

    /* ______________气泡_____________ */
    /** 气泡宽 */
    const bubbleWidth = 50
    /** 气泡高 */
    const bubbleHeight = 28
    /** 切换气泡 */
    const toggleBubbleShow = (val?: boolean) => {
        if (val === undefined) state.isBubbleShow = !state.isBubbleShow
        else state.isBubbleShow = Boolean(val)
    }
    /** 气泡位置修正 */
    const bubblePositionFix = () => {
        const { left, top } = fixPosition({
            x: state.mouseUpPosition.left,
            y: state.mouseUpPosition.top,
            domWidth: bubbleWidth,
            domHeight: bubbleHeight,
            // x偏移,使气泡悬浮于鼠标右上角
            xOffset: 16,
            // y偏移,使气泡悬浮于鼠标右上角
            yOffset: 46,
            // 内边距,用于显示时能与窗口周围有一定的边距
            padding: 20,
        })
        state.bubblePosition.left = left
        state.bubblePosition.top = top
    }

    /* ______________dialog_____________ */

    /** dialog宽高 */
    const dialogWidth = 450
    const dialogMinHeight = 200
    /** 切换dialog */
    const toggleDialogShow = (val?: boolean) => {
        if (val === undefined) state.isDialogShow = !state.isDialogShow
        else state.isDialogShow = Boolean(val)

        // 打开弹窗后，dialog位置修正，并且移除事件，关闭弹窗后，添加事件
        if (state.isDialogShow) {
            dialogPositionFix()
            removeMouseUpEvent()
            addEscapeEvent()
        } else {
            addMouseUpEvent()
            removeEscapeEvent()
        }
    }
    // esc事件
    const [addEscapeEvent, removeEscapeEvent] = getWindowEventControl('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            toggleDialogShow(false)
        }
    })
    /** dialog位置修正 */
    const dialogPositionFix = () => {
        const { left, top } = fixPosition({
            x: state.mouseUpPosition.left || window.innerWidth / 2 - dialogWidth / 2,
            y: state.mouseUpPosition.top || window.innerWidth / 2 - dialogMinHeight / 2,
            domWidth: dialogWidth,
            domHeight: dialogMinHeight,
            padding: 40,
        })
        state.dialogPosition.left = left
        state.dialogPosition.top = top
        state.isBubbleShow = false
    }

    /** 双击开启事件 */
    const [addDoubleCtrlEvent, removeDoubleCtrlEvent] = addDoubleKeydownEvent('Control', () => {
        toggleBubbleShow(false)
        toggleDialogShow(!state.isDialogShow)
    })

    return {
        state,
        // selection
        addEvent,
        removeEvent,
        // 气泡
        bubbleWidth,
        bubbleHeight,
        toggleBubbleShow,
        // dialog
        dialogWidth,
        dialogMinHeight,
        toggleDialogShow,
    }
})
