
ALTER DATABASE staff
    SET "TimeZone" TO 'Asia/Almaty';
-- Table: public.users

CREATE SEQUENCE IF NOT EXISTS public."documents_UID_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public."documents_UID_seq"
    OWNER TO postgres;

-- SEQUENCE: public.tblate_id_seq

-- DROP SEQUENCE IF EXISTS public.tblate_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.tblate_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.tblate_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.tbsmeny_id_seq

-- DROP SEQUENCE IF EXISTS public.tbsmeny_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.tbsmeny_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.tbsmeny_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.user_card_id_seq

-- DROP SEQUENCE IF EXISTS public.user_card_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.user_card_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.user_card_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.users_id_seq

-- DROP SEQUENCE IF EXISTS public.users_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.worktime-id_seq

-- DROP SEQUENCE IF EXISTS public."worktime-id_seq";

CREATE SEQUENCE IF NOT EXISTS public."worktime-id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public."worktime-id_seq"
    OWNER TO postgres;
-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    pwd_hash character varying(100) COLLATE pg_catalog."default" NOT NULL,
    isadmin integer NOT NULL DEFAULT 0,
    blocked boolean NOT NULL DEFAULT false,
    tmstart time without time zone DEFAULT date_trunc('seconds'::text, ('09:00:00'::time without time zone)::interval),
    tmend time without time zone DEFAULT date_trunc('seconds'::text, ('18:00:00'::time without time zone)::interval),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- Table: public.documents

-- DROP TABLE IF EXISTS public.documents;

CREATE TABLE IF NOT EXISTS public.documents
(
    uid integer NOT NULL DEFAULT nextval('"documents_UID_seq"'::regclass),
    user_id integer,
    dt date DEFAULT CURRENT_DATE,
    "time" time(6) without time zone DEFAULT date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval),
    comment character varying(100) COLLATE pg_catalog."default",
    status boolean,
    id_op integer,
    id_smeny integer,
    office boolean NOT NULL,
    ad_comment character varying(100) COLLATE pg_catalog."default",
    ip character varying(15) COLLATE pg_catalog."default",
    CONSTRAINT documents_pkey PRIMARY KEY (uid),
    CONSTRAINT fk_idsmeny FOREIGN KEY (id_smeny)
        REFERENCES public.tbsmeny (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_opertype FOREIGN KEY (id_op)
        REFERENCES public.operacii_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_smeny FOREIGN KEY (id_smeny)
        REFERENCES public.tbsmeny (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.documents
    OWNER to postgres;

-- Trigger: documents_ai1
-- FUNCTION: public.documents_ai0()

-- DROP FUNCTION IF EXISTS public.documents_ai0();

CREATE OR REPLACE FUNCTION public.documents_ai0()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
--ЕСЛИ СМЕНА НЕ ОТКРЫТА
if ((select date_trunc('day'::text, dtstart::timestamp without time zone) from tbsmeny order by id desc limit 1) < CURRENT_DATE) then											 
	insert into tbSmeny(comment) values('qwe');
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
-- 	new.status:=true;

	--ЗАПИСЬ ОПОЗДАНИЯ за прошлую смену для всех 
	update workstatus
	set dtend='18:00:00',id_op=5
	where id_smeny<>new.id_smeny and dtend is null and dtstart<='18:00:00';
	
	update workstatus
	set dtend=dtstart,id_op=5
	where id_smeny<>new.id_smeny and dtend is null and dtstart>'18:00:00';
	
	--ЗАПИСЬ ОПОЗДАНИЯ ДЛЯ ТОГО КТО ОТКРЫВАЕТ СМЕНУ 
	insert into workstatus(id_smeny,user_id,dtstart,id_op) 
	values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
	
	--ПРОВЕРКА НА ОПОЗДАНИЕ
	if (current_time>'09:00:00')  then
		new.id_op:='1';
		new.status:=true;
		insert into tblate(smena,iduser,later)
		values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-'09:00:00'));
	else 
		new.id_op:='2';
		new.status:=true;
		insert into tblate(smena,iduser,later)
		values(new.id_smeny,new.user_id,'00:00:00');
	end if;	
	
	--ЕСЛИ ОТКРЫТАЯ СМЕНА СЕГОДНЯ
