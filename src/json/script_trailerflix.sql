CREATE VIEW Vista_Catalogo AS
SELECT C.Id as IdCatalogo, C.titulo, C.resumen, C.temporadas, C.categoria, C.trailer, C.poster, T.Titulo as Genero, R.Reparto as Reparto
FROM Catalogo C 
JOIN Vista_Tags T ON T.IdTitulo = C.Id
JOIN Vista_Reparto R ON R.IdTitulo = C.Id;

CREATE VIEW Vista_ActricesyActores AS
select IdTitulo, A.Actor  
from Actricesyactores A
Join Catalogo_Reparto R on A.Id = R.IdActor;

CREATE VIEW Vista_Reparto AS
SELECT IdTitulo, GROUP_CONCAT( Actor ORDER BY IdTitulo desc SEPARATOR ', ') As Reparto
From Vista_ActricesyActores
GROUP BY IdTitulo;