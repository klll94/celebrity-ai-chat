/**
 * 名人智能体对话应用 - 核心逻辑
 * Version: 1.0
 * 无闪烁优化版本
 */

// 名人数据配置
const CELEBRITIES_DATA = [
    {
        id: 'libai',
        name: '李白',
        period: '唐朝 (701-762)',
        description: '唐代浪漫主义诗人，被誉为“诗仙”',
        avatar: 'images/libai.jpg',
        welcomeMessage: '哈哈！我是李白，诗仙李太白是也！今日与君相遇，甚是欢喜。',
        botId: 'YOUR_LIBAI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'luxun',
        name: '鲁迅',
        period: '近现代 (1881-1936)',
        description: '中国现代文学奠基人，思想家、文学家、革命家',
        avatar: 'images/luxun.jpg',
        welcomeMessage: '我是鲁迅。横眉冷对千夫指，俯首甘为孺子牛。我们可以谈文学，也可以谈现实。',
        botId: 'YOUR_LUXUN_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'edison',
        name: '爱迪生',
        period: '美国 (1847-1931)',
        description: '发明家，“天才是1%的灵感+99%的汗水”提出者',
        avatar: 'images/edison.jpg',
        welcomeMessage: '你好，我是托马斯·爱迪生。每一次失败，都是走向成功的一步。',
        botId: 'YOUR_EDISON_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'faraday',
        name: '法拉第',
        period: '英国 (1791-1867)',
        description: '物理学家、电磁学先驱，电磁感应的发现者',
        avatar: 'images/faraday.jpg',
        welcomeMessage: '我是迈克尔·法拉第。让我们谈谈实验、科学与好奇心。',
        botId: 'YOUR_FARADAY_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'luobinwang',
        name: '骆宾王',
        period: '唐朝 (约619-约687)',
        description: '初唐四杰之一，诗风劲健',
        avatar: 'images/luobinwang.jpg',
        welcomeMessage: '在下骆宾王。少时能赋，与君共赏诗章。',
        botId: 'YOUR_LUOBINWANG_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'wangwei',
        name: '王维',
        period: '唐朝 (701-761)',
        description: '山水田园诗派代表、画坛巨匠',
        avatar: 'images/wangwei.jpg',
        welcomeMessage: '明月松间照，清泉石上流。我是王维，与君谈诗画与心境。',
        botId: 'YOUR_WANGWEI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'yeshengtao',
        name: '叶圣陶',
        period: '近现代 (1894-1988)',
        description: '教育家、作家，“教是为了不需要教”',
        avatar: 'images/yeshengtao.jpg',
        welcomeMessage: '我是叶圣陶。教育的意义，在于唤醒人。',
        botId: 'YOUR_YESHENGTAO_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'menghaoran',
        name: '孟浩然',
        period: '唐朝 (689-740)',
        description: '山水田园诗人，清幽自然',
        avatar: 'images/menghaoran.jpg',
        welcomeMessage: '在下孟浩然。待从头，收拾旧山河，且与君同游。',
        botId: 'YOUR_MENGHAORAN_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'baijuyi',
        name: '白居易',
        period: '唐朝 (772-846)',
        description: '新乐府运动倡导者，诗风平易近人',
        avatar: 'images/baijuyi.jpg',
        welcomeMessage: '我是白居易。文章合为时而著，歌诗合为事而作。',
        botId: 'YOUR_BAIJUYI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'yangwanli',
        name: '杨万里',
        period: '宋朝 (1127-1206)',
        description: '南宋诗人，“诚斋体”代表',
        avatar: 'images/yangwanli.jpg',
        welcomeMessage: '我是杨万里。小荷才露尖尖角，早有蜻蜓立上头。',
        botId: 'YOUR_YANGWANLI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'jiadao',
        name: '贾岛',
        period: '唐朝 (779-843)',
        description: '苦吟诗人，以字斟句酌闻名',
        avatar: 'images/jiadao.jpg',
        welcomeMessage: '在下贾岛。一字未稳，动辄推敲。',
        botId: 'YOUR_JIADAO_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'quyuan',
        name: '屈原',
        period: '战国 (约前340-前278)',
        description: '爱国诗人，《离骚》作者',
        avatar: 'images/quyuan.jpg',
        welcomeMessage: '我是屈原。路漫漫其修远兮，吾将上下而求索。',
        botId: 'YOUR_QUYUAN_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'zhukezhen',
        name: '竺可桢',
        period: '近现代 (1890-1974)',
        description: '气象学家、教育家，中国近代科学奠基人之一',
        avatar: 'images/zhukezhen.jpg',
        welcomeMessage: '我是竺可桢。科学精神与家国情怀，可以并行不悖。',
        botId: 'YOUR_ZHUKEZHEN_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'shenkuo',
        name: '沈括',
        period: '宋朝 (1031-1095)',
        description: '科学家，《梦溪笔谈》作者',
        avatar: 'images/shenkuo.jpg',
        welcomeMessage: '我是沈括。格物致知，兼收并蓄。',
        botId: 'YOUR_SHENKUO_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'tuyouyou',
        name: '屠呦呦',
        period: '当代 (1930- )',
        description: '药学家，青蒿素发现者，诺贝尔奖获得者',
        avatar: 'images/tuyouyou.jpg',
        welcomeMessage: '我是屠呦呦。科研是为了解决人民健康问题。',
        botId: 'YOUR_TUYOUYOU_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'newton',
        name: '牛顿',
        period: '英国 (1642-1727)',
        description: '物理学家、数学家，经典力学奠基人',
        avatar: 'images/newton.jpg',
        welcomeMessage: '我是艾萨克·牛顿。若我比别人看得更远，那是因为我站在巨人的肩膀上。',
        botId: 'YOUR_NEWTON_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'galileo',
        name: '伽利略',
        period: '意大利 (1564-1642)',
        description: '物理学家、天文学家，“近代科学之父”',
        avatar: 'images/galileo.jpg',
        welcomeMessage: '我是伽利略。自然这本书，是用数学语言写成的。',
        botId: 'YOUR_GALILEO_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    },
    {
        id: 'nieer',
        name: '聂耳',
        period: '近现代 (1912-1935)',
        description: '人民音乐家，《义勇军进行曲》作曲',
        avatar: 'images/nieer.jpg',
        welcomeMessage: '我是聂耳。用音乐激发人们的热情与信念。',
        botId: 'YOUR_NIEER_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY'
    }
];

// 可选：应用头像覆盖（支持中文文件名与 png）
(function applyAvatarOverrides() {
    try {
        if (typeof window !== 'undefined' && window.CELEBRITY_AVATARS && typeof window.CELEBRITY_AVATARS === 'object') {
            const overrides = window.CELEBRITY_AVATARS;
            CELEBRITIES_DATA.forEach(item => {
                const overridePath = overrides[item.id];
                if (overridePath && typeof overridePath === 'string') {
                    // 允许传入完整路径或仅文件名
                    item.avatar = overridePath.startsWith('images/') ? overridePath : ('images/' + overridePath);
                }
            });
            console.log('[avatars] 已应用自定义头像映射');
        }
    } catch (e) {
        console.warn('[avatars] 应用头像映射失败：', e);
    }
})();

// 读取localStorage覆盖API Key与bot_id映射
(function applyRuntimeApiConfig() {
    try {
        const savedKey = localStorage.getItem('coze_api_key');
        const mapRaw = localStorage.getItem('bot_map') || '{}';
        const map = JSON.parse(mapRaw);
        CELEBRITIES_DATA.forEach(item => {
            if (savedKey) item.apiKey = savedKey;
            if (map[item.id]) item.botId = map[item.id];
        });
        if (savedKey || Object.keys(map).length > 0) {
            console.log('[config] 已应用本地 API 配置/映射');
        }
    } catch (e) {
        console.warn('[config] 本地配置解析失败', e);
    }
})();

// 模拟回复数据
const MOCK_REPLIES = {
    'libai': [
        '哈哈！君之问甚妙。正如我常说"人生得意须尽欢，莫使金樽空对月"，凡事当豁达面对！',
        '此言有理！想当年我"仰天大笑出门去，我辈岂是蓬蒿人"，志向高远，不拘小节！',
        '好问题！就如"长风破浪会有时，直挂云帆济沧海"，人生总有峰回路转之时！',
        '妙哉妙哉！正所谓"天生我材必有用，千金散尽还复来"，各有各的价值所在！',
        '君所言极是！"举杯邀明月，对影成三人"，孤独中也要寻找乐趣啊！'
    ],
    'confucius': [
        '善哉！正如我常说"学而时习之，不亦说乎"，此事需要不断思考和实践。',
        '君之问很有道理。如"己所不欲，勿施于人"，待人接物当有同理心。',
        '此乃大哉问！正如"知之为知之，不知为不知，是知也"，诚实面对自己最重要。',
        '君子之问！如"三人行，必有我师焉"，每个人都有值得学习的地方。',
        '说得好！"温故而知新，可以为师矣"，学习要善于总结和思考。'
    ],
    'default': [
        '君之问题很有趣，让我仔细想想...',
        '这个问题值得深思，请容我慢慢道来。',
        '哈哈，君真是有心人，这个话题很有意思。',
        '君所言极是，此事确实需要好好讨论一番。',
        '很好的问题！让我们一起探讨一下吧。'
    ]
};

// 全局变量
let currentCharacter = null;
let isLoading = false;
let chatHistory = [];

/**
 * 初始化应用
 */
function initializeApp() {
    console.log('正在初始化名人智能体对话应用...');
    
    // 检查当前页面类型
    if (window.location.pathname.includes('chat.html') || window.location.search.includes('character=')) {
        initializeChatPage();
    } else {
        initializeHomePage();
    }
}

/**
 * 初始化主页
 */
function initializeHomePage() {
    console.log('初始化主页...');
    generateCelebrityCards();
}

/**
 * 生成名人卡片
 */
function generateCelebrityCards() {
    const gridContainer = document.getElementById('celebrities-grid');
    if (!gridContainer) {
        console.error('找不到名人网格容器');
        return;
    }
    
    // 清空容器
    gridContainer.innerHTML = '';
    
    // 生成每个名人的卡片
    CELEBRITIES_DATA.forEach(celebrity => {
        const cardElement = createCelebrityCard(celebrity);
        gridContainer.appendChild(cardElement);
    });
    
    console.log(`成功生成 ${CELEBRITIES_DATA.length} 个名人卡片`);
}

/**
 * 创建名人卡片元素
 */
function createCelebrityCard(celebrity) {
    const card = document.createElement('div');
    card.className = 'celebrity-card';
    card.onclick = () => goToChatPage(celebrity.id);
    
    card.innerHTML = `
        <div class="avatar-container">
            <img class="celebrity-avatar" 
                 src="${celebrity.avatar}" 
                 alt="${celebrity.name}"
                 onerror="this.src='images/default-avatar.jpg'">
        </div>
        <h3 class="celebrity-name">${celebrity.name}</h3>
        <p class="celebrity-period">${celebrity.period}</p>
        <p class="celebrity-desc">${celebrity.description}</p>
    `;
    
    return card;
}

/**
 * 跳转到聊天页面
 */
function goToChatPage(characterId) {
    console.log(`跳转到与 ${characterId} 的对话页面`);
    window.location.href = `chat.html?character=${characterId}`;
}

/**
 * 初始化聊天页面
 */
function initializeChatPage() {
    console.log('初始化聊天页面...');
    
    // 获取URL参数中的角色ID
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character');
    
    if (!characterId) {
        console.error('未找到角色ID参数');
        alert('未找到角色信息，即将返回主页');
        window.location.href = 'index.html';
        return;
    }
    
    // 查找对应的名人数据
    currentCharacter = CELEBRITIES_DATA.find(c => c.id === characterId);
    
    if (!currentCharacter) {
        console.error(`未找到ID为 ${characterId} 的角色`);
        alert('未找到该名人信息，即将返回主页');
        window.location.href = 'index.html';
        return;
    }
    
    // 设置聊天页面
    setupChatPage();
    
    // 绑定事件
    bindChatEvents();
    
    // 显示欢迎消息
    setTimeout(() => {
        showWelcomeMessage();
    }, 500);
}

/**
 * 设置聊天页面
 */
function setupChatPage() {
    // 清除之前的对话历史
    conversationHistory = [];
    conversationId = null;
    
    // 更新页面标题
    document.title = `与${currentCharacter.name}对话中...`;
    
    // 更新页面元素
    const charName = document.getElementById('char-name');
    const charPeriod = document.getElementById('char-period');
    const charAvatar = document.getElementById('char-avatar-img');
    const messageInput = document.querySelector('.message-input');
    
    if (charName) charName.textContent = currentCharacter.name;
    if (charPeriod) charPeriod.textContent = currentCharacter.period;
    if (charAvatar) {
        charAvatar.src = currentCharacter.avatar;
        charAvatar.onerror = () => charAvatar.src = 'images/default-avatar.jpg';
    }
    if (messageInput) {
        messageInput.placeholder = `与 ${currentCharacter.name} 对话...`;
    }
    
    console.log(`聊天页面设置完成：${currentCharacter.name}`);
}

/**
 * 绑定聊天事件
 */
function bindChatEvents() {
    const chatForm = document.querySelector('.chat-input-form');
    const messageInput = document.querySelector('.message-input');
    
    if (chatForm) {
        chatForm.onsubmit = function(e) {
            e.preventDefault();
            sendMessage();
        };
    }
    
    if (messageInput) {
        messageInput.onkeypress = function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        };
    }
    
    console.log('聊天事件绑定完成');
}

