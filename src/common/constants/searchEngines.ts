import { SearchEngine } from '@/types/search'
import { SearchConfig } from '@/types/search'

/**
 * 搜索引擎列表配置
 */
export const SEARCH_ENGINES: SearchEngine[] = [
    {
        id: 'baidu',
        name: '百度',
        icon: 'baiduIcon',
        urlTemplate: 'https://www.baidu.com/s?wd=',
    },
    {
        id: 'google',
        name: 'Google',
        icon: 'googleIcon',
        urlTemplate: 'https://www.google.com/search?q=',
    },
    {
        id: 'bing',
        name: 'Bing',
        icon: 'bingIcon',
        urlTemplate: 'https://www.bing.com/search?q=',
    },
]

/**
 * 默认搜索配置
 */
export const DEFAULT_CONFIG: SearchConfig = {
    defaultEngineId: 'baidu',
}
