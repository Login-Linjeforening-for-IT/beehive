--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.3

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
-- Name: audience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audience (
    name character varying(32) NOT NULL,
    color character varying(6),
    description text
);


ALTER TABLE public.audience OWNER TO postgres;

--
-- Name: campus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campus (
    name character varying(32) NOT NULL,
    postcode character varying(4) NOT NULL
);


ALTER TABLE public.campus OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    name character varying(32) NOT NULL,
    color character varying(6),
    description text
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    postcode character varying(4) NOT NULL,
    name character varying(32) NOT NULL
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: committee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.committee (
    name character varying(32) NOT NULL,
    aboutlink character varying(64)
);


ALTER TABLE public.committee OWNER TO postgres;

--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    eventid integer NOT NULL,
    parent integer,
    organizer character varying(32),
    eventname character varying(64) NOT NULL,
    startt timestamp without time zone NOT NULL,
    endt timestamp without time zone NOT NULL,
    publisht timestamp without time zone NOT NULL,
    description text,
    audience character varying(32),
    category character varying(32),
    image character varying(128) NOT NULL,
    fblink character varying(128),
    discordlink character varying(128)
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_eventid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_eventid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_eventid_seq OWNER TO postgres;

--
-- Name: event_eventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_eventid_seq OWNED BY public.event.eventid;


--
-- Name: eventlocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventlocation (
    location integer NOT NULL,
    event integer NOT NULL
);


ALTER TABLE public.eventlocation OWNER TO postgres;

--
-- Name: extlocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.extlocation (
    locationid integer NOT NULL,
    street character varying(64) NOT NULL,
    postcode character varying(4) NOT NULL
);


ALTER TABLE public.extlocation OWNER TO postgres;

--
-- Name: onpremlocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.onpremlocation (
    locationid integer NOT NULL,
    roomno character varying(8),
    campus character varying(32),
    mazeref character varying(128)
);


ALTER TABLE public.onpremlocation OWNER TO postgres;

--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    name character varying(32) NOT NULL,
    link character varying(64)
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: organizer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizer (
    name character varying(32) NOT NULL,
    logo character varying(128) NOT NULL
);


ALTER TABLE public.organizer OWNER TO postgres;

--
-- Name: eventdetails; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.eventdetails AS
 SELECT event.eventid,
    COALESCE(event.parent, 0) AS parent,
    event.organizer,
    event.eventname,
    event.startt,
    event.endt,
    event.publisht,
    event.description,
    event.audience,
    event.category,
    event.image,
    event.fblink,
    event.discordlink,
    organizer.logo,
    concat(organization.link, committee.aboutlink) AS orglink,
    COALESCE(onpremlocation.roomno, ''::character varying) AS roomno,
    COALESCE(onpremlocation.campus, ''::character varying) AS campus,
    COALESCE(onpremlocation.mazeref, ''::character varying) AS mazeref,
    COALESCE(extlocation.street, ''::character varying) AS street,
    concat(campus.postcode, extlocation.postcode) AS postcode,
    city.name
   FROM ((((((((public.event
     LEFT JOIN public.eventlocation ON ((event.eventid = eventlocation.event)))
     LEFT JOIN public.extlocation ON ((eventlocation.location = extlocation.locationid)))
     LEFT JOIN public.onpremlocation ON ((eventlocation.location = onpremlocation.locationid)))
     LEFT JOIN public.campus ON (((onpremlocation.campus)::text = (campus.name)::text)))
     LEFT JOIN public.city ON ((((campus.postcode)::text = (city.postcode)::text) OR ((extlocation.postcode)::text = (city.postcode)::text))))
     LEFT JOIN public.organizer ON (((event.organizer)::text = (organizer.name)::text)))
     LEFT JOIN public.committee ON (((event.organizer)::text = (committee.name)::text)))
     LEFT JOIN public.organization ON (((event.organizer)::text = (organization.name)::text)));


ALTER TABLE public.eventdetails OWNER TO postgres;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    locationid integer NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: event eventid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN eventid SET DEFAULT nextval('public.event_eventid_seq'::regclass);


--
-- Name: audience audience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audience
    ADD CONSTRAINT audience_pkey PRIMARY KEY (name);


--
-- Name: campus campus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campus
    ADD CONSTRAINT campus_pkey PRIMARY KEY (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (name);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (postcode);


--
-- Name: committee committee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.committee
    ADD CONSTRAINT committee_pkey PRIMARY KEY (name);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (eventid);


--
-- Name: eventlocation eventlocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventlocation
    ADD CONSTRAINT eventlocation_pkey PRIMARY KEY (location, event);


--
-- Name: extlocation extlocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.extlocation
    ADD CONSTRAINT extlocation_pkey PRIMARY KEY (locationid);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (locationid);


--
-- Name: onpremlocation onpremlocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onpremlocation
    ADD CONSTRAINT onpremlocation_pkey PRIMARY KEY (locationid);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (name);


--
-- Name: organizer organizer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizer
    ADD CONSTRAINT organizer_pkey PRIMARY KEY (name);


--
-- Name: campus campus_postcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campus
    ADD CONSTRAINT campus_postcode_fkey FOREIGN KEY (postcode) REFERENCES public.city(postcode) ON DELETE SET NULL;


--
-- Name: committee committee_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.committee
    ADD CONSTRAINT committee_name_fkey FOREIGN KEY (name) REFERENCES public.organizer(name) ON DELETE CASCADE;


--
-- Name: event event_audience_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_audience_fkey FOREIGN KEY (audience) REFERENCES public.audience(name) ON DELETE SET NULL;


--
-- Name: event event_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_category_fkey FOREIGN KEY (category) REFERENCES public.category(name) ON DELETE SET NULL;


--
-- Name: event event_organizer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_organizer_fkey FOREIGN KEY (organizer) REFERENCES public.organizer(name) ON DELETE SET NULL;


--
-- Name: event event_parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_parent_fkey FOREIGN KEY (parent) REFERENCES public.event(eventid) ON DELETE CASCADE;


--
-- Name: eventlocation eventlocation_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventlocation
    ADD CONSTRAINT eventlocation_event_fkey FOREIGN KEY (event) REFERENCES public.event(eventid) ON DELETE CASCADE;


--
-- Name: eventlocation eventlocation_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventlocation
    ADD CONSTRAINT eventlocation_location_fkey FOREIGN KEY (location) REFERENCES public.location(locationid) ON DELETE SET NULL;


--
-- Name: extlocation extlocation_locationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.extlocation
    ADD CONSTRAINT extlocation_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE CASCADE;


--
-- Name: extlocation extlocation_postcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.extlocation
    ADD CONSTRAINT extlocation_postcode_fkey FOREIGN KEY (postcode) REFERENCES public.city(postcode) ON DELETE SET NULL;


--
-- Name: onpremlocation onpremlocation_campus_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onpremlocation
    ADD CONSTRAINT onpremlocation_campus_fkey FOREIGN KEY (campus) REFERENCES public.campus(name) ON DELETE SET NULL;


--
-- Name: onpremlocation onpremlocation_locationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onpremlocation
    ADD CONSTRAINT onpremlocation_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE CASCADE;


--
-- Name: organization organization_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_name_fkey FOREIGN KEY (name) REFERENCES public.organizer(name) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

