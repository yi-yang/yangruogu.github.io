---
permalink: false
sitemap: false
---

# 本地开发环境配置指南

## 工作流程

```
本地开发和测试 → 确认无误 → 推送到 GitHub → 自动部署
```

## 第一步：安装 Ruby

### Windows 安装步骤

1. **下载 RubyInstaller for Windows**
   - 访问：https://rubyinstaller.org/downloads/
   - 下载 **Ruby+Devkit** 版本（推荐 Ruby 3.1.x 或 3.2.x）
   - 选择：`rubyinstaller-devkit-3.1.x-x-x.exe`

2. **安装 Ruby**
   - 运行安装程序
   - 勾选 "Add Ruby executables to your PATH"
   - 安装完成后，打开命令提示符或 PowerShell

3. **验证安装**
   ```bash
   ruby --version
   # 应该显示：ruby 3.1.x
   ```

## 第二步：安装 Jekyll 和 Bundler

打开 **命令提示符** 或 **PowerShell**（不是 Git Bash）：

```bash
# 安装 Bundler
gem install bundler

# 安装 Jekyll
gem install jekyll

# 验证安装
jekyll --version
# 应该显示：jekyll 4.x.x
```

## 第三步：安装项目依赖

在你的项目目录（`C:\Users\yiyan\code\yangruogu.github.io`）下：

```bash
# 进入项目目录
cd C:\Users\yiyan\code\yangruogu.github.io

# 安装 Gemfile 中定义的依赖
bundle install
```

## 第四步：启动本地服务器

```bash
# 启动 Jekyll 本地服务器
bundle exec jekyll serve

# 或者使用简写（如果 bundle exec jekyll 可用）
jekyll serve
```

服务器启动后，你会看到：
```
Server address: http://127.0.0.1:4000/
```

## 第五步：本地预览

1. 打开浏览器
2. 访问：**http://127.0.0.1:4000**
3. 现在可以看到本地运行的网站

## 开发工作流程

### 1. 修改内容

使用你喜欢的编辑器（VS Code、Notepad++ 等）修改文件：
- 修改 `_config.yml` - 配置文件
- 修改 `index.md` - 首页
- 修改 `_pages/*.md` - 其他页面
- 修改 `_posts/*.md` - 博客文章

### 2. 实时预览

Jekyll 会自动检测文件变化：
- 保存文件后
- 刷新浏览器（http://127.0.0.1:4000）
- 即可看到更新

### 3. 本地测试

确保：
- ✅ 页面显示正常
- ✅ 链接都能正常访问
- ✅ 样式显示正确
- ✅ 没有构建错误

### 4. 发布到 GitHub

确认无误后：

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "更新内容"

# 推送到 GitHub
git push
```

推送后，GitHub Actions 会自动构建和部署到 https://yangruogu.com

---

## 常用命令

```bash
# 启动本地服务器（默认端口 4000）
bundle exec jekyll serve

# 启动服务器并自动在浏览器打开
bundle exec jekyll serve --open-url

# 指定端口启动
bundle exec jekyll serve --port 4001

# 构建网站（不启动服务器）
bundle exec jekyll build

# 查看构建的网站
# 生成的文件在 _site 目录
```

## 常见问题

### 1. 端口 4000 被占用

```bash
# 使用其他端口
bundle exec jekyll serve --port 4001
```

### 2. 依赖安装失败

```bash
# 清除缓存重新安装
bundle cache --clear
bundle install
```

### 3. Jekyll 构建错误

```bash
# 查看详细错误信息
bundle exec jekyll build --verbose

# 或者使用 --trace 查看完整错误堆栈
bundle exec jekyll serve --trace
```

### 4. Windows 上编码问题

如果遇到中文乱码，设置环境变量：

```bash
# PowerShell
$env:LANG="en_US.UTF-8"
$env:LC_ALL="en_US.UTF-8"

# CMD
set LANG=en_US.UTF-8
set LC_ALL=en_US.UTF-8
```

---

## 项目结构

```
yangruogu.github.io/
├── _config.yml          # 网站配置文件
├── _pages/              # 页面文件
│   ├── about.md         # 关于页面
│   └── ...
├── _posts/              # 博客文章
│   └── 2026-01-01-welcome.md
├── _site/               # 生成的网站（自动生成，不要手动修改）
├── assets/              # 静态资源（图片、CSS、JS）
├── index.md             # 首页
├── Gemfile              # Ruby 依赖配置
├── CNAME                # 自定义域名
└── README.md            # 项目说明
```

---

## 调试技巧

### 1. 查看 Jekyll 日志

本地运行时，终端会显示详细的日志信息，包括：
- 构建过程
- 错误信息
- 警告信息

### 2. 检查 Liquid 模板错误

如果页面显示异常：
- 检查 `{% %}` 和 `{{ }}` 语法
- 确保变量名正确
- 查看 Jekyll 输出的错误信息

### 3. 验证 Markdown 语法

使用 Markdown 编辑器预览：
- VS Code + Markdown Preview Enhanced 插件
- Typora
- Obsidian

---

## 推荐工具

### 编辑器
- **VS Code** - 强大的代码编辑器
  - 安装插件：`jekyll`
  - 安装插件：`Markdown All in One`

### Markdown 编辑器
- **Typora** - 所见即所得
- **Obsidian** - 知识管理工具

### 图片处理
- **TinyPNG** - 图片压缩：https://tinypng.com/
- **Photopea** - 在线图片编辑：https://www.photopea.com/

---

## 下一步

安装完 Ruby 和 Jekyll 后：

1. 运行 `bundle install`
2. 运行 `bundle exec jekyll serve`
3. 访问 http://127.0.0.1:4000
4. 开始本地开发和测试

---

## 快速参考卡

```bash
# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问网站
http://127.0.0.1:4000

# 修改代码后
# 直接刷新浏览器即可

# 发布到 GitHub
git add .
git commit -m "更新内容"
git push
```
