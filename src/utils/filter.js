import CountryList from '@/assets/country-list'
import { province as ProvinceList } from '@/assets/city-data'

export function labelView(value, origin, label = 'label', noknow = '未知') {
  if (!origin) return

  const item = origin.find(item => item.value === value)

  let name
  if (item) name = item[label]
  return name || noknow
}

export function areaView(arr) {
  if (typeof arr === 'string') {
    arr = arr.split('-')
  }

  const [country, province] = arr

  let _country = CountryList.find(item => item.value === country) || ''
  let _province = ProvinceList.find(item => item.value === province) || ''

  if (_country) _country = _country.label
  if (_province) _province = _province.label

  let ret = _country
  if (_province) {
    ret = ret + '-' + _province
  }
  return ret
}
