import ApplicationState from '@/types/ApplicationState'

const state: ApplicationState = {
  toast: null,
  tableName: 'root_hospital_patients',
  tableData: null,
  tableMeta: null,
  dataDisplayLayout: 'CardView',
  defaultEntityData: null,
  entityMetaRefs: {},
  hideFilters: false,
  showShoppingCart: false,
  shoppedEntityItems: [],
  tableSettings: {
    settingsTable: 'de_dataexplorer_table_settings',
    settingsRowId: null,
    collapseLimit: 5,
    customCardCode: null,
    customCardAttrs: '',
    isShop: false
  }
}

export default state
