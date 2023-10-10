USE TRAILERFLIXDB.SQL;

CREATE TABLE `Actricesyactores` (
	`idActor` INT NOT NULL AUTO_INCREMENT,
	`Actor` varchar(40) NOT NULL,
	PRIMARY KEY (`idActor`)
);

CREATE TABLE `Reparto` (
	`idrep` INT NOT NULL AUTO_INCREMENT,
	`idTitulo` INT NOT NULL,
	`idActor` INT NOT NULL,
	PRIMARY KEY (`idrep`)
);

CREATE TABLE `Categoria` (
	`idCat` INT NOT NULL AUTO_INCREMENT,
	`Categoria` char(10) NOT NULL,
	PRIMARY KEY (`idCat`)
);

CREATE TABLE `Catalogo` (
	`idTitulo` INT NOT NULL AUTO_INCREMENT,
	`Titulo` varchar(60) NOT NULL,
	`idCat` INT NOT NULL,
	`idGenero` varchar(20),
	`resumen` varchar(256) NOT NULL,
	`temporadas` INT DEFAULT '0',
	`reparto` varchar(30) NOT NULL,
	`trailer` varchar(50) NOT NULL,
	`poster` varchar(25) NOT NULL,
	PRIMARY KEY (`idTitulo`)
);

CREATE TABLE `Generos` (
	`idGen` INT NOT NULL AUTO_INCREMENT,
	`Genero` char(20) NOT NULL,
	PRIMARY KEY (`idGen`)
);

CREATE TABLE `Tags` (
	`idTags` INT NOT NULL AUTO_INCREMENT,
	`idTitulo` INT NOT NULL,
	`Tag` INT NOT NULL,
	PRIMARY KEY (`idTags`)
);

ALTER TABLE `Reparto` ADD CONSTRAINT `Reparto_fk0` FOREIGN KEY (`idTitulo`) REFERENCES `Catalogo`(`idTitulo`);

ALTER TABLE `Reparto` ADD CONSTRAINT `Reparto_fk1` FOREIGN KEY (`idActor`) REFERENCES `Actricesyactores`(`idActor`);

ALTER TABLE `Catalogo` ADD CONSTRAINT `Catalogo_fk0` FOREIGN KEY (`idCat`) REFERENCES `Categoria`(`idCat`);

ALTER TABLE `Catalogo` ADD CONSTRAINT `Catalogo_fk1` FOREIGN KEY (`idGenero`) REFERENCES `Generos`(`idGen`);

ALTER TABLE `Catalogo` ADD CONSTRAINT `Catalogo_fk2` FOREIGN KEY (`reparto`) REFERENCES `Actricesyactores`(`idActor`);

ALTER TABLE `Tags` ADD CONSTRAINT `Tags_fk0` FOREIGN KEY (`idTitulo`) REFERENCES `Catalogo`(`idTitulo`);

ALTER TABLE `Tags` ADD CONSTRAINT `Tags_fk1` FOREIGN KEY (`Tag`) REFERENCES `Generos`(`idGen`);







