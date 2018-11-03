CREATE DATABASE apartman;

CREATE TABLE "providers" (
    "rut" INT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "account" BIGINT,
    "bank" VARCHAR(32),
    "email" VARCHAR(32),
    "phone" INT,

    CONSTRAINT providers_pk PRIMARY KEY ("rut")
);

CREATE TABLE "banks" (
    "name" CHAR(4),
    "desc" VARCHAR(32)
);

CREATE TABLE "accounts" (
    "rut" INT NOT NULL,
    "bank" VARCHAR(4),
);

CREATE TABLE "movements" (

);

CREATE TABLE "checks" (

);
