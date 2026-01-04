create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  text text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar seguridad (RLS)
alter table public.testimonials enable row level security;

-- Política de lectura (pública)
create policy "Testimonials are viewable by everyone" 
  on public.testimonials for select 
  using (true);

-- Política de escritura (solo autenticados/admin)
create policy "Testimonials are insertable by authenticated users only" 
  on public.testimonials for insert 
  with check (auth.role() = 'authenticated');

create policy "Testimonials are updateable by authenticated users only" 
  on public.testimonials for update
  using (auth.role() = 'authenticated');

create policy "Testimonials are deletable by authenticated users only" 
  on public.testimonials for delete 
  using (auth.role() = 'authenticated');