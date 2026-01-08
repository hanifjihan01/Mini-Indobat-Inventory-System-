--
-- PostgreSQL database cluster dump
--

-- Started on 2026-01-08 10:59:06

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2026-01-08 10:59:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-01-08 10:59:07

--
-- PostgreSQL database dump complete
--

--
-- Database "db_obat" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2026-01-08 10:59:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4784 (class 1262 OID 16667)
-- Name: db_obat; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_obat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE db_obat OWNER TO postgres;

\connect db_obat

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16669)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    product_id bigint,
    quantity bigint,
    discount_percent bigint,
    total_price numeric,
    created_at timestamp without time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16668)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 4785 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 218 (class 1259 OID 16679)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text,
    stock bigint,
    price numeric(12,2),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16678)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4786 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 4623 (class 2604 OID 16672)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4624 (class 2604 OID 16682)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4776 (class 0 OID 16669)
-- Dependencies: 216
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, product_id, quantity, discount_percent, total_price, created_at, updated_at, deleted_at) FROM stdin;
1	1	2	10	9000	2026-01-07 14:40:27.107533	\N	\N
2	1	2	10	9000	2026-01-07 14:40:43.482495	\N	\N
3	1	1	10	4500	2026-01-07 14:41:01.780747	\N	\N
4	1	1	10	4500	2026-01-07 14:41:50.671558	\N	\N
5	3	1	10	4500	2026-01-07 14:55:53.816567	\N	\N
6	3	1	0	5000	2026-01-07 16:04:04.643177	\N	\N
7	2	1	10	4500	2026-01-08 10:35:32.017908	2026-01-08 10:35:32.017908+07	\N
\.


--
-- TOC entry 4778 (class 0 OID 16679)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, stock, price, created_at, updated_at, deleted_at) FROM stdin;
3	mefenamat	0	5000.00	\N	\N	\N
1	Paracetamol	150	5500.00	0001-01-01 06:42:04+06:42:04	2026-01-08 08:35:01.307302+07	\N
4	Butil	2	10000.00	2026-01-08 09:09:12.56656+07	2026-01-08 09:09:12.56656+07	\N
5	Oskadon	2	1000.00	2026-01-08 09:11:43.196686+07	2026-01-08 09:11:43.196686+07	\N
6	Betadin	2	1000.00	2026-01-08 09:18:29.673799+07	2026-01-08 09:18:29.673799+07	\N
7	beta	2	1000.00	2026-01-08 09:22:13.938256+07	2026-01-08 09:22:13.938256+07	\N
8	Seise	2	1000.00	2026-01-08 09:38:01.524951+07	2026-01-08 09:38:01.524951+07	\N
9	obat filek	5	1000.00	2026-01-08 09:39:08.029161+07	2026-01-08 09:39:08.029161+07	\N
10	plufoin	5	2000.00	2026-01-08 09:40:13.024311+07	2026-01-08 09:40:13.024311+07	\N
11	obat pavilun	2	1000.00	2026-01-08 09:44:51.952559+07	2026-01-08 09:44:51.952559+07	\N
2	Ibuprofen	199	5000.00	0001-01-01 06:42:04+06:42:04	2026-01-08 10:35:32.014933+07	\N
\.


--
-- TOC entry 4787 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 7, true);


--
-- TOC entry 4788 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 11, true);


--
-- TOC entry 4627 (class 2606 OID 16677)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4630 (class 2606 OID 16684)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4625 (class 1259 OID 16724)
-- Name: idx_orders_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_deleted_at ON public.orders USING btree (deleted_at);


--
-- TOC entry 4628 (class 1259 OID 16700)
-- Name: idx_products_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_deleted_at ON public.products USING btree (deleted_at);


--
-- TOC entry 4631 (class 2606 OID 16719)
-- Name: orders fk_orders_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES public.products(id);


-- Completed on 2026-01-08 10:59:07

--
-- PostgreSQL database dump complete
--

-- Completed on 2026-01-08 10:59:07

--
-- PostgreSQL database cluster dump complete
--

