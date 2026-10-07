import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, X, Flame, BarChart3, Lightbulb } from 'lucide-react';
import { KpiMetric, SocialPlatform } from '../../types/analytics';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpis: KpiMetric[];
  activePlatform: SocialPlatform;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({
  isOpen,
  onClose,
  kpis,
  activePlatform
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I'm your SocialPulse AI Intelligence Advisor. I've analyzed your telemetry across Instagram, YouTube, Facebook, X, and LinkedIn.\n\nYour top growth lever right now is Multi-Slide Carousels on Instagram (+7.18% engagement rate) and YouTube Long-Form video retention (+31.7% video views). What would you like to investigate?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Why did engagement surge this week?',
    'Which platform has our best ROI?',
    'What format generates the most saves?',
    'Give me 3 caption hooks for Instagram'
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('surge') || lower.includes('increase') || lower.includes('growth')) {
        reply = `Looking at your data, the engagement surge (+15.6%) is driven by two catalyst events:\n\n1. **Instagram Carousel "5 AI Automations"** drove 22.4K engagements and an unprecedented 1,340 saves.\n2. **YouTube documentary breakdown** on Autonomous Agents scored a 6.27% engagement rate with over 412K views.\n\nRecommendation: Repurpose these two pieces into a 4-tweet thread on X and a LinkedIn slide deck.`;
      } else if (lower.includes('roi') || lower.includes('best platform')) {
        reply = `Based on audience engagement density per post:\n\n• **YouTube**: Highest value retention (7.18% engagement rate, 1.42M video views).\n• **Instagram**: Highest virality coefficient (6.54% engagement rate, 1.24M reach).\n• **LinkedIn**: Highest B2B conversion affinity (7.0% engagement rate with senior tech buyers).\n\nRecommendation: Allocate 50% creative bandwidth to YouTube Shorts/Long-form and 30% to Instagram Carousels.`;
      } else if (lower.includes('save') || lower.includes('format')) {
        reply = `Your **Multi-slide Carousels** achieve a 1.2% save-to-impression ratio, which is 3.1x higher than standard image posts.\n\nThe algorithm heavily boosts content with high bookmark/save velocity. Keep including clear checklists, code snippets, and infographics in slides 3-7.`;
      } else if (lower.includes('caption') || lower.includes('hook') || lower.includes('instagram')) {
        reply = `Here are 3 high-impact hooks optimized for your audience:\n\n1. **Curiosity Hook**: "We benchmarked 10,000 AI workflows so your engineering team doesn't have to. Here are the 3 that actually compound..."\n2. **Contrarian Hook**: "Stop optimizing your social reach. Optimize your bookmark rate instead. Here is why:"\n3. **Framework Hook**: "The 5-minute telemetry audit: How we diagnosed a 40% reach bottleneck across multi-channel accounts."`;
      } else {
        reply = `Analyzing your current telemetry for ${activePlatform.toUpperCase()} (${kpis.length} tracked metrics):\n\nYour total audience is performing at 14.2% above benchmark. Reach is at ${kpis.find(k => k.id === 'reach')?.formattedValue || '4.05M'} with an engagement rate of ${kpis.find(k => k.id === 'engagement-rate')?.formattedValue || '6.5%'}.\n\nWould you like me to generate tailored post ideas or schedule recommendations?`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[620px] rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/30">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">SocialPulse AI Copilot</h3>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Online & Telemetry Synced
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Contextual intelligence engine querying all 5 platforms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="h-8 w-8 rounded-lg bg-brand-600/30 border border-brand-500/30 flex items-center justify-center text-brand-300 shrink-0">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none shadow-md shadow-brand-600/20'
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-inner'
                }`}
              >
                {m.text}
                <div className={`mt-1 text-[10px] text-right ${m.sender === 'user' ? 'text-brand-200' : 'text-slate-400'}`}>
                  {m.time}
                </div>
              </div>
              {m.sender === 'user' && (
                <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-brand-300">
              <div className="h-8 w-8 rounded-lg bg-brand-600/20 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <Sparkles size={16} className="animate-spin" />
              </div>
              <div className="bg-slate-800/70 rounded-xl px-3 py-2 text-slate-400 flex items-center gap-1.5">
                <span>Analyzing cross-channel metrics</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-slate-950/40 border-t border-slate-800/60 overflow-x-auto flex gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-[11px] text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Lightbulb size={12} className="text-brand-400" />
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(input);
            }}
            placeholder="Ask about impressions, best posting times, competitor gaps..."
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="h-10 w-10 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 flex items-center justify-center text-white transition-all shadow-md shadow-brand-600/30"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
