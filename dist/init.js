/* eslint-disable */
module.exports = function init_classes($p) {
(function(){
  const {MetaEventEmitter,EnumManager,CatManager,DocManager,DataProcessorsManager,ChartOfCharacteristicManager,ChartOfAccountManager,
    InfoRegManager,AccumRegManager,BusinessProcessManager,TaskManager,CatObj,DocObj,TabularSectionRow,DataProcessorObj,
    RegisterRow,BusinessProcessObj,TaskObj} = $p.constructor.classes;

  const _define = Object.defineProperties;

$p.enm.create('accumulation_record_type');
$p.enm.create('sort_directions');
$p.enm.create('comparison_types');
$p.enm.create('label_positions');
$p.enm.create('data_field_kinds');
$p.enm.create('standard_period');
$p.enm.create('quick_access');
$p.enm.create('report_output');
$p.enm.create('tagsCategory');
$p.enm.create('categorySections');
$p.enm.create('gender');
$p.enm.create('nomTypes');
$p.enm.create('individualLegal');
$p.enm.create('taskUrgancy');
$p.enm.create('taskStatus');
class CchProperties extends CatObj{
get shown(){return this._getter('shown')}
set shown(v){this._setter('shown',v)}
get sortingField(){return this._getter('sortingField')}
set sortingField(v){this._setter('sortingField',v)}
get extraValuesOwner(){return this._getter('extraValuesOwner')}
set extraValuesOwner(v){this._setter('extraValuesOwner',v)}
get available(){return this._getter('available')}
set available(v){this._setter('available',v)}
get mandatory(){return this._getter('mandatory')}
set mandatory(v){this._setter('mandatory',v)}
get includeToName(){return this._getter('includeToName')}
set includeToName(v){this._setter('includeToName',v)}
get list(){return this._getter('list')}
set list(v){this._setter('list',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get destination(){return this._getter('destination')}
set destination(v){this._setter('destination',v)}
get tooltip(){return this._getter('tooltip')}
set tooltip(v){this._setter('tooltip',v)}
get caption(){return this._getter('caption')}
set caption(v){this._setter('caption',v)}
get isExtraProperty(){return this._getter('isExtraProperty')}
set isExtraProperty(v){this._setter('isExtraProperty',v)}
get includeToDescription(){return this._getter('includeToDescription')}
set includeToDescription(v){this._setter('includeToDescription',v)}
get calculated(){return this._getter('calculated')}
set calculated(v){this._setter('calculated',v)}
get showcalc(){return this._getter('showcalc')}
set showcalc(v){this._setter('showcalc',v)}
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get inheritance(){return this._getter('inheritance')}
set inheritance(v){this._setter('inheritance',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}


  /**
   * Является ли значение параметра вычисляемым
   *
   * @type Boolean
   */
  get is_calculated() {
    return ($p.job_prm.properties.calculated || []).includes(this) || !this.calculated.empty();
  }

  get show_calculated() {
    return ($p.job_prm.properties.show_calculated || []).includes(this) || this.showcalc;
  }

  /**
   * Рассчитывает значение вычисляемого параметра
   * @param obj {Object}
   * @param [obj.row]
   * @param [obj.elm]
   * @param [obj.ox]
   */
  calculated_value(obj) {
    if(!this._calculated_value) {
      if(this._formula) {
        this._calculated_value = $p.cat.formulas.get(this._formula);
      }
      else if(!this.calculated.empty()) {
        this._calculated_value = this.calculated;
      }
      else {
        return;
      }
    }
    return this._calculated_value.execute(obj);
  }

  /**
   * Проверяет условие в строке отбора
   */
  check_condition({row_spec, prm_row, elm, elm2, cnstr, origin, ox, layer, ...other}) {

    if(this.empty()) {
      return true;
    }
    const {is_calculated, type} = this;
    const {utils, enm: {comparison_types, predefined_formulas}, EditorInvisible: {BuilderElement}} = $p;
    const ct = prm_row.comparison_type || comparison_types.eq;

    if(!layer) {
      if(elm instanceof BuilderElement) {
        layer = elm.layer;
      }
      else if(elm2 instanceof BuilderElement) {
        layer = elm2.layer;
      }
    }

    // для параметров алгоритма, фильтр отключаем
    if((prm_row.origin == 'algorithm') || (row_spec && row_spec.algorithm === predefined_formulas.clr_prm &&
      (ct.empty() || ct === comparison_types.eq) && type.types.includes('cat.clrs') && (!prm_row.value || prm_row.value.empty()))) {
      return true;
    }

    // значение параметра
    const val = is_calculated ? this.calculated_value({
      row: row_spec,
      cnstr: cnstr || 0,
      prm_row,
      elm,
      elm2,
      ox,
      layer,
      ...other,
    }) : this.extract_value(prm_row);

    let ok = false;

    // если сравнение на равенство - решаем в лоб, если вычисляемый параметр типа массив - выясняем вхождение значения в параметр
    if(ox && !Array.isArray(val) && (ct.empty() || ct === comparison_types.eq)) {
      if(is_calculated) {
        ok = val == prm_row.value;
      }
      else {
        const value = layer ? layer.extract_pvalue({param: this, cnstr, elm, origin, prm_row}) : this.extract_pvalue({ox, cnstr, elm, origin, prm_row});
        ok = value == val;
      }
    }
    // вычисляемый параметр - его значение уже рассчитано формулой (val) - сравниваем со значением в строке ограничений
    else if(is_calculated) {
      const value = this.extract_value(prm_row);
      ok = utils.check_compare(val, value, ct, comparison_types);
    }
    // параметр явно указан в табчасти параметров изделия
    else {
      const value = layer ? layer.extract_pvalue({param: this, cnstr, elm, origin, prm_row}) : this.extract_pvalue({ox, cnstr, elm, origin, prm_row});
      ok = (value !== undefined) && utils.check_compare(value, val, ct, comparison_types);
    }
    return ok;
  }

  /**
   * Извлекает значение из объекта (то, что будем сравнивать с extract_value)
   */
  extract_pvalue({ox, cnstr, elm = {}, origin, layer, prm_row}) {
    
    // для некоторых параметров, значения живут не в изделии, а в отделе абонента
    if(this.inheritance === 3) {
      return this.branch_value({project: elm.project, cnstr, ox});
    }
    else if(this.inheritance === 5) {
      return this.template_value({project: elm.project, cnstr, ox});
    }

    let prow, cnstr0, elm0;
    const {product_params, params} = ox;
    const find_nearest = () => {
      if(cnstr && ox.constructions) {
        cnstr0 = cnstr;
        elm0 = elm;
        elm = {};
        const crow = ox.constructions.find({cnstr});
        crow && ox.constructions.find_rows({parent: crow.parent || cnstr0}, (row) => {
          if(row !== crow) {
            cnstr = row.cnstr;
            return false;
          }
        });
      }
    };
    if(params) {
      const {enm: {plan_detailing}, utils, CatInserts} = $p;
      let src = prm_row?.origin;
      if(src === plan_detailing.algorithm) {
        src = plan_detailing.get();
      }
      if(src && !src.empty()) {
        switch (src) {
        case plan_detailing.order:
          const prow = ox.calc_order.extra_fields.find(this.ref, 'property');
          return prow && prow.value;
          
        case plan_detailing.nearest:
          find_nearest();
          break;
          
        case plan_detailing.layer_active:
          if(!layer) {
            layer = elm.layer;
          }
          if(layer && layer.furn.shtulp_kind() === 2) {
            find_nearest();
          }
          break;
          
        case plan_detailing.layer_passive:
          if(!layer) {
            layer = elm.layer;
          }
          if(layer && layer.furn.shtulp_kind() === 1) {
            find_nearest();
          }
          break;
          
        case plan_detailing.parent:
          if(cnstr && ox.constructions) {
            cnstr0 = cnstr;
            elm0 = elm;
            elm = {};
            const crow = ox.constructions.find({cnstr});
            const prow = ox.constructions.find({cnstr: crow.parent});
            if(crow) {
              cnstr = (prow && prow.parent === 0) ? 0 : crow.parent;
            }
          }
          break;
          
        case plan_detailing.product:
          if(cnstr) {
            cnstr0 = cnstr;
            elm0 = elm;
            cnstr = 0;
            elm = {};
          }
          break;
          
        case plan_detailing.elm:
        case plan_detailing.layer:
          break;
          
        default:
          throw `Источник '${src.name}' не поддержан`;
        }
      }
      const inset = (!src || src.empty()) ? ((origin instanceof CatInserts) ? origin : utils.blank.guid) : utils.blank.guid;
      const {rnum} = elm;
      if(rnum) {
        return elm[this.valueOf()];
      }
      else {
        params.find_rows({
          param: this,
          cnstr: cnstr || (elm._row ? {in: [0, -elm._row.elm]} : 0),
          inset,
        }, (row) => {
          if(!prow || row.cnstr) {
            prow = row;
          }
        });
      }
      if(!prow && (cnstr0 || elm0)) {
        params.find_rows({
          param: this,
          cnstr: cnstr0 || (elm0._row ? {in: [0, -elm0._row.elm]} : 0),
          inset,
        }, (row) => {
          if(!prow || row.cnstr) {
            prow = row;
          }
        });
      }
    }
    else if(product_params) {
      product_params.find_rows({
        elm: elm.elm || 0,
        param: this
      }, (row) => {
        prow = row;
        return false;
      });
    }
    if(prow) {
      return prow && prow.value;  
    }
    if(this.inheritance === 4) {
      return this.branch_value({project: elm.project, cnstr, ox});
    }    
  }

  /**
   * Извлекает значение из строки условия (то, с чем сравнивать extract_pvalue)
   */
  extract_value({comparison_type, txt_row, value}) {

    const {enm: {comparison_types}, md, cat} = $p;

    switch (comparison_type) {

    case comparison_types.in:
    case comparison_types.nin:

      if(value instanceof CatColor_price_groups) {
        return value.clrs();
      }
      else if(!txt_row) {
        return value;
      }
      try {
        const arr = JSON.parse(txt_row);
        const {types, is_ref} = this.type;
        if(types && is_ref && arr.length) {
          let mgr;
          for(const type of types) {
            const tmp = md.mgr_by_class_name(type);
            if(tmp && arr.some(ref => tmp.by_ref[ref])) {
              mgr = tmp;
              break;
            }
          }
          if(!mgr) {
            return arr;
          }
          else if(mgr === cat.color_price_groups) {
            const res = [];
            for(const ref of arr) {
              const cg = mgr.get(ref, false);
              if(cg) {
                res.push(...cg.clrs());
              }
            }
            return res;
          }
          return arr.map((ref) => mgr.get(ref, false)).filter(v => v && !v.empty());
        }
        return arr;
      }
      catch (err) {
        return value;
      }

    default:
      return value;
    }
  }

  /**
   * Возвращает значение параметра с приведением типов
   * @param v
   */
  fetch_type(v) {
    const {type, _manager} = this;
    const {utils} = $p;
    if(type.is_ref) {

      if((type.digits && typeof v === 'number') || 
          (type.hasOwnProperty('str_len') && !utils.is_guid(v)) || utils.is_data_obj(v)) {
        return v;
      }
      if(type.digits && !v && type.types.includes('cat.values_options')) {
        return 0;
      }

      const mgr = _manager.value_mgr({v}, 'v', type, false, v);
      if(mgr) {
        if(utils.is_data_mgr(mgr)) {
          const ref = ((v && (utils.is_guid(v) || utils.is_guid(v.ref))) || utils.is_enm_mgr(mgr)) ? v : '';
          return mgr.get(ref, false, false);
        }
        else {
          return utils.fetch_type(v, mgr);
        }
      }

      if(v) {
        return null;
      }

    }
    else if(type.date_part) {
      return utils.fix_date(v, true);
    }
    else if(type.digits) {
      return utils.fix_number(v, !type.hasOwnProperty('str_len'));
    }
    else if(type.types[0] == 'boolean') {
      return utils.fix_boolean(v);
    }
    else if(type.types[0] == 'json') {
      return typeof v === 'object' ? v : {};
    }
    return v;
  }

  /**
   * Возвращает массив связей текущего параметра
   */
  params_links(attr) {

    // первым делом, выясняем, есть ли ограничитель на текущий параметр
    if(!this.hasOwnProperty('_params_links')) {
      this._params_links = $p.cat.params_links.find_rows({slave: this});
    }

    return this._params_links.filter((link) => {
      //use_master бывает 0 - один ведущий, 1 - несколько ведущих через И, 2 - несколько ведущих через ИЛИ
      const use_master = link.use_master || 0;
      let ok = true && use_master < 2;
      //в зависимости от use_master у нас массив либо из одного, либо из нескольких ключей ведущиъ для проверки
      const arr = !use_master ? [{key: link.master}] : link.leadings;

      arr.forEach((row_key) => {
        let ok_key = true;
        // для всех записей ключа параметров сначала строим Map ИЛИ
        const or = new Map();
        for(const row of row_key.key.params) {
          if(!or.has(row.area)) {
            or.set(row.area, []);
          }
          or.get(row.area).push(row);
        }
        for(const grp of or.values()) {
          let grp_ok = true;
          for(const row of grp) {
            // выполнение условия рассчитывает объект CchProperties
            grp_ok = row.property.check_condition({
              cnstr: attr.grid ? attr.grid.selection.cnstr : 0,
              ox: attr.obj._owner ? attr.obj._owner._owner : attr.obj.ox,
              prm_row: row,
              elm: attr.obj,
              layer: attr.layer,
            });
            // если строка условия в ключе не выполняется, то дальше проверять его условия смысла нет
            if (!grp_ok) {
              break;
            }
          }
          ok_key = grp_ok;
          if(ok_key) {
            break;
          }
        }

        //Для проверки через ИЛИ логика накопительная - надо проверить все ключи до единого
        if (use_master == 2){
          ok = ok || ok_key;
        }
        //Для проверки через И достаточно найти один неподходящий ключ, чтобы остановиться и признать связь неподходящей
        else if (!ok_key){
          ok = false;
          return false;
        }
      });
      //Конечный возврат в функцию фильтрации массива связей
      return ok;
    });
  }

  /**
   * Проверяет и при необходимости перезаполняет или устанваливает умолчание value в prow
   * @param links {Array}
   * @param [prow] {CatCharacteristicsParamsRow|Object} - Eсли задан и текущее значение недопустимо, метод попытается установить корректное
   * @param [values] {Array} - Выходной параметр, если передать его снаружы, будет наполнен доступными значениями
   * @return {boolean}
   */
  linked_values(links, prow, values = []) {
    let changed;
    // собираем все доступные значения в одном массиве
    links.forEach((link) => link.append_values(values));
    // если значение доступно в списке - спокойно уходим
    const value = prow?.value;
    if(value instanceof CatClrs && value.is_composite()) {
      const {clr_in, clr_out} = value;
      if(!prow || (values.some(({_obj}) => _obj.value == clr_in) && values.some(({_obj}) => _obj.value == clr_out))) {
        return;
      }
    }
    else {
      if(!prow || values.some(({_obj}) => _obj.value == value)) {
        return;
      }
    }
    // если есть явный default - устанавливаем
    if(values.some((row) => {
      if(row.forcibly) {
        prow.value = row._obj.value;
        return true;
      }
      if(row.by_default && (!value || value.empty?.())) {
        prow.value = row._obj.value;
        changed = true;
      }
    })) {
      return true;
    }
    // если не нашли лучшего, установим первый попавшийся
    if(changed) {
      return true;
    }
    if(values.length) {
      if(prow instanceof CatCharacteristicsParamsRow && [3, 4].includes(prow.param.inheritance)) {
        const bvalue = prow.param.branch_value({ox: prow._owner._owner});
        if(bvalue && !bvalue.empty()) {
          if(prow.value !== bvalue) {
            prow.value = bvalue;
            return true;
          }
          return;
        }
      }
      prow.value = values[0]._obj.value;
      return true;
    }
  }

  /**
   * Значение, уточняемое отделом абонента
   * @param [project] {Scheme}
   * @param [cnstr] {Number}
   * @param [ox] {CatCharacteristics}
   */
  branch_value({project, cnstr = 0, ox}) {
    let branch = project?.branch;
    if(!branch && ox) {
      branch = ox.calc_order?.organization?._extra?.('branch');
      if(!branch || branch.empty()) {
        branch = ox.calc_order?.manager?.branch;
      }
    }
    let brow = branch && branch.extra_fields.find({property: this});
    if(brow) {
      return brow.value;
    }
    if(ox) {
      const {blank} = $p.utils;
      brow = ox.params.find({param: this, cnstr, inset: blank.guid});
      if(!brow && cnstr) {
        brow = ox.params.find({param: this, cnstr: 0, inset: blank.guid});
      }
    }
    return brow ? brow.value : this.fetch_type();
  }

  /**
   * Значение из шаблона
   * @param [project] {Scheme}
   * @param [cnstr] {Number}
   * @param [ox] {CatCharacteristics}
   */
  template_value({project, cnstr = 0, ox}) {
    const {params} = ox.base_block;
    let prow;
    params.find_rows({
      param: this,
      cnstr: cnstr ? {in: [0, cnstr]} : 0,
    }, (row) => {
      if(!prow || row.cnstr) {
        prow = row;
      }
    });
    return prow ? prow.value : this.fetch_type();
  }

  /**
   * Дополняет отбор фильтром по параметрам выбора,
   * используется в полях ввода экранных форм
   * @param filter {Object} - дополняемый фильтр
   * @param attr {Object} - атрибуты OCombo
   */
  filter_params_links(filter, attr, links) {
    // для всех отфильтрованных связей параметров
    if(!links) {
      links = this.params_links(attr);
    }
    links.forEach((link) => {
      // если ключ найден в параметрах, добавляем фильтр
      if(!filter.ref) {
        filter.ref = {in: []};
      }
      if(filter.ref.in) {
        link.append_values([]).forEach(({_obj}) => {
          if(!filter.ref.in.includes(_obj.value)) {
            filter.ref.in.push(_obj.value);
          }
        });
      }
    });
  }}
$p.CchProperties = CchProperties;
class CchPropertiesManager extends ChartOfCharacteristicManager {

  /**
   * Проверяет заполненность обязательных полей
   *
   * @override
   * @param prms {Array}
   * @param title {String}
   * @return {Boolean}
   */
  check_mandatory(prms, title) {

    let t, row;

    // проверяем заполненность полей
    for (t in prms) {
      row = prms[t];
      if(row.param.mandatory && (!row.value || row.value.empty())) {
        $p.msg.show_msg({
          type: 'alert-error',
          text: $p.msg.bld_empty_param + row.param.presentation,
          title: title || $p.msg.bld_title
        });
        return true;
      }
    }
  }

  /**
   * Возвращает массив доступных для данного свойства значений
   *
   * @override
   * @param prop {CatObj} - планвидовхарактеристик ссылка или объект
   * @param ret_mgr {Object} - установить в этом объекте указатель на менеджера объекта
   * @return {Array}
   */
  slist(prop, ret_mgr) {

    let res = [], rt, at, pmgr, op = this.get(prop);

    if(op && op.type.is_ref) {
      const tso = $p.enm.open_directions;

      // параметры получаем из локального кеша
      for (rt in op.type.types)
        if(op.type.types[rt].indexOf('.') > -1) {
          at = op.type.types[rt].split('.');
          pmgr = $p[at[0]][at[1]];
          if(pmgr) {

            if(ret_mgr) {
              ret_mgr.mgr = pmgr;
            }

            if(pmgr === tso) {
              pmgr.get_option_list().forEach((v) => v.value && v.value != tso.folding && res.push(v));
            }
            else if(pmgr.class_name.indexOf('enm.') != -1 || !pmgr.metadata().has_owners) {
              res = pmgr.get_option_list();
            }
            else {
              pmgr.find_rows({owner: prop}, (v) => res.push({value: v.ref, text: v.presentation}));
            }
          }
        }
    }
    return res;
  }

  load_array(aattr, forse) {
    super.load_array(aattr, forse);
    const {job_prm} = this._owner.$p;
    if(!job_prm.properties) {
      job_prm.__define('properties', {value: {}});
    }
    const parent = job_prm.properties;
    for (const row of aattr) {
      if(row.predefined_name) {
        parent.__define(row.predefined_name, {
          value: this.get(row, false, false),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    }
  }

}
$p.cch.create('properties', CchPropertiesManager, false);
class CchPredefinedElmnts extends CatObj{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get definition(){return this._getter('definition')}
set definition(v){this._setter('definition',v)}
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get list(){return this._getter('list')}
set list(v){this._setter('list',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
}
$p.CchPredefinedElmnts = CchPredefinedElmnts;
$p.cch.create('predefinedElmnts');
class CatCurrencies extends CatObj{
get nameFull(){return this._getter('nameFull')}
set nameFull(v){this._setter('nameFull',v)}
get extraCharge(){return this._getter('extraCharge')}
set extraCharge(v){this._setter('extraCharge',v)}
get mainCurrency(){return this._getter('mainCurrency')}
set mainCurrency(v){this._setter('mainCurrency',v)}
get parametersRecipe(){return this._getter('parametersRecipe')}
set parametersRecipe(v){this._setter('parametersRecipe',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}


  /**
   * Пересчитывает сумму из валюты в валюту
   * @param amount {Number}
   * @param [date] {Date}
   * @param [to] {CatCurrencies}
   * @return {Number}
   */
  to_currency(amount, date, to) {
    if(this == to){
      return amount;
    }

    const {job_prm: {pricing}, wsql} = $p;

    if(!to || to.empty()){
      to = pricing.main_currency;
    }

    if(!date){
      date = new Date();
    }
    if(!this._manager.cource_sql){
      this._manager.cource_sql = wsql.alasql.compile('select top 1 * from `ireg_currency_courses` where `currency` = ? and `period` <= ? order by `period` desc');
    }

    let cfrom = {course: 1, multiplicity: 1}, cto = {course: 1, multiplicity: 1};
    if(this !== pricing.main_currency){
      const tmp = this._manager.cource_sql([this.ref, date]);
      if(tmp.length) {
        cfrom = tmp[0];
      }
    }
    if(to !== pricing.main_currency){
      const tmp = this._manager.cource_sql([to.ref, date]);
      if(tmp.length) {
        cto = tmp[0];
      }
    }

    return (amount * cfrom.course / cfrom.multiplicity) * cto.multiplicity / cto.course;
  }}
$p.CatCurrencies = CatCurrencies;
$p.cat.create('currencies');
class CatPropertyValues extends CatObj{
get heft(){return this._getter('heft')}
set heft(v){this._setter('heft',v)}
get fullName(){return this._getter('fullName')}
set fullName(v){this._setter('fullName',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatPropertyValues = CatPropertyValues;
$p.cat.create('propertyValues');
class CatAccounts extends CatObj{
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get push_only(){return this._getter('push_only')}
set push_only(v){this._setter('push_only',v)}
get subscription(){return this._getter('subscription')}
set subscription(v){this._setter('subscription',v)}
get ips(){return this._getter('ips')}
set ips(v){this._setter('ips',v)}
get suffix(){return this._getter('suffix')}
set suffix(v){this._setter('suffix',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
}
$p.CatAccounts = CatAccounts;
$p.cat.create('accounts');
class CatPartners extends CatObj{
get nameFull(){return this._getter('nameFull')}
set nameFull(v){this._setter('nameFull',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get okpo(){return this._getter('okpo')}
set okpo(v){this._setter('okpo',v)}
get individualLegal(){return this._getter('individualLegal')}
set individualLegal(v){this._setter('individualLegal',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatPartners = CatPartners;
$p.cat.create('partners');
class CatDestinations extends CatObj{
get used(){return this._getter('used')}
set used(v){this._setter('used',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatDestinations = CatDestinations;
$p.cat.create('destinations');
class CatOrganizations extends CatObj{
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get individualLegal(){return this._getter('individualLegal')}
set individualLegal(v){this._setter('individualLegal',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatOrganizations = CatOrganizations;
$p.cat.create('organizations');
class CatUsers extends CatObj{
get invalid(){return this._getter('invalid')}
set invalid(v){this._setter('invalid',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get ancillary(){return this._getter('ancillary')}
set ancillary(v){this._setter('ancillary',v)}
get moniker(){return this._getter('moniker')}
set moniker(v){this._setter('moniker',v)}
get surname(){return this._getter('surname')}
set surname(v){this._setter('surname',v)}
get patronymic(){return this._getter('patronymic')}
set patronymic(v){this._setter('patronymic',v)}
get login(){return this._getter('login')}
set login(v){this._setter('login',v)}
get Пароль(){return this._getter('Пароль')}
set Пароль(v){this._setter('Пароль',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
}
$p.CatUsers = CatUsers;
class CatUsersManager extends CatManager {

  // после загрузки пользователей, морозим объект, чтобы его невозможно было изменить из интерфейса
  load_array(aattr, forse) {
    const res = [];
    for (let aobj of aattr) {
      let obj = this.by_ref[aobj.ref];
      if(obj && !obj.is_new()) {
        continue;
      }
      if(!aobj.acl_objs) {
        aobj.acl_objs = [];
      }
      const {acl} = aobj;
      delete aobj.acl;
      if(obj) {
        obj._mixin(aobj);
      }
      else {
        obj = new $p.CatUsers(aobj, this, true);
      }

      const {_obj} = obj;
      if(_obj && !_obj._acl) {
        _obj._acl = acl;
        obj._set_loaded();
        Object.freeze(obj);
        Object.freeze(_obj);
        for (let j in _obj) {
          if(typeof _obj[j] == 'object') {
            Object.freeze(_obj[j]);
            for (let k in _obj[j]) {
              typeof _obj[j][k] == 'object' && Object.freeze(_obj[j][k]);
            }
          }
        }
        res.push(obj);
      }
    }
    return res;
  }

  // пользователей не выгружаем
  unload_obj() {	}

}
$p.cat.create('users', CatUsersManager, false);
class CatArticles extends CatObj{
get h1(){return this._getter('h1')}
set h1(v){this._setter('h1',v)}
get descr(){return this._getter('descr')}
set descr(v){this._setter('descr',v)}
get introduction(){return this._getter('introduction')}
set introduction(v){this._setter('introduction',v)}
get content(){return this._getter('content')}
set content(v){this._setter('content',v)}
get img(){return this._getter('img')}
set img(v){this._setter('img',v)}
get date(){return this._getter('date')}
set date(v){this._setter('date',v)}
get author(){return this._getter('author')}
set author(v){this._setter('author',v)}
get sortingField(){return this._getter('sortingField')}
set sortingField(v){this._setter('sortingField',v)}
get published(){return this._getter('published')}
set published(v){this._setter('published',v)}
get formula(){return this._getter('formula')}
set formula(v){this._setter('formula',v)}
get category(){return this._getter('category')}
set category(v){this._setter('category',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatArticles = CatArticles;
$p.cat.create('articles');
class CatTags extends CatObj{
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
}
$p.CatTags = CatTags;
$p.cat.create('tags');
class CatNomPricesTypes extends CatObj{
get priceCurrency(){return this._getter('priceCurrency')}
set priceCurrency(v){this._setter('priceCurrency',v)}
get discountPercent(){return this._getter('discountPercent')}
set discountPercent(v){this._setter('discountPercent',v)}
get vatPriceIncluded(){return this._getter('vatPriceIncluded')}
set vatPriceIncluded(v){this._setter('vatPriceIncluded',v)}
get roundingOrder(){return this._getter('roundingOrder')}
set roundingOrder(v){this._setter('roundingOrder',v)}
get roundingUp(){return this._getter('roundingUp')}
set roundingUp(v){this._setter('roundingUp',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
}
$p.CatNomPricesTypes = CatNomPricesTypes;
$p.cat.create('nomPricesTypes');
class CatFormulas extends CatObj{
get formula(){return this._getter('formula')}
set formula(v){this._setter('formula',v)}
get leadingFormula(){return this._getter('leadingFormula')}
set leadingFormula(v){this._setter('leadingFormula',v)}
get conditionFormula(){return this._getter('conditionFormula')}
set conditionFormula(v){this._setter('conditionFormula',v)}
get definition(){return this._getter('definition')}
set definition(v){this._setter('definition',v)}
get template(){return this._getter('template')}
set template(v){this._setter('template',v)}
get sortingField(){return this._getter('sortingField')}
set sortingField(v){this._setter('sortingField',v)}
get async(){return this._getter('async')}
set async(v){this._setter('async',v)}
get disabled(){return this._getter('disabled')}
set disabled(v){this._setter('disabled',v)}
get context(){return this._getter('context')}
set context(v){this._setter('context',v)}
get jsx(){return this._getter('jsx')}
set jsx(v){this._setter('jsx',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}


  execute(obj, attr) {

    const {_manager, _data, ref} = this;
    const {$p} = _manager._owner;
    const {ireg, msg, ui} = $p;

    // создаём функцию из текста формулы
    if(!_data._formula && this.formula){
      try{
        if(this.jsx) {
          _data._formula = new Function('$p', this.formula)($p);
        }
        else {
          if(this.async) {
            const AsyncFunction = Object.getPrototypeOf(eval('(async function(){})')).constructor;
            _data._formula = (new AsyncFunction('obj,$p,attr', this.formula)).bind(this);
          }
          else {
            _data._formula = (new Function('obj,$p,attr', this.formula)).bind(this);
          }
        }
      }
      catch(err){
        _data._formula = () => false;
        $p.record_log(err);
      }
    }

    const {_formula} = _data;

    if(this.parent == _manager.predefined('printing_plates')) {

      if(!_formula) {
        msg.show_msg({
          title: msg.bld_title,
          type: 'alert-error',
          text: `Ошибка в формуле<br /><b>${this.name}</b>`
        });
        return Promise.resolve();
      }

      // рендерим jsx в новое окно
      if(this.jsx) {
        return ui.dialogs.window({
          Component: _formula,
          title: this.name,
          //print: true,
          obj,
          attr,
        });
      }

      // получаем HTMLDivElement с отчетом
      ireg.log?.timeStart?.(ref);
      return _formula(obj, $p, attr)

      // показываем отчет в отдельном окне
        .then((doc) => {
          ireg.log?.timeEnd?.(ref);
          $p.SpreadsheetDocument && doc instanceof $p.SpreadsheetDocument && doc.print();
        })
        .catch(err => {
          ireg.log?.timeEnd?.(ref, err);
          throw err;
        });

    }
    else {
      ireg.log?.timeStart?.(ref);
      const res = _formula && _formula(obj, $p, attr);
      ireg.log?.timeEnd?.(ref);
      return res;
    }
  }

  get _template() {
    const {_data, _manager} = this;
    if(!_data._template){
      const {SpreadsheetDocument} = _manager._owner.$p;
      if(SpreadsheetDocument) {
        _data._template = new SpreadsheetDocument(this.template);
      }
    }
    return _data._template;
  }
}
$p.CatFormulas = CatFormulas;
class CatFormulasManager extends CatManager {

  constructor(owner, class_name) {
    super(owner, class_name);
    $p.adapters.pouch.once('pouch_doc_ram_start', this.load_formulas.bind(this));
  }

  load_formulas(src) {
    const {md, utils, wsql} = $p;
    const {isNode, isBrowser} = wsql.alasql.utils;
    const parents = [this.predefined('printing_plates'), this.predefined('modifiers')];
    const filtered = [];
    (src || this).forEach((v) => {
      if(!v.disabled && parents.includes(v.parent)){
        if(v.context === 1 && !isBrowser || v.context === 2 && !isNode) {
          return;
        }
        filtered.push(v);
      }
    });

    const compare = utils.sort('name');

    filtered.sort(utils.sort('sorting_field')).forEach((formula) => {
      // формируем списки печатных форм и внешних обработок
      if(formula.parent == parents[0]) {
        formula.params.find_rows({param: 'destination'}, (dest) => {
          const dmgr = md.mgr_by_class_name(dest.value);
          if(dmgr) {
            const tmp = dmgr._printing_plates ? Object.values(dmgr._printing_plates) : [];
            tmp.push(formula);
            tmp.sort(compare);
            dmgr._printing_plates = {};
            for(const elm of tmp) {
              dmgr._printing_plates[`prn_${elm.ref}`] = elm;
            }
          }
        });
      }
      else {
        // выполняем модификаторы
        try {
          const res = formula.execute();
          // еслм модификатор вернул задание кроносу - добавляем планировщик
          res && utils.cron && utils.cron(res);
        }
        catch (err) {
        }
      }
    });
  }

  // переопределяем load_array - не грузим неактивные формулы
  load_array(aattr, forse) {
    const res = super.load_array(aattr.filter((v) => !v.disabled || v.is_folder), forse);
    const modifiers = this.predefined('modifiers');
    for(const doc of res) {
      const {_data, parent} = doc;
      if(_data._formula) {
        _data._formula = null;
        if(parent === modifiers) {
          $p.record_log(`runtime modifier '${doc.name}'`);
        }
      }
      if(_data._template) {
        _data._template = null;
      }
    }
  }

}
$p.cat.create('formulas', CatFormulasManager, false);
class CatPosotions extends CatObj{
get НазваниеДолжностиКраткое(){return this._getter('НазваниеДолжностиКраткое')}
set НазваниеДолжностиКраткое(v){this._setter('НазваниеДолжностиКраткое',v)}
get НазваниеДолжностиПолное(){return this._getter('НазваниеДолжностиПолное')}
set НазваниеДолжностиПолное(v){this._setter('НазваниеДолжностиПолное',v)}
get ЧасоваяСтавка(){return this._getter('ЧасоваяСтавка')}
set ЧасоваяСтавка(v){this._setter('ЧасоваяСтавка',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
}
$p.CatPosotions = CatPosotions;
$p.cat.create('posotions');
class CatTaskTypes extends CatObj{
get Критичность(){return this._getter('Критичность')}
set Критичность(v){this._setter('Критичность',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
}
$p.CatTaskTypes = CatTaskTypes;
$p.cat.create('taskTypes');
class CatTasks extends CatObj{
get Название(){return this._getter('Название')}
set Название(v){this._setter('Название',v)}
get НомерЗадачи(){return this._getter('НомерЗадачи')}
set НомерЗадачи(v){this._setter('НомерЗадачи',v)}
get ДатаСоздания(){return this._getter('ДатаСоздания')}
set ДатаСоздания(v){this._setter('ДатаСоздания',v)}
get definition(){return this._getter('definition')}
set definition(v){this._setter('definition',v)}
get executor(){return this._getter('executor')}
set executor(v){this._setter('executor',v)}
get author(){return this._getter('author')}
set author(v){this._setter('author',v)}
get Критичность(){return this._getter('Критичность')}
set Критичность(v){this._setter('Критичность',v)}
get ВидЗадачи(){return this._getter('ВидЗадачи')}
set ВидЗадачи(v){this._setter('ВидЗадачи',v)}
get timeEstimation(){return this._getter('timeEstimation')}
set timeEstimation(v){this._setter('timeEstimation',v)}
get Подзадача(){return this._getter('Подзадача')}
set Подзадача(v){this._setter('Подзадача',v)}
get predefinedName(){return this._getter('predefinedName')}
set predefinedName(v){this._setter('predefinedName',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatTasks = CatTasks;
$p.cat.create('tasks');
class DocCompletedTaskCertificate extends DocObj{
get customer(){return this._getter('customer')}
set customer(v){this._setter('customer',v)}
get executor(){return this._getter('executor')}
set executor(v){this._setter('executor',v)}
}
$p.DocCompletedTaskCertificate = DocCompletedTaskCertificate;
$p.doc.create('completedTaskCertificate');
class IregLog_view extends RegisterRow{
get key(){return this._getter('key')}
set key(v){this._setter('key',v)}
get user(){return this._getter('user')}
set user(v){this._setter('user',v)}
}
$p.IregLog_view = IregLog_view;
$p.ireg.create('log_view');
})();
};

