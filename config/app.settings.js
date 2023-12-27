
/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;

module.exports = function settings(prm = {}) {

  Object.defineProperty(prm, 'use_google_geo', {
    get() {
      return this.keys.google;
    }
  });

  return Object.assign(prm, {

    is_node,

    // разделитель для localStorage
    local_storage_prefix: 'wb_',

    // гостевые пользователи для демо-режима
    guests: [{
      username: '',
      password: '',
    }],

    // расположение couchdb для сайта
    couch_path: process.env.COUCHPATH || "",

    // расположение couchdb для nodejs
    couch_local: process.env.COUCHLOCAL || '',

    // по умолчанию, обращаемся к зоне 1
    zone: process.env.ZONE || 1,

    // объявляем номер демо-зоны
    zone_demo: 1,

    // по умолчанию, работаем в старом режиме с couchdb-ram, но можем переключить
    use_ram: true,

    // если use_meta === false, не используем базу meta в рантайме - см.: https://github.com/oknosoft/metadata.js/issues/255
    use_meta: false,

    // размер вложений 2Mb
    attachment_max_size: 2000000,

    // размер реплицируемых данных. если больше - включаем direct
    data_size_sync_limit: 160000000,

    // время до засыпания
    idle_timeout: 27 * 60 * 1000,

    // разрешаем сохранение пароля
    enable_save_pwd: true,

    // используем геокодер
    use_ip_geo: true,

    // здесь можно перечислить имена параметров для включения в корень job_prm c подтягиванием значений из local_storage
    //additional_params: [],

  }, is_node && {
    // авторизация couchdb
    user_node: {
      username: process.env.DBUSER || '',
      password: process.env.DBPWD || '',
    },
  });

};
