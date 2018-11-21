
-- movimientos de cuenta Scotiabank
CREATE TABLE movements (
    id INT NOT NULL IDENTITY PRIMARY KEY,
    hashId CHAR(32) NOT NULL,
    bank CHAR(4) NOT NULL,
    "date" DATE NOT NULL,
    amount INTEGER NOT NULL,
    document_number BIGINT,
    "description" VARCHAR(128)
);

CREATE NONCLUSTERED INDEX ix_movements_hashid ON movements(hashId);

-- nominas de pagos Scotiabank
CREATE TABLE payrolls (
    id INT NOT NULL IDENTITY PRIMARY KEY,
    movement_id INTEGER REFERENCES movements(id),
    "date" DATE NOT NULL,
    amount INTEGER NOT NULL,
    "status" VARCHAR(64) NOT NULL,
);

-- detalles de nomina Scotiabank
CREATE TABLE payroll_details (
    id INT NOT NULL IDENTITY PRIMARY KEY,
    payroll_id INTEGER NOT NULL REFERENCES payrolls(id),  
    rut INT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "date" DATE NOT NULL,
    amount INTEGER NOT NULL,
    account VARCHAR(64) NOT NULL,
    bank VARCHAR(64) NOT NULL,
    "status" VARCHAR(64) NOT NULL,
    refund_date DATE
);

-- proveedores
CREATE TABLE providers (
    rut INT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    account BIGINT,
    bank VARCHAR(128),
    email VARCHAR(64),
    phone INT,

    CONSTRAINT providers_pk PRIMARY KEY (rut)
);

-- gastos comunes
CREATE TABLE expenses (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	"month" INT NOT NULL,
	"year" INT NOT NULL,
	amount INT NOT NULL,
	category VARCHAR(32) NOT NULL,
	sub_category VARCHAR(32) NOT NULL,
	"description" VARCHAR(64) NOT NULL,
	provider_rut INT NOT NULL REFERENCES providers(rut)
);

-- cheques girados por la comunidad
CREATE TABLE checks (
    id INT NOT NULL IDENTITY PRIMARY KEY,
    "serial" INT NOT NULL,
    bank CHAR(4) NOT NULL,
    amount INT NOT NULL,
	"description" VARCHAR(64)
);
