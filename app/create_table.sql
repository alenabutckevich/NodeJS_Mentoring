CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id uuid DEFAULT uuid_generate_v4(),
    login text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    age numeric,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to postgres;
	
INSERT INTO public."Users" (login, password) VALUES
    ('Jimmy_Anderson@google.com', '84D2BF9E1B6269DCD0E9B4AA1957BFDA81B3B605'),
    ('Annie_Walker@google.com', '6FF89588C18691B8DCCB0DF53158B9D32A583822'),
    ('Harper_Chapman@google.com', '6B8D109221D072C1C03BCB589D2689956DEAE823');