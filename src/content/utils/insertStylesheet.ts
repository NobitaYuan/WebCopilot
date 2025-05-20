/**
 * @description 将content.css的内容直接插入到shadowRoot里，以达成样式隔离
 * @param {ShadowRoot} parentElement
 * @description 参考来源 ：https://github.com/webpilot-ai/Webpilot/blob/main/src/contents/Index.vue
 */
export async function insertStylesheet(parentElement: ShadowRoot | HTMLElement) {
    const cssName = 'content.css'
    fetch(chrome.runtime.getURL(cssName))
        .then((v) => v.text())
        .then((themes) => {
            // console.log('themes', themes)
            const childElement = document.createElement('style')
            childElement.textContent = themes
            parentElement.insertBefore(childElement, parentElement.firstChild)
        })

    // const config = await (await fetch(chrome.runtime.getURL('manifest.json'))).json()
    // if (!config.content_scripts && !config.content_scripts.length) return
    // const tasks: Promise<string>[] = []
    // config.content_scripts.forEach((item: Record<string, string[]>) => {
    //     if (!item.matches?.includes('<all_urls>')) return
    //     item.css.forEach((name) => {
    //         // if (!/^Index\.\w+\.css$/.test(name)) return
    //         tasks.push(fetch(chrome.runtime.getURL(name)).then((v) => v.text()))
    //     })
    // })
    // tasks.push(fetch(chrome.runtime.getURL(cssName)).then((v) => v.text()))
    // const files = await Promise.all(tasks)
    // files.forEach((themes) => {
    //     const childElement = document.createElement('style')
    //     childElement.textContent = themes
    //     parentElement.insertBefore(childElement, parentElement.firstChild)
    // })
}
