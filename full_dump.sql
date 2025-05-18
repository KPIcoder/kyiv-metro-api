--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.8 (Homebrew)

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
-- Name: app_tickets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_tickets (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    valid_days integer,
    usages_limit integer,
    valid_zones_range text,
    price smallint
);


--
-- Name: app_tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.app_tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.app_tickets_id_seq OWNED BY public.app_tickets.id;


--
-- Name: lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lines (
    id integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL
);


--
-- Name: lines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lines_id_seq OWNED BY public.lines.id;


--
-- Name: station_connections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.station_connections (
    from_station_id integer,
    to_station_id integer,
    weight smallint
);


--
-- Name: stations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stations (
    id integer NOT NULL,
    line_id integer,
    name text NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    source text,
    status text
);


--
-- Name: stations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stations_id_seq OWNED BY public.stations.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    user_id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    created_at date,
    expired_at date,
    valid_zones_range text,
    usages_left integer
);


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zones (
    id integer NOT NULL,
    name text,
    zone_range smallint,
    coords text NOT NULL,
    multiplier double precision NOT NULL
);


--
-- Name: zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.zones_id_seq OWNED BY public.zones.id;


--
-- Name: app_tickets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_tickets ALTER COLUMN id SET DEFAULT nextval('public.app_tickets_id_seq'::regclass);


--
-- Name: lines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lines ALTER COLUMN id SET DEFAULT nextval('public.lines_id_seq'::regclass);


