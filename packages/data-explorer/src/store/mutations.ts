import ApplicationState, { Toast, EntityMetaRefs } from '@/types/ApplicationState'
import { DataApiResponse, MetaDataApiResponse, MetaDataAttribute } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'
import Vue from 'vue'

export default {
  setToast (state: ApplicationState, toast: Toast) {
    state.toast = toast
  },
  clearToast (state: ApplicationState) {
    state.toast = null
  },
  setDataDisplayLayout (state: ApplicationState, layout: ApplicationState['dataDisplayLayout']) {
    state.dataDisplayLayout = layout
  },
  setTableData (state: ApplicationState, data: DataApiResponse) {
    state.tableData = data
  },
  setHideFilters (state: ApplicationState, hideFilters: boolean) {
    state.hideFilters = hideFilters
  },
  setTableName (state: ApplicationState, entity: string) {
    state.tableName = entity
  },
  setShowShoppingCart (state: ApplicationState, cart: boolean) {
    state.showShoppingCart = cart
  },
  toggleShoppingItems (state: ApplicationState, id: string) {
    const index = state.shoppedEntityItems.indexOf(id)
    if (index !== -1) {
      state.shoppedEntityItems.splice(index, 1)
    } else {
      state.shoppedEntityItems.push(id)
    }
  },
  setTableMetaData (state: ApplicationState, meta: MetaDataApiResponse) {
    state.tableMeta = meta
  },
  setMetaDataRefLabels (state: ApplicationState, meta: MetaDataApiResponse) {
    const refItems = meta.attributes.reduce((obj : EntityMetaRefs, attribute : MetaDataAttribute) => {
      if (attribute.refEntity) {
        obj[attribute.name] = {
          refEntity: attribute.refEntity.name.toString(),
          fieldType: attribute.fieldType,
          labelAttribute: attribute.refEntity.labelAttribute.toString()
        }
      }
      return obj
    }, <EntityMetaRefs>{})
    state.entityMetaRefs = refItems
  },
  setTableSettings (state: ApplicationState, tableSettings: StringMap) {
    state.tableSettings.isShop = Boolean(tableSettings.shop)
    state.tableSettings.collapseLimit = parseInt(tableSettings.collapse_limit)
    state.tableSettings.settingsRowId = tableSettings.id
    state.tableSettings.customCardCode = tableSettings.card_template
    state.tableSettings.customCardAttrs = tableSettings.template_attrs
  },
  setMetaData (state: ApplicationState, meta: MetaDataApiResponse) {
    state.tableMeta = meta
  },
  updateRowData (state: ApplicationState, { rowId, rowData }: {rowId: string, rowData: StringMap}) {
    if (!state.tableData) {
      throw new Error('cannot update empty table data')
    }
    // todo need to refacor state.tableData to look up list
    state.tableData.items.forEach((row, index) => {
      // @ts-ignore
      if (row[state.tableMeta.idAttribute].toString() === rowId) {
        // @ts-ignore
        Vue.set(state.tableData.items, index, rowData)
      }
    })
  }
}
