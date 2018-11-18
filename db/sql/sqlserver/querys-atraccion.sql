
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


SELECT * FROM payrolls p 
	LEFT JOIN movements m  ON 
		ABS(DATEDIFF(DAY, [m].[date], [p].[date])) <= 3 AND  
		-[m].[amount] = [p].[amount]
WHERE [p].[status] <> 'Ingresado'
AND [m].[date] >= '2018-06-01'
ORDER BY [p].[date];

SELECT * FROM movements 
	WHERE [date]>='2018-06-01'
	AND amount < 0;