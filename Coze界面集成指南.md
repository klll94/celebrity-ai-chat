# 使用Coze官方界面框架集成指南

## 方案对比

### 当前方案（自建界面）
- ✅ 完全自定义界面
- ✅ 移动端优化
- ❌ 需要手动维护
- ❌ 功能相对有限

### Coze官方界面方案
- ✅ 官方维护，功能完整
- ✅ 自动获取Bot配置（包括预设问题）
- ✅ 内置更多功能（文件上传、图片生成等）
- ❌ 样式定制受限

## 实现方式

### 方式1：使用Coze Chat SDK（推荐）

#### 1. 获取Bot ID和API Key
- 登录 [Coze开发平台](https://www.coze.cn/studio)
- 在你的Bot详情页获取Bot ID
- 在个人设置中生成API Key

#### 2. 集成Chat SDK
```html
<!DOCTYPE html>
<html>
<head>
    <title>名人智能体对话</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <!-- Coze Chat SDK -->
    <script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js"></script>
    <script>
        // 多Bot配置
        const CELEBRITY_BOTS = {
            'libai': {
                bot_id: 'YOUR_LIBAI_BOT_ID',
                title: '李白 (701-762)',
                description: '唐代浪漫主义诗人，被誉为"诗仙"'
            },
            'luxun': {
                bot_id: 'YOUR_LUXUN_BOT_ID', 
                title: '鲁迅 (1881-1936)',
                description: '中国现代文学奠基人'
            }
            // 添加其他18个角色...
        };

        let currentChatClient = null;

        // 创建角色选择界面
        function createCelebrityGrid() {
            const container = document.createElement('div');
            container.style.cssText = `
                max-width: 430px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            `;

            const title = document.createElement('h1');
            title.textContent = '名人智能体对话';
            title.style.cssText = `
                color: white;
                text-align: center;
                margin-bottom: 30px;
                font-size: 2rem;
            `;

            const grid = document.createElement('div');
            grid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            `;

            Object.entries(CELEBRITY_BOTS).forEach(([id, config]) => {
                const card = document.createElement('div');
                card.style.cssText = `
                    background: rgba(255,255,255,0.95);
                    border-radius: 16px;
                    padding: 16px;
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                `;
                
                card.innerHTML = `
                    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">
                        ${config.title.split(' ')[0]}
                    </div>
                    <div style="font-size: 0.9rem; color: #667eea; margin-bottom: 8px;">
                        ${config.title.includes('(') ? config.title.match(/\((.*?)\)/)[1] : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: #666;">
                        ${config.description}
                    </div>
                `;

                card.onclick = () => startChat(id, config);
                grid.appendChild(card);
            });

            container.appendChild(title);
            container.appendChild(grid);
            document.body.appendChild(container);
        }

        // 启动与指定角色的对话
        function startChat(celebrityId, config) {
            // 隐藏选择界面
            document.body.innerHTML = '';
            
            // 创建返回按钮
            const backBtn = document.createElement('button');
            backBtn.textContent = '← 返回角色选择';
            backBtn.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                z-index: 9999;
                padding: 8px 16px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            `;
            backBtn.onclick = () => location.reload();
            document.body.appendChild(backBtn);

            // 销毁之前的聊天实例
            if (currentChatClient) {
                currentChatClient.destroy && currentChatClient.destroy();
            }

            // 创建新的Coze聊天实例
            currentChatClient = new CozeWebSDK.WebChatClient({
                config: {
                    bot_id: config.bot_id,
                },
                componentProps: {
                    title: config.title,
                    width: '100%',
                    height: '100vh',
                    // 使用Coze原生界面样式
                    theme: 'light'
                },
                auth: {
                    type: 'token',
                    token: 'YOUR_COZE_API_KEY', // 替换为你的API Key
                }
            });
        }

        // 页面加载时显示角色选择
        window.onload = createCelebrityGrid;
    </script>
</body>
</html>
```

### 方式2：使用Coze嵌入式组件

#### 简化版本（适合快速部署）
```html
<!DOCTYPE html>
<html>
<head>
    <title>李白智能体</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js"></script>
    <script>
        new CozeWebSDK.WebChatClient({
            config: {
                bot_id: 'YOUR_LIBAI_BOT_ID', // 替换为李白的Bot ID
            },
            componentProps: {
                title: '与李白对话',
                width: '100%',
                height: '100vh'
            },
            auth: {
                type: 'token',
                token: 'YOUR_COZE_API_KEY', // 替换为你的API Key
            }
        });
    </script>
</body>
</html>
```

## 配置步骤

### 1. 获取必要信息
1. 登录Coze平台：https://www.coze.cn/studio
2. 找到你的Bot，复制Bot ID（在URL中或Bot详情页）
3. 生成API Key：个人设置 → API Keys → 新建

### 2. 替换代码中的占位符
- `YOUR_LIBAI_BOT_ID` → 你的李白Bot ID
- `YOUR_COZE_API_KEY` → 你的API Key

### 3. 部署到GitHub Pages
1. 将HTML文件保存为 `index.html`
2. 上传到GitHub仓库
3. 启用Pages功能

## 优势对比

| 功能 | 自建界面 | Coze官方界面 |
|------|----------|-------------|
| 预设问题 | 需要手动配置 | ✅ 自动获取Bot配置 |
| 响应速度 | 需要优化 | ✅ 官方优化 |
| 界面维护 | 需要手动维护 | ✅ 官方自动更新 |
| 自定义程度 | ✅ 完全自定义 | 有限定制 |
| 多模态支持 | 需要额外开发 | ✅ 内置支持 |
| 移动端适配 | 需要手动优化 | ✅ 自动适配 |

## 推荐方案

### 快速上线：使用Coze官方界面
- 开发时间：1-2小时
- 维护成本：极低
- 功能完整度：高

### 品牌定制：继续使用当前自建界面
- 开发时间：已完成
- 维护成本：中等
- 自定义程度：高

## 结论

如果你追求快速上线和完整功能，建议使用Coze官方Chat SDK。
如果你需要完全的界面控制和品牌定制，继续优化当前的自建界面。

两种方案都可以与你在Coze平台配置的Bot完美配合！ 