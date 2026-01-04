-- Permitir a usuarios autenticados (admin) eliminar mensajes
create policy "Authenticated users can delete contact messages"
  on public.contact_messages for delete
  using (auth.role() = 'authenticated');

-- Opcional: Permitir actualizar (por si en el futuro quieres marcar como leído)
create policy "Authenticated users can update contact messages"
  on public.contact_messages for update
  using (auth.role() = 'authenticated');
    