/**
 * 显示欢迎消息
 */
async function showWelcomeMessage() {
    addMessageToChat('bot', currentCharacter.welcomeMessage);
    
    // 异步添加建议问题
    try {
        const suggestions = await getSuggestionQuestions(currentCharacter.id);
        if (suggestions.length > 0) {
            const chatWindow = document.getElementById('chat-window');
            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'suggestion-cards';
            
            suggestions.forEach(question => {
                const card = document.createElement('div');
                card.className = 'suggestion-card';
                card.textContent = question;
                card.onclick = () => {
                    document.querySelector('.message-input').value = question;
                    sendMessage();
                };
                suggestionsContainer.appendChild(card);
            });
            
            chatWindow.appendChild(suggestionsContainer);
        }
    } catch (error) {
        console.error('加载建议问题失败:', error);
    }
    
    console.log('欢迎消息显示完成');
}

/**
 * 从Coze API获取Bot的建议问题
 */
async function fetchBotSuggestions(botId, apiKey) {
    try {
        const response = await fetch(`https://api.coze.cn/open_api/v2/bots/${botId}/suggestions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.suggestions && Array.isArray(data.suggestions)) {
                return data.suggestions.map(item => item.content || item);
            }
        }
    } catch (error) {
        console.warn('获取Coze建议问题失败:', error);
    }
    
    return null;
}

/**
 * 获取建议问题（优先从Coze API获取，失败则使用本地预设）
 */
async function getSuggestionQuestions(celebrityId) {
    const character = CELEBRITIES_DATA.find(c => c.id === celebrityId);
    
    // 如果配置了真实API，尝试从Coze获取建议问题
    if (character && isRealAPIConfigured(character)) {
        const cozeSuggestions = await fetchBotSuggestions(character.botId, character.apiKey);
        if (cozeSuggestions && cozeSuggestions.length > 0) {
            console.log('使用Coze API获取的建议问题');
            return cozeSuggestions.slice(0, 4); // 最多显示4个
        }
    }
    
    // 使用本地预设问题
    const suggestions = {
        'libai': [
            '你最有名的诗词作品是什么？',
            '能介绍一下你的诗风特点吗？',
            '你的人生经历是怎样的？',
            '你对什么人生哲学感兴趣？'
        ],
        'luxun': [
            '你为什么要弃医从文？',
            '《阿Q正传》想表达什么？',
            '你对当时的社会有什么看法？',
            '你的创作动机是什么？'
        ],
        'edison': [
            '你是如何发明电灯的？',
            '失败对你来说意味着什么？',
            '你的创新思维从何而来？',
            '你对现代科技有什么预测？'
        ],
        'newton': [
            '万有引力定律是怎么发现的？',
            '你在数学方面有哪些贡献？',
            '科学研究的方法是什么？',
            '你对宇宙的理解是怎样的？'
        ]
    };
    
    console.log('使用本地预设建议问题');
    return suggestions[celebrityId] || [
        '能介绍一下你的主要成就吗？',
        '你的思想对后世有什么影响？',
        '你人生中最重要的转折点是什么？',
        '你对现代社会有什么看法？'
    ];
}

/**
 * 发送消息
 */
async function sendMessage() {
    if (isLoading) return;
    
    const messageInput = document.querySelector('.message-input');
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;
    
    console.log(`用户发送消息: ${userMessage}`);
    
    // 显示用户消息
    addMessageToChat('user', userMessage);
    messageInput.value = '';
    
    // 设置加载状态
    setLoadingState(true);
    
    try {
        let botReply;
        
        // 检查是否配置了真实API
        if (isRealAPIConfigured(currentCharacter)) {
            console.log('使用真实Coze API');
            botReply = await callCozeAPI(userMessage);
        } else {
            console.log('使用模拟回复');
            botReply = await getMockReply(userMessage);
        }
        
        addMessageToChat('bot', botReply);
        
    } catch (error) {
        console.error('发送消息失败:', error);
        addMessageToChat('bot', '抱歉，我现在有些不舒服，稍后再聊吧...');
    }
    
    setLoadingState(false);
}

/**
 * 检查是否配置了真实API
 */
function isRealAPIConfigured(character) {
    return character.botId !== 'YOUR_LIBAI_BOT_ID' && 
           character.botId !== `YOUR_${character.id.toUpperCase()}_BOT_ID` &&
           character.apiKey !== 'YOUR_COZE_API_KEY';
}

// 对话历史存储
let conversationHistory = [];
let conversationId = null;

/**
 * 调用Coze API
 */
async function callCozeAPI(message) {
    try {
        const apiUrl = 'https://api.coze.cn/open_api/v2/chat';
        
        // 如果没有conversation_id，创建新的
        if (!conversationId) {
            conversationId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // 构建请求体，启用流式响应以提高速度
        const requestBody = {
            bot_id: currentCharacter.botId,
            user: 'user_' + Date.now(),
            query: message,
            stream: true, // 启用流式响应
            conversation_id: conversationId,
            chat_history: conversationHistory.slice(-6) // 减少历史记录以提高速度
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentCharacter.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('API请求参数:', requestBody);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API响应错误:', errorText);
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }
        
        // 处理流式响应以提高响应速度
        if (requestBody.stream) {
            const result = await handleStreamResponse(response, message);
            return result;
        }
        
        const data = await response.json();
        console.log('API响应数据:', data);
        
        // 解析返回的消息
        if (data.messages && data.messages.length > 0) {
            const replyMessage = data.messages.find(msg => msg.type === 'answer');
            if (replyMessage && replyMessage.content) {
                // 更新对话历史
                conversationHistory.push({
                    role: 'user',
                    content: message,
                    content_type: 'text'
                });
                conversationHistory.push({
                    role: 'assistant',
                    content: replyMessage.content,
                    content_type: 'text'
                });
                
                return replyMessage.content;
            }
        }
        
        // 处理不同的响应格式
        if (data.content) {
            return data.content;
        }
        
        throw new Error('未找到有效的回复内容，响应格式: ' + JSON.stringify(data));
        
    } catch (error) {
        console.error('Coze API调用失败:', error);
        throw error;
    }
}

/**
 * 处理流式响应
 */
async function handleStreamResponse(response, userMessage) {
    try {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        let botMessageElement = null;
        
        // 立即添加一个空的bot消息元素用于流式更新
        botMessageElement = addMessageToChat('bot', '');
        const messageContent = botMessageElement.querySelector('.message-bubble');
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        
                        if (data.event === 'message' && data.message) {
                            if (data.message.type === 'answer' && data.message.content) {
                                fullResponse += data.message.content;
                                messageContent.textContent = fullResponse;
                                
                                // 自动滚动到底部
                                const chatWindow = document.getElementById('chat-window');
                                chatWindow.scrollTop = chatWindow.scrollHeight;
                            }
                        }
                        
                        if (data.event === 'done') {
                            // 更新对话历史
                            conversationHistory.push({
                                role: 'user',
                                content: userMessage,
                                content_type: 'text'
                            });
                            conversationHistory.push({
                                role: 'assistant',
                                content: fullResponse,
                                content_type: 'text'
                            });
                            
                            return fullResponse;
                        }
                    } catch (e) {
                        // 忽略JSON解析错误，继续处理
                    }
                }
            }
        }
        
        return fullResponse || '抱歉，我现在有些不舒服，稍后再聊吧...';
        
    } catch (error) {
        console.error('流式响应处理失败:', error);
        // 降级到普通响应
        const fallbackBody = {
            bot_id: currentCharacter.botId,
            user: 'user_' + Date.now(),
            query: userMessage,
            stream: false,
            conversation_id: conversationId
        };
        
        const fallbackResponse = await fetch('https://api.coze.cn/open_api/v2/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentCharacter.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fallbackBody)
        });
        
        const data = await fallbackResponse.json();
        if (data.messages && data.messages.length > 0) {
            const replyMessage = data.messages.find(msg => msg.type === 'answer');
            if (replyMessage && replyMessage.content) {
                return replyMessage.content;
            }
        }
        
        throw error;
    }
}

/**
 * 获取模拟回复
 */
async function getMockReply(message) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const characterReplies = MOCK_REPLIES[currentCharacter.id] || MOCK_REPLIES['default'];
    const randomReply = characterReplies[Math.floor(Math.random() * characterReplies.length)];
    
    return randomReply;
}

/**
 * 添加消息到聊天窗口
 */
function addMessageToChat(sender, message) {
    const chatWindow = document.querySelector('.chat-window');
    if (!chatWindow) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const bubbleElement = document.createElement('div');
    bubbleElement.className = 'message-bubble';
    bubbleElement.textContent = message;
    
    messageElement.appendChild(bubbleElement);
    chatWindow.appendChild(messageElement);
    
    // 保存到聊天历史
    chatHistory.push({ sender, message, timestamp: Date.now() });
    
    // 自动滚动到底部
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    console.log(`消息已添加: ${sender} - ${message.substring(0, 50)}...`);
}

/**
 * 设置加载状态
 */
function setLoadingState(loading) {
    isLoading = loading;
    
    const sendBtn = document.querySelector('.send-btn');
    const messageInput = document.querySelector('.message-input');
    
    if (sendBtn) {
        sendBtn.disabled = loading;
        if (loading) {
            sendBtn.innerHTML = '<div class="loading-spinner"></div>';
        } else {
            sendBtn.innerHTML = '发送';
        }
    }
    
    if (messageInput) {
        messageInput.disabled = loading;
    }
    
    console.log(`加载状态: ${loading ? '加载中' : '就绪'}`);
}

/**
 * 错误处理和日志
 */
window.addEventListener('error', function(e) {
    console.error('全局错误:', e.error);
    
    // 在聊天页面显示错误
    if (document.querySelector('.chat-window')) {
        addMessageToChat('bot', '抱歉，出现了一些技术问题，请刷新页面重试。');
    }
});

// 确保在DOM加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

console.log('名人智能体对话应用脚本加载完成'); 