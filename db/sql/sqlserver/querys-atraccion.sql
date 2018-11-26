
SELECT [i].[year], [i].[month], [i].[total-ingresos], [e].[total-egresos]  FROM
( 
	SELECT YEAR("date") AS "year", MONTH("date") AS "month", SUM(amount) AS "total-ingresos" FROM movements
	WHERE amount > 0
	GROUP BY YEAR("date"), MONTH("date")
) i
INNER JOIN 
(
	SELECT YEAR("date") AS "year", MONTH("date") AS "month", -SUM(amount) AS "total-egresos" FROM movements
	WHERE amount < 0
	GROUP BY YEAR("date"), MONTH("date")
) e
ON
	[i].[year] = [e].[year] AND
	[i].[month] = [e].[month]
ORDER BY
	[i].[year], [i].[month];


-- cruce movimientos vs nominas
SELECT * FROM payrolls p 
	LEFT JOIN movements m  ON 
		ABS(DATEDIFF(DAY, [m].[date], [p].[date])) <= 3 AND  
		-[m].[amount] = [p].[amount]
WHERE [p].[status] <> 'Ingresado'
AND [m].[date] >= '2018-06-01'AND [m].[date] <= '2018-06-30'
ORDER BY [p].[date];

-- Egresos Junio
SELECT * FROM movements WHERE amount < 0 AND MONTH("date") = 6 AND 
	(("description" LIKE '%CHEQUE%') OR ("description" LIKE '%PROVEEDORES%'));


-- detalle de nominas
SELECT * FROM payroll_details WHERE payroll_id IN
(
	SELECT p.id FROM payrolls p 
	LEFT JOIN movements m  ON 
		ABS(DATEDIFF(DAY, [m].[date], [p].[date])) <= 3 AND  
		-[m].[amount] = [p].[amount]
	WHERE [p].[status] <> 'Ingresado'
	AND [m].[date] >= '2018-06-01'AND [m].[date] <= '2018-06-30'
)
AND "date" >= '2018-06-01'
ORDER BY payroll_id, id;


-- seguros reale
SELECT * FROM movements WHERE "description" LIKE '%reale%';
SELECT * FROM payroll_details  WHERE "name" LIKE '%reale%' AND "status"='Pagado' ORDER BY "date";

SELECT * FROM movements WHERE amount >= -1500000 AND amount <= -1450000

-- auditoria
SELECT * FROM movements WHERE "description" LIKE '%pacheco%';


/*
cuota febrero		2018-02-27	1447957	(OK, febrero) 
cuota marzo			2018-03-29	1450279	(OK, marzo)
cuota abril			2018-06-07  1454305 (OK, junio)
cuota mayo			2018-06-22	1455633 (new, OK, octubre y noviembre)
cuota junio			2018-07-13	1457289 (OK, julio)
cuota julio			2018-09-03	1461500 (OK, Agosto)
cuota agosto		2018-09-21	1464456 (new, OK, diciembre y enero)
cuota septiembre	2018-09-21	1463439 (OK, septiembre)
cuota octubre		2018-11-07	1478237 (new, OK, octubre)
-- falta: abril, mayo, 
*/

-- gastos bancarios

SELECT sum(AMOUNT) FROM movements WHERE "date" >= '2018-09-01' AND "date" <= '2018-09-30' AND amount < 0 AND "description" LIKE '%COMISION%';
-- -47948 Octubre
-- -62622 Septiembre

SELECT * FROM movements WHERE "date" >= '2018-09-01' AND "date" <= '2018-09-30' AND amount = -250000;
SELECT * FROM payroll_details WHERE "name" LIKE '%greenmax%' AND "status"='Pagado' ORDER BY "date";

-- reintegros prontomatic
SELECT * FROM movements WHERE amount > 0 AND "description" LIKE '%deposito%' ORDER BY "date";

-- aguas
SELECT * FROM movements WHERE amount < 0 AND "description" LIKE '%pac%' ORDER BY "date";

-- determinar egresos de cuenta corriente a justificar
SELECT -amount, "date", document_number, "description" FROM movements 
WHERE amount < 0 AND 
	"description" NOT IN (
		'PAGO COTIZ.PREVIRED', 
		'COMISION VISUALIZACION DOC WEB', 
		'IMPUESTO VISUALIZACION DOC WEB', 
		'IVA COMISION', 
		'I.T.E. SOBREGIRO NO PACTADO', 
		'INTERESES POR SOBREGIRO',
		'COMISION SERVICIO MULTIPAGOS',
		'IVA POR COMISION/CARGOS',
		'COM.MANTEN. SCOTIAMAX'
	)
ORDER BY "id";
