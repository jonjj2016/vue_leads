<template>
  <form class="form" @submit.prevent="submitForm">
    <input
      class="form_item"
      placeholder="First Name"
      required
      type="text"
      id="firstName"
      v-model="lead.firstName"
    />

    <input
      class="form_item"
      type="text"
      placeholder="Last Name"
      required
      id="lastName"
      v-model="lead.lastName"
    />
    <input
      class="form_item"
      type="text"
      required
      placeholder="Organization"
      id="organization"
      v-model="lead.organization"
    />
    <select
      class="form_item"
      placeholder="Organization"
      required
      id="role"
      v-model="lead.role"
    >
      <option value="" disabled selected hidden color="gray">Role</option>
      <option value="Ceo">CEO</option>
      <option value="Manager">Manager</option>
      <option value="AccountManager">Account Manager</option>
      <option value="Owner">Owner</option>
      <option value="Operations">Operations</option>
      <option value="BoardMember">Board Member</option>
    </select>

    <input
      class="form_item"
      placeholder="Email"
      type="email"
      id="email"
      required
      v-model="lead.email"
      @blur="validateEmail"
    />
    <span v-if="emailError" style="color: red;">{{ emailError }}</span>
    <input
      class="form_item"
      placeholder="Phone"
      required
      type="tel"
      id="phone"
      @blur="validatePhone"
      v-model="lead.phone"
    />
    <span v-if="phoneError" style="color: red;">{{ phoneError }}</span>
    <div class="form_btn_group">
      <button type="submit">Save</button>

      <button @click.prevent="clear">Clear</button>
    </div>
  </form>
</template>

<script>
import { uuid } from 'vue-uuid'
import { useStore } from 'vuex'
import types from '../store/mutation-types'
import { mapState } from 'vuex'
let base = {
  firstName: '',
  lastName: '',
  organization: '',
  role: '',
  email: '',
  phone: '',
}
export default {
  setup() {
    const store = useStore()
    return {
      postLead: (data) => store.dispatch(types.POST_LEAD, data),
      patchLead: (data) => store.dispatch(types.PATCH_LEAD, data),
    }
  },
  watch: {
    current(newVal) {
      this.lead = newVal
      this.editMode = true
    },
    leads() {
      this.editMode = false
      this.lead = { ...base, emailError: '', phoneError: '' }
    },
  },
  data() {
    let formData = { ...base }
    if (this.current) {
      formData = { ...this.current }
      // base.firstName = this.current.firstName
    }
    return {
      lead: {
        ...formData,
        emailError: '',
        phoneError: '',
      },
      editMode: false,
    }
  },
  computed: mapState({
    leads: (state) => state.leads,
    current: (state) => state.current,
  }),
  methods: {
    clear() {
      this.lead = {
        ...base,
        emailError: '',
        phoneError: '',
      }
      this.editMode = false
    },
    validateEmail() {
      const emailRegex = /\S+@\S+\.\S+/
      if (!this.lead.email) {
        this.emailError = 'Please enter an email address'
      } else if (!emailRegex.test(this.lead.email)) {
        this.emailError = 'Please enter a valid email address'
      } else {
        this.emailError = ''
      }
    },
    validatePhone() {
      const phoneNumberRegex = /^\d{10}$/
      if (!this.lead.phone) {
        this.phoneError = 'Please enter an phone number'
      } else if (!phoneNumberRegex.test(this.lead.phone)) {
        this.phoneError = 'Please enter a valid phone number'
      } else {
        this.phoneError = ''
      }
    },
    submitForm() {
      if (this.editMode) {
        this.patchLead(this.lead)
        return
      }
      this.postLead({
        firstName: this.lead.firstName,
        lastName: this.lead.lastName,
        role: this.lead.role,
        organization: this.lead.organization,
        email: this.lead.email,
        phone: this.lead.phone,
        id: uuid.v1(),
        selected: false,
      })
      // need to change temp solution
      this.lead = { ...base }
      this.editMode = false
    },
    validatePhoneNumber() {
      const phoneNumberRegex = /^\+?[0-9]\d{1,20}$/
      if (!phoneNumberRegex.test(this.lead.phone)) {
        this.emailError = 'Please enter a valid phone number'
      }
      return phoneNumberRegex.test(this.lead.phone)
      // Your custom validation logic here
    },
  },
}
</script>