elseif ((select date_trunc('day'::text, dtstart::timestamp without time zone) from tbsmeny order by id desc limit 1) = CURRENT_DATE) THEN
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
	--НЕПОНЯТНО
	if((select id from tbsmeny order by id desc limit 1)=new.id_smeny) THEN
--  		new.id_smeny:=(select id from tbsmeny order by id desc limit 1);

		--КОГДА УХОДИШЬ ПОВТОРНО
		if ((SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny = new.id_smeny ORDER BY uid DESC limit 1)=4) then
			new.status:=false;
			new.id_op:='5';
			update workstatus
			set dtend=(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),id_op=new.id_op
			where user_id=new.user_id and id_smeny=new.id_smeny and dtend is null;
			
			--КОГДА ПРИШЕЛ ПЕРВАЯ ПРОВЕРКА
		elseif ((SELECT id_op FROM documents WHERE user_id = new.user_id and  id_smeny= new.id_smeny ORDER BY uid DESC limit 1)<>5 and (SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny= new.id_smeny ORDER BY uid DESC limit 1)<>4) then
			
			--КОГДА ПРИШЕЛ
			if ((SELECT status FROM documents WHERE user_id = new.user_id and id_smeny= new.id_smeny ORDER BY uid DESC limit 1)=false) then
			
				insert into workstatus(id_smeny,user_id,dtstart,id_op) 
				values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
-- 				new.status:=true;
				if (current_time>'09:00:00')  then
					new.id_op:='1';
					new.status:=true;
					
					insert into tblate(smena,iduser,later)
					values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-'09:00:00'));
				else 
					new.id_op:='2';
					new.status:=true;
					insert into tblate(smena,iduser,later)
					values(new.id_smeny,new.user_id,'00:00:00');
				end if;
				
				--КОГДА УХОДИШЬ
			elseif ((SELECT status FROM documents WHERE user_id = new.user_id and  id_smeny= new.id_smeny  ORDER BY uid DESC limit 1)=true) then
				new.id_op:='5';
				new.status:=false;
				
				update workstatus
				set dtend=(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),id_op=new.id_op
				where user_id=new.user_id and id_smeny=new.id_smeny and dtend is null;
			end if;
			
			--КОГДА ВЕРНУЛСЯ
		elseif ((SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny = new.id_smeny ORDER BY uid DESC limit 1)=5) then
			new.id_op:='4';
			new.status:=true;
			insert into workstatus(id_smeny,user_id,dtstart,id_op) 
			values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
			--ПРОВЕРКА НА ОПОЗДАНИЕ
		elseif (new.status is null) THEN
			insert into workstatus(id_smeny,user_id,dtstart,id_op) 
			values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
			if (current_time>'09:00:00')  then
				new.id_op:='1';
				new.status:=true;
				insert into tblate(smena,iduser,later)
				values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-'09:00:00'));
			else 
				new.id_op:='2';
				new.status:=true;
				insert into tblate(smena,iduser,later)
				values(new.id_smeny,new.user_id,'00:00:00');
			end if;
		end if;
		--ЕСЛИ СМЕНА ТАБЛИЦЕ НЕ РАВНА С СМЕНОЙ В ДОКУМЕНТЕ
	elseif((select id from tbsmeny order by id desc limit 1)<>new.id_smeny) THEN
-- 		new.status:=true;
		new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
		
		insert into workstatus(id_smeny,user_id,dtstart,id_op) 
		values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
		
		if (current_time>'09:00:00')  then
			new.id_op:='1';
			new.status:=true;
			insert into tblate(smena,iduser,later) 
			values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-'09:00:00'));
		else 
			new.id_op:='2';
			new.status:=true;
			insert into tblate(smena,iduser,later)
			values(new.id_smeny,new.user_id,'00:00:00');
		end if;
	end if;
	--ЕСЛИ НЕТУ СМЕН
elseif((select id_smeny from documents where new.user_id=user_id order by uid desc limit 1) is null) THEN
	insert into tbSmeny(comment) values('qwe');
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
	insert into workstatus(id_smeny,user_id,dtstart,id_op) 
	values(new.id_smeny,new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
	new.status:=true;
		--ПРОВЕРКА НА ОПОЗДАНИЕ
		if (current_time>'09:00:00')  then
			new.id_op:='1';
			new.status:=true;
			insert into tblate(smena,iduser,later) 
			values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-'09:00:00'));
		else 
			new.id_op:='2';
			new.status:=true;
			insert into tblate(smena,iduser,later)
			values(new.id_smeny,new.user_id,'00:00:00');
		end if;
	end if;
