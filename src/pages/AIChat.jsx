import React, { useState, useRef, useEffect } from 'react';

export default function ChatApp({ apiUrl = 'http://localhost:8000/api/groq-chat' }) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Chào! Tôi là trợ lý AI. Hãy nhập câu hỏi của bạn.' }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // helper to add message
  function pushMessage(role, text) {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), role, text }]);
  }

  async function handleSend(e) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // optimistic user message
    pushMessage('user', trimmed);
    setInput('');
    setIsSending(true);
    setError(null);

    // placeholder assistant message to fill while streaming
    const placeholderId = Date.now() + Math.random();
    setMessages(prev => [...prev, { id: placeholderId, role: 'assistant', text: '' }]);

    try {
      const controller = new AbortController();
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });

      // If server supports streaming, read stream
      if (res.body && res.headers.get('Content-Type')?.includes('text/event-stream') || res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let accumulated = '';

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            accumulated += chunk;

            // try to parse JSON if buffered fully
            // many backends stream plain text chunks — append directly
            setMessages(prev => prev.map(m => m.id === placeholderId ? { ...m, text: accumulated } : m));
          }
        }

        // After streaming ends, try to parse final JSON if present
        try {
          const json = JSON.parse(accumulated);
          const reply = json.reply || (json.choices?.[0]?.message?.content) || (json.choices?.[0]?.message?.content?.[0]?.text);
          if (reply) {
            setMessages(prev => prev.map(m => m.id === placeholderId ? { ...m, text: reply } : m));
          }
        } catch (_) {
          // Not JSON — leave accumulated text as-is
        }
      } else {
        // fallback: non-streaming JSON response
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || 'Request failed');
        const reply = json.reply || json.choices?.[0]?.message?.content || json.choices?.[0]?.message?.content?.[0]?.text;
        setMessages(prev => prev.map(m => m.id === placeholderId ? { ...m, text: reply ?? "(no reply)" } : m));
      }

    } catch (err) {
      // update placeholder to show error
      setMessages(prev => prev.map(m => m.id === placeholderId ? { ...m, text: '⚠ Lỗi khi gọi API: ' + err.message } : m));
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden h-[80vh] flex flex-col mt-9">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
        <div>
          <div className="font-semibold">AI Chat</div>
        </div>
       <div className="ml-auto flex items-center gap-2 text-sm font-medium">
  <span className={`w-3 h-3 rounded-full ${
    isSending ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'
  }`} />

  <span className="text-gray-600">
    {isSending ? 'Đang trả lời…' : 'Sẵn sàng'}
  </span>
</div>
      </div>

      {/* Messages list */}
      <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="max-w-[75%] bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</div>
              </div>
            )}

            {msg.role === 'user' && (
              <div className="max-w-[75%] bg-indigo-600 text-white p-3 rounded-lg">
                <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-3 border-t bg-white">
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={1}
            placeholder="Nhập câu hỏi..."
            className="flex-1 resize-none p-3 rounded-lg border focus:outline-none focus:ring"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { handleSend(e); } }}
          />

          <button
            type="submit"
            disabled={isSending}
            className="bg-amber-400 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {isSending ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-400">Nhấn Enter để gửi, Shift+Enter xuống dòng.</div>
      </form>
    </div>
  );
}
