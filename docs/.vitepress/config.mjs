import { defineConfig } from 'vitepress'
import topNav from "./topNav";
import { vitePressNote } from "./sideBar/vitePressBar";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"./",
  title: "张天博的博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: topNav,
    sidebar: {
      "/note/vitePress": vitePressNote,
    },
    logo: "/草莓熊.jpeg",
  
      // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: true, // string | boolean
    footer: {
      copyright: "Copyright © 2024Elmo",
    },
    lastUpdatedText: "最后更新",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Elmo2022' }
    ]
  }
})
