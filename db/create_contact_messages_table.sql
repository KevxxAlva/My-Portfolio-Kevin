-- Create the contact_messages table
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  email text not null,
  mensaje text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Create policy to allow insert access to everyone (public)
create policy "Public can insert contact messages"
  on public.contact_messages for insert
  with check (true);

-- Create policy to allow read access only to authenticated users (admins)
create policy "Authenticated users can view contact messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');
