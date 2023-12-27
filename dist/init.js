/* eslint-disable */
module.exports = function init_classes($p) {
(function(){
    const { CatObj, DocObj } = $p.constructor.classes;
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
}
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
$p.cat.create('users');
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
}
$p.CatFormulas = CatFormulas;
$p.cat.create('formulas');
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
})();
};

