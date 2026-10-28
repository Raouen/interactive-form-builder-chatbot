
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  Code2,
  Eye,
  Layers,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Visual Form Builder",
    description:
      "Create custom forms with different question types, without writing a single line of code.",
  },
  {
    icon: MessageCircle,
    title: "Conversational Forms",
    description:
      "Turn ordinary forms into friendly conversations that guide users one question at a time.",
  },
  {
    icon: ClipboardList,
    title: "Response Management",
    description:
      "Collect answers and keep your submissions organized in one convenient dashboard.",
  },
  {
    icon: Code2,
    title: "Easy Website Integration",
    description:
      "Share a public form link or embed your chatbot widget into an existing website.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "Preview your form before publishing and make changes whenever you need to.",
  },
  {
    icon: Zap,
    title: "Simple and Responsive",
    description:
      "Build forms with an experience designed for desktop and mobile users.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your form",
    description: "Add questions and customize your form in the visual builder.",
  },
  {
    number: "02",
    title: "Publish and share",
    description: "Generate a public link or embed your chatbot on your website.",
  },
  {
    number: "03",
    title: "Collect responses",
    description: "Let visitors answer questions and review their submissions.",
  },
];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi there! 👋 Welcome to FormFlow. What would you like to know?",
    },
  ]);

  function sendMessage(text = message) {
    const question = text.trim();
    if (!question) return;

    let answer =
      "You can create forms, add questions, publish them, and collect responses using FormFlow.";

    const lower = question.toLowerCase();

    if (lower.includes("create") || lower.includes("form")) {
      answer =
        "Creating a form is easy! Open the dashboard, create a form, and add your questions using our visual builder.";
    } else if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("free")
    ) {
      answer =
        "This project demo does not have a pricing system. You can explore the form-building features right here!";
    } else if (
      lower.includes("share") ||
      lower.includes("publish") ||
      lower.includes("embed")
    ) {
      answer =
        "Once a form is published, you will be able to share its public link or embed the chatbot widget on another website.";
    } else if (
      lower.includes("response") ||
      lower.includes("answer")
    ) {
      answer =
        "Responses will be stored and available in the dashboard, where form owners can review submissions and their timestamps.";
    }

    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      { role: "bot", text: answer },
    ]);
    setMessage("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <ClipboardList size={23} />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Form<span className="text-violet-600">Flow</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-600 hover:text-violet-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-violet-600">
              How it works
            </a>
            <a href="#demo" className="text-sm text-slate-600 hover:text-violet-600">
              Chatbot demo
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/dashboard"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              Get started <ArrowRight size={16} />
            </a>
          </div>

          <button
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 md:hidden">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#demo" onClick={() => setMenuOpen(false)}>Chatbot demo</a>
            <a href="/dashboard" className="font-semibold text-violet-700">Dashboard</a>
          </nav>
        )}
      </header>

      <section className="relative px-5 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:px-8">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-fuchsia-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
              <Sparkles size={16} />
              Forms made simple and conversational
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Create forms.
              <br />
              Start <span className="text-violet-600">conversations.</span>
              <br />
              Collect insights.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Build interactive forms, turn questions into chatbot
              conversations, and manage every response in one simple platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Start building <ArrowRight size={18} />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
              >
                <MessageCircle size={18} /> Try the chatbot
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Check size={17} className="text-violet-600" /> Easy form creation
              </span>
              <span className="flex items-center gap-2">
                <Check size={17} className="text-violet-600" /> Mobile-friendly
              </span>
              <span className="flex items-center gap-2">
                <Check size={17} className="text-violet-600" /> Simple sharing
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-violet-100 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">FORM BUILDER</p>
                  <h2 className="mt-1 text-xl font-bold">Customer feedback</h2>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  Preview
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-violet-50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <MessageCircle size={22} />
                </div>
                <h3 className="text-lg font-bold">We value your feedback!</h3>
                <p className="mt-1 text-sm text-slate-600">
                  A few quick questions to help us improve.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    What is your name?
                  </label>
                  <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400">
                    Enter your answer...
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    How was your experience?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Excellent", "Good", "Fair"].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 px-2 py-3 text-center text-xs font-medium text-slate-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 font-semibold text-white hover:bg-violet-700"
                >
                  Try interactive chat <ArrowRight size={17} />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Check size={22} />
              </span>
              <div>
                <p className="text-sm font-bold">Easy to use</p>
                <p className="text-xs text-slate-500">Built for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 bg-slate-50 px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Everything you need
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A smarter way to collect responses
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              From building your first form to reviewing submissions, keep
              your workflow simple and organized.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Three simple steps
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From idea to insights
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-200">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 bg-violet-50 px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Meet your chatbot
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Forms that feel like conversations
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Give visitors a more natural way to answer questions. Our
              conversational widget guides them through a form, one question
              at a time.
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white hover:bg-violet-700"
            >
              Try the live demo <ArrowRight size={18} />
            </button>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
                <MessageCircle size={23} />
              </div>
              <div>
                <h3 className="font-bold">FormFlow Assistant</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Demo available
                </p>
              </div>
            </div>
            <div className="py-6">
              <div className="max-w-sm rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                Hi! 👋 I'm here to help you explore FormFlow. Ask me how to
                create forms, publish them, or manage responses.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Create a form", "Publish a form", "View responses"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setChatOpen(true);
                      sendMessage(q);
                    }}
                    className="rounded-full border border-violet-200 px-3 py-2 text-xs font-medium text-violet-700 transition hover:bg-violet-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Open chatbot <MessageCircle size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-3xl bg-slate-900 px-6 py-14 text-center text-white sm:px-12">
          <Sparkles size={30} className="text-violet-300" />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Ready to build your first form?
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            Start creating interactive forms and make collecting responses
            easier for everyone.
          </p>
          <a
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-violet-50"
          >
            Explore the dashboard <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="text-lg font-bold">
            Form<span className="text-violet-600">Flow</span>
          </a>
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <a href="#features" className="hover:text-violet-600">Features</a>
            <a href="#how-it-works" className="hover:text-violet-600">How it works</a>
            <a href="#demo" className="hover:text-violet-600">Chatbot demo</a>
            <a href="mailto:contact@example.com" className="hover:text-violet-600">Contact</a>
          </div>
          <p className="text-sm text-slate-500">
            © FormFlow         
          </p>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
        {chatOpen && (
          <div className="flex h-[min(480px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-violet-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle size={21} />
                </div>
                <div>
                  <p className="font-bold">FormFlow Assistant</p>
                  <p className="text-xs text-violet-100">Interactive demo</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chatbot"
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl p-3 text-sm leading-6 ${
                    item.role === "user"
                      ? "ml-auto rounded-br-sm bg-violet-600 text-white"
                      : "rounded-bl-sm bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.text}
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                {["Create a form", "Publish a form", "View responses"].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-violet-200 px-3 py-1.5 text-xs text-violet-700 hover:bg-violet-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-slate-100 p-3"
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask me something..."
                aria-label="Message to chatbot"
                className="min-w-0 flex-1 rounded-xl bg-slate-100 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-300"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-700"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label={chatOpen ? "Close chatbot" : "Open chatbot"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl shadow-violet-300 transition hover:scale-105 hover:bg-violet-700"
        >
          {chatOpen ? <ChevronDown size={25} /> : <MessageCircle size={25} />}
        </button>
      </div>
    </main>
  );
}
