"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !data) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.container}>
      <button onClick={() => setIsOpen(true)}>
        Create note
      </button>

<SearchBox
  value={search}
  onChange={(value) => {
    setSearch(value);
    setPage(1);
  }}
/>

<NoteList notes={data.notes} />

<Pagination
  pageCount={data.totalPages}
  currentPage={page}
  onPageChange={setPage}
/>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </main>
  );
}