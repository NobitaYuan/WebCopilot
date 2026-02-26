import './chrome'

/**
 * Background Script - 处理来自 content script 和 popup 的消息
 */

// 初始化日志
console.log('🚀 WebCopilot Background Script initialized')

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Background received message:', request)

    // 处理搜索请求
    if (request.type === 'search') {
        console.log('🔍 Creating tab with URL:', request.url)
        chrome.tabs.create({ url: request.url }, (tab) => {
            if (chrome.runtime.lastError) {
                console.error('❌ Failed to create tab:', chrome.runtime.lastError)
                sendResponse({ success: false, error: chrome.runtime.lastError.message })
            } else {
                console.log('✅ Tab created successfully:', tab.id)
                sendResponse({ success: true, tabId: tab.id })
            }
        })
        return true // 保持消息通道开放以支持异步响应
    }

    return false
})

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener((details) => {
    console.log('📦 Extension installed/updated:', details.reason)
    if (details.reason === 'install') {
        console.log('✨ Thank you for installing WebCopilot!')
    }
})
