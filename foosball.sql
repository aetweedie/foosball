--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: alan.tweedie
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO "alan.tweedie";

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: alan.tweedie
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO "alan.tweedie";

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alan.tweedie
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: alan.tweedie
--

CREATE TABLE knex_migrations_lock (
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO "alan.tweedie";

--
-- Name: scores; Type: TABLE; Schema: public; Owner: alan.tweedie
--

CREATE TABLE scores (
    id integer NOT NULL,
    game_date timestamp with time zone DEFAULT '2017-08-31 13:44:48.637-06'::timestamp with time zone,
    alan_score real,
    mike_score real,
    winner_side boolean
);


ALTER TABLE scores OWNER TO "alan.tweedie";

--
-- Name: scores_id_seq; Type: SEQUENCE; Schema: public; Owner: alan.tweedie
--

CREATE SEQUENCE scores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scores_id_seq OWNER TO "alan.tweedie";

--
-- Name: scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alan.tweedie
--

ALTER SEQUENCE scores_id_seq OWNED BY scores.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: alan.tweedie
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: alan.tweedie
--

ALTER TABLE ONLY scores ALTER COLUMN id SET DEFAULT nextval('scores_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: alan.tweedie
--

COPY knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20170831132013_scores.js	1	2017-08-31 13:44:48.643-06
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alan.tweedie
--

SELECT pg_catalog.setval('knex_migrations_id_seq', 1, true);


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: alan.tweedie
--

COPY knex_migrations_lock (is_locked) FROM stdin;
0
\.


--
-- Data for Name: scores; Type: TABLE DATA; Schema: public; Owner: alan.tweedie
--

COPY scores (id, game_date, alan_score, mike_score, winner_side) FROM stdin;
1	2017-08-31 13:44:48.637-06	10	6	t
2	2017-08-31 13:44:48.637-06	10	0	f
3	2017-08-31 13:44:48.637-06	6	10	f
4	2017-08-31 13:44:48.637-06	10	5	t
5	2017-08-31 13:44:48.637-06	5	10	f
6	2017-08-31 13:44:48.637-06	8	10	t
7	2017-08-31 13:44:48.637-06	6	10	f
8	2017-08-31 13:44:48.637-06	2	10	t
9	2017-08-31 13:44:48.637-06	9	10	f
10	2017-08-31 13:44:48.637-06	10	8	t
11	2017-08-31 13:44:48.637-06	4	10	t
12	2017-08-31 13:44:48.637-06	5	10	f
13	2017-08-31 13:44:48.637-06	3	10	f
14	2017-08-31 13:44:48.637-06	3	10	t
15	2017-08-31 13:44:48.637-06	10	5	t
16	2017-08-31 13:44:48.637-06	10	3	t
17	2017-08-31 13:44:48.637-06	2	10	f
18	2017-08-31 13:44:48.637-06	10	7	f
19	2017-08-31 13:44:48.637-06	4	10	f
20	2017-08-31 13:44:48.637-06	8	10	t
21	2017-08-31 13:44:48.637-06	8	10	t
22	2017-08-31 13:44:48.637-06	10	9	t
23	2017-08-31 13:44:48.637-06	4	10	t
24	2017-08-31 13:44:48.637-06	8	10	t
25	2017-08-31 13:44:48.637-06	10	9	t
26	2017-08-31 13:44:48.637-06	7	10	f
27	2017-08-31 13:44:48.637-06	7	10	t
28	2017-08-31 13:44:48.637-06	5	10	f
29	2017-08-31 13:44:48.637-06	10	4	f
30	2017-08-31 13:44:48.637-06	10	9	f
31	2017-08-31 13:44:48.637-06	8	10	f
32	2017-08-31 13:44:48.637-06	6	10	t
33	2017-08-31 13:44:48.637-06	4	10	f
34	2017-08-31 13:44:48.637-06	10	8	f
35	2017-08-31 13:44:48.637-06	10	6	f
36	2017-08-31 13:44:48.637-06	8	10	f
37	2017-08-31 13:44:48.637-06	10	6	t
38	2017-08-31 13:44:48.637-06	10	7	t
39	2017-08-31 13:44:48.637-06	10	9	f
40	2017-08-31 13:44:48.637-06	10	9	t
41	2017-08-31 13:44:48.637-06	10	8	f
42	2017-08-31 13:44:48.637-06	9	10	t
43	2017-08-31 13:44:48.637-06	4	10	f
44	2017-08-31 13:44:48.637-06	7	10	f
45	2017-08-31 13:44:48.637-06	7	10	t
46	2017-08-31 13:44:48.637-06	8	10	f
48	2017-08-31 13:44:48.637-06	3	10	f
47	2017-08-31 13:44:48.637-06	3	10	f
49	2017-08-31 13:44:48.637-06	5	10	t
50	2017-08-31 13:44:48.637-06	10	9	t
51	2017-08-31 13:44:48.637-06	10	9	f
\.


--
-- Name: scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alan.tweedie
--

SELECT pg_catalog.setval('scores_id_seq', 51, true);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: alan.tweedie
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: alan.tweedie
--

ALTER TABLE ONLY scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

