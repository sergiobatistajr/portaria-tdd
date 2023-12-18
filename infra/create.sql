create schema portaria
create table portaria.user (
    id uuid,
    name text,
    email text,
    status text,
    role text,
    password text
)
create table portaria.vehicle (
    id uuid,
    name text,
    "entryDate" timestamp,
    plate text,
    model text,
    pax numeric,
    apartment numeric,
    "createdBy" uuid,
    observation text,
    "departureDate" timestamp,
    status text
)
create table portaria.guest (
    id uuid,
    name text,
    "entryDate" timestamp,
    apartment numeric,
    "createdBy" uuid,
    observation text,
    "departureDate" timestamp,
    status text
)
INSERT INTO usuarios (id, nome, email, status, role, senha)
VALUES ('c5da78c3-b12c-42e2-9114-3468c889dace', 'Sérgio Batista', 'sergio@gmail.com', 'active', 'admin', '$2b$12$M.a2qZDKnv5q.XsOxmZjT.iaj6t/vomd9/XB/FyBt2EH1wYt03ywe');