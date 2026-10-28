
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

type FormItem = {
  id: string;
  title: string;
  description: string;
  status: "Published" | "Draft";
  responses: number;
  updatedAt: string;
};

const initialForms: FormItem[] = [
  {
    id: "1",
    title: "Customer Feedback",
    description: "Collect feedback from your customers.",
    status: "Published",
    responses: 24,
    updatedAt: "Today",
  },
  {
    id: "2",
    title: "Contact Form",
    description: "Let visitors get in touch with you.",
    status: "Draft",
    responses: 0,
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Event Registration",
    description: "Register people for your next event.",
    status: "Published",
    responses: 12,
    updatedAt: "2 days ago",
  },
];

export default function DashboardPage() {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("formflow-forms");
      setForms(stored ? JSON.parse(stored) : initialForms);
    } catch {
      setForms(initialForms);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("formflow-forms", JSON.stringify(forms));
    }
  }, [forms, loaded]);

  const openCreateModal = () => {
    setEditingForm(null);
    setTitle("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (form: FormItem) => {
    setEditingForm(form);
    setTitle(form.title);
    setDescription(form.description);
    setShowModal(true);
  };

  const saveForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) return;

    if (editingForm) {
      setForms((current) =>
        current.map((form) =>
          form.id === editingForm.id
            ? {
                ...form,
                title: title.trim(),
                description: description.trim(),
                updatedAt: "Just now",
              }
            : form
        )
      );
    } else {
      const newForm: FormItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        status: "Draft",
        responses: 0,
        updatedAt: "Just now",
      };
      setForms((current) => [newForm, ...current]);
    }

    setShowModal(false);
  };

  const deleteForm = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setForms((current) => current.filter((form) => form.id !== id));
    }
  };

  const togglePublish = (id: string) => {
    setForms((current) =>
      current.map((form) =>
        form.id === id
          ? {
              ...form,
              status: form.status === "Published" ? "Draft" : "Published",
              updatedAt: "Just now",
            }
          : form
      )
    );
  };

  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(search.toLowerCase()) ||
      form.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || form.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalResponses = forms.reduce(
    (total, form) => total + form.responses,
    0
  );

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7fc]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7fc] text-gray-800 md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-6 md:block">
        <Link href="/" className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
            <MessageCircle size={22} />
          </div>
          <span className="text-xl font-bold">FormFlow</span>
        </Link>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-purple-50 px-4 py-3 font-semibold text-purple-700"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>
          <a
            href="#forms"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50"
          >
            <FileText size={19} />
            My Forms
          </a>
          <a
            href="#overview"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50"
          >
            <Users size={19} />
            Responses
          </a>
        </nav>

        <div className="mt-12 rounded-2xl bg-purple-50 p-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <MessageCircle size={21} />
          </div>
          <h3 className="font-bold">Forms made simple</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Create forms and collect responses in one place.
          </p>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your forms and responses.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Create Form</span>
            <span className="sm:hidden">Create</span>
          </button>
        </header>

        <div className="mx-auto max-w-7xl p-5 sm:p-8">
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white sm:p-8">
            <p className="mb-2 text-sm font-medium text-purple-100">
              YOUR WORKSPACE
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Welcome to FormFlow!
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-purple-100 sm:text-base">
              Create interactive forms, publish them, and keep your responses
              organized in one place.
            </p>
            <button
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              <Plus size={18} />
              Create your first form
            </button>
          </div>

          <div
            id="overview"
            className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <StatCard
              icon={<FileText size={21} />}
              label="Total Forms"
              value={forms.length}
              color="purple"
            />
            <StatCard
              icon={<CheckCircle2 size={21} />}
              label="Published"
              value={forms.filter((form) => form.status === "Published").length}
              color="green"
            />
            <StatCard
              icon={<Users size={21} />}
              label="Total Responses"
              value={totalResponses}
              color="blue"
            />
            <StatCard
              icon={<Clock size={21} />}
              label="Drafts"
              value={forms.filter((form) => form.status === "Draft").length}
              color="orange"
            />
          </div>

          <section
            id="forms"
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-bold">My Forms</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create and manage your forms.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
                  <Search size={17} className="text-gray-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search forms..."
                    className="w-full py-2.5 text-sm outline-none sm:w-40"
                  />
                </div>

                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none"
                >
                  <option value="All">All forms</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Drafts</option>
                </select>
              </div>
            </div>

            {filteredForms.length === 0 ? (
              <div className="p-10 text-center">
                <FileText className="mx-auto mb-3 text-gray-300" size={35} />
                <h3 className="font-semibold">No forms found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try another search or create a new form.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Form</th>
                        <th className="px-4 py-4 font-semibold">Status</th>
                        <th className="px-4 py-4 font-semibold">Responses</th>
                        <th className="px-4 py-4 font-semibold">Updated</th>
                        <th className="px-4 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredForms.map((form) => (
                        <tr key={form.id} className="hover:bg-gray-50/70">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <FileText size={19} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold">{form.title}</p>
                                <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                                  {form.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                form.status === "Published"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-orange-50 text-orange-700"
                              }`}
                            >
                              {form.status}
                            </span>
                          </td>
                          <td className="px-4 py-5 text-sm font-medium">
                            {form.responses}
                          </td>
                          <td className="px-4 py-5 text-sm text-gray-500">
                            {form.updatedAt}
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-1">
                              <Link
                                href={`/builder/${form.id}`}
                                title="Edit form questions"
                                aria-label={`Edit questions for ${form.title}`}
                                className="rounded-lg p-2 text-purple-700 transition hover:bg-purple-50"
                              >
                                <Pencil size={17} />
                              </Link>
                              <button
                                onClick={() => openEditModal(form)}
                                title="Rename form"
                                aria-label={`Rename ${form.title}`}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                              >
                                <FileText size={17} />
                              </button>
                              <button
                                onClick={() => togglePublish(form.id)}
                                title={
                                  form.status === "Published"
                                    ? "Unpublish"
                                    : "Publish"
                                }
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                              >
                                <ExternalLink size={17} />
                              </button>
                              <button
                                onClick={() => deleteForm(form.id)}
                                title="Delete form"
                                aria-label={`Delete ${form.title}`}
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-gray-100 md:hidden">
                  {filteredForms.map((form) => (
                    <article key={form.id} className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="break-words font-semibold">
                            {form.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {form.description}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span
                              className={`rounded-full px-2.5 py-1 font-semibold ${
                                form.status === "Published"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-orange-50 text-orange-700"
                              }`}
                            >
                              {form.status}
                            </span>
                            <span className="text-gray-500">
                              {form.responses} responses
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/builder/${form.id}`}
                          className="shrink-0 rounded-lg bg-purple-50 p-2 text-purple-700"
                          aria-label={`Edit ${form.title}`}
                        >
                          <Pencil size={18} />
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => openEditModal(form)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => togglePublish(form.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        >
                          {form.status === "Published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteForm(form.id)}
                          className="rounded-lg border border-red-100 px-3 py-2 text-sm text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          <footer className="py-8 text-center text-sm text-gray-400">
            © FormFlow
          </footer>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={saveForm}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingForm ? "Rename Form" : "Create a Form"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the details for your form.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <label
              htmlFor="form-title"
              className="mb-2 block text-sm font-medium"
            >
              Form title
            </label>
            <input
              id="form-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={100}
              placeholder="e.g. Customer Feedback"
              className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            <label
              htmlFor="form-description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="form-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="What is this form for?"
              className="mb-6 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                {editingForm ? "Save Changes" : "Create Form"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "purple" | "green" | "blue" | "orange";
}) {
  const colorClasses = {
    purple: "bg-purple-50 text-purple-700",
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
