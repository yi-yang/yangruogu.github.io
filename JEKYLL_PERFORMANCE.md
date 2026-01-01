# Jekyll 性能优化方案

## 方案 1：使用增量构建（推荐）

启动时添加 `--incremental` 参数：

```bash
bundle exec jekyll serve --incremental
```

这样可以只重新构建修改过的文件。

---

## 方案 2：禁用实时监听（开发时使用）

如果只是想快速预览，可以禁用实时监听：

```bash
# 构建一次，不监听文件变化
bundle exec jekyll build

# 启动服务（不会自动重建）
bundle exec jekyll serve --no-watch
```

修改文件后按 `Ctrl+C` 停止，重新运行上述命令。

---

## 方案 3：下载主题到本地（大幅提升速度）

**这是最有效的方法！** 将 Minimal Mistakes 主题下载到本地，避免每次从 GitHub 下载。

### 步骤：

#### 1. 克隆主题到本地
在项目目录运行：

```bash
git clone https://github.com/mmistakes/minimal-mistakes.git themes/minimal-mistakes
```

#### 2. 修改 Gemfile
```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
# 注释掉这行
# gem "minimal-mistakes-jekyll"
```

#### 3. 修改 _config.yml
```yaml
# 注释掉远程主题
# remote_theme: mmistakes/minimal-mistakes

# 使用本地主题
theme: minimal-mistakes
```

#### 4. 重新安装依赖
```bash
bundle install
```

#### 5. 启动服务
```bash
bundle exec jekyll serve --incremental
```

---

## 方案 4：调整 Jekyll 配置

在 `_config.yml` 中添加性能优化配置：

```yaml
# 性能优化
highlighter: rouge
permalink: pretty

# 减少构建时间
lsi: false
quiet: false

# 禁用不需要的功能
# glossary_enabled: false
```

---

## 方案 5：使用更快的替代方案

### 使用 jekyll-admin（可选）

安装管理后台：
```bash
gem install jekyll-admin
```

在 Gemfile 中添加：
```ruby
gem "jekyll-admin"
```

---

## 快速启动命令

创建一个批处理文件 `start.bat`：

```batch
@echo off
echo Starting Jekyll server...
bundle exec jekyll serve --incremental --host 0.0.0.0 --port 4000 --livereloadport 35729
```

双击即可启动。

---

## PowerShell 配置文件

创建 `start.ps1`：

```powershell
Write-Host "Starting Jekyll server..." -ForegroundColor Green
bundle exec jekyll serve --incremental --host 0.0.0.0 --port 4000 --livereloadport 35729
```

---

## 性能对比

| 方法 | 启动速度 | 文件监听 | 推荐度 |
|------|---------|---------|--------|
| 默认（remote_theme） | 非常慢 (30-60s) | ✅ | ⭐⭐ |
| 本地主题 | 快 (5-10s) | ✅ | ⭐⭐⭐⭐⭐ |
| --incremental | 中等 (15-30s) | ✅ | ⭐⭐⭐⭐ |
| --no-watch | 快 (5-10s) | ❌ | ⭐⭐⭐ |

---

## 推荐组合

**最佳配置**（本地主题 + 增量构建）：

1. 下载主题到本地（方案 3）
2. 使用 `--incremental` 参数
3. 如果还是很慢，使用 `--no-watch` 手动刷新

---

## 故障排查

### 如果启动后看不到更改

1. 清除缓存：
```bash
bundle exec jekyll clean
bundle exec jekyll build
```

2. 删除 `.jekyll-cache` 目录：
```bash
rm -r .jekyll-cache
```

3. 重新启动服务

---

## 其他提示

### 首次启动慢是正常的
- Jekyll 需要读取所有文件
- 需要处理主题
- 首次启动可能需要 30-60 秒

### 后续启动应该快一些
- 使用 `--incremental` 后
- 只重新构建修改的文件
- 通常 5-15 秒

### 修改 CSS/JS 后
主题的 CSS 和 JS 需要重新编译，可能会慢一些。
