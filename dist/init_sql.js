/* eslint-disable */
module.exports = function init_sql({wsql}) {
wsql.alasql('USE md; CREATE TABLE IF NOT EXISTS `ireg_log` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `date` INT, `sequence` INT, `class` CHAR, `note` CHAR, `obj` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `doc_completedTaskCertificate` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, posted boolean, date Date, number_doc CHAR, `customer` CHAR, `executor` CHAR); CREATE TABLE IF NOT EXISTS `cat_tasks` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `Название` CHAR, `НомерЗадачи` INT, `ДатаСоздания` CHAR, `definition` CHAR, `executor` CHAR, `author` CHAR, `Критичность` CHAR, `ВидЗадачи` CHAR, `timeEstimation` INT, `Подзадача` CHAR, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_taskTypes` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `Критичность` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_posotions` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `НазваниеДолжностиКраткое` CHAR, `НазваниеДолжностиПолное` CHAR, `ЧасоваяСтавка` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_formulas` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `formula` CHAR, `leadingFormula` CHAR, `conditionFormula` BOOLEAN, `definition` CHAR, `template` CHAR, `sortingField` INT, `async` BOOLEAN, `disabled` BOOLEAN, `context` INT, `jsx` BOOLEAN, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_nomPricesTypes` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `priceCurrency` CHAR, `discountPercent` FLOAT, `vatPriceIncluded` BOOLEAN, `roundingOrder` CHAR, `roundingUp` BOOLEAN, `note` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_tags` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `synonym` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_articles` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `h1` CHAR, `descr` CHAR, `introduction` CHAR, `content` CHAR, `img` CHAR, `date` CHAR, `author` CHAR, `sortingField` INT, `published` BOOLEAN, `formula` CHAR, `category` CHAR, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_users` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `invalid` BOOLEAN, `note` CHAR, `ancillary` BOOLEAN, `moniker` CHAR, `surname` CHAR, `patronymic` CHAR, `login` CHAR, `Пароль` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_organizations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `prefix` CHAR, `individualLegal` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_destinations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `used` BOOLEAN, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_partners` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `nameFull` CHAR, `note` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `okpo` CHAR, `individualLegal` CHAR, `predefinedName` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_accounts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `prefix` CHAR, `push_only` BOOLEAN, `subscription` BOOLEAN, `ips` CHAR, `suffix` CHAR, `direct` BOOLEAN, `predefinedName` CHAR, `owner` CHAR); CREATE TABLE IF NOT EXISTS `cat_propertyValues` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `heft` FLOAT, `fullName` CHAR, `predefinedName` CHAR, `owner` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_currencies` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `nameFull` CHAR, `extraCharge` FLOAT, `mainCurrency` CHAR, `parametersRecipe` CHAR, `predefinedName` CHAR); CREATE TABLE IF NOT EXISTS `cat_scheme_settings` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `obj` CHAR, `user` CHAR, `order` INT, `query` CHAR, `date_from` Date, `date_till` Date, `standard_period` CHAR, `formula` CHAR, `output` CHAR, `tag` CHAR, `ts_fields` JSON, `ts_sorting` JSON, `ts_dimensions` JSON, `ts_resources` JSON, `ts_selection` JSON, `ts_params` JSON, `ts_composition` JSON, `ts_conditional_appearance` JSON); CREATE TABLE IF NOT EXISTS `cat_meta_fields` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_meta_objs` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `enm_taskStatus` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_taskUrgancy` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_individualLegal` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_nomTypes` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_gender` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_categorySections` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_tagsCategory` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_report_output` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_quick_access` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_standard_period` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_data_field_kinds` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_label_positions` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_comparison_types` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_sort_directions` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_accumulation_record_type` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); ', [])};
