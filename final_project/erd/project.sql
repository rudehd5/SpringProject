---------BOARD_SEQ----------
CREATE SEQUENCE BOARD_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
NOMAXVALUE
NOCYCLE
NOCACHE;

-------------GATHERING_SEQ------------
CREATE SEQUENCE GATHERING_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
NOMAXVALUE
NOCYCLE
NOCACHE;

---------------GATPLAN_SEQ-------------------
CREATE SEQUENCE GATPLAN_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
NOMAXVALUE
NOCYCLE
NOCACHE;

commit;

select * from board;
select * from member;
select * from gathering;
insert into member(mem_id, mem_pw, mem_email, mem_num, mem_name, mem_nname, mem_bir, mem_addr1, mem_addr2)
    	 values('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i');
		 
drop table board;
drop table dog;
drop table gat_chat;
drop table gat_members;
drop table gat_plan;
drop table gathering;
drop table member;
drop sequence GATHERING_SEQ;

SELECT COUNT(*) FROM MEMBER WHERE MEM_ID='q123';

CREATE TABLE board (
	board_id         VARCHAR2(10) NOT NULL,
	member_mem_id    VARCHAR2(20) NOT NULL,
	member_mem_nname VARCHAR2(20) NOT NULL,
	board_title      VARCHAR2(50) NOT NULL,
	board_desc       VARCHAR2(500) NOT NULL,
	board_cate       VARCHAR2(20),
	board_date       VARCHAR2(20),
	board_view       NUMBER,
	board_img_name1  VARCHAR2(100),
	board_img_name2  VARCHAR2(100),
	board_img_ext    VARCHAR2(10),
	board_img_byte   NUMBER
);

ALTER TABLE board ADD CONSTRAINT board_pk PRIMARY KEY ( board_id );

CREATE TABLE dog (
	dog_id           VARCHAR2(30) NOT NULL,
	member_mem_id    VARCHAR2(20) NOT NULL,
	member_mem_nname VARCHAR2(20) NOT NULL,
	dog_name         VARCHAR2(30),
	dog_age          VARCHAR2(10),
	dog_kind         VARCHAR2(50),
	dog_bir          VARCHAR2(20),
	dog_gender       VARCHAR2(10),
	dog_file_name1   VARCHAR2(100),
	dog_file_name2   VARCHAR2(100),
	dog_file_ext     VARCHAR2(10),
	dog_file_byte    NUMBER
);

ALTER TABLE dog ADD CONSTRAINT dog_pk PRIMARY KEY ( dog_id );

CREATE TABLE gat_chat (
	gathering_gat_id VARCHAR2(30) NOT NULL,
	member_mem_id    VARCHAR2(20) NOT NULL,
	member_mem_nname VARCHAR2(20) NOT NULL,
	gat_chat_desc    VARCHAR2(50) NOT NULL,
	gat_chat_date    VARCHAR2(20)
);

CREATE TABLE gat_members (
	gathering_gat_id VARCHAR2(30) NOT NULL,
	member_mem_id    VARCHAR2(20) NOT NULL,
	member_mem_nname VARCHAR2(20) NOT NULL
);

CREATE TABLE gat_plan (
	gat_plan_id      VARCHAR2(10) NOT NULL,
	gat_plan_leader  VARCHAR2(20),
	gathering_gat_id VARCHAR2(10) NOT NULL,
	gat_plan_date    VARCHAR2(20),
	gat_plan_addr    VARCHAR2(100),
	gat_plan_title   VARCHAR2(50),
	gat_plan_desc    VARCHAR2(300)
);

ALTER TABLE gat_plan ADD CONSTRAINT gat_plan_pk PRIMARY KEY ( gat_plan_id );

CREATE TABLE gathering (
	gat_id           VARCHAR2(30) NOT NULL,
	member_mem_id    VARCHAR2(20) NOT NULL,
	member_mem_nname VARCHAR2(20) NOT NULL,
	gat_title        VARCHAR2(50) NOT NULL,
	gat_desc         VARCHAR2(500) NOT NULL,
	gat_date         VARCHAR2(20),
	gat_view         NUMBER,
	gat_memnum       NUMBER,
	gat_location1    VARCHAR2(20) NOT NULL,
	gat_location2    VARCHAR2(20) NOT NULL,
	gat_img_name1    VARCHAR2(100),
	gat_img_name2    VARCHAR2(100),
	gat_img_ext      VARCHAR2(10),
	gat_img_byte     NUMBER
);

ALTER TABLE gathering ADD CONSTRAINT gathering_pk PRIMARY KEY ( gat_id );

CREATE TABLE member (
	mem_id      VARCHAR2(20) NOT NULL,
	mem_pw      VARCHAR2(20) NOT NULL,
	mem_name    VARCHAR2(20) NOT NULL,
	mem_nname   VARCHAR2(20) NOT NULL,
	mem_email   VARCHAR2(30) NOT NULL,
	mem_addr1   VARCHAR2(100) NOT NULL,
	mem_addr2   VARCHAR2(50) NOT NULL,
	mem_num     VARCHAR2(15) NOT NULL,
	mem_bir     VARCHAR2(20),
	mem_gender  VARCHAR2(10),
	mem_gat1_id VARCHAR2(10),
	mem_gat2_id VARCHAR2(10),
	mem_gat3_id VARCHAR2(10)
);

ALTER TABLE member ADD CONSTRAINT member_pk PRIMARY KEY ( mem_id,
                                                          mem_nname );

ALTER TABLE board
	ADD CONSTRAINT board_member_fk FOREIGN KEY ( member_mem_id,
	                                             member_mem_nname )
		REFERENCES member ( mem_id,
		                    mem_nname );

ALTER TABLE dog
	ADD CONSTRAINT dog_member_fk FOREIGN KEY ( member_mem_id,
	                                           member_mem_nname )
		REFERENCES member ( mem_id,
		                    mem_nname );

ALTER TABLE gat_chat
	ADD CONSTRAINT gat_chat_gathering_fk FOREIGN KEY ( gathering_gat_id )
		REFERENCES gathering ( gat_id );

ALTER TABLE gat_chat
	ADD CONSTRAINT gat_chat_member_fk FOREIGN KEY ( member_mem_id,
	                                                member_mem_nname )
		REFERENCES member ( mem_id,
		                    mem_nname );

ALTER TABLE gat_members
	ADD CONSTRAINT gat_members_gathering_fk FOREIGN KEY ( gathering_gat_id )
		REFERENCES gathering ( gat_id );

ALTER TABLE gat_members
	ADD CONSTRAINT gat_members_member_fk FOREIGN KEY ( member_mem_id,
	                                                   member_mem_nname )
		REFERENCES member ( mem_id,
		                    mem_nname );

ALTER TABLE gat_plan
	ADD CONSTRAINT gat_plan_gathering_fk FOREIGN KEY ( gathering_gat_id )
		REFERENCES gathering ( gat_id );

ALTER TABLE gathering
	ADD CONSTRAINT gathering_member_fk FOREIGN KEY ( member_mem_id,
	                                                 member_mem_nname )
		REFERENCES member ( mem_id,
		                    mem_nname );