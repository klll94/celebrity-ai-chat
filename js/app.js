// 名人智能体配置
const characters = {
    'libai': {
        name: '李白',
        botId: 'YOUR_LIBAI_BOT_ID', // 需要替换为实际的Bot ID
        apiKey: 'YOUR_COZE_API_KEY', // 需要替换为实际的API Key
        avatar: 'images/libai.jpg',
        welcomeMessage: '哈哈！我是李白，诗仙李太白是也！今日与君相遇，甚是欢喜。不知君想与我聊些什么？是谈诗论词，还是说说那些年我走过的山山水水？'
    },
    'wangwei': {
        name: '王维',
        botId: 'YOUR_WANGWEI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY',
        avatar: 'images/wangwei.jpg',
        welcomeMessage: '施主有礼了。贫道王维，字摩诘。今日能与君相遇，实乃缘分。不知君是想听听山水田园之趣，还是探讨一番禅理人生？'
    },
    'dufu': {
        name: '杜甫',
        botId: 'YOUR_DUFU_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY',
        avatar: 'images/dufu.jpg',
        welcomeMessage: '在下杜甫，字子美，人称杜工部。见过君子。这世道多艰，民生多苦，不知君可愿与我一同忧国忧民，谈论一番诗歌人生？'
    },
    'sushi': {
        name: '苏轼',
        botId: 'YOUR_SUSHI_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY',
        avatar: 'images/sushi.jpg',
        welcomeMessage: '哈哈哈！苏子瞻见过君子。人生如梦，何不豁达面对？不如我们聊聊诗词文章，或是人生哲理，岂不快哉！'
    },
    // 可以继续添加其他名人的配置...
    'confucius': {
        name: '孔子',
        botId: 'YOUR_CONFUCIUS_BOT_ID',
        apiKey: 'YOUR_COZE_API_KEY',
        avatar: 'images/confucius.jpg',
        welcomeMessage: '学而时习之，不亦说乎？有朋自远方来，不亦乐乎？我是孔丘，字仲尼。君子想要探讨什么问题呢？'
    }
};

// 全局变量
let currentCharacter = null;
let isLoading = false;

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    initializePage();
});

// 初始化页面
function initializePage() {
    // 检查是否在聊天页面
    if (window.location.pathname.includes('chat.html') || window.location.search.includes('character=')) {
        initializeChatPage();
    }
}

