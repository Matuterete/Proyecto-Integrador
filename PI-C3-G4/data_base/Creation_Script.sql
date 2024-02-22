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
CREATE SCHEMA IF NOT EXISTS `ProThechnics` DEFAULT CHARACTER SET utf8 ;
USE `ProThechnics` ;

-- -----------------------------------------------------
-- Table `ProThechnics`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`categories` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`categories` (
  `category_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`products` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`products` (
  `product_id` INT NOT NULL,
  `is_active` TINYINT NOT NULL,
  `name` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `tech_specs` TEXT NULL,
  `price` DECIMAL(10,2) NULL,
  `category_id` INT NULL,
  PRIMARY KEY (`product_id`),
  FULLTEXT INDEX `Name` (`name`) VISIBLE,
  INDEX `fk_products_categories_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `ProThechnics`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`product_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`product_images` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`product_images` (
  `image_id` INT NOT NULL,
  `title` VARCHAR(255) NULL,
  `url` VARCHAR(255) NULL,
  `product_id` INT NULL,
  PRIMARY KEY (`image_id`),
  INDEX `fk_image_products_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `ProThechnics`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`users` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`users` (
  `user_id` INT NOT NULL,
  `is_active` TINYINT NOT NULL,
  `name` VARCHAR(50) NULL,
  `last_name` VARCHAR(50) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`roles` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`roles` (
  `role_id` INT NOT NULL,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProThechnics`.`user_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProThechnics`.`user_roles` ;

CREATE TABLE IF NOT EXISTS `ProThechnics`.`user_roles` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_userRoles_roles_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_userRoles_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `ProThechnics`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userRoles_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `ProThechnics`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
