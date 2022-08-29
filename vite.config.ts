import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue'; // 让vite支持vue的template写法

import vueJsx from '@vitejs/plugin-vue-jsx'; // 让vite支持vue的jsx写法

import Unocss from './config/unocss';

const rollupOptions = {
  external: ['vue', 'vue-router'], // 作用是将该模块保留在 bundle 之外，比如在数组中添加了 vue ，就是为了不让 vue 打包到组件库中
  output: {
    // 这个配置用于 umd/iffe 包中，意思是全局中的某个模块在组件库中叫什么名字
    globals: {
      vue: 'Vue',
    },
    assetFileNames: `assets/[name].css`,
  },
};

export default defineConfig({
  plugins: [
    vue(),

    // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),

    // 添加UnoCSS插件
    Unocss(),
  ],

  // 添加库模式配置(构建的时候配置)
  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'。由于使用了 terser 用于代码压缩需要单独安装一下
    sourcemap: true, // 输出单独 source文件
    cssCodeSplit: true, //否要独立输出 css
    lib: {
      entry: './src/entry.ts',
      name: 'SmartyUI',
      fileName: 'smarty-ui',
      // 导出模块格式
      formats: ['es', 'umd', 'iife'],
    },
  },
  // vitest 配置
  test: {
    globals: true,
    // 是用于提供在 Node 环境中的 Dom 仿真模型
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