// 初始化聊天页面
function initializeChatPage() {
    // 获取URL参数中的角色ID
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character');
    
    if (!characterId || !characters[characterId]) {
        showErrorToast('未找到该名人信息！');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    currentCharacter = characters[characterId];
    
    // 初始化页面元素
    setupChatPage();
    
    // 绑定事件
    bindChatEvents();
    
    // 显示欢迎消息
    setTimeout(() => {
        showWelcomeMessage();
    }, 500);
}

// 设置聊天页面
function setupChatPage() {
    const charNameEl = document.getElementById('char-name');
    const charAvatarEl = document.getElementById('char-avatar');
    const messageInput = document.getElementById('message-input');
    
    if (charNameEl) charNameEl.textContent = `与 ${currentCharacter.name} 对话中`;
    if (charAvatarEl) {
        charAvatarEl.src = currentCharacter.avatar;
        charAvatarEl.onerror = () => charAvatarEl.src = 'images/default-avatar.jpg';
    }
    if (messageInput) {
        messageInput.placeholder = `与 ${currentCharacter.name} 对话...`;
    }
    
    // 更新页面标题
    document.title = `与${currentCharacter.name}对话中...`;
}

// 绑定聊天事件
function bindChatEvents() {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// 显示欢迎消息
function showWelcomeMessage() {
    const loadingHint = document.querySelector('.loading-hint');
    if (loadingHint) {
        loadingHint.remove();
    }
    
    addMessageToChat('bot', currentCharacter.welcomeMessage);
    
    // 启用输入框和按钮
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (messageInput) messageInput.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
}

// 发送消息
async function sendMessage() {
    if (isLoading) return;
    
    const messageInput = document.getElementById('message-input');
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;
    
    // 显示用户消息
    addMessageToChat('user', userMessage);
    messageInput.value = '';
    
    // 设置加载状态
    setLoadingState(true);
    
    try {
        // 如果没有配置真实的API，使用模拟响应
        if (currentCharacter.botId === 'YOUR_LIBAI_BOT_ID' || !currentCharacter.apiKey || currentCharacter.apiKey === 'YOUR_COZE_API_KEY') {
            const mockResponse = await getMockResponse(userMessage);
            addMessageToChat('bot', mockResponse);
        } else {
            // 调用真实的Coze API
            const response = await callCozeAPI(userMessage);
            addMessageToChat('bot', response);
        }
    } catch (error) {
        console.error('发送消息失败:', error);
        addMessageToChat('bot', '抱歉，我现在有些不舒服，稍后再聊吧...');
        showErrorToast('网络连接出现问题，请稍后重试');
    }
    
    setLoadingState(false);
}

// 调用Coze API
async function callCozeAPI(message) {
    try {
        const apiUrl = 'https://api.coze.cn/open_api/v2/chat';
        
        const requestBody = {
            bot_id: currentCharacter.botId,
            user: 'user_' + Date.now(), // 使用时间戳作为用户ID
            query: message,
            stream: false
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
        
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // 解析返回的消息
        let botReply = '抱歉，我暂时无法回答这个问题。';
        
        if (data.messages && data.messages.length > 0) {
            // 查找回答类型的消息
            const replyMessage = data.messages.find(msg => msg.type === 'answer');
            if (replyMessage && replyMessage.content) {
                botReply = replyMessage.content;
            }
        }
        
        return botReply;
        
    } catch (error) {
        console.error('Coze API调用失败:', error);
        throw error;
    }
}

// 模拟API响应（用于演示）
async function getMockResponse(message) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = {
        'libai': [
            '哈哈！君之问甚妙。正如我常说"人生得意须尽欢，莫使金樽空对月"，凡事当豁达面对！',
            '此言有理！想当年我"仰天大笑出门去，我辈岂是蓬蒿人"，志向高远，不拘小节！',
            '好问题！就如"长风破浪会有时，直挂云帆济沧海"，人生总有峰回路转之时！',
            '妙哉妙哉！正所谓"天生我材必有用，千金散尽还复来"，各有各的价值所在！'
        ],
        'wangwei': [
            '阿弥陀佛，君之疑问，贫道略有感悟。正如"明月松间照，清泉石上流"，一切自有其道。',
            '善哉善哉。如"空山新雨后，天气晚来秋"，万物变化皆有定律，君何必过于执着？',
            '君所问者，如"行到水穷处，坐看云起时"，山重水复疑无路，柳暗花明又一村。',
            '此乃天意。正如"独在异乡为异客，每逢佳节倍思亲"，人之情感自然流露。'
        ],
        'dufu': [
            '唉，君之所言，正触及我心中之痛。如"安得广厦千万间，大庇天下寒士俱欢颜"，心忧天下啊！',
            '此言深刻！正如"感时花溅泪，恨别鸟惊心"，国难当头，怎能不忧？',
            '君说得对。想那"朱门酒肉臭，路有冻死骨"，世间不平事太多！',
            '这等问题，让我想起"会当凌绝顶，一览众山小"，当有远大理想才是！'
        ],
        'sushi': [
            '哈哈哈！君真是有趣！正如我说"人生如逆旅，我亦是行人"，何必太过认真？',
            '此言有趣！就像"但愿人长久，千里共婵娟"，心怀美好，自然豁达！',
            '妙哉！如"回首向来萧瑟处，归去，也无风雨也无晴"，得失何须挂怀？',
            '说得好！正所谓"一蓑烟雨任平生"，风雨人生，自当从容面对！'
        ],
        'confucius': [
            '善哉！正如我常说"学而时习之，不亦说乎"，此事需要不断思考和实践。',
            '君之问很有道理。如"己所不欲，勿施于人"，待人接物当有同理心。',
            '此乃大哉问！正如"知之为知之，不知为不知，是知也"，诚实面对自己最重要。',
            '君子之问！如"三人行，必有我师焉"，每个人都有值得学习的地方。'
        ]
    };
    
    const characterResponses = responses[Object.keys(characters).find(key => characters[key] === currentCharacter)] || responses['libai'];
    return characterResponses[Math.floor(Math.random() * characterResponses.length)];
}

// 添加消息到聊天窗口
function addMessageToChat(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const bubbleElement = document.createElement('div');
    bubbleElement.className = 'message-bubble';
    bubbleElement.textContent = message;
    
    messageElement.appendChild(bubbleElement);
    chatWindow.appendChild(messageElement);
    
    // 自动滚动到底部
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 设置加载状态
function setLoadingState(loading) {
    isLoading = loading;
    
    const sendBtn = document.getElementById('send-btn');
    const sendText = document.getElementById('send-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const messageInput = document.getElementById('message-input');
    
    if (loading) {
        if (sendBtn) sendBtn.disabled = true;
        if (sendText) sendText.style.display = 'none';
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        if (messageInput) messageInput.disabled = true;
    } else {
        if (sendBtn) sendBtn.disabled = false;
        if (sendText) sendText.style.display = 'block';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (messageInput) messageInput.disabled = false;
    }
}

// 显示错误提示（这个函数已在chat.html中定义，这里重新定义以防万一）
function showErrorToast(message) {
    if (typeof window.showErrorToast === 'function') {
        window.showErrorToast(message);
        return;
    }
    
    // 简单的alert作为备用
    alert(message);
} 