return NEW;
END;
$BODY$;

ALTER FUNCTION public.documents_ai0()
    OWNER TO postgres;


-- FUNCTION: public.documents_ai1()

-- DROP FUNCTION IF EXISTS public.documents_ai1();

CREATE OR REPLACE FUNCTION public.documents_ai1()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
--ЕСЛИ СМЕНА НЕ ОТКРЫТА
if ((select date_trunc('day'::text, dtstart::timestamp without time zone) from tbsmeny order by id desc limit 1) < CURRENT_DATE) then											 
	insert into tbSmeny(comment) values('qwe');
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
-- 	new.status:=true;

	--ЗАПИСЬ ОПОЗДАНИЯ за прошлую смену для всех 
	update workstatus
	set dtend=(select tmend from users where id=new.user_id),id_op=5
	where id_smeny<>new.id_smeny and dtend is null and dtstart<=(select tmend from users where id=new.user_id);
	
	--Запись ОПОЗДАНИЯ за прошлую смену если сотрудник отметился после рабочего времени
	update workstatus
	set dtend=dtstart,id_op=5
	where id_smeny<>new.id_smeny and dtend is null and dtstart>(select tmend from users where id=new.user_id);
	
	--ЗАПИСЬ ОПОЗДАНИЯ ДЛЯ ТОГО КТО ОТКРЫВАЕТ СМЕНУ 
	insert into workstatus(id_smeny,user_id,dtstart,id_op) 
	values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
	
	--ПРОВЕРКА НА ОПОЗДАНИЕ
	if (current_time>(select tmstart from users where id=new.user_id))  then
		new.id_op:='1';
		new.status:=true;
		
		--время опоздания
		insert into tblate(smena,iduser,later)
		values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-(select tmstart from users where id=new.user_id)));
	else 
		new.id_op:='2';
		new.status:=true;
		
		--время опоздания 00
		insert into tblate(smena,iduser,later)
		values(new.id_smeny,new.user_id,'00:00:00');
	end if;	
	
	--ЕСЛИ ОТКРЫТАЯ СМЕНА СЕГОДНЯ
elseif ((select date_trunc('day'::text, dtstart::timestamp without time zone) from tbsmeny order by id desc limit 1) = CURRENT_DATE) THEN
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
	--НЕПОНЯТНО
	if((select id from tbsmeny order by id desc limit 1)=new.id_smeny) THEN
--  		new.id_smeny:=(select id from tbsmeny order by id desc limit 1);

		--КОГДА УХОДИШЬ ПОВТОРНО
		if ((SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny = new.id_smeny ORDER BY uid DESC limit 1)=4) then
			new.status:=false;
			new.id_op:='5';
			
			--отметка в статусе рабоего времени
			update workstatus
			set dtend=(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),id_op=new.id_op
			where user_id=new.user_id and id_smeny=new.id_smeny and dtend is null;
			
			--КОГДА ПРИШЕЛ ПЕРВАЯ ПРОВЕРКА
		elseif ((SELECT id_op FROM documents WHERE user_id = new.user_id and  id_smeny= new.id_smeny ORDER BY uid DESC limit 1)<>5 and (SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny= new.id_smeny ORDER BY uid DESC limit 1)<>4) then
			
			--КОГДА ПРИШЕЛ
			if ((SELECT status FROM documents WHERE user_id = new.user_id and id_smeny= new.id_smeny ORDER BY uid DESC limit 1)=false) then
			
				insert into workstatus(id_smeny,user_id,dtstart,id_op) 
				values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
