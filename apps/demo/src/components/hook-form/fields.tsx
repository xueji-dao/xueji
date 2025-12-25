import { RHFAutocomplete } from './rhf-autocomplete'
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox'
import { RHFCode } from './rhf-code'
import { RHFDatePicker, RHFDateTimePicker, RHFTimePicker } from './rhf-date-picker'
import { RHFNumberInput } from './rhf-number-input'
import { RHFPhoneInput } from './rhf-phone-input'
import { RHFRadioGroup } from './rhf-radio-group'
import { RHFRating } from './rhf-rating'
import { RHFMultiSelect, RHFSelect } from './rhf-select'
import { RHFSlider } from './rhf-slider'
import { RHFMultiSwitch, RHFSwitch } from './rhf-switch'
import { RHFTextField } from './rhf-text-field'
import { RHFUpload, RHFUploadAvatar, RHFUploadBox } from './rhf-upload'

// ----------------------------------------------------------------------

export const Field = {
  Code: RHFCode,
  Select: RHFSelect,
  Upload: RHFUpload,
  Switch: RHFSwitch,
  Slider: RHFSlider,
  Rating: RHFRating,
  Text: RHFTextField,
  Phone: RHFPhoneInput,
  Checkbox: RHFCheckbox,
  UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  NumberInput: RHFNumberInput,
  MultiSelect: RHFMultiSelect,
  MultiSwitch: RHFMultiSwitch,
  UploadAvatar: RHFUploadAvatar,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  // Pickers
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  DateTimePicker: RHFDateTimePicker,
}
