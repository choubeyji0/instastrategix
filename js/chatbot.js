// js/chatbot.js - Advanced Grok AI Powered Chatbot
const GROK_API_KEY = 'YOUR_GROK_API_KEY_HERE'; // <-- Yaha apna API key paste kar do
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const MODEL = 'grok-beta'; // Current best model (grok-4 bhi try kar sakte ho if available)

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    let conversationHistory = []; // Memory for Grok

    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 I\'m powered by Grok (xAI). Welcome to Instastrategix – Global Digital Marketing Agency.<br><br>How can I help you with SEO, Ads, Social Media, or anything else?');
            showQuickReplies(['Our Services', 'Pricing', 'Book Free Strategy Call', 'Locations We Serve']);
        }
    });

    closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';
        showTyping();

        conversationHistory.push({ role: 'user', content: text });

        fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for Instastrategix, a global digital marketing agency. Promote services like SEO, Paid Ads, Social Media, Content Strategy. Guide users to book free strategy call at contact-us.html. Be professional yet friendly.' },
                    ...conversationHistory
                ],
                stream: true // Streaming for real-time feel
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('API error');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = '';
            let botDiv = addMessage('bot', ''); // Empty div for streaming

            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        hideTyping();
                        conversationHistory.push({ role: 'assistant', content: botMessage });
                        return;
                    }
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    lines.forEach(line => {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') return;
                            try {
                                const json = JSON.parse(data);
                                const content = json.choices[0]?.delta?.content || '';
                                botMessage += content;
                                botDiv.innerHTML = botMessage; // Stream update
                                messages.scrollTop = messages.scrollHeight;
                            } catch (e) {}
                        }
                    });
                    read();
                });
            }
            read();
        })
        .catch(err => {
            hideTyping();
            addMessage('bot', 'Sorry, something went wrong. Please try again or visit <a href="contact-us.html">Contact page</a>.');
            console.error(err);
        });
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    quickReplies.addEventListener('click', e => {
        if (e.target.classList.contains('quick-reply')) {
            input.value = e.target.textContent;
            sendMessage();
        }
    });

    function addMessage(sender, text) {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function showQuickReplies(options) {
        quickReplies.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply');
            btn.textContent = opt;
            quickReplies.appendChild(btn);
        });
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.classList.add('message', 'bot', 'typing');
        typing.id = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }
});