--
-- Name: stations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stations ALTER COLUMN id SET DEFAULT nextval('public.stations_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zones ALTER COLUMN id SET DEFAULT nextval('public.zones_id_seq'::regclass);


--
-- Data for Name: app_tickets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.app_tickets (id, name, description, valid_days, usages_limit, valid_zones_range, price) FROM stdin;
1	All zones daily	All zones daily	1	9999	1-5	25
2	Central zones daily	Central zones daily	1	9999	1-2	15
3	Central zones weekly	Central zones weekly	7	9999	1-2	75
4	Central zones return	Central zones return	1	2	1-2	10
5	Airport exlusive	Airport exlusive	1	1	1-5	15
6	20 rides all zones	20 rides all zones	365	20	1-5	160
7	100 rides all zones	100 rides all zones	365	100	1-5	700
8	100 rides Kyiv City	100 rides all zones	365	100	1-5	600
9	50 rides Kyiv City	100 rides all zones	365	50	1-3	325
\.


--
-- Data for Name: lines; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lines (id, name, color) FROM stdin;
1	Оболонсько–Теремківська лінія	blue
2	Святошинсько–Броварська лінія	red
3	Сирецько–Печерська лінія	3
4	Подільсько-Вигурівська	4
5	Лівобережна	5
\.


--
-- Data for Name: station_connections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.station_connections (from_station_id, to_station_id, weight) FROM stdin;
28	37	1
37	28	1
37	27	1
27	37	1
27	38	1
38	27	1
38	39	1
39	38	1
39	29	1
29	39	1
29	40	1
40	29	1
40	35	1
35	40	1
35	31	1
31	35	1
31	41	1
41	31	1
41	34	1
34	41	1
34	42	1
42	34	1
42	43	1
43	42	1
43	44	1
44	43	1
44	17	1
17	44	1
17	23	1
23	17	1
23	24	1
24	23	1
24	25	1
25	24	1
16	15	1
15	16	1
15	53	1
53	15	1
53	14	1
14	53	1
14	13	1
13	14	1
13	12	1
12	13	1
12	11	1
11	12	1
11	10	1
10	11	1
10	9	1
9	10	1
9	32	1
32	9	1
32	36	1
36	32	1
36	8	1
8	36	1
8	7	1
7	8	1
7	3	1
3	7	1
3	2	1
2	3	1
2	4	1
4	2	1
4	5	1
5	4	1
5	6	1
6	5	1
21	26	1
26	21	1
26	52	1
52	26	1
52	1	1
1	52	1
1	30	1
30	1	1
30	18	1
18	30	1
18	33	1
33	18	1
33	51	1
51	33	1
51	49	1
49	51	1
49	50	1
50	49	1
50	19	1
19	50	1
19	20	1
20	19	1
20	48	1
48	20	1
48	47	1
47	48	1
47	46	1
46	47	1
46	45	1
45	46	1
45	22	1
22	45	1
36	35	1
35	36	1
32	30	1
30	32	1
31	18	1
18	31	1
54	55	1
55	54	1
55	56	1
56	55	1
56	57	1
57	56	1
57	58	1
58	57	1
58	59	1
59	58	1
59	60	1
60	59	1
60	61	1
61	60	1
61	62	1
62	61	1
62	63	1
63	62	1
63	64	1
64	63	1
64	65	1
65	64	1
65	66	1
66	65	1
66	67	1
67	66	1
67	68	1
68	67	1
68	69	1
69	68	1
69	70	1
70	69	1
70	71	1
71	70	1
71	72	1
72	71	1
72	73	1
73	72	1
73	74	1
74	73	1
67	39	1
39	67	1
70	10	1
10	70	1
68	52	1
52	68	1
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stations (id, line_id, name, lat, lng, source, status) FROM stdin;
23	1	Виставковий центр	50.3824987	30.4775836	\N	OPERATIONAL
24	1	Іподром	50.3765534	30.4690454	\N	OPERATIONAL
25	1	Теремки	50.3669054	30.4538209	\N	OPERATIONAL
27	1	Оболонь	50.5015331	30.4982231	\N	OPERATIONAL
28	1	Героїв Дніпра	50.5226701	30.4988991	\N	OPERATIONAL
29	1	Контрактова площа	50.4658354	30.5150809	\N	OPERATIONAL
1	3	Львівська брама	50.4542969	30.5030383	\N	OPERATIONAL
18	3	Палац спорту	50.4382891	30.5208694	\N	OPERATIONAL
19	3	Славутич	50.3942003	30.6051576	\N	OPERATIONAL
20	3	Осокорки	50.3951862	30.6162493	\N	OPERATIONAL
21	3	Сирець	50.4763888	30.430831	\N	OPERATIONAL
22	3	Червоний Хутір	50.4094593	30.6961767	\N	OPERATIONAL
26	3	Дорогожичі	50.4737337	30.4487773	\N	OPERATIONAL
30	3	Золоті ворота	50.4482462	30.5134785	\N	OPERATIONAL
31	1	Площа Українських Героїв	50.4394165	30.5166416	\N	OPERATIONAL
34	1	Палац «Україна»	50.4206817	30.5213092	\N	OPERATIONAL
35	1	Майдан Незалежності	50.4499356	30.5244408	\N	OPERATIONAL
37	1	Мінська	50.5121705	30.4985738	\N	OPERATIONAL
38	1	Почайна	50.4861951	30.4978905	\N	OPERATIONAL
39	1	Тараса Шевченка	50.4735413	30.5045395	\N	OPERATIONAL
40	1	Поштова площа	50.4587762	30.5248945	\N	OPERATIONAL
41	1	Олімпійська	50.4322821	30.5164035	\N	OPERATIONAL
42	1	Либідська	50.4131113	30.5248282	\N	OPERATIONAL
43	1	Деміївська	50.4049317	30.5169137	\N	OPERATIONAL
44	1	Голосіївська	50.3973294	30.5081616	\N	OPERATIONAL
32	2	Театральна	50.44521	30.5180449	\N	OPERATIONAL
36	2	Хрещатик	50.4471871	30.5229456	\N	OPERATIONAL
33	3	Кловська	50.4369287	30.5319209	\N	OPERATIONAL
45	3	Бориспільська	50.403273	30.6842649	\N	OPERATIONAL
46	3	Вирлиця	50.402895	30.6661156	\N	OPERATIONAL
2	2	Лівобережна	50.4518631	30.5981679	\N	OPERATIONAL
3	2	Гідропарк	50.445993	30.5770339	\N	OPERATIONAL
4	2	Дарниця	50.4559397	30.6128423	\N	OPERATIONAL
5	2	Чернігівська	50.4598903	30.6303119	\N	OPERATIONAL
6	2	Лісова	50.4647597	30.6459702	\N	OPERATIONAL
7	2	Дніпро	50.4410407	30.5586885	\N	OPERATIONAL
8	2	Арсенальна	50.4444878	30.5454331	\N	OPERATIONAL
9	2	Університет	50.4442469	30.5058928	\N	OPERATIONAL
10	2	Вокзальна	50.4416401	30.4882512	\N	OPERATIONAL
11	2	Політехнічний інститут	50.4507932	30.466127	\N	OPERATIONAL
12	2	Шулявська	50.4550745	30.4453703	\N	OPERATIONAL
13	2	Берестейська	50.4590925	30.419688	\N	OPERATIONAL
14	2	Нивки	50.4585958	30.4042048	\N	OPERATIONAL
15	2	Житомирська	50.4561717	30.3658729	\N	OPERATIONAL
16	2	Академмістечко	50.4647043	30.3550833	\N	OPERATIONAL
17	1	Васильківська	50.3933354	30.488223	\N	OPERATIONAL
53	2	Святошин	50.4578249	30.3908011	\N	OPERATIONAL
47	3	Харківська	50.4006902	30.6523061	\N	OPERATIONAL
48	3	Позняки	50.3978967	30.6346619	\N	OPERATIONAL
49	3	Звіринецька	50.41825	30.5450279	\N	OPERATIONAL
50	3	Видубичі	50.4020929	30.560301	\N	OPERATIONAL
51	3	Печерська	50.4276251	30.5389263	\N	OPERATIONAL
52	3	Лукʼянівська	50.4623623	30.4818047	\N	OPERATIONAL
54	4	Вулиця Милославська	50.5318694	30.6090111	\N	\N
55	4	Вулиця Цвєтаєвої	50.5235083	30.6086528	\N	\N
56	4	Вулиця Сабурова	50.5332278	30.6045222	\N	\N
57	4	Вулиця Драйзера	50.511444	30.5959306	\N	\N
58	4	Вулиця Каштанова	50.5039722	30.58015	\N	\N
59	4	Проспект Ватутіна	50.4954667	30.5745417	\N	\N
60	4	Бульвар Перова	50.4879	30.5743	\N	\N
61	4	Вулиця Братиславська	50.48	30.62	\N	\N
62	4	Вулиця Стальського	50.48	30.61	\N	\N
63	4	Райдужна	50.4797806	30.5741056	\N	\N
64	4	Затока Десенка	50.475	30.559639	\N	\N
65	4	Труханів острів	50.4711528	30.5445	\N	\N
66	4	Суднобудівна	50.4742444	30.5276444	\N	\N
67	4	Подільська	50.4752778	30.5044889	\N	\N
68	4	Глибочицька	50.4629056	30.4851389	\N	\N
69	4	Площа Перемоги	50.45	30.489	\N	\N
70	4	Вокзальна	50.441667	30.488056	\N	\N
71	4	Солом`янська площа	50.4319444	30.4711111	\N	\N
72	4	Чоколівська	50.4202751	30.4600443	\N	\N
73	4	Аеропорт	50.40167	30.45167	\N	\N
74	4	Кільцева дорога	50.37	30.4586111	\N	\N
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tickets (id, user_id, name, description, created_at, expired_at, valid_zones_range, usages_left) FROM stdin;
1	test-user-id	All zones daily	All zones daily	2025-05-15	2025-05-16	1-5	9999
2	user_2wWSfCt9o0kSsnD9gO18SegsDcd	Single Ride	Single ride ticket for 5 zone(s)	2025-05-15	2025-05-16	1 - 5	1
\.


--
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.zones (id, name, zone_range, coords, multiplier) FROM stdin;
1	Zone 1 (Центр Києва)	1	50.476969 30.524100 50.473354 30.502970 50.463479 30.487510 50.449992 30.481861 50.436510 30.487530 50.426642 30.502991 50.423031 30.524100 50.426642 30.545209 50.436510 30.560670 50.449992 30.566339 50.463479 30.560690 50.473354 30.545230 50.476969 30.524100	1.25
2	Zone 2 (Внутрішнє кільце)	2	50.503938 30.524100 50.496704 30.566381 50.479248 30.608578 50.451023 30.635303 50.419199 30.629958 50.395303 30.608585 50.387234 30.566358 50.395316 30.523866 50.419230 30.478067 50.451050 30.452533 50.479264 30.481863 50.496706 30.482012 50.503938 30.524100	1.25
3	Zone 3 (Межі міста)	3	0.539897 30.524100 50.527832 30.594614 50.502400 30.664897 50.462319 30.709613 50.417231 30.717961 50.379270 30.664860 50.364452 30.594561 50.379294 30.523780 50.417280 30.447924 50.462375 30.395556 50.502445 30.363250 50.527851 30.452533 50.539897 30.524100	1.25
4	Zone 4 (Передмістя)	4	50.584845 30.524100 50.566731 30.629958 50.527060 30.735295 50.471221 30.807754 50.406663 30.823455 50.352481 30.735244 50.330238 30.629848 50.352516 30.523649 50.406735 30.413343 50.471311 30.332509 50.527135 30.273695 50.566774 30.418254 50.584845 30.524100	1.25
5	Zone 5 (Регіон)	5	50.719686 30.524100 50.683363 30.736341 50.602503 30.946486 50.490949 31.108270 50.355623 31.150387 50.242451 30.946373 50.194704 30.736119 50.242538 30.523083 50.355788 30.299276 50.491113 30.129312 50.602720 30.000643 50.683519 30.314324 50.719686 30.524100	1.25
\.


--
-- Name: app_tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.app_tickets_id_seq', 9, true);


--
-- Name: lines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lines_id_seq', 5, true);


--
-- Name: stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stations_id_seq', 74, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tickets_id_seq', 2, true);


--
-- Name: zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zones_id_seq', 5, true);


--
-- Name: app_tickets app_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_tickets
    ADD CONSTRAINT app_tickets_pkey PRIMARY KEY (id);


--
-- Name: lines lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lines
    ADD CONSTRAINT lines_pkey PRIMARY KEY (id);


--
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id);


--
-- Name: station_connections station_connections_from_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.station_connections
    ADD CONSTRAINT station_connections_from_station_id_fkey FOREIGN KEY (from_station_id) REFERENCES public.stations(id);


--
-- Name: station_connections station_connections_to_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.station_connections
    ADD CONSTRAINT station_connections_to_station_id_fkey FOREIGN KEY (to_station_id) REFERENCES public.stations(id);


--
-- Name: stations stations_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_line_id_fkey FOREIGN KEY (line_id) REFERENCES public.lines(id);


--
-- PostgreSQL database dump complete
--