-- 				new.status:=true;
				if (current_time>(select tmstart from users where id=new.user_id))  then
					new.id_op:='1';
					new.status:=true;
					
					--отметка опоздания
					insert into tblate(smena,iduser,later)
					values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-(select tmstart from users where id=new.user_id)));
				else 
					new.id_op:='2';
					new.status:=true;
					
					--отметка опоздания 00
					insert into tblate(smena,iduser,later)
					values(new.id_smeny,new.user_id,'00:00:00');
				end if;
				
				--КОГДА УХОДИШЬ
			elseif ((SELECT status FROM documents WHERE user_id = new.user_id and  id_smeny= new.id_smeny  ORDER BY uid DESC limit 1)=true) then
				new.id_op:='5';
				new.status:=false;
				
		  		--запись статуса рабочего дня
				update workstatus
				set dtend=(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),id_op=new.id_op
				where user_id=new.user_id and id_smeny=new.id_smeny and dtend is null;
			end if;
			
			--КОГДА ВЕРНУЛСЯ
		elseif ((SELECT id_op FROM documents WHERE user_id = new.user_id and id_smeny = new.id_smeny ORDER BY uid DESC limit 1)=5) then
			new.id_op:='4';
			new.status:=true;
			--запись статуса рабочего дня
			insert into workstatus(id_smeny,user_id,dtstart,id_op) 
			values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
			--ПРОВЕРКА НА ОПОЗДАНИЕ
		elseif (new.status is null) THEN
			--запись статуса рабочего дня
			insert into workstatus(id_smeny,user_id,dtstart,id_op) 
			values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
			if (current_time>(select tmstart from users where id=new.user_id))  then
				new.id_op:='1';
				new.status:=true;
				--отметка опоздания
				insert into tblate(smena,iduser,later)
				values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-(select tmstart from users where id=new.user_id)));
			else 
				new.id_op:='2';
				new.status:=true;
				--отметка опоздания 00
				insert into tblate(smena,iduser,later)
				values(new.id_smeny,new.user_id,'00:00:00');
			end if;
		end if;
		--ЕСЛИ СМЕНА ТАБЛИЦЕ НЕ РАВНА С СМЕНОЙ В ДОКУМЕНТЕ
	elseif((select id from tbsmeny order by id desc limit 1)<>new.id_smeny) THEN
-- 		new.status:=true;
		new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
		
		--запись статуса рабочего дня
		insert into workstatus(id_smeny,user_id,dtstart,id_op) 
		values((select id from tbsmeny order by id desc limit 1),new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
		
		if (current_time>(select tmstart from users where id=new.user_id))  then
			new.id_op:='1';
			new.status:=true;
			--отметка опоздания
			insert into tblate(smena,iduser,later) 
			values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-(select tmstart from users where id=new.user_id)));
		else 
			new.id_op:='2';
			new.status:=true;
			--отметка опоздания 00
			insert into tblate(smena,iduser,later)
			values(new.id_smeny,new.user_id,'00:00:00');
		end if;
	end if;
	--ЕСЛИ НЕТУ СМЕН
elseif((select id_smeny from documents where new.user_id=user_id order by uid desc limit 1) is null) THEN
	--первая смена
	insert into tbSmeny(comment) values('qwe');
	new.id_smeny:=(select id from tbsmeny order by id desc limit 1);
	--запись статуса рабочего дня
	insert into workstatus(id_smeny,user_id,dtstart,id_op) 
	values(new.id_smeny,new.user_id,(date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval)),new.id_op);
	new.status:=true;
		--ПРОВЕРКА НА ОПОЗДАНИЕ
		if (current_time>(select tmstart from users where id=new.user_id))  then
			new.id_op:='1';
			new.status:=true;
			--отметка опоздания
			insert into tblate(smena,iduser,later) 
			values(new.id_smeny,new.user_id,((date_trunc('seconds'::text, ((CURRENT_TIME)::time without time zone)::interval))-(select tmstart from users where id=new.user_id)));
		else 
			new.id_op:='2';
			new.status:=true;
			--отметка опоздания 00
			insert into tblate(smena,iduser,later)
			values(new.id_smeny,new.user_id,'00:00:00');
		end if;
	end if;
return NEW;
END;
$BODY$;

ALTER FUNCTION public.documents_ai1()
    OWNER TO postgres;

-- DROP TRIGGER IF EXISTS documents_ai1 ON public.documents;

CREATE TRIGGER documents_ai1
    BEFORE INSERT
    ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.documents_ai0();

ALTER TABLE public.documents
    DISABLE TRIGGER documents_ai1;

-- Trigger: documents_ai2

-- DROP TRIGGER IF EXISTS documents_ai2 ON public.documents;

CREATE TRIGGER documents_ai2
    BEFORE INSERT
    ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.documents_ai1();

-- Table: public.operacii_type

