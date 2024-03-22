-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ProThechnics
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ProThechnics` ;

-- -----------------------------------------------------
-- Schema ProThechnics
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ProThechnics` DEFAULT CHARACTER SET UTF8MB4 ;
USE `ProThechnics` ;

-- -----------------------------------------------------
-- Table `ProThechnics`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`categories` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `url` VARCHAR(255) NOT null ,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`products` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_active` TINYINT NOT NULL DEFAULT 1,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NULL DEFAULT 10,
  `category_id` INT NULL,
  PRIMARY KEY (`product_id`),
  FULLTEXT INDEX `Name` (`name`),
  INDEX `fk_products_categories_idx` (`category_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `ProThechnics`.`categories` (`category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`product_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`product_images` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`product_images` (
  `product_image_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `url` VARCHAR(255) NOT NULL,
  `is_primary` TINYINT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`product_image_id`),
  INDEX `fk_image_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_image_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `ProThechnics`.`products` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`users` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_active` TINYINT NOT NULL DEFAULT 1,
  `name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`roles` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(10) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`role_id`)) 
ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `ProThechnics`.`user_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`user_role`;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`user_role` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  KEY `fk_user_roles_roles` (`role_id`),
  CONSTRAINT `fk_user_roles_roles` 
  	FOREIGN KEY (`role_id`) 
  	REFERENCES `roles` (`role_id`) 
  	ON DELETE CASCADE 
  	ON UPDATE CASCADE,
  CONSTRAINT `fk_user_roles_users` 
  	FOREIGN KEY (`user_id`) 
  	REFERENCES `users` (`user_id`) 
  	ON DELETE CASCADE 
  	ON UPDATE cascade,
  UNIQUE (`user_id`)) 
  ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`features`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`features` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`features` (
  `feature_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`feature_id`))
ENGINE = InnoDB;


/*
-- -----------------------------------------------------
-- Table `ProThechnics`.`products_features`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`products_features` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`products_features` (
  `product_feature_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `feature_id` INT NOT NULL,
  `feature_value` VARCHAR(255) NOT NULL,
  INDEX `fk_products_has_features_features1_idx` (`feature_id` ASC),
  INDEX `fk_products_has_features_products1_idx` (`product_id` ASC),
  PRIMARY KEY (`product_feature_id`),
  CONSTRAINT `fk_products_has_features_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ProThechnics`.`products` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_products_has_features_features1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `ProThechnics`.`features` (`feature_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
*/

