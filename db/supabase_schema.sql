-- Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descripcion text not null,
  descripcion_completa text not null,
  tags text[] not null default '{}',
  imagen_url text not null,
  repo_link text,
  demo_link text,
  destacado boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policy to allow read access to everyone
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (true);

-- Create policy to allow insert/update/delete to authenticated users only
-- Note: You might need to adjust this depending on how you handle admin auth.
-- For now, this allows any logged-in user to modify projects.
create policy "Authenticated users can manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated');
