DROP DATABASE apartman;
CREATE DATABASE apartman;

CREATE TABLE "public.providers" (
    "rut" INT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "account" BIGINT,
    "bank" VARCHAR(32),
    "email" VARCHAR(32),
    "phone" INT,

    CONSTRAINT providers_pk PRIMARY KEY ("rut")
);

CREATE TABLE "public.movements" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "date" DATE NOT NULL,
    "amount" VARCHAR(64) NOT NULL,
    "documentNumber" BIGINT,
    "description" VARCHAR(64)
);
