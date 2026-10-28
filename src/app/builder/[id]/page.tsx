
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  ExternalLink,
} from "lucide-react";

type QuestionType = "text" | "email" | "multiple" | "yesno";

type Question = {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[];
};

function BuilderContent() {
  const params = useParams<{ id: string }>();
  const formId = params.id;

  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [description, setDescription] = useState(
    "Please complete the questions below."
  );

  const [chatbotColor, setChatbotColor] = useState("#7c3aed");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi! Welcome. Let's fill out this form together."
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        `formflow-builder-${formId}`
      );

      if (stored) {
        const data = JSON.parse(stored);

        setFormTitle(data.formTitle ?? "Untitled Form");
        setDescription(
          data.description ?? "Please complete the questions below."
        );

        setChatbotColor(data.chatbotColor ?? "#7c3aed");
        setWelcomeMessage(
          data.welcomeMessage ??
            "Hi! Welcome. Let's fill out this form together."
        );

        setQuestions(
          Array.isArray(data.questions) ? data.questions : []
        );
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Could not load form:", error);
    } finally {
      setLoaded(true);
    }
  }, [formId]);

  useEffect(() => {
    if (!loaded || !formId) return;

    localStorage.setItem(
      `formflow-builder-${formId}`,
      JSON.stringify({
        formTitle,
        description,
        questions,
        chatbotColor,
        welcomeMessage,
      })
    );
  }, [
    loaded,
    formId,
    formTitle,
    description,
    questions,
    chatbotColor,
    welcomeMessage,
  ]);

  function addQuestion() {
    setQuestions((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        title: "",
        type: "text",
        required: false,
        options: ["Option 1", "Option 2"],
      },
    ]);
  }

  function updateQuestion(
    id: string,
    updates: Partial<Question>
  ) {
    setQuestions((previous) =>
      previous.map((question) =>
        question.id === id
          ? { ...question, ...updates }
          : question
      )
    );
  }

  function deleteQuestion(id: string) {
    setQuestions((previous) =>
      previous.filter((question) => question.id !== id)
    );
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= questions.length) return;

    const updated = [...questions];
    [updated[index], updated[target]] = [
      updated[target],
      updated[index],
    ];

    setQuestions(updated);
  }

  function updateOption(
    question: Question,
    optionIndex: number,
    value: string
  ) {
    const options = [...question.options];
    options[optionIndex] = value;

    updateQuestion(question.id, { options });
  }

  function addOption(question: Question) {
    updateQuestion(question.id, {
      options: [
        ...question.options,
        `Option ${question.options.length + 1}`,
      ],
    });
  }

  function deleteOption(
    question: Question,
    optionIndex: number
  ) {
    if (question.options.length <= 2) return;

    updateQuestion(question.id, {
      options: question.options.filter(
        (_, index) => index !== optionIndex
      ),
    });
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-violet-50">
        <p className="text-slate-600">Loading your form...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Form Builder
              </h1>
              <p className="text-xs text-slate-500">
                Changes save automatically
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.open(`/form/${formId}`, "_blank")}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            <Eye size={18} />
            Test My Form
            <ExternalLink size={15} />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-6">
          {/* Form title and description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label
              htmlFor="form-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Form title
            </label>

            <input
              id="form-title"
              value={formTitle}
              onChange={(event) => setFormTitle(event.target.value)}
              placeholder="Enter your form title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xl font-bold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            <label
              htmlFor="form-description"
              className="mb-2 mt-5 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="form-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Describe your form"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Chatbot customization */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Chatbot customization
            </h2>

            <div className="mt-5">
              <label
                htmlFor="chatbot-color"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Chatbot color
              </label>

              <div className="flex items-center gap-3">
                <input
                  id="chatbot-color"
                  type="color"
                  value={chatbotColor}
                  onChange={(event) =>
                    setChatbotColor(event.target.value)
                  }
                  className="h-11 w-14 cursor-pointer rounded border border-slate-200"
                />

                <span className="text-sm text-slate-600">
                  {chatbotColor}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="welcome-message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Welcome message
              </label>

              <textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(event) =>
                  setWelcomeMessage(event.target.value)
                }
                rows={3}
                placeholder="Write your welcome message..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <article
                key={question.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <GripVertical size={18} />
                    Question {index + 1}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, -1)}
                      disabled={index === 0}
                      className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Move question up"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() => moveQuestion(index, 1)}
                      disabled={index === questions.length - 1}
                      className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Move question down"
                    >
                      ↓
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteQuestion(question.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      aria-label="Delete question"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <label
                  htmlFor={`question-${question.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Question text
                </label>

                <input
                  id={`question-${question.id}`}
                  value={question.title}
                  onChange={(event) =>
                    updateQuestion(question.id, {
                      title: event.target.value,
                    })
                  }
                  placeholder="Type your question..."
                  className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <label
                  htmlFor={`type-${question.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Answer type
                </label>

                <select
                  id={`type-${question.id}`}
                  value={question.type}
                  onChange={(event) =>
                    updateQuestion(question.id, {
                      type: event.target.value as QuestionType,
                    })
                  }
                  className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="text">Short text</option>
                  <option value="email">Email</option>
                  <option value="multiple">Multiple choice</option>
                  <option value="yesno">Yes / No</option>
                </select>

                {question.type === "multiple" && (
                  <div className="mb-4 space-y-3">
                    <p className="text-sm font-medium text-slate-700">
                      Answer options
                    </p>

                    {question.options.map((option, optionIndex) => (
                      <div
                        key={`${question.id}-${optionIndex}`}
                        className="flex gap-2"
                      >
                        <input
                          value={option}
                          onChange={(event) =>
                            updateOption(
                              question,
                              optionIndex,
                              event.target.value
                            )
                          }
                          aria-label={`Option ${optionIndex + 1}`}
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            deleteOption(question, optionIndex)
                          }
                          disabled={question.options.length <= 2}
                          className="rounded-lg px-3 text-red-500 hover:bg-red-50 disabled:opacity-30"
                          aria-label="Delete option"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(question)}
                      className="text-sm font-semibold text-violet-700 hover:text-violet-900"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={question.required}
                    onChange={(event) =>
                      updateQuestion(question.id, {
                        required: event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-violet-600"
                  />
                  Required question
                </label>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-300 bg-white px-5 py-4 font-semibold text-violet-700 transition hover:border-violet-500 hover:bg-violet-50"
          >
            <Plus size={20} />
            Add Question
          </button>
        </section>

        {/* Test panel */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-slate-900">
            Test your form
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Open your chatbot in a new tab and answer the questions as a
            respondent.
          </p>

          <button
            type="button"
            onClick={() => window.open(`/form/${formId}`, "_blank")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700"
          >
            <Eye size={18} />
            Open Test Form
          </button>

          <div className="mt-6 rounded-xl bg-violet-50 p-4">
            <p className="text-sm font-semibold text-violet-900">
              Auto-save enabled
            </p>
            <p className="mt-1 text-xs leading-5 text-violet-800">
              Your form title, description, questions, and chatbot settings
              are saved in this browser.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="mt-5 block text-center text-sm font-medium text-slate-600 hover:text-violet-700"
          >
            Back to Dashboard
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div>Loading builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
