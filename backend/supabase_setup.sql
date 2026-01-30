-- Run this in your Supabase SQL Editor to set up the tables for AllSubjectQuiz

-- 1. Table for Quiz Questions
create table if not exists all_sub_quiz_questions (
  id uuid default gen_random_uuid() primary key,
  set_name text not null,
  question text not null,
  options text[] not null check (array_length(options, 1) >= 2),
  correct_answer_index int2 not null check (correct_answer_index >= 0),
  explanation text not null,
  created_at timestamptz default now()
);

-- 2. Table for Set Locks
create table if not exists all_sub_quiz_set_locks (
  id uuid default gen_random_uuid() primary key,
  set_name text not null unique,
  is_locked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Table for Submitted Tests
create table if not exists all_sub_quiz_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- Changed to text to support MongoDB ObjectIds
  user_name text not null,
  user_email text not null,
  set_name text not null,
  score int4 default 0,
  answers jsonb not null,
  submitted_at timestamptz default now(),
  unique (user_id, set_name) -- Prevents duplicate submissions for the same set by the same user
);
