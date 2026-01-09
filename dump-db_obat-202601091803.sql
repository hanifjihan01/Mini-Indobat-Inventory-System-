--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2026-01-09 18:03:09

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
-- Name: db_obat; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE db_obat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 4785 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16669)
-- Name: orders; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 215 (class 1259 OID 16668)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4786 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 218 (class 1259 OID 16679)
-- Name: products; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 217 (class 1259 OID 16678)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4787 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 4623 (class 2604 OID 16672)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4624 (class 2604 OID 16682)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4776 (class 0 OID 16669)
-- Dependencies: 216
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, product_id, quantity, discount_percent, total_price, created_at, updated_at, deleted_at) FROM stdin;
1	1	2	10	9000	2026-01-07 14:40:27.107533	\N	\N
2	1	2	10	9000	2026-01-07 14:40:43.482495	\N	\N
3	1	1	10	4500	2026-01-07 14:41:01.780747	\N	\N
4	1	1	10	4500	2026-01-07 14:41:50.671558	\N	\N
5	3	1	10	4500	2026-01-07 14:55:53.816567	\N	\N
6	3	1	0	5000	2026-01-07 16:04:04.643177	\N	\N
7	2	1	10	4500	2026-01-08 10:35:32.017908	2026-01-08 10:35:32.017908+07	\N
8	9	2	0	2000	2026-01-08 23:46:08.060016	2026-01-08 23:46:08.060016+07	\N
9	4	1	0	10000	2026-01-08 23:46:32.258683	2026-01-08 23:46:32.258683+07	\N
10	4	1	0	10000	2026-01-08 23:48:54.45714	2026-01-08 23:48:54.45714+07	\N
11	1	1	0	5500	2026-01-08 23:49:30.191558	2026-01-08 23:49:30.191558+07	\N
12	5	1	0	1000	2026-01-08 23:59:57.591823	2026-01-08 23:59:57.591823+07	\N
13	6	1	0	1000	2026-01-09 00:02:01.266432	2026-01-09 00:02:01.266432+07	\N
14	7	2	0	2000	2026-01-09 00:27:41.817548	2026-01-09 00:27:41.817548+07	\N
15	11	1	1	990	2026-01-09 13:07:32.159355	2026-01-09 13:07:32.159355+07	\N
16	8	1	0	1000	2026-01-09 13:15:32.181628	2026-01-09 13:15:32.181628+07	\N
17	9	1	2	980	2026-01-09 13:16:00.066895	2026-01-09 13:16:00.066895+07	\N
18	2	1	2	4900	2026-01-09 13:17:34.722677	2026-01-09 13:17:34.722677+07	\N
19	15	1	0	1000	2026-01-09 14:52:09.379045	2026-01-09 14:52:09.379045+07	\N
20	1	1	0	5500	2026-01-09 15:01:22.813958	2026-01-09 15:01:22.813958+07	\N
\.


--
-- TOC entry 4778 (class 0 OID 16679)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, stock, price, created_at, updated_at, deleted_at) FROM stdin;
13	tesss	-2	1111.00	2026-01-09 00:46:38.877119+07	2026-01-09 00:46:38.877119+07	2026-01-09 00:53:33.40662+07
12	test_product	1	5000.00	2026-01-09 00:23:12.725885+07	2026-01-09 00:23:12.725885+07	2026-01-09 00:54:23.452954+07
2	Ibuprofen	198	5000.00	0001-01-01 06:42:04+06:42:04	2026-01-09 13:17:34.721785+07	\N
5	Oskadon	1	1000.00	2026-01-08 09:11:43.196686+07	2026-01-08 23:59:57.591256+07	2026-01-09 14:38:10.350307+07
6	Betadin	1	1000.00	2026-01-08 09:18:29.673799+07	2026-01-09 00:02:01.266432+07	2026-01-09 14:38:46.723156+07
7	beta	0	1000.00	2026-01-08 09:22:13.938256+07	2026-01-09 00:27:41.817025+07	2026-01-09 14:38:56.024781+07
8	Seise	1	1000.00	2026-01-08 09:38:01.524951+07	2026-01-09 13:15:32.180304+07	2026-01-09 14:39:13.889861+07
9	obat filek	2	1000.00	2026-01-08 09:39:08.029161+07	2026-01-09 13:16:00.065897+07	2026-01-09 14:39:18.609857+07
10	plufoin	5	2000.00	2026-01-08 09:40:13.024311+07	2026-01-08 09:40:13.024311+07	2026-01-09 14:39:22.812226+07
11	obat pavilun	1	1000.00	2026-01-08 09:44:51.952559+07	2026-01-09 13:07:32.143645+07	2026-01-09 14:39:26.758177+07
14	Palmvlepein	2	1000.00	2026-01-09 13:08:11.831181+07	2026-01-09 13:08:11.831181+07	2026-01-09 14:39:37.331959+07
15	test	0	1000.00	2026-01-09 14:49:02.014374+07	2026-01-09 14:52:09.377937+07	2026-01-09 14:56:13.664921+07
16	sss	20	2000.00	2026-01-09 14:55:22.350019+07	2026-01-09 14:55:22.350019+07	2026-01-09 14:56:20.093426+07
1	Paracetamol	148	5500.00	0001-01-01 06:42:04+06:42:04	2026-01-09 15:01:22.799724+07	\N
17	sejenis apa ajas	3	2000.00	2026-01-09 15:02:40.684907+07	2026-01-09 16:08:41.225245+07	2026-01-09 16:24:31.917448+07
18	testt	2	20000.00	2026-01-09 16:26:05.179669+07	2026-01-09 16:26:05.179669+07	2026-01-09 16:26:13.735425+07
19	testtt	2	2222.00	2026-01-09 16:26:39.255278+07	2026-01-09 16:26:39.255278+07	2026-01-09 16:26:45.857221+07
20	teee	2	2222.00	2026-01-09 16:30:56.649457+07	2026-01-09 16:30:56.649457+07	2026-01-09 16:31:05.50446+07
3	Mefenamat	1	5000.00	0001-01-01 06:42:04+06:42:04	2026-01-09 17:26:24.100233+07	\N
4	Butil	10	10000.00	2026-01-08 09:09:12.56656+07	2026-01-09 17:37:36.416867+07	\N
\.


--
-- TOC entry 4788 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 20, true);


--
-- TOC entry 4789 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 20, true);


--
-- TOC entry 4627 (class 2606 OID 16677)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4630 (class 2606 OID 16684)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4625 (class 1259 OID 16724)
-- Name: idx_orders_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_deleted_at ON public.orders USING btree (deleted_at);


--
-- TOC entry 4628 (class 1259 OID 16700)
-- Name: idx_products_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_deleted_at ON public.products USING btree (deleted_at);


--
-- TOC entry 4631 (class 2606 OID 16719)
-- Name: orders fk_orders_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES public.products(id);


-- Completed on 2026-01-09 18:03:09

--
-- PostgreSQL database dump complete
--

