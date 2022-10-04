<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="run_time">Дата и время рассылки</CFormLabel>
        <Datepicker locale="ru" :enableSeconds="true" :format="'dd.MM.yyyy HH:mm:ss'" monthNameFormat="long"
                    :minDate="new Date()" :clearable="false" selectText="Выбрать" cancelText="Закрыть"
                    v-model="state.run_time" @update:modelValue="validateInput('run_time')">
          <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
            <CInputGroup class="has-validation mb-3">
              <tooltip-info-content :content="'Время формата UTC-0, когда будет совершена рассылка.'">
              </tooltip-info-content>
              <CFormInput id="run_time" aria-describedby="inputGroupPrepend" required
                          placeholder="Время рассылки"
                          :feedbackInvalid="feedbackInvalidInput('run_time')"
                          @input="validateInput('run_time')"
                          :valid="validOrInvalidInput('run_time', true)"
                          :invalid="validOrInvalidInput('run_time', false)" :value="value"/>
            </CInputGroup>
          </template>
        </Datepicker>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="users-0">Пользователи</CFormLabel>
        <CInputGroup class="has-validation mb-3" v-for="(user, index) in state.users" :key="index">
          <tooltip-info-content v-if="index === 0" :content="'Список ID пользователей, которым будет рассылка. ' +
           'Чтобы отправить всем, оставьте список пустым. Type: Integer'"></tooltip-info-content>
          <CFormInput :id="'users-'+index" aria-describedby="inputGroupPrepend-users"
                      v-model="state.users[index][0]" placeholder="ID пользователя"
                      :feedbackInvalid="feedbackInvalidInput('users', index)"
                      @input="validateInput('users')"
                      :valid="validOrInvalidInput('users', true, index)"
                      :invalid="validOrInvalidInput('users', false, index)"/>
          <CButton v-if="index === state.users.length - 1" color="success" class="btn-white" @click="addInput('users')">
            <CIcon icon="cil-plus"/>
          </CButton>
          <CButton v-if="state.users.length > 1" color="danger" class="btn-white" @click="deleteInput('users', index)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="text">Текст рассылки</CFormLabel>
        <CInputGroup class="has-validation mb-3">
          <tooltip-info-content :content="'Отправляемый текст сообщения рассылки. Type: String. ' +
           'Максимальная длина 4096 символов'"></tooltip-info-content>
          <CFormTextarea id="text" aria-describedby="inputGroupPrepend"
                         v-model="state.text" placeholder="Текст сообщения рассылки" rows="3"
                         :feedbackInvalid="feedbackInvalidInput('text')"
                         @input="validateInput('text')"
                         :valid="validOrInvalidInput('text', true)"
                         :invalid="validOrInvalidInput('text', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="videos-0">ID Видео-файлов</CFormLabel>
        <CInputGroup class="has-validation mb-3" v-for="(video, index) in state.videos" :key="index">
          <tooltip-info-content  v-if="index === 0"
                                 :content="'Список files_id видео-файлов, которые будут прикреплены к сообщению. ' +
           'Type: String. Максимальное количество видео-файлов - 10 штук'"></tooltip-info-content>
          <CFormInput :id="'videos-'+index" aria-describedby="inputGroupPrepend-videos"
                      v-model="state.videos[index][0]" placeholder="ID видео-файла"
                      :feedbackInvalid="feedbackInvalidInput('videos', index)"
                      @input="validateInput('videos')"
                      :valid="validOrInvalidInput('videos', true, index)"
                      :invalid="validOrInvalidInput('videos', false, index)"/>
          <CButton v-if="index === state.videos.length - 1 && state.videos.length < 10" color="success" class="btn-white" @click="addInput('videos')">
            <CIcon icon="cil-plus"/>
          </CButton>
          <CButton v-if="state.videos.length > 1" color="danger" class="btn-white" @click="deleteInput('videos', index)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="photos-0">ID Изображений</CFormLabel>
        <CInputGroup class="has-validation mb-3" v-for="(photo, index) in state.photos" :key="index">
          <tooltip-info-content  v-if="index === 0"
                                 :content="'Список files_id изображений, которые будут прикреплены к сообщению. ' +
           'Type: String. Максимальное количество изображений - 10 штук'"></tooltip-info-content>
          <CFormInput :id="'photos-'+index" aria-describedby="inputGroupPrepend-photos"
                      v-model="state.photos[index][0]" placeholder="ID изображения"
                      :feedbackInvalid="feedbackInvalidInput('photos', index)"
                      @input="validateInput('photos')"
                      :valid="validOrInvalidInput('photos', true, index)"
                      :invalid="validOrInvalidInput('photos', false, index)"/>
          <CButton v-if="index === state.photos.length - 1 && state.photos.length < 10" color="success" class="btn-white" @click="addInput('photos')">
            <CIcon icon="cil-plus"/>
          </CButton>
          <CButton v-if="state.photos.length > 1" color="danger" class="btn-white" @click="deleteInput('photos', index)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="role_id">Роль</CFormLabel>
        <CInputGroup class="has-validation mb-3">
          <tooltip-info-content :content="'Рассылка всем пользователям роли по ID. ' +
           'Чтобы не учитывалась роль - оставьте это поле пустым. Рассылка всем пользователям без роли - 0. Type: Integer'">
          </tooltip-info-content>
          <CFormSelect id="role_id" aria-describedby="inputGroupPrepend" required
                       v-model="state.role_id"
                       :feedbackInvalid="feedbackInvalidInput('role_id')"
                       @input="validateInput('role_id')"
                       :valid="validOrInvalidInput('role_id', true)"
                       :invalid="validOrInvalidInput('role_id', false)">
            <option selected="" value="">Выберите роль...</option>
            <option :value="0">Без роли</option>
            <option v-for="([id, title], index) in Object.entries(getRoles)"
                    :value="id" :key="index">{{ title }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" class="btn-white" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" class="btn-white" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import {state} from "@/mixins/vuelidateNotify";
import TooltipInfoContent from "@/components/TooltipInfoContent";

export default {
  name: "Notify_modal",
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal', 'closeModal',
    'validateInput', 'validOrInvalidInput', 'feedbackInvalidInput', 'getRoles', 'checkValidateModal'],
  components: {TooltipInfoContent, Datepicker},
  methods: {
    textAreaAdjust(element) {
      element.style.height = "1px";
      element.style.height = (25+element.scrollHeight)+"px";
    },
    addInput(name) {
      if (name === 'users')
        this.state[name].push({0: null})
      else
        if (this.state[name].length < 10)
          this.state[name].push({0: null})
    },
    deleteInput(name, index) {
      if (this.state[name].length >= 2)
        this.state[name].splice(index, 1);
    },
  }
}
</script>

<style scoped>

</style>
