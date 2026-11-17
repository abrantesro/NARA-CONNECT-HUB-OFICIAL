'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, ChevronRight, Mic, MicOff, Volume2, VolumeX, Image as ImageIcon, X } from 'lucide-react';

export default function ConnectHubNara() {
  const [step, setStep] = useState('welcome');
  const [messages, setMessages] = useState([] as any[]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null as string | null);
  const scrollRef = useRef(null as HTMLDivElement | null);
  const fileInputRef = useRef(null as HTMLInputElement | null);

  const options = [
    { id: 'secretaria_executiva', icon: '🧠', label: 'Secretária Executiva & Mentora (DECIDA AÍ / Azmtech)' },
    { id: 'projeto_social', icon: '🌱', label: 'Tenho um projeto social' },
    { id: 'projeto_negocio', icon: '💼', label: 'Tenho uma ideia de negócio' },
    { id: 'projeto_comunidade', icon: '🏘️', label: 'Quero ajudar minha comunidade' },
    { id: 'projeto_educacao', icon: '📚', label: 'Quero criar um projeto educativo' },
    { id: 'projeto_meio_ambiente', icon: '🌳', label: 'Quero um projeto sustentável' },
    { id: 'projeto_saude', icon: '❤️', label: 'Tenho um projeto de saúde' },
    { id: 'projeto_cultura', icon: '🎭', label: 'Quero um projeto cultural' },
    { id: 'projeto_emprego', icon: '🚀', label: 'Quero gerar emprego/renda' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de voz. Use o Google Chrome.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const firstResult = event.results.item(0);
      const transcript = firstResult ? firstResult.item(0).transcript : '';
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  const handleImageUpload = (e: any) => {
    const firstFile = e.target.files ? e.target.files.item(0) : null;
    if (!firstFile) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(firstFile);
  };

  const handleStart = (opt: any) => {
    setContext(opt.label);
    setStep('chat');

   

    
  

  const sendMessage = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMessage = {
      role: 'user',
      content: input || 'Enviei uma imagem para você analisar.',
      image: selectedImage,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const currentImage = selectedImage;
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/nara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          context,
          image: currentImage,
        }),
      });

      const data = await response.json();
      const reply = data.text || data.error || 'Recebi sua mensagem! Como posso ajudar no próximo passo?';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      speakText(reply);
    } catch (error) {
      const errMsg = 'Tive uma pequena instabilidade na conexão. Pode repetir, por favor?';
      setMessages((prev) => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#0a192f] text-slate-100 font-sans selection:bg-green-500/30">
      <header className="p-4 border-b border-white/10 bg-[#0a192f]/90 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('welcome')}>
          <div className="w-8 h-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
            N
          </div>
          <span className="font-bold tracking-tight text-xl">
            NARA <span className="text-green-400">CONNECT HUB</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (voiceEnabled && typeof window !== 'undefined') window.speechSynthesis.cancel();
              setVoiceEnabled(!voiceEnabled);
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-green-400 transition"
            title={voiceEnabled ? 'Desativar voz da NARA' : 'Ativar voz da NARA'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          <div className="px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-[10px] text-green-400 font-bold uppercase">
            NARA • v1.0 Multimodal
          </div>
        </div>
      </header>

      {step === 'welcome' ? (
        <section className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl relative">
              <Sparkles className="text-white w-9 h-9" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-light mb-4 leading-tight">
            Olá! Eu sou a <span className="font-bold text-green-400">NARA</span>
          </h1>
          <p className="text-blue-100/70 max-w-xl mb-8 text-base md:text-lg">
            Sua inteligência artificial executiva, mentora tecnológica e avaliadora de projetos do ecossistema <strong>Connect Hub</strong>, <strong>Azmtech</strong> e <strong>DECIDA AÍ</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleStart(opt)}
                className="group flex items-center justify-between p-4 bg-white/5 hover:bg-green-500/15 border border-white/10 hover:border-green-400/50 rounded-2xl transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white">{opt.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-green-400 shrink-0" />
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-green-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white/10 border border-white/10 text-slate-100 rounded-bl-none'
                  }`}
                >
                  {m.image && (
                    <img src={m.image} alt="Imagem enviada" className="max-h-48 rounded-lg mb-2 border border-white/20" />
                  )}
