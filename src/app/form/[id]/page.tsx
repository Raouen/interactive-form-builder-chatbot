
"use client";

import { Suspense, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "next/navigation";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";

type Question = {
  id: string;
  title: string;
  type: "text" | "email" | "multiple" | "yesno";
  required: boolean;
  options: string[];
};

type Answer = {
  questionId: string;
  question: string;
  answer: string;
};

type Submission = {
  id: string;
  formId: string;
  formTitle: string;
  answers: Answer[];
  submittedAt: string;
};

const DEFAULT_COLOR = "#7c3aed";
const DEFAULT_WELCOME =
  "Hi! Welcome. Let's fill out this form together.";

function FormChat() {
  const params = useParams<{ id: string }>();
  const formId = params.id;

  const [formTitle, setFormTitle] = useState("FormFlow");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chatbotColor, setChatbotColor] = useState(DEFAULT_COLOR);
  const [welcomeMessage, setWelcomeMessage] = useState(DEFAULT_WELCOME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        `formflow-builder-${formId}`
      );

      if (!stored) {
        setError(
          "This form could not be found. Please check the form ID."
        );
        return;
      }

      const data = JSON.parse(stored);

      setFormTitle(data.formTitle || "Untitled Form");
      setQuestions(
        Array.isArray(data.questions) ? data.questions : []
      );
      setChatbotColor(data.chatbotColor || DEFAULT_COLOR);
      setWelcomeMessage(
        data.welcomeMessage || DEFAULT_WELCOME
      );
    } catch {
      setError("Unable to load this form.");
    } finally {
      setLoaded(true);
    }
  }, [formId]);

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = questions[currentIndex];
    if (!question) return;

    const answer = currentAnswer.trim();

    if (question.required && !answer) return;

    const updatedResponses = [...responses, answer];
    setResponses(updatedResponses);
    setCurrentAnswer("");

    if (currentIndex === questions.length - 1) {
      const submission: Submission = {
        id: crypto.randomUUID(),
        formId,
        formTitle,
        answers: questions.map((q, index) => ({
          questionId: q.id,
          question: q.title,
          answer: updatedResponses[index] ?? "",
        })),
        submittedAt: new Date().toISOString(),
      };

      try {
        const storageKey = `formflow-responses-${formId}`;

        const existingSubmissions: Submission[] = JSON.parse(
          localStorage.getItem(storageKey) || "[]"
        );

        existingSubmissions.push(submission);

        localStorage.setItem(
          storageKey,
          JSON.stringify(existingSubmissions)
        );

        setFinished(true);
      } catch {
        setError(
          "We couldn't save your answers. Please try again."
        );
      }
    } else {
      setCurrentIndex((index) => index + 1);
    }
  }

  if (!loaded) {
    return <p className="p-8 text-center">Loading your form...</p>;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-violet-50 p-5">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-xl font-bold text-slate-800">
            Form unavailable
          </h1>
          <p className="mt-3 text-slate-600">{error}</p>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-violet-50 p-5">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-xl font-bold">{formTitle}</h1>
          <p className="mt-3 text-slate-600">
            This form has no questions yet.
          </p>
        </div>
      </main>
    );
  }

  const question = questions[currentIndex];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-white p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl">
        <header
          className="flex items-center gap-3 p-5 text-white"
          style={{ backgroundColor: chatbotColor }}
        >
          <div className="rounded-xl bg-white/15 p-3">
            <MessageCircle size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold">{formTitle}</h1>
            <p className="text-sm text-white/80">
              FormFlow Assistant
            </p>
          </div>
        </header>

        <div className="p-6 sm:p-8">
          {finished ? (
            <div className="py-8 text-center">
              <CheckCircle2
                size={56}
                className="mx-auto text-emerald-500"
              />
              <h2 className="mt-5 text-2xl font-bold text-slate-800">
                Thank you!
              </h2>
              <p className="mt-3 text-slate-600">
                You have answered all the questions.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Your answers have been saved in this browser.
              </p>
            </div>
          ) : (
            <>
              {currentIndex === 0 && welcomeMessage.trim() && (
                <div
                  className="mb-5 max-w-[90%] rounded-2xl rounded-tl-sm p-4 text-white"
                  style={{ backgroundColor: chatbotColor }}
                >
                  {welcomeMessage}
                </div>
              )}

              <div className="mb-6 flex items-center justify-between text-sm text-slate-500">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(
                    ((currentIndex + 1) / questions.length) * 100
                  )}
                  %
                </span>
              </div>

              <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${
                      ((currentIndex + 1) / questions.length) * 100
                    }%`,
                    backgroundColor: chatbotColor,
                  }}
                />
              </div>

              <div className="mb-5 max-w-[90%] rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-slate-700">
                {question.title || "Please answer this question."}
                {question.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </div>

              <form onSubmit={handleNext} className="space-y-5">
                {question.type === "multiple" ||
                question.type === "yesno" ? (
                  <div className="space-y-3">
                    {(
                      question.type === "yesno"
                        ? ["Yes", "No"]
                        : question.options || []
                    ).map((option, index) => (
                      <label
                        key={`${option}-${index}`}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                          currentAnswer === option
                            ? "border-2 bg-violet-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        style={
                          currentAnswer === option
                            ? { borderColor: chatbotColor }
                            : undefined
                        }
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={currentAnswer === option}
                          onChange={() => setCurrentAnswer(option)}
                          required={question.required && index === 0}
                          className="accent-violet-600"
                          style={{ accentColor: chatbotColor }}
                        />
                        <span className="text-slate-700">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={question.type === "email" ? "email" : "text"}
                    value={currentAnswer}
                    onChange={(event) =>
                      setCurrentAnswer(event.target.value)
                    }
                    required={question.required}
                    placeholder="Type your answer..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-100"
                    style={{
                      borderColor: undefined,
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor =
                        chatbotColor;
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor = "";
                    }}
                  />
                )}

                {!question.required && (
                  <p className="text-xs text-slate-500">
                    This question is optional.
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: chatbotColor }}
                >
                  {currentIndex === questions.length - 1
                    ? "Finish"
                    : "Next question"}
                  <Send size={17} />
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-400">
                Powered by FormFlow
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function FormPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 text-center">Loading your form...</p>
      }
    >
      <FormChat />
    </Suspense>
  );
}
