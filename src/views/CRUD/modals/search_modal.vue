<template>
  <CModal alignment="center" scrollable :visible="modalSearchOpen" @close="closeSearchModal">
    <CModalHeader>
      <CModalTitle>Поиск</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12" v-for="(keys, index) in keysData" :key="index">
        <CFormLabel :for="keys">{{ keys }}</CFormLabel>
        <CInputGroup class="has-validation">
          <div class="form-floating mb-0 me-2">
            <CFormSelect id="search_options" class="select-count-row" required
                         :value="sortDataObj[keys].param"
                         @input="updateSearchOptions($event.target.value, keys, 'check', 'param')">
              <option v-for="(count, i) in sortDataObj[keys].arrayParam"
                      :value="count" :key="i">{{ count }}
              </option>
            </CFormSelect>
            <label class="form-label" for="limit">искать по</label>
          </div>

          <CFormInput v-if="sortDataObj[keys].type === 'number' && sortDataObj[keys].param === '$bt'"
                      aria-describedby="inputGroupPrepend" required placeholder="мин_число"
                      :value="sortDataObj[keys].val[0]"
                      type="number" min="0" pattern="^[1-9][0-9]*$"
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      @change="updateSearchOptionsBT($event.target.value, keys, 'left')"/>
          <CFormInput v-if="sortDataObj[keys].type === 'number' && sortDataObj[keys].param === '$bt'"
                      aria-describedby="inputGroupPrepend" required placeholder="макс_число"
                      type="number" min="0" pattern="^[1-9][0-9]*$"
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      :value="sortDataObj[keys].val[1]"
                      @change="updateSearchOptionsBT($event.target.value, keys, 'right')"/>

          <CFormInput v-if="sortDataObj[keys].type === 'number' && sortDataObj[keys].param !== '$bt'"
                      aria-describedby="inputGroupPrepend" required placeholder="number"
                      :value="sortDataObj[keys].val" @input="updateSearchOptions($event.target.value, keys)"/>
          <CFormInput v-if="sortDataObj[keys].type === 'string' && sortDataObj[keys].param !== '$bt'"
                      aria-describedby="inputGroupPrepend" required placeholder="string"
                      :value="sortDataObj[keys].val" @input="updateSearchOptions($event.target.value, keys)"/>
          <CFormSelect v-if="sortDataObj[keys].type === 'boolean' && sortDataObj[keys].param !== '$bt'" required
                       :value="sortDataObj[keys].val" @input="updateSearchOptions($event.target.value, keys)">
            <option selected value=""> Выберите из списка</option>
            <option :value="true"> Да</option>
            <option :value="false"> Нет</option>
          </CFormSelect>
          <Datepicker v-if="sortDataObj[keys].type === 'date' && sortDataObj[keys].param !== '$bt'"
                      locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
                      v-bind:style="'flex:1 1 auto;'" :clearable="false" selectText="Выбрать" cancelText="Закрыть"
                      v-model="sortDataObj[keys].val"
                      @update:modelValue="updateSearchOptions(sortDataObj[keys].val, keys)">
            <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
              <CFormInput aria-describedby="inputGroupPrepend" required placeholder="date" :value="value"/>
            </template>
          </Datepicker>
          <Datepicker v-if="sortDataObj[keys].type === 'date' && sortDataObj[keys].param === '$bt'"
                      locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
                      multiCalendars range :clearable="false" selectText="Выбрать" cancelText="Закрыть"
                      :partialRange="false"
                      v-bind:style="'flex:1 1 auto;'" v-model="sortDataObj[keys].val"
                      @update:modelValue="updateSearchOptions(sortDataObj[keys].val, keys)">
            <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
              <CFormInput aria-describedby="inputGroupPrepend" required placeholder="multi_date" :value="value"/>
            </template>
          </Datepicker>
          <CButton color="danger" class="btn-white text-white" @click="updateSearchOptions('', keys)">
            <CIcon icon="cil-X"/>
          </CButton>
        </CInputGroup>
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" class="btn-white" @click="closeSearchModal">Отмена</CButton>
      <CButton color="info" class="btn-white" @click="clearSearchOptions">Очистить</CButton>
      <CButton color="primary" type="button" class="btn-white" @click="find">Искать</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import {reactive, watch} from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "search_modal",
  props: ['modalSearchOpen', 'closeSearchModal', 'openSearchModal', 'getFlagQuery', 'getQuery', 'getKeysData'],
  components: {Datepicker},
  data() {
    return {
      keysData: []
    }
  },
  mounted() {
    watch(() => this.getKeysData, () => {
      if (this.keysData.length === 0) {
        this.keysData = this.getKeysData
      }
    });
  },
  computed: {
    getXQuery: {
      get() {
        return String(this.getQuery)
      },
      set(value) {
        this.$store.commit('updateQuery', value);
      }
    },
    sortDataObj: {
      get() {
        let obj = reactive({})
        if (this.keysData.length > 0) {
          this.keysData.filter((f) => {
            if (f === 'id' || f === 'tg_id' || f === 'role_id' || f === 'is_visible' || f === 'item_id' || f === 'user_id'
                || f === 'expiration_date' || f === 'can_buy_muliple_times' || f === 'duration' || f === 'price') {
              if (f === 'expiration_date') {
                obj[f] = {
                  arrayParam: ['$eq', '$neq', '$gt', '$gte', '$lt', '$lte', '$bt'],
                  type: 'date',
                  param: '$eq',
                  val: ''
                }
              } else if (f === 'can_buy_muliple_times' || f === 'is_visible') {
                obj[f] = {
                  arrayParam: ['$eq', '$neq'],
                  type: 'boolean',
                  param: '$eq',
                  val: ''
                }
              } else {
                obj[f] = {
                  arrayParam: ['$eq', '$neq', '$gt', '$gte', '$lt', '$lte', '$bt'],
                  type: 'number',
                  param: '$eq',
                  val: ''
                }
              }
            } else {
              obj[f] = {
                arrayParam: ['$eq', '$neq', '$in', '$nin'],
                type: 'string',
                param: '$eq',
                val: ''
              }
            }
          })
        }
        return obj
      },
      set(value) {

      }
    },
  },
  methods: {
    clearInput(event, name){
      this.updateSearchOptions(event, name)
    },
    updateSearchOptionsBT(event, name, direction, value = [], test = 1) {
        //console.log(this.sortDataObj[name].val)
        if (direction === 'left') {
          let right = this.sortDataObj[name].val[1]
          if (right !== undefined && right !== null && right !== '' && right <= Number(event))
            test = Number(event) + 1
          else
            test = right
          value = [Number(event), Number(test)];
          //console.log(value)
        }
        if (direction === 'right') {
          let left = this.sortDataObj[name].val[0]
          if (left !== undefined && left !== null && left !== '' && left >= Number(event))
            test = Number(event) - 1
          else
            test = left
          value = [Number(test), Number(event)];
          //console.log(value)
        }
        this.sortDataObj[name].val = value
        this.updateSearchOptions(value, name, null,'bt')
    },
    updateSearchOptions(event, name, check, param, obj = {}) {
      if (param === 'param') {
        this.sortDataObj[name].param = event
      }
      if (check === 'check') {
        if (event === '$bt') {
          if (this.sortDataObj[name].type !== 'date') {
            this.sortDataObj[name].val = [1,1]
          } else {
            this.sortDataObj[name].val = ''
          }
        } else {
          if (typeof this.sortDataObj[name].val === 'object' && this.sortDataObj[name].val.length === 2)
            this.sortDataObj[name].val = ''
        }
      } else {
          this.sortDataObj[name].val = event
      }

      Object.keys(this.sortDataObj).filter((f) => {
        if (this.sortDataObj[f].val !== '') {
          if (this.sortDataObj[f].type === 'number') {
            if (typeof this.sortDataObj[f].val === 'object') {
              this.sortDataObj[f].val[0] = Number(this.sortDataObj[f].val[0])
              this.sortDataObj[f].val[1] = Number(this.sortDataObj[f].val[1])
            } else {
              this.sortDataObj[f].val = Number(this.sortDataObj[f].val)
            }
            obj[f] = {[this.sortDataObj[f].param]: this.sortDataObj[f].val}
          } else if (this.sortDataObj[f].type === 'boolean') {
            if (this.sortDataObj[f].val === "true") {
              this.sortDataObj[f].val = true
            } else if (this.sortDataObj[f].val === "false") {
              this.sortDataObj[f].val = false
            }
            obj[f] = {[this.sortDataObj[f].param]: Boolean(this.sortDataObj[f].val)}
          } else if (this.sortDataObj[f].type === 'date') {
            if (typeof this.sortDataObj[f].val === 'object' && this.sortDataObj[f].val.length === 2) {
              this.sortDataObj[f].val[0] = String(this.$moment(this.$moment(this.sortDataObj[f].val[0]).format('YYYY-MM-DD'))
                  .set({hour: 0, minute: 0, second: 0, millisecond: 0}).format('YYYY-MM-DDTHH:mm:ss'))
              this.sortDataObj[f].val[1] = String(this.$moment(this.$moment(this.sortDataObj[f].val[1]).format('YYYY-MM-DD'))
                  .set({hour: 0, minute: 0, second: 0, millisecond: 0}).format('YYYY-MM-DDTHH:mm:ss'))
            } else {
              this.sortDataObj[f].val = String(this.$moment(this.$moment(this.sortDataObj[f].val).format('YYYY-MM-DD'))
                  .set({hour: 0, minute: 0, second: 0, millisecond: 0}).format('YYYY-MM-DDTHH:mm:ss'))
            }
            obj[f] = {[this.sortDataObj[f].param]: this.sortDataObj[f].val}
          } else {
            obj[f] = {[this.sortDataObj[f].param]: String(this.sortDataObj[f].val)}
          }
        }
      })
      this.getXQuery = JSON.stringify(obj)
    },
    clearSearchOptions() {
      Object.keys(this.sortDataObj).filter((f) => {
        this.sortDataObj[f].param = '$eq'
        this.sortDataObj[f].val = ''
      })
      this.getXQuery = ''
      this.find()
    },
    async find() {
      this.closeSearchModal()
      await this.$store.dispatch('getAllData');
    }
  }
}
</script>

<style scoped>

</style>
