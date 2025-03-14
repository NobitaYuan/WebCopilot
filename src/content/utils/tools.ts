/**
 * 创建事件监听器的控制函数
 * @param type - 要监听的事件类型，必须是 WindowEventMap 中定义的事件
 * @param listener - 事件处理函数
 * @param options - 事件监听器选项 (可选)
 *                - 当为布尔值时，表示是否在捕获阶段处理
 *                - 当为对象时，可包含 capture、once、passive 等选项
 * @returns [添加事件监听器的函数, 移除事件监听器的函数]
 *
 * @example
 * // 使用示例
 * const [addClick, removeClick] = getEventControl('click', () => console.log('clicked'));
 * addClick();    // 添加点击监听
 * removeClick(); // 移除点击监听
 */
export const getWindowEventControl = <K extends keyof DocumentEventMap>(
    type: K,
    listener: (event: DocumentEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
): [() => void, () => void] => {
    // 添加事件监听器的函数
    const addEvent = () => {
        document.addEventListener(type, listener, options)
    }
    // 移除事件监听器的函数
    const removeEvent = () => {
        document.removeEventListener(type, listener, options)
    }
    // 返回添加和移除事件的函数对
    return [addEvent, removeEvent]
}

// 记录上一次按下 键的时间
let lastKeyPressTime = 0

/**
 * 创建双击事件监听器的控制函数
 * @param key - 要监听的键名
 * @param trigger - 事件处理函数
 * @param doubleKeydownInterval - 双击事件的时间间隔阈值 (可选，默认为 300 毫秒)
 * @param options - 事件监听器选项 (可选)
 *                - 当为布尔值时，表示是否在捕获阶段处理
 *                - 当为对象时，可包含 capture、once、passive 等选项
 * @returns [添加事件监听器的函数, 移除事件监听器的函数]
 */
export const addDoubleKeydownEvent = (
    key: string,
    trigger: (event: DocumentEventMap['keydown']) => unknown,
    doubleKeydownInterval: number = 300,
    options?: boolean | AddEventListenerOptions,
): [() => void, () => void] => {
    return getWindowEventControl(
        'keydown',
        (event) => {
            if (event.key === key) {
                const currentTime = Date.now()
                // 检查两次按下键的时间间隔是否在阈值内
                if (currentTime - lastKeyPressTime < doubleKeydownInterval) {
                    // 触发双击事件
                    trigger(event)
                    // 重置上一次按下时间
                    lastKeyPressTime = 0
                } else {
                    // 更新上一次按下时间
                    lastKeyPressTime = currentTime
                }
            }
        },
        options,
    )
}
