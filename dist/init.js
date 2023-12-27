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

