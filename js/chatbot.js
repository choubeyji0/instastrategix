// js/chatbot.js - Enhanced Chatbot
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 Welcome to <strong>Instastrategix</strong> – Global Digital Marketing Agency serving UK, USA, Canada, Dubai, and India.<br><br>How can I help you today?');
            showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Visit Blog']);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    function sendMessage() {
        const text = input.value.trim();
        if (text === '') return;
        addMessage('user', text);
        input.value = '';
        showTyping();
        const response = getBotResponse(text.toLowerCase());
        setTimeout(() => {
            hideTyping();
            addMessage('bot', response.text);
            if (response.quickReplies) showQuickReplies(response.quickReplies);
        }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    quickReplies.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            const text = e.target.textContent;
            addMessage('user', text);
            showTyping();
            const response = getBotResponse(text.toLowerCase());
            setTimeout(() => {
                hideTyping();
                addMessage('bot', response.text);
                if (response.quickReplies) showQuickReplies(response.quickReplies);
            }, 800);
        }
    });

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function showQuickReplies(options) {
        quickReplies.innerHTML = '';
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply');
            btn.textContent = option;
            quickReplies.appendChild(btn);
        });
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.classList.add('message', 'bot', 'typing');
        typing.innerHTML = '<span></span><span></span><span></span>';
        typing.id = 'typing-indicator';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    function getBotResponse(message) {
        // ... (same responses as previous message)
        // Yeh part same hai jo maine last time diya tha – full code copy kar lena
    }
});