-- DROP TABLE IF EXISTS public.operacii_type;

CREATE TABLE IF NOT EXISTS public.operacii_type
(
    id integer NOT NULL,
    name character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT operacii_type_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.operacii_type
    OWNER to postgres;

-- Table: public.tblate

-- DROP TABLE IF EXISTS public.tblate;

CREATE TABLE IF NOT EXISTS public.tblate
(
    id integer NOT NULL DEFAULT nextval('tblate_id_seq'::regclass),
    iduser integer NOT NULL,
    later time(6) without time zone,
    work time(6) without time zone,
    smena integer NOT NULL,
    late_day integer DEFAULT 0,
    CONSTRAINT tblate_pkey PRIMARY KEY (id),
    CONSTRAINT fk_smena_id FOREIGN KEY (smena)
        REFERENCES public.tbsmeny (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_user_id FOREIGN KEY (iduser)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tblate
    OWNER to postgres;

-- Trigger: tblate_ai0

-- DROP TRIGGER IF EXISTS tblate_ai0 ON public.tblate;
-- FUNCTION: public.tblate_ai0()

-- DROP FUNCTION IF EXISTS public.tblate_ai0();

CREATE OR REPLACE FUNCTION public.tblate_ai0()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
		if(new.later is null) then
			new.late_day=0;
		elseif(new.later > '00:00:00') then
			new.late_day=1;
		end if;
	
return NEW;
END;
$BODY$;

ALTER FUNCTION public.tblate_ai0()
    OWNER TO postgres;


CREATE TRIGGER tblate_ai0
    BEFORE INSERT
    ON public.tblate
    FOR EACH ROW
    EXECUTE FUNCTION public.tblate_ai0();

-- Table: public.tbsmeny

-- DROP TABLE IF EXISTS public.tbsmeny;

CREATE TABLE IF NOT EXISTS public.tbsmeny
(
    id integer NOT NULL DEFAULT nextval('tbsmeny_id_seq'::regclass),
    dtstart timestamp without time zone DEFAULT date_trunc('second'::text, (CURRENT_TIMESTAMP)::timestamp without time zone),
    comment character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT tbsmeny_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbsmeny
    OWNER to postgres;
  
-- Table: public.user_card

-- DROP TABLE IF EXISTS public.user_card;

CREATE TABLE IF NOT EXISTS public.user_card
(
    id integer NOT NULL DEFAULT nextval('user_card_id_seq'::regclass),
    user_id integer,
    card character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT user_card_pkey PRIMARY KEY (id),
    CONSTRAINT card_unique UNIQUE (card)
        INCLUDE(card),
    CONSTRAINT users_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_card
    OWNER to postgres;

-- Table: public.workstatus

-- DROP TABLE IF EXISTS public.workstatus;

CREATE TABLE IF NOT EXISTS public.workstatus
(
    id integer NOT NULL DEFAULT nextval('"worktime-id_seq"'::regclass),
    id_smeny integer NOT NULL,
    user_id integer NOT NULL,
    dtstart time(6) without time zone,
    dtend time without time zone,
    id_op integer,
    CONSTRAINT workstatus_pkey PRIMARY KEY (id),
    CONSTRAINT fk_idop_id FOREIGN KEY (id_op)
        REFERENCES public.operacii_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_smena_id FOREIGN KEY (id_smeny)
        REFERENCES public.tbsmeny (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workstatus
    OWNER to postgres;

-- Trigger: workstatus_ai1

-- DROP TRIGGER IF EXISTS workstatus_ai1 ON public.workstatus;

CREATE OR REPLACE FUNCTION public.workstatus_ai0()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
		if((select work from tblate where iduser=old.user_id and smena=old.id_smeny order by id desc limit 1) is null ) then
			update tblate
			set work=(new.dtend-old.dtstart)
			where iduser=old.user_id and smena=old.id_smeny;
		else
			update tblate
			set work=work+(new.dtend-old.dtstart)
			where iduser=old.user_id and smena=old.id_smeny;
		end if;
return NEW;
END;
$BODY$;

ALTER FUNCTION public.workstatus_ai0()
    OWNER TO postgres;


CREATE TRIGGER workstatus_ai1
    BEFORE UPDATE 
    ON public.workstatus
    FOR EACH ROW
    EXECUTE FUNCTION public.workstatus_ai0();