-- -----------------------------------------------------
-- Table `ProThechnics`.`products_features`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`products_features` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`products_features` (
  `product_id` INT NOT NULL,
  `feature_id` INT NOT NULL,
  `feature_value` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`product_id`,`feature_id`),
  CONSTRAINT `fk_products_has_features_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ProThechnics`.`products` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_products_has_features_features1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `ProThechnics`.`features` (`feature_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`rentals definition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`rentals` ;

CREATE TABLE `rentals` (
  `rent_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `date_rent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `days_total` INT NOT NULL,
  `amount_unitary` float DEFAULT 0,
  `amount_total` float DEFAULT 0,
  PRIMARY KEY (`rent_id`,`product_id`,`user_id`),
  KEY `Rents_products_FK` (`product_id`),
  KEY `Rents_users_FK` (`user_id`),
  CONSTRAINT `Rents_products_FK` 
  FOREIGN KEY (`product_id`) 
  REFERENCES `products` (`product_id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE,
  CONSTRAINT `Rents_users_FK` 
  FOREIGN KEY (`user_id`) 
  REFERENCES `users` (`user_id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE) 
ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `ProThechnics`.`user_fav definition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`user_fav` ;

CREATE TABLE `user_fav` (
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `product_id`),
  CONSTRAINT `fk_user_favs_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_favorites_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

/*
-- -----------------------------------------------------
-- Function `ProThechnics`.`fn_calc_days`
-- -----------------------------------------------------

DROP FUNCTION IF EXISTS `ProThechnics`.`fn_calc_days`;

CREATE DEFINER=`root`@`localhost` FUNCTION `ProThechnics`.`fn_calc_days`(date_start DATE, date_end DATE) RETURNS INT
BEGIN
  DECLARE amount INT;
  SET amount = ABS(DATEDIFF(date_start, date_end));
  RETURN amount;
END;




-- -----------------------------------------------------
-- Procedure `ProThechnics`.`actualizar_rol`
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS `ProThechnics`.`actualizar_rol`;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProThechnics`.`actualizar_rol`(
    role tinyint(3),
    user_id int
    )
BEGIN

   	DECLARE usuario_activo tinyint;
    DECLARE usuario_admin binary;

		SELECT user_active
        INTO usuario_activo
        FROM ProThechnics.users
        WHERE ProThechnics.users.user_id = user_id
        LIMIT 1;

        IF usuario_activo = 1 THEN 
           UPDATE ProThechnics.roles
            SET admin = role
            WHERE ProThechnics.roles.user_id = user_id;		       
			ELSE
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario Desactivado';				
              	
		END IF;
        END;
       
       
-- -----------------------------------------------------
-- Procedure `ProThechnics`.`agregar_usuario`
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS `ProThechnics`.`agregar_usuario`;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProThechnics`.`agregar_usuario`(
 -- por defecto el usuario ingresa activo 
   name varchar (50),
   last_name varchar (50),
   email varchar(100),
   password varchar(255)
    )
BEGIN

   	DECLARE validar_email varchar(100);
	DECLARE userid int;

		SELECT email
        INTO validar_email
        FROM ProThechnics.users
        WHERE ProThechnics.users.email = email
        LIMIT 1;
      
        IF validar_email = email THEN              
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario ya exite';				
                             
                ELSE  
         INSERT INTO ProThechnics.users (
                user_active,
                name,
                last_name,
                email,
                password
            )
            VALUES (
                1,
                name,
                last_name,
                email,
                password
			); 
            
           

			SELECT user_id
			INTO userid
			FROM ProThechnics.users
			WHERE ProThechnics.users.email = email
			LIMIT 1;

	 INSERT INTO ProThechnics.roles (
					role,
					user_id
				)
				VALUES (
					1, -- todos los usuarios no son administradores por defecto
					userid               
				);               
                
	 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario Agregado exitosamente';			
		END IF;
  END;

-- -----------------------------------------------------
-- Procedure `ProThechnics`.`insertar_alquiler`
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS `ProThechnics`.`insertar_alquiler`;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProThechnics`.`insertar_alquiler`(
    product_id int,
    user_id int,
    fecha_inicial DATE,
    fecha_final DATE
)
BEGIN

    DECLARE dias int;
    DECLARE Total DECIMAL(10,2);
    DECLARE fecha_alquiler DATETIME;
    DECLARE precio_unitario DECIMAL(10,2);
    DECLARE stock_actual INT;
	DECLARE usuario_activo tinyint;


        SELECT price
        INTO precio_unitario
        FROM ProThechnics.products
        WHERE ProThechnics.products.product_id = product_id
        LIMIT 1;

        SELECT stock
        INTO stock_actual
        FROM ProThechnics.products
        WHERE ProThechnics.products.product_id = product_id
        LIMIT 1;
        
		SELECT user_active
        INTO usuario_activo
        FROM ProThechnics.users
        WHERE ProThechnics.users.user_id = user_id
        LIMIT 1;

        SET fecha_alquiler = NOW();
        SET dias = ProThechnics.fn_calcular_dias(fecha_inicial, fecha_final);
        SET Total = ProThechnics.fn_calcular_total(precio_unitario, dias);

        IF usuario_activo = 0 THEN              
             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario Desactivado';				
                ELSEIF  stock_actual > 0 THEN                
            SET stock_actual = stock_actual - 1;
            INSERT INTO ProThechnics.fact_alquiler (
                product_id,
                user_id,
                fecha_alquiler,
                fecha_inicial,
                fecha_final,
                dias_totales,
                precio_unitario,
                total
            )
            VALUES (
                product_id,
                user_id,
                fecha_alquiler,
                fecha_inicial,
                fecha_final,
                dias,
                precio_unitario,
                Total
            );

            UPDATE ProThechnics.products
            SET stock = stock_actual
            WHERE ProThechnics.products.product_id = product_id;				
                  
                ELSE                
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay stock';
		END IF;
        END;
        
       


-- -----------------------------------------------------
-- Function `ProThechnics`.`fn_calcular_dias`
-- -----------------------------------------------------

DROP FUNCTION IF EXISTS `ProThechnics`.`fn_calcular_dias`;

CREATE DEFINER=`root`@`localhost` FUNCTION `ProThechnics`.`fn_calcular_total`(valor_unitario DECIMAL(10,2), dias int) RETURNS INT
BEGIN
DECLARE resultado INT;
  SET resultado = valor_unitario*dias;
  RETURN resultado;
RETURN 1;
END;



-- OLD
-- -----------------------------------------------------
-- Table `ProThechnics`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`roles` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(10) NOT NULL DEFAULT 'USER',
  `user_id` INT NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`),
  KEY `fk_roles_users1_idx` (`user_id`),
  CONSTRAINT `fk_roles_users1` 
  FOREIGN KEY (`user_id`) 
  REFERENCES `users` (`user_id`) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION) 
ENGINE=InnoDB;*/