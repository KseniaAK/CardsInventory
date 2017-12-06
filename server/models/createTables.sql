/*
This project uses a PostgreSQL instance.
These are the SQL commands needed to run to create necessary tables in a test database.
The development database uses smallserial datatype for ID's (primary keys) to ensure they are automatic do not repeat.
*/

create table months (
  id smallint primary key,
  name varchar not null
);

create table occasions (
  id smallint primary key,
  name varchar not null,
  month int not null references months(id)
);

create table recipients (
  id smallint primary key,
  first_name varchar not null,
  last_name varchar,
  birth_day int,
  birth_month int references months(id)
);

create table brands (
  id smallint primary key,
  name varchar not null
);

create table stickles (
  id smallint primary key,
  name varchar not null
);

create table stamps (
  id smallint primary key,
  name varchar not null,
  brand int references brands(id),
  wooden boolean
);

create table cards (
  id smallint primary key,
  recipient int references recipients(id),
  occasion int references occasions(id),
  main_stamp int references stamps(id),
  name varchar not null
);

create table cards_stamps (
  card_id int not null references cards(id),
  stamp_id int not null references stamps(id)
);

create table cards_stickles (
  card_id int not null references cards(id),
  stickles_id int not null references stickles(id